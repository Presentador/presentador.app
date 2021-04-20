import { useContext } from "react";
import styled from "styled-components";

import { ReactComponent as FooterIcon } from "bootstrap-icons/icons/align-bottom.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";

const Container = styled.div`
  display: inline-block;
`;

function Footer() {
  const { currentSlide, addElement } = useContext(SlidesContext);

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
