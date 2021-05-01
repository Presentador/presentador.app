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
  background-color: ${({ theme }) => theme.colours.primaryBackground};
  color: ${({ theme }) => theme.colours.primaryNormalText};
  flex: 1;
  display: flex;
  align-items: flex-end;

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${({ theme }) => theme.colours.primaryNormalText};
  }
`;
const BottomContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 2;
  padding: 1.5em;
  background-color: ${({ theme }) => theme.colours.secondaryBackground};
`;

const ImageContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
`;

export function HeaderImageRenderer({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{header}</TopContainer>
      <BottomContainer>
        <ImageContainer>{image}</ImageContainer>
      </BottomContainer>
    </Container>
  );
}

export const HeaderImageBuilder: Builder = {
  add: (type) => {
    if (type === "list") return "headerListImage";
    if (type === "paragraph") return "headerParagraphImage";
    return "normal";
  },
  remove: (type) => {
    if (type === "image") return "singleHeader";
    if (type === "heading") return "image";
    return "normal";
  },
};
