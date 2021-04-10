import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.secondaryNormalText};
  background-color: ${({ theme }) => theme.secondaryBackground};

  blockquote {
    padding: 1em;
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
    if (type === "heading") return "headerBlockquote";
    return "normal";
  },
  remove: (type) => {
    return "normal";
  },
};
