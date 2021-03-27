import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  background-color: ${colours.primary};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2em;
`;

export default function SingleHeader({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <div className="container">{children}</div>
    </Container>
  );
}
