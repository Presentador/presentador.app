import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  background-color: white;
  padding: 1.5em;

  * {
    display: block;
    padding-bottom: 0.5em;
  }
`;

export function NormalRenderer({ children }: { children: JSX.Element[] }) {
  return <Container>{children}</Container>;
}

export const NormalBuilder: Builder = {
  add: (type, elements) => {
    if (type === "heading") return "singleHeader";
    if (type === "image") return "image";
    if (type === "blockquote") return "blockquote";

    return "normal";
  },
  remove: (type, elements) => {
    return "normal";
  },
};
