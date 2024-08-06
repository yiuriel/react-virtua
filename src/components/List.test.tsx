import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PADDED_ELEMENTS } from "../utils/constants";
import { List } from "./List";

describe("List component with vitest", () => {
  it("renders the list items", async () => {
    const items = [
      { key: "", data: { fruit: "apple", id: 1 } },
      { key: "", data: { fruit: "banana", id: 2 } },
      { key: "", data: { fruit: "orange", id: 3 } },
    ];
    const { getByText } = render(
      <List items={items} renderItem={({ data }) => <div>{data.fruit}</div>} />
    );
    expect(await getByText("apple")).toBeInTheDocument();
    expect(await getByText("banana")).toBeInTheDocument();
    expect(await getByText("orange")).toBeInTheDocument();
  });

  it("renders only the visible + padded (3 by default) items", async () => {
    const itemHeight = 20;
    const listHeight = 200;

    const itemsArray = Array.from({ length: 100 }, (_, index) => ({
      key: index.toString(),
      data: {
        fruit: Math.random().toString(36).substring(7),
        id: index,
      },
    }));
    const { getAllByRole } = render(
      <List
        items={itemsArray}
        itemHeight={itemHeight}
        listHeight={listHeight}
        renderItem={({ data }) => (
          <div style={{ width: "200px" }}>
            {data.fruit} - {data.id}
          </div>
        )}
      />
    );
    const visibleItems = getAllByRole("listitem");
    expect(visibleItems.length).toBeLessThanOrEqual(
      listHeight / itemHeight + PADDED_ELEMENTS
    );
  });
});
