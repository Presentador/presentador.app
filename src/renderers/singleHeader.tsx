import styled from "styled-components";

import { Builder } from "../types";
import { colours } from "../theme";

const Container = styled.div`
  height: 100%;
  background-color: ${colours.primary};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2em;
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
    if (type === "paragraph") return "headerSingleParagraph";
    if (type === "list") return "headerList";
    if (type === "image") return "headerImage";
    if (type === "code_block") return "headerCodeblock";
    if (type === "blockquote") return "headerBlockquote";
    return "normal";
  },
  remove: (type) => {
    return "normal";
  },
};
