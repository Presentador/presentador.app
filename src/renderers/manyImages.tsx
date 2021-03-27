import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  background-color: ${colours.primary};
  color: white;

  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  .image {
    justify-content: center;
    align-items: center;
    display: flex;

    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const itemSize =
    children.length >= 2 && children.length <= 4
      ? "50%"
      : children.length >= 5 && children.length <= 7
      ? "33.3%"
      : children.length > 7
      ? "25%"
      : 0;

  return (
    <Container>
      {children.map((item, index) => (
        <div key={index} className="image" style={{ flex: `${itemSize}` }}>
          {item}
        </div>
      ))}
    </Container>
  );
}
