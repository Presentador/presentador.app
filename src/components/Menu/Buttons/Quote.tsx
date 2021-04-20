import styled from "styled-components";
import { useContext } from "react";

import { ReactComponent as BlockquoteIcon } from "bootstrap-icons/icons/blockquote-left.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";

const Container = styled.div`
  display: inline-block;
`;

function Quote() {
  const { currentSlide, addElement } = useContext(SlidesContext);

  return (
    <Container>
      <StyledButton
        title="Quote"
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "blockquote",
            value: "A wise man once said...",
          })
        }
      >
        <BlockquoteIcon />
      </StyledButton>
    </Container>
  );
}

export default Quote;
