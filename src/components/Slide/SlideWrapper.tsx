import { useCallback, useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { DeckContext } from "../../context/deck";

import ArraysWrapper from "./ArraysWrapper";
import Slide from "./Slide";

const SizeWrapper = styled.div<{
  scaleSize: number;
  width: number;
  height: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${({ scaleSize }) => `scale(${scaleSize})`};
`;

function SlideWrapper() {
  const { currentSlide, present, size } = useContext(DeckContext);

  // scale to fit window width and/or height
  const getScale = useCallback(
    () =>
      Math.min(
        (!present
          ? window.innerWidth - window.innerWidth * 0.25
          : window.innerWidth) / size[0],
        (!present
          ? window.innerHeight - window.innerHeight * 0.25
          : window.innerHeight) / size[1]
      ),
    [present, size]
  );

  const [scale, setScale] = useState(getScale());

  useEffect(() => {
    function updateSize() {
      const scale = getScale();
      setScale(scale);
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [setScale, size, getScale]);

  useEffect(() => {
    const scale = getScale();
    setScale(scale);
  }, [setScale, present, getScale]);

  return (
    <>
      <SizeWrapper scaleSize={scale} width={size[0]} height={size[1]}>
        <ArraysWrapper />
      </SizeWrapper>
      <Slide slideNumber={currentSlide} scale={scale} present={false} />
    </>
  );
}

export default SlideWrapper;
