import React from "react";

import "./headerImage.scss";

import { Element } from "../types";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.name === "Header");
  const image = children.find((item) => item.type.name === "Image");

  if (!header) {
    return <></>;
  }

  return (
    <>
      <div className="top">{header}</div>
      <div className="bottom">{image}</div>
    </>
  );
}
