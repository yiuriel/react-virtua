### react virtua

small react library to display really long virtualized lists


### List Component Props

| Prop        | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| items       | `T[]`                   | The array of items to be displayed in the list.                                                                                                                                                                                                                                                                                                                                                                         |
| renderItem  | `(item: ListItem<T>) => JSX.Element` | A function that transforms each item in the items array into a JSX element to be rendered in the list.                                                                                                                                                                                                                                                                                                                         |
| itemHeight  | `number`                | The height in pixels of each item in the list. This is used to calculate the height of the list and to set the height of each item in the list.                                                                                                                                                                                                                                                                                         |
| listHeight? | `number`                | The height in pixels of the list. This is used to calculate how many items should be rendered at a time. If the list is shorter than the listHeight, the list will not show any padding. If the list is taller than the listHeight, the list will show a padding at the top and bottom.                                                                                                                                |
| onScroll?   | `(startIndex: number, endIndex: number) => void` | An optional callback function that is called when the user scrolls the list. This function receives two parameters: the index of the first item shown in the list and the index of the last item shown in the list. If the list is shorter than the listHeight, the startIndex will be 0 and the endIndex will be the length of the items array minus one. If the list is taller than the listHeight, the startIndex and endIndex will change as the user scrolls. |
| throttle?  | `boolean`               | A boolean that, when set to true, throttles the scroll event to fire less frequently. This can be useful in cases where the scroll event is being fired many times per second and causing performance issues.                                                                                                                                                                                                                                   |
| throttleDelay? | `number`                | The number of milliseconds to wait before firing the scroll event after the user has stopped scrolling. This is only used if throttle is set to true.                                                                                                                                                                                                                                                                                        |

react usage example:
```javascript
import { List } from "./List";

const itemsArray = Array.from({ length: 100000 }, (_, index) => ({
  key: index.toString(),
  data: {
    fruit: Math.random().toString(36).substring(7),
    id: index,
  },
}));

export const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <List
        items={itemsArray}
        itemHeight={20}
        throttle
        listHeight={window.innerHeight}
        renderItem={(item) => (
          <div>
            {item.data.fruit} - {item.data.id}
          </div>
        )}
      />
    </div>
  );
};
```