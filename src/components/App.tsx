import { List } from "./List";

export const App = () => {
  const itemsArray = Array.from({ length: 100000 }, (_, index) => ({
    key: index.toString(),
    data: {
      fruit: "apple",
      id: index,
    },
  }));
  return (
    <List
      items={itemsArray}
      itemHeight={20}
      throttle
      throttleDelay={200}
      renderItem={({ data }) => (
        <div style={{ width: "200px" }}>
          {data.fruit} - {data.id}
        </div>
      )}
    />
  );
};
