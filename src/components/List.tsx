import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ListProps } from "../types";
import {
  DEFAULT_ITEM_HEIGHT,
  DEFAULT_LIST_HEIGHT,
  PADDED_ELEMENTS,
} from "../utils/constants";
import { ListItem } from "./ListItem";
import { ListPad } from "./ListPad";
import { useThrottle } from "../hooks/useThrottle";
import { detectBrowser } from "../utils/helpers";

export function List<T>({
  items,
  renderItem,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  listHeight = DEFAULT_LIST_HEIGHT,
  onScroll,
  throttle = false,
  throttleDelay = 100,
  style,
}: ListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);

  const elementsToRender = Math.ceil(listHeight / itemHeight) + PADDED_ELEMENTS;

  const throttleHook = useThrottle();

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(elementsToRender);

  // scroll callback
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight } = listRef.current!;

    // calculate start and end index
    const start = Math.floor(scrollTop / itemHeight);
    // +1 to include the last element
    const end = start + Math.ceil(clientHeight / itemHeight);

    setStartIndex(
      start > 0
        ? start - PADDED_ELEMENTS > 0
          ? start - PADDED_ELEMENTS
          : start
        : 0
    );
    setEndIndex(
      end < items.length
        ? end + PADDED_ELEMENTS < items.length
          ? end + PADDED_ELEMENTS
          : end
        : items.length
    );

    if (onScroll) onScroll(start, end);
  }, [itemHeight, items.length, onScroll]);

  // throttle scroll callback
  const throttledScrollCallback = useMemo(
    () => (throttle ? throttleHook(handleScroll, throttleDelay) : handleScroll),
    [handleScroll, throttle, throttleDelay, throttleHook]
  );

  const memoizedStyle = useMemo(
    () => ({
      ...style,
    }),
    [style]
  );

  // listen for scroll events
  useEffect(() => {
    const list = listRef.current!;
    list.addEventListener("scroll", throttledScrollCallback);
    return () => {
      list.removeEventListener("scroll", throttledScrollCallback);
    };
  }, [handleScroll, throttledScrollCallback]);

  const paddingTop = itemHeight * startIndex;
  const paddingBottom = itemHeight * (items.length - endIndex);

  const slicedItems = items.slice(startIndex, endIndex);

  if (process.env.NODE_ENV !== "production") {
    const totalHeight =
      paddingTop + slicedItems.length * itemHeight + paddingBottom;

    console.log(totalHeight, detectBrowser().maxPixels);

    if (totalHeight > detectBrowser().maxPixels) {
      console.warn(
        "VirtualList: The list's height is too high. The browser might not be able to render the list properly."
      );
    }
  }

  return (
    <div
      ref={listRef}
      style={{
        ...memoizedStyle,
        height: listHeight,
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: style?.padding || 0,
        margin: style?.margin || 0,
      }}
      role="list"
    >
      {startIndex > 0 && <ListPad height={paddingTop} />}
      {slicedItems.map((item, index) => (
        <ListItem
          key={item.key || index}
          item={item}
          renderItem={renderItem}
          itemHeight={itemHeight}
          style={item.style}
        />
      ))}
      {endIndex < items.length && <ListPad height={paddingBottom} />}
    </div>
  );
}
