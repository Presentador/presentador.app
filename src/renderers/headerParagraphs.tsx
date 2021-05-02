import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopContainer = styled.div`
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.3);
  padding: 1.5em;
  color: ${({ theme }) => theme.colours.primaryNormalText};
  background-color: ${({ theme }) => theme.colours.primaryBackground};
  flex: 1;
  display: flex;
  align-items: flex-end;

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: white;
  }
`;
const BottomContainer = styled.div`
  flex: 2;
  padding: 1.5em;
  color: ${({ theme }) => theme.colours.secondaryNormalText};
  background-color: ${({ theme }) => theme.colours.secondaryBackground};
  p {
    padding-bottom: 0.5em;
  }
`;

export function HeaderParagraphsRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const paragraphs = children.filter(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{header}</TopContainer>
      <BottomContainer>{paragraphs}</BottomContainer>
    </Container>
  );
}

export const HeaderParagraphsBuilder: Builder = {
  add: (type) => {
    if (type === "paragraph") return "headerParagraphs";
    if (type === "image") return "headerParagraphsImage";
    return "normal";
  },
  remove: (type, remainingElements) => {
    const remainingParagraphs = remainingElements.filter(
      (item) => item.type === "paragraph"
    ).length;
    if (type === "paragraph" && remainingParagraphs >= 1)
      return "headerParagraphs";
    if (type === "paragraph" && remainingParagraphs === 0)
      return "singleHeader";

    return "normal";
  },
};
