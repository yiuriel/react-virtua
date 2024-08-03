import { List } from "./List";

const itemsArray = Array.from({ length: 100000 }, (_, index) => ({
  key: index.toString(),
  data: {
    fruit: Math.random().toString(36).substring(7),
    id: index,
  },
  style: {
    width: "200px",
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
        renderItem={({ data }) => (
          <div>
            {data.fruit} - {data.id}
          </div>
        )}
      />
    </div>
  );
};
