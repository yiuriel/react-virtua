import { ListItemProps, StyledListItem } from "../types";

export function ListItem<T>({
  item,
  renderItem,
  itemHeight,
  style,
}: ListItemProps<T extends StyledListItem ? T : T & StyledListItem>) {
  return (
    <div
      key={item.key}
      style={{ ...style, height: `${itemHeight}px` }}
      role="listitem"
    >
      {renderItem(item)}
    </div>
  );
}
