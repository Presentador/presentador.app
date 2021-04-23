import styled from "styled-components";
import { useContext } from "react";
import { ReactComponent as ParagraphIcon } from "bootstrap-icons/icons/text-paragraph.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  display: inline-block;
`;

function Paragraph() {
  const { currentSlide, addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  return (
    <Container>
      <StyledButton
        title="Paragraph"
        onClick={() => {
          const id = new Date().getTime();

          addAction(
            () =>
              addElement(currentSlide, {
                id,
                type: "paragraph",
                value:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              }),
            () => removeElement(currentSlide, id)
          );
        }}
      >
        <ParagraphIcon />
      </StyledButton>
    </Container>
  );
}

export default Paragraph;
