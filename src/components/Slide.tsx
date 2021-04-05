import {
  useCallback,
  useEffect,
  useState,
  useContext,
  forwardRef,
} from "react";
import styled from "styled-components";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";

import Header from "./elements/Header";
import Paragraph from "./elements/Paragraph";
import Image from "./elements/Image";
import List from "./elements/List";
import Blockquote from "./elements/Blockquote";
import FooterItem from "./elements/FooterItem";
import ArraysWrapper from "./ArraysWrapper";

import { renderersMap } from "../renderers";

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

const StyledSlide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: white;
  width: 100%;
  height: 100%;

  a {
    color: #51c2f7;
  }

  *:focus {
    outline: none;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

function Slide(_: any, ref: any) {
  const { slides } = useContext(SlidesContext);
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

  const slide = slides[currentSlide];
  const Wrapper = renderersMap[slide.state];

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
      <SizeWrapper scaleSize={scale} width={size[0]} height={size[1]} ref={ref}>
        <StyledSlide className={slide.state}>
          <Wrapper>
            {slide.elements
              .filter((item) => item.type !== "footer")
              .map((item) => {
                switch (item.type) {
                  case "heading": {
                    return (
                      <Header
                        slideNumber={currentSlide}
                        key={item.id}
                        item={item}
                      />
                    );
                  }
                  case "paragraph": {
                    return (
                      <Paragraph
                        slideNumber={currentSlide}
                        key={item.id}
                        item={item}
                      />
                    );
                  }
                  case "image": {
                    return (
                      <Image
                        slideNumber={currentSlide}
                        key={item.id}
                        item={item}
                      />
                    );
                  }
                  case "list": {
                    return (
                      <List
                        slideNumber={currentSlide}
                        key={item.id}
                        item={item}
                      />
                    );
                  }
                  case "blockquote": {
                    return (
                      <Blockquote
                        slideNumber={currentSlide}
                        key={item.id}
                        item={item}
                      />
                    );
                  }
                  default: {
                    return <></>;
                  }
                }
              })}
          </Wrapper>
          <Footer>
            {slide.elements
              .filter((item) => item.type === "footer")
              .map((item) => (
                <FooterItem
                  key={item.id}
                  item={item}
                  slideNumber={currentSlide}
                />
              ))}
          </Footer>
        </StyledSlide>
      </SizeWrapper>
    </>
  );
}

export default forwardRef<HTMLDivElement>(Slide);
