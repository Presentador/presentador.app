import styled from "styled-components";

import { Builder } from "../types";
import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${colours.lightText};

  blockquote {
    padding: 1em;
    color: ${colours.lightText};
  }
`;

export function BlockquoteRenderer({ children }: { children: JSX.Element[] }) {
  const blockquote = children.find(
    (item) => item.type.displayName === "Blockquote"
  );

  if (!blockquote) {
    return <></>;
  }

  return <Container>{blockquote}</Container>;
}

export const BlockquoteBuilder: Builder = {
  add: (type) => {
    if (type === "paragraph") return "blockquote";
    return "normal";
  },
  remove: (type) => {
    return "normal";
  },
};
