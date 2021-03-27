import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  background-color: ${colours.primary};
  color: white;
  padding: 1.5em;
`;

export default function Normal({ children }: { children: JSX.Element[] }) {
  return <Container>{children}</Container>;
}
