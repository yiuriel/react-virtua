export type StyledListItem = {
  style?: React.CSSProperties;
  key: string;
};

export type ListProps<T extends StyledListItem> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  itemHeight?: number;
  listHeight?: number;
  onScroll?: (startIndex: number, endIndex: number) => void;
  throttle?: boolean;
  throttleDelay?: number;
  style?: React.CSSProperties;
};

export type ListItemProps<T extends { style?: React.CSSProperties }> = {
  item: T;
  renderItem: (item: T) => JSX.Element;
  itemHeight?: number;
  style?: React.CSSProperties;
};

export type ListPadProps = {
  height?: number;
};

export enum BrowserName {
  unknown = "unknown",
  chrome = "chrome",
  firefox = "firefox",
  safari = "safari",
  edge = "edge",
}

export type BrowserMaxHeights = {
  [key in BrowserName]: number;
};

export interface BrowserInfo {
  name: BrowserName;
  maxPixels: number;
}
