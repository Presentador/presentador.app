import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colours.primary};
  color: white;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    flex: 1;
  }

  .paragraphs {
    flex: 2;

    p {
    }
  }
`;
const RightContainer = styled.div`
  flex: 2;
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");
  const paragraphs = children.filter(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <LeftContainer>
        {header}
        <div className="paragraphs">{paragraphs}</div>
      </LeftContainer>
      <RightContainer>{image}</RightContainer>
    </Container>
  );
}
