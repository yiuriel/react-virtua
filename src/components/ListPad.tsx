import { FC } from "react";
import { ListPadProps } from "../types";

export const ListPad: FC<ListPadProps> = ({ height }) => {
  return <div style={{ height }} />;
};
