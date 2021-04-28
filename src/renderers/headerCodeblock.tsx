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
    color: ${({ theme }) => theme.colours.primaryHeaderText};
  }
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 2;
  padding: 1.5em;

  pre {
    display: block;
    width: 100%;
    height: 100%;

    code {
      height: 100%;
    }
  }
`;

export function HeaderCodeblockRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const codeblock = children.find(
    (item) => item.type.displayName === "Codeblock"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{header}</TopContainer>
      <BottomContainer>{codeblock}</BottomContainer>
    </Container>
  );
}

export const HeaderCodeblockBuilder: Builder = {
  add: (type) => {
    return "normal";
  },
  remove: (type) => {
    if (type === "codeblock") return "singleHeader";
    return "normal";
  },
};
