import { useContext } from "react";
import styled from "styled-components";

import { ReactComponent as FooterIcon } from "bootstrap-icons/icons/align-bottom.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  display: inline-block;
`;

function Footer() {
  const { currentSlide, addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  return (
    <Container>
      <StyledButton
        data-tooltip="Footer item"
        onClick={() => {
          const id = new Date().getTime();
          addAction(
            () =>
              addElement(currentSlide, {
                id,
                type: "footer",
                value: "Made with Presentador",
              }),
            () => removeElement(currentSlide, id)
          );
        }}
      >
        <FooterIcon />
      </StyledButton>
    </Container>
  );
}

export default Footer;
