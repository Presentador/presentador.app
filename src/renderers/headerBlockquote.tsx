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
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 2;
  padding: 1.5em;

  blockquote {
    color: ${({ theme }) => theme.colours.secondaryNormalText};

    &:before {
      color: ${({ theme }) => theme.colours.secondaryNormalText};
    }
  }
`;

export function HeaderBlockquoteRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const blockquote = children.find(
    (item) => item.type.displayName === "Blockquote"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{header}</TopContainer>
      <BottomContainer>{blockquote}</BottomContainer>
    </Container>
  );
}

export const HeaderBlockquoteBuilder: Builder = {
  add: (type) => {
    return "normal";
  },
  remove: (type) => {
    if (type === "blockquote") return "singleHeader";
    if (type === "heading") return "blockquote";
    return "normal";
  },
};
