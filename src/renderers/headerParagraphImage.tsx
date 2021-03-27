import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      flex: 1;
      color: ${colours.darkText};
    }

    p {
      color: ${colours.lightText};
      flex: 1;
    }
  }

  .right {
    background-color: ${colours.primary};
    flex: 1;
    align-items: center;
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
    }
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");
  const paragraph = children.find(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <div className="left">
        {header}
        {paragraph}
      </div>
      <div className="right">{image}</div>
    </Container>
  );
}
