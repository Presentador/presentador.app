import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  background-color: ${colours.primary};
  color: white;

  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .top {
  }

  .bottom {
  }
`;

const TopContainer = styled.div`
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.3);
`;
const BottomContainer = styled.div``;

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
