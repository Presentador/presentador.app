import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  background-color: ${colours.primary};
  color: white;

  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
  }

  .container {
  }
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
