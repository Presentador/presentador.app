import styled from "styled-components";

import { Builder } from "../types";
import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopContainer = styled.div`
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.3);

  padding: 1.5em;
  background-color: ${colours.primary};
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

  p {
    color: ${colours.lightText};
  }
`;

export function HeaderSingleParagraphRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const paragraph = children.find(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{header}</TopContainer>
      <BottomContainer>{paragraph}</BottomContainer>
    </Container>
  );
}

export const HeaderSingleParagraphBuilder: Builder = {
  add: (type) => {
    if (type === "paragraph") return "headerManyParagraphs";
    if (type === "image") return "headerParagraphImage";
    return "normal";
  },
  remove: (type) => {
    if (type === "heading") return "normal";
    if (type === "paragraph") return "singleHeader";
    return "normal";
  },
};
