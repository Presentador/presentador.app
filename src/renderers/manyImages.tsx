import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.colours.primaryNormalText};
  background-color: ${({ theme }) => theme.colours.primaryBackground};
  color: white;
  padding: 1.5em;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 0.5em;
  position: relative;

  & > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export function ManyImagesRenderer({ children }: { children: JSX.Element[] }) {
  const itemSize =
    children.length >= 2 && children.length <= 4
      ? "50%"
      : children.length >= 5 && children.length <= 7
      ? "33.3%"
      : children.length > 7
      ? "25%"
      : 0;

  return (
    <Container>
      {children.map((item, index) => (
        <ImageContainer key={index} style={{ flex: `${itemSize}` }}>
          {item}
        </ImageContainer>
      ))}
    </Container>
  );
}

export const ManyImagesBuilder: Builder = {
  add: (type) => {
    if (type === "image") return "manyImages";
    return "normal";
  },
  remove: (type: string, remainingElements) => {
    if (remainingElements.length > 1) {
      return "manyImages";
    }
    if (remainingElements.length === 1) {
      return "image";
    }
    return "normal";
  },
};
