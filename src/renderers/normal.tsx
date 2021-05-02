import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  background-color: white;
  padding: 1.5em;
  color: ${({ theme }) => theme.colours.secondaryNormalText};
  background-color: ${({ theme }) => theme.colours.secondaryBackground};
  display: flex;
  flex-direction: column;
`;
const BlockContainer = styled.div`
  display: block;
  padding-bottom: 0.5em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colours.secondaryHeaderText};
  }

  & > * {
    padding-bottom: 1em;
    max-width: 100%;
  }
`;

export function NormalRenderer({ children }: { children: JSX.Element[] }) {
  return (
    <Container>
      {children.map((child, index) => (
        <BlockContainer
          style={{ flex: `${child.type.displayName === "Image" ? 1 : 0}` }}
          key={index}
        >
          {child}
        </BlockContainer>
      ))}
    </Container>
  );
}

export const NormalBuilder: Builder = {
  add: (type, existingElements) => {
    if (type === "heading" && !existingElements.length) return "singleHeader";
    if (type === "image" && !existingElements.length) return "image";
    if (type === "blockquote" && !existingElements.length) return "blockquote";

    const existingHeading = existingElements.filter(
      (item) => item.type === "heading"
    ).length;
    const existingImage = existingElements.filter(
      (item) => item.type === "image"
    ).length;
    const existingBlockquote = existingElements.filter(
      (item) => item.type === "blockquote"
    ).length;
    const existingParagraph = existingElements.filter(
      (item) => item.type === "paragraph"
    ).length;
    const existingList = existingElements.filter((item) => item.type === "list")
      .length;

    if (existingElements.length === 1) {
      if (type === "heading" && existingHeading === 1) return "twoHeaders";
      if (type === "paragraph" && existingHeading === 1)
        return "headerParagraphs";
      if (type === "list" && existingHeading === 1) return "headerList";
      if (type === "image" && existingHeading === 1) return "headerImage";
      if (type === "heading" && existingList === 1) return "headerList";
      if (type === "heading" && existingImage === 1) return "headerImage";
      if (type === "heading" && existingBlockquote === 1)
        return "headerBlockquote";
      if (type === "blockquote" && existingHeading === 1)
        return "headerBlockquote";
      if (type === "heading" && existingParagraph >= 1)
        return "headerParagraphs";
    }

    if (existingElements.length > 1) {
      if (
        type === "heading" &&
        existingParagraph > 1 &&
        !existingHeading &&
        !existingImage &&
        !existingBlockquote &&
        !existingList
      )
        return "headerParagraphs";

      if (
        type === "heading" &&
        existingParagraph >= 1 &&
        existingImage === 1 &&
        !existingHeading &&
        !existingBlockquote &&
        !existingList
      )
        return "headerParagraphsImage";
    }

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
    if (remainingElements.length === 1 && remainingImage === 1) {
      return "image";
    }
    if (remainingElements.length === remainingImage) {
      return "manyImages";
    }

    if (remainingElements.length === 2 && remainingHeading === 1) {
      if (remainingBlockquote === 1) {
        return "headerBlockquote";
      }
      if (remainingImage === 1) {
        return "headerImage";
      }
      if (remainingParagraph >= 1) {
        return "headerParagraphs";
      }
      if (remainingList === 1) {
        return "headerList";
      }
    }

    if (remainingElements.length > 2 && remainingHeading === 1) {
      if (remainingParagraph > 1) {
        return "headerParagraphs";
      }
    }

    return "normal";
  },
};
