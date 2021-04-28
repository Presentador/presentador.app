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
  h5,
  h6 {
    color: ${({ theme }) => theme.colours.primaryHeaderText};
  }
`;
const BottomContainer = styled.div`
  flex: 2;
  padding: 1.5em;
  font-size: 1.1em;
  background-color: ${({ theme }) => theme.colours.secondaryBackground};
  color: ${({ theme }) => theme.colours.secondaryNormalText};
  line-height: 2em;
`;

export function HeaderListRenderer({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const list = children.find((item) => item.type.displayName === "List");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{header}</TopContainer>
      <BottomContainer>{list}</BottomContainer>
    </Container>
  );
}

export const HeaderListBuilder: Builder = {
  add: (type) => {
    if (type === "image") return "headerListImage";
    return "normal";
  },
  remove: (type) => {
    if (type === "list") return "singleHeader";
    return "normal";
  },
};
