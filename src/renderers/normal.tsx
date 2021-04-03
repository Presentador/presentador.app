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
    max-width: 100%;
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
  add: (type, existingElements) => {
    if (type === "heading" && !existingElements.length) return "singleHeader";
    if (type === "image" && !existingElements.length) return "image";
    if (type === "blockquote" && !existingElements.length) return "blockquote";

    return "normal";
  },
  remove: (type, remainingElements) => {
    const remainingHeading = remainingElements.filter(
      (item) => item.type === "heading"
    ).length;
    const remainingImage = remainingElements.filter(
      (item) => item.type === "image"
    ).length;
    const remainingBlockquote = remainingElements.filter(
      (item) => item.type === "blockquote"
    ).length;
    const remainingParagraph = remainingElements.filter(
      (item) => item.type === "paragraph"
    ).length;
    const remainingList = remainingElements.filter(
      (item) => item.type === "list"
    ).length;

    if (remainingElements.length === 2 && remainingHeading === 2) {
      return "twoHeaders";
    }
    if (remainingElements.length === 1 && remainingBlockquote === 1) {
      return "blockquote";
    }
    if (remainingElements.length === 1 && remainingHeading === 1) {
      return "singleHeader";
    }

    if (remainingElements.length === 2 && remainingHeading === 1) {
      if (remainingBlockquote === 1) {
        return "headerBlockquote";
      }
      if (remainingImage === 1) {
        return "headerImage";
      }
      if (remainingParagraph === 1) {
        return "headerSingleParagraph";
      }
      if (remainingList === 1) {
        return "headerList";
      }
    }

    if (remainingElements.length > 2 && remainingHeading === 1) {
      if (remainingParagraph > 1) {
        return "headerManyParagraphs";
      }
    }

    return "normal";
  },
};
