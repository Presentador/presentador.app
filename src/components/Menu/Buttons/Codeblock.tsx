import styled from "styled-components";
import { useContext } from "react";
import { ReactComponent as CodeblockIcon } from "bootstrap-icons/icons/text-paragraph.svg";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";

import StyledButton from "../StyledButton";

const Container = styled.div`
  display: inline-block;
`;

function Codeblock() {
  const { addElement } = useContext(SlidesContext);
  const { currentSlide } = useContext(DeckContext);

  return (
    <Container>
      <StyledButton
        title="Codeblock"
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "codeblock",
            value: "function main() { }",
          })
        }
      >
        <CodeblockIcon />
      </StyledButton>
    </Container>
  );
}

export default Codeblock;
