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

  background: ${({ theme }) => theme.colours.primaryBackground};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    flex: 1;
    color: ${({ theme }) => theme.colours.primaryHeaderText};
    padding-bottom: 0.5em;
  }

  p,
  ul {
    padding-bottom: 0.5em;
    color: ${({ theme }) => theme.colours.primaryNormalText};
    flex: 1;
  }
`;
const RightContainer = styled.div`
  flex: 2;
  padding: 1.5em;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export function HeaderListImageRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const list = children.find((item) => item.type.displayName === "List");
  const image = children.find((item) => item.type.displayName === "Image");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <LeftContainer>
        {header}
        {list}
      </LeftContainer>
      <RightContainer>{image}</RightContainer>
    </Container>
  );
}

export const HeaderListImageBuilder: Builder = {
  add: (type) => {
    return "normal";
  },
  remove: (type) => {
    if (type === "image") return "headerList";
    if (type === "list") return "headerImage";
    return "singleHeader";
  },
};
