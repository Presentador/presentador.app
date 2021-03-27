import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .top {
    background-color: ${colours.primary};
    flex: 1;
    display: flex;
    align-items: flex-end;

    h1,
    h2,
    h3,
    h4,
    h5 {
      color: white;
    }
  }
  .bottom {
    align-items: center;
    display: flex;
    justify-content: center;
    flex: 2;

    img {
      max-width: 100%;
    }
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <div className="top">{header}</div>
      <div className="bottom">{image}</div>
    </Container>
  );
}
