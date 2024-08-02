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

export function List<T>({
  items,
  renderItem,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  listHeight = DEFAULT_LIST_HEIGHT,
  onScroll,
  throttle = false,
  throttleDelay = 0,
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
    const end = start + Math.ceil(clientHeight / itemHeight) + 1;

    setStartIndex(start > 0 ? start - PADDED_ELEMENTS : 0);
    setEndIndex(end);

    if (onScroll) onScroll(start, end);
  }, [itemHeight, onScroll]);

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
    >
      {startIndex > 0 && <ListPad height={itemHeight * startIndex} />}
      {items.slice(startIndex, endIndex).map((item) => (
        <ListItem
          key={item.key}
          item={item}
          renderItem={renderItem}
          itemHeight={itemHeight}
          style={item.style}
        />
      ))}
      {endIndex < items.length && (
        <ListPad height={itemHeight * (items.length - endIndex)} />
      )}
    </div>
  );
}
