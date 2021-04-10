import { useContext } from "react";
import styled from "styled-components";

import { ReactComponent as FooterIcon } from "bootstrap-icons/icons/align-bottom.svg";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";

import StyledButton from "../StyledButton";

const Container = styled.div`
  display: inline-block;
`;

function Footer() {
  const { addElement } = useContext(SlidesContext);
  const { currentSlide } = useContext(DeckContext);

  return (
    <Container>
      <StyledButton
        title="Footer item"
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "footer",
            value: "Made with Presentador",
          })
        }
      >
        <FooterIcon />
      </StyledButton>
    </Container>
  );
}

export default Footer;
