import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  padding: 1.5em;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export function ImageRenderer({ children }: { children: JSX.Element[] }) {
  const image = children.find((item) => item.type.displayName === "Image");

  if (!image) {
    return <></>;
  }

  return (
    <Container>
      <ImageContainer>{image}</ImageContainer>
    </Container>
  );
}

export const ImageBuilder: Builder = {
  add: (type) => {
    if (type === "heading") return "headerImage";
    if (type === "image") return "manyImages";
    return "normal";
  },
  remove: (type) => {
    return "normal";
  },
};
