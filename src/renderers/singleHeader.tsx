import styled from "styled-components";

import { Builder } from "../types";

const Container = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.colours.primaryNormalText};
  background-color: ${({ theme }) => theme.colours.primaryBackground};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colours.primaryHeaderText};
  }
`;

export function SingleHeaderRenderer({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");

  if (!header) {
    return <></>;
  }

  return (
    <Container>
      <div className="container">{children}</div>
    </Container>
  );
}
export const SingleHeaderBuilder: Builder = {
  add: (type) => {
    if (type === "heading") return "twoHeaders";
    if (type === "paragraph") return "headerParagraphs";
    if (type === "list") return "headerList";
    if (type === "image") return "headerImage";
    if (type === "codeblock") return "headerCodeblock";
    if (type === "blockquote") return "headerBlockquote";
    return "normal";
  },
  remove: (type) => {
    return "normal";
  },
};
