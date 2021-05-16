import { useContext } from "react";

import styled from "styled-components";

import { DeckContext } from "../context/deck";
import { SlidesContext } from "../context/slides";

const StyledProgressBarContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 0.5em;
  right: 0;
  bottom: 0;
  z-index: 999999999;
`;
const StyledProgressBarItem = styled.div<{ active: boolean }>`
  ${({ active }) => active && `background: #15aabf;`}
  flex: 1;
  height: 100%;
`;

function ProgressBar() {
  const { present } = useContext(DeckContext);
  const { slides, currentSlide } = useContext(SlidesContext);
  return present ? (
    <StyledProgressBarContainer>
      {slides.slice(0, currentSlide + 1).map((item, index) => (
        <StyledProgressBarItem key={index} active={true} />
      ))}
      {slides.slice(currentSlide + 1).map((item, index) => (
        <StyledProgressBarItem key={index} active={false} />
      ))}
    </StyledProgressBarContainer>
  ) : (
    <></>
  );
}

export default ProgressBar;
