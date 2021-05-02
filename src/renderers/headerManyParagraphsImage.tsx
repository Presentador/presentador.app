import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftContainer = styled.div`
  padding: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colours.primaryNormalText};
  background-color: ${({ theme }) => theme.colours.primaryBackground};
  color: white;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    flex: 1;
    color: ${({ theme }) => theme.colours.primaryHeaderText};
  }

  .paragraphs {
    color: ${({ theme }) => theme.colours.primaryNormalText};
    flex: 2;
  }
`;
const RightContainer = styled.div`
  flex: 2;
  padding: 1.5em;
  color: ${({ theme }) => theme.colours.secondaryNormalText};
  background-color: ${({ theme }) => theme.colours.secondaryBackground};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export function HeaderManyParagraphsImageRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");
  const paragraphs = children.filter(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <LeftContainer>
        {header}
        <div className="paragraphs">{paragraphs}</div>
      </LeftContainer>
      <RightContainer>{image}</RightContainer>
    </Container>
  );
}

export const HeaderManyParagraphsImageBuilder: Builder = {
  add: (type) => {
    if (type === "paragraph") return "headerManyParagraphs";
    if (type === "image") return "headerManyParagraphsImage";
    return "normal";
  },
  remove: (type, remainingElements) => {
    const remainingParagraphs = remainingElements.filter(
      (item) => item.type === "paragraph"
    ).length;
    if (type === "paragraph" && remainingParagraphs === 1)
      return "headerParagraphImage";
    if (type === "paragraph" && remainingParagraphs > 1)
      return "headerManyParagraphsImage";
    if (type === "image") return "headerManyParagraphs";
    return "normal";
  },
};
