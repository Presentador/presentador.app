import styled from "styled-components";

import { colours } from "../theme";

const Container = styled.div`
  background-color: ${colours.primary};
  color: white;
  min-height: 100%;
  padding: 1.5em;
`;

export default function Normal({ children }: { children: JSX.Element[] }) {
  return <Container>{children}</Container>;
}
