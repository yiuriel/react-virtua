import { useState, useRef, useCallback, useEffect } from "react";

export type ListItem<T> = {
  data: T;
  key: string;
};

type ListProps<T> = {
  items: ListItem<T>[];
  renderItem: (item: ListItem<T>) => JSX.Element;
  itemHeight?: number;
  listHeight?: number;
};

const DEFAULT_LIST_HEIGHT = 300;

const DEFAULT_ITEM_HEIGHT = 50;

const PADDED_ELEMENTS = 5;

export function List<T>({
  items,
  renderItem,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  listHeight = DEFAULT_LIST_HEIGHT,
}: ListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);

  const elementsToRender = Math.ceil(listHeight / itemHeight) + PADDED_ELEMENTS;

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(elementsToRender);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight } = listRef.current!;

    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.ceil(clientHeight / itemHeight) + 1;

    setStartIndex(start);
    setEndIndex(end);
  }, [itemHeight]);

  useEffect(() => {
    const list = listRef.current!;
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={listRef}
      style={{
        height: DEFAULT_LIST_HEIGHT,
        width: "100%",
        overflowY: "auto",
        padding: 0,
        margin: 0,
      }}
    >
      {startIndex > 0 && <div style={{ height: itemHeight * startIndex }} />}
      {items.slice(startIndex, endIndex).map((item) => (
        <div key={item.key} style={{ height: `${itemHeight}px` }}>
          {renderItem(item)}
        </div>
      ))}
      {endIndex < items.length && (
        <div style={{ height: itemHeight * (items.length - endIndex) }} />
      )}
    </div>
  );
}
