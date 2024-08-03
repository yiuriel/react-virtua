export type ListItem<T> = {
  data: T;
  key?: string;
  style?: React.CSSProperties;
};

export type ListProps<T> = {
  items: ListItem<T>[];
  renderItem: (item: ListItem<T>) => JSX.Element;
  itemHeight?: number;
  listHeight?: number;
  onScroll?: (startIndex: number, endIndex: number) => void;
  throttle?: boolean;
  throttleDelay?: number;
  style?: React.CSSProperties;
};

export type ListItemProps<T> = {
  item: ListItem<T>;
  renderItem: (item: ListItem<T>) => JSX.Element;
  itemHeight?: number;
  style?: React.CSSProperties;
};

export type ListPadProps = {
  height?: number;
};
