import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  background-color: ${colours.primary};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopContainer = styled.div`
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.3);
  padding: 1.5em;
`;
const BottomContainer = styled.div`
  padding: 1.5em;
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
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
