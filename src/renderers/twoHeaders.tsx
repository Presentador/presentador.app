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

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const [mainHeader, secondHeader] = children.filter(
    (item) => item.type.displayName === "Header"
  );

  if (!mainHeader) {
    return <></>;
  }

  return (
    <Container>
      <div className="top">{mainHeader}</div>
      <div className="bottom">{secondHeader}</div>
    </Container>
  );
}
