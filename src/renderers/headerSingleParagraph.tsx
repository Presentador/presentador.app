import React from "react";

import "./headerSingleParagraph.scss";

import { Element } from "../types";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.name === "Header");
  const paragraph = children.find((item) => item.type.name === "Paragraph");

  if (!header) {
    return <></>;
  }

  return (
    <>
      <div className="top">{header}</div>
      <div className="bottom">{paragraph}</div>
    </>
  );
}
