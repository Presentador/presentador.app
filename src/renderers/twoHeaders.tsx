import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.colours.primaryNormalText};
  background-color: ${({ theme }) => theme.colours.primaryBackground};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colours.primaryHeaderText};
  }
`;

const TopContainer = styled.div`
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.3);
  padding: 1.5em;
`;
const BottomContainer = styled.div`
  padding: 1.5em;
`;

export function TwoHeadersRenderer({ children }: { children: JSX.Element[] }) {
  const [mainHeader, secondHeader] = children.filter(
    (item) => item.type.displayName === "Header"
  );

  if (!mainHeader) {
    return <></>;
  }

  return (
    <Container>
      <TopContainer>{mainHeader}</TopContainer>
      <BottomContainer>{secondHeader}</BottomContainer>
    </Container>
  );
}
export const TwoHeadersBuilder: Builder = {
  add: (type) => {
    return "normal";
  },
  remove: (type) => {
    return "singleHeader";
  },
};
