import { ListItemProps } from "../types";

export function ListItem<T>({
  item,
  renderItem,
  itemHeight,
  style,
}: ListItemProps<T>) {
  return (
    <div key={item.key} style={{ ...style, height: `${itemHeight}px` }}>
      {renderItem(item)}
    </div>
  );
}
