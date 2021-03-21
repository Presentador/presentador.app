import React from "react";

import "./image.scss";

import { Element } from "../types";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const image = children.find((item) => item.type.name === "Image");

  if (!image) {
    return <></>;
  }

  return <>{image}</>;
}
