import React from "react";

import "./singleHeader.scss";

import { Element } from "../types";

export default function SingleHeader({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.name === "Header");

  if (!header) {
    return <></>;
  }

  return <div className="container">{children}</div>;
}
