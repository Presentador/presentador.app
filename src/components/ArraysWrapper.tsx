import { useContext } from "react";
import styled from "styled-components";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";

import { ReactComponent as LeftIcon } from "../left.svg";
import { ReactComponent as RightIcon } from "../right.svg";

const Container = styled.div`
  width: 1020px;
  height: 700px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform-origin: center center;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const LeftContainer = styled.div`
  position: absolute;
  top: 50%;
  color: rgba(0, 0, 0, 0.5);
`;
const RightContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  color: rgba(0, 0, 0, 0.5);
`;

function ArraysWrapper() {
  const { slides } = useContext(SlidesContext);
  const { currentSlide } = useContext(DeckContext);

  return (
    <Container>
      <InnerContainer>
        <LeftContainer>{currentSlide !== 0 && <LeftIcon />}</LeftContainer>
        <RightContainer>
          {currentSlide !== slides.length - 1 && <RightIcon />}
        </RightContainer>
      </InnerContainer>
    </Container>
  );
}

export default ArraysWrapper;
