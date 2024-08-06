import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";
import type { ListProps, StyledListItem } from "../types";
import {
  DEFAULT_ITEM_HEIGHT,
  DEFAULT_LIST_HEIGHT,
  PADDED_ELEMENTS,
} from "../utils/constants";
import { detectBrowser } from "../utils/helpers";
import { ListItem } from "./ListItem";
import { ListPad } from "./ListPad";

export function List<T>({
  items,
  renderItem,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  listHeight = DEFAULT_LIST_HEIGHT,
  onScroll,
  throttle = false,
  throttleDelay = 50,
  style,
}: ListProps<T extends StyledListItem ? T : T & StyledListItem>) {
  const listRef = useRef<HTMLDivElement>(null);
  const startIndexRef = useRef(0);
  const endIndexRef = useRef(
    Math.ceil(listHeight / itemHeight) + PADDED_ELEMENTS
  );

  const throttleHook = useThrottle();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setScrollTop] = useState(0);

  const handleScroll = useCallback(() => {
    console.log("handleScroll");

    if (!listRef.current) return;

    const { scrollTop, clientHeight } = listRef.current;

    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.ceil(clientHeight / itemHeight);

    startIndexRef.current =
      start > 0
        ? start - PADDED_ELEMENTS > 0
          ? start - PADDED_ELEMENTS
          : start
        : 0;
    endIndexRef.current =
      end < items.length
        ? end + PADDED_ELEMENTS < items.length
          ? end + PADDED_ELEMENTS
          : end
        : items.length;

    setScrollTop(scrollTop);

    if (onScroll) onScroll(startIndexRef.current, endIndexRef.current);
  }, [itemHeight, items.length, onScroll]);

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

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    list.addEventListener("scroll", throttledScrollCallback);
    return () => {
      list.removeEventListener("scroll", throttledScrollCallback);
    };
  }, [throttledScrollCallback]);

  const paddingTop = itemHeight * startIndexRef.current;
  const paddingBottom = itemHeight * (items.length - endIndexRef.current);

  const slicedItems = items.slice(startIndexRef.current, endIndexRef.current);

  if (process.env.NODE_ENV !== "production") {
    const totalHeight =
      paddingTop + slicedItems.length * itemHeight + paddingBottom;

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
        willChange: "scroll-position, contents",
      }}
      role="list"
    >
      {startIndexRef.current > 0 && <ListPad height={paddingTop} />}
      {slicedItems.map((item, index) => (
        <ListItem
          key={`react-virtual-list-item-${index}`}
          item={item}
          renderItem={renderItem}
          itemHeight={itemHeight}
          style={item.style}
        />
      ))}
      {endIndexRef.current < items.length && <ListPad height={paddingBottom} />}
    </div>
  );
}
