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

    ul,
    li {
      color: ${colours.lightText};
      list-style-type: circle;
      @include margin-left(1rem);

      li {
        @include margin-bottom(1rem);
      }
    }
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const list = children.find((item) => item.type.displayName === "List");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <div className="top">{header}</div>
      <div className="bottom">{list}</div>
    </Container>
  );
}
