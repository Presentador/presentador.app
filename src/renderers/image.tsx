import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
`;

const ImageContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const image = children.find((item) => item.type.displayName === "Image");

  if (!image) {
    return <></>;
  }

  return (
    <Container>
      <ImageContainer>{image}</ImageContainer>
    </Container>
  );
}
