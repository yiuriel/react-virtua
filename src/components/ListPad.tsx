import { FC } from "react";
import { ListPadProps } from "../types";

export const ListPad: FC<ListPadProps> = ({ height = 0 }) => {
  return <div style={{ height }} />;
};
