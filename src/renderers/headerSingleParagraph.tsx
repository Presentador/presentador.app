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
    flex: 2;

    p {
      color: ${colours.lightText};
    }
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const paragraph = children.find(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <div className="top">{header}</div>
      <div className="bottom">{paragraph}</div>
    </Container>
  );
}
