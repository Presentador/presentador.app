import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  color: ${({ theme }) => theme.colours.secondaryNormalText};
  background-color: ${({ theme }) => theme.colours.secondaryBackground};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    flex: 1;
    color: ${({ theme }) => theme.colours.secondaryHeaderText};
  }

  p {
    color: ${({ theme }) => theme.colours.secondaryNormalText};
    flex: 1;
  }
`;
const RightContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  padding: 1.5em;
  color: ${({ theme }) => theme.colours.secondaryNormalText};
  background-color: ${({ theme }) => theme.colours.secondaryBackground};
`;

const ImageContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

export function HeaderParagraphImageRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");
  const paragraph = children.find(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <LeftContainer>
        {header}
        {paragraph}
      </LeftContainer>
      <RightContainer>
        <ImageContainer>{image}</ImageContainer>
      </RightContainer>
    </Container>
  );
}

export const HeaderParagraphImageBuilder: Builder = {
  add: (type) => {
    if (type === "paragraph") return "headerManyParagraphsImage";
    return "normal";
  },
  remove: (type) => {
    if (type === "paragraph") return "headerImage";
    if (type === "image") return "headerSingleParagraph";
    return "normal";
  },
};
