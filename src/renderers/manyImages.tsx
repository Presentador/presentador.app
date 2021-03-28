import styled from "styled-components";

import { Builder } from "../types";
import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  background-color: ${colours.primary};
  color: white;
  padding: 1.5em;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  .image {
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 0.5em;

    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

export function ManyImagesRenderer({ children }: { children: JSX.Element[] }) {
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

export const ManyImagesBuilder: Builder = {
  add: (type) => {
    if (type === "image") return "manyImages";
    return "normal";
  },
  remove: (type: string) => {
    return "normal";
  },
};
