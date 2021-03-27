import styled from "styled-components";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const image = children.find((item) => item.type.displayName === "Image");

  if (!image) {
    return <></>;
  }

  return <Container>{image}</Container>;
}
