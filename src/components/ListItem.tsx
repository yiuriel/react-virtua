import { ListItemProps } from "../types";

export function ListItem<T>({
  item,
  renderItem,
  itemHeight,
}: ListItemProps<T>) {
  return (
    <div key={item.key} style={{ height: `${itemHeight}px` }}>
      {renderItem(item)}
    </div>
  );
}
