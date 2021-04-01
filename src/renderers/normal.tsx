import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  background-color: white;
  padding: 1.5em;
`;
const BlockContainer = styled.div`
  display: block;
  padding-bottom: 0.5em;

  & > * {
    padding-bottom: 1em;
  }
`;

export function NormalRenderer({ children }: { children: JSX.Element[] }) {
  return (
    <Container>
      {children.map((child, index) => (
        <BlockContainer key={index}>{child}</BlockContainer>
      ))}
    </Container>
  );
}

export const NormalBuilder: Builder = {
  add: (type, elements) => {
    if (type === "heading" && !elements.length) return "singleHeader";
    if (type === "image" && !elements.length) return "image";
    if (type === "blockquote" && !elements.length) return "blockquote";

    return "normal";
  },
  remove: (type, elements) => {
    return "normal";
  },
};
