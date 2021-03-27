import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  background-color: white;
  padding: 1.5em;

  * {
    display: block;
    padding-bottom: 0.5em;
  }
`;

export default function Normal({ children }: { children: JSX.Element[] }) {
  return <Container>{children}</Container>;
}
