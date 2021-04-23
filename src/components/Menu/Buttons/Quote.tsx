import styled from "styled-components";
import { useContext } from "react";

import { ReactComponent as BlockquoteIcon } from "bootstrap-icons/icons/blockquote-left.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  display: inline-block;
`;

function Quote() {
  const { currentSlide, addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  return (
    <Container>
      <StyledButton
        title="Quote"
        onClick={() => {
          const id = new Date().getTime();

          addAction(
            () =>
              addElement(currentSlide, {
                id: new Date().getTime(),
                type: "blockquote",
                value: "A wise man once said...",
              }),
            () => removeElement(currentSlide, id)
          );
        }}
      >
        <BlockquoteIcon />
      </StyledButton>
    </Container>
  );
}

export default Quote;
