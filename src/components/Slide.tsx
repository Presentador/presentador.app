import { useLayoutEffect, useState, useContext, forwardRef } from "react";
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

const SizeWrapper = styled.div<{ scaleSize: number }>`
  width: 960px;
  height: 700px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform-origin: center center;
  transform: ${({ scaleSize }) => `scale(${scaleSize})`};
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

function Slide({ present }: { present: boolean }, ref: any) {
  const { slides } = useContext(SlidesContext);
  const { currentSlide, size } = useContext(DeckContext);
  const [scale, setScale] = useState(1);

  const slide = slides[currentSlide];
  const Wrapper = renderersMap[slide.state];

  useLayoutEffect(() => {
    function updateSize() {
      // scale to fit window width and/or height
      const scale = Math.min(
        window.innerWidth / size[0],
        window.innerHeight / size[1]
      );
      setScale(scale);
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [setScale, size]);

  return (
    <>
      <ArraysWrapper />
      <SizeWrapper scaleSize={scale > 1 && !present ? 1 : scale}>
        <StyledSlide className={slide.state} ref={ref}>
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

export default forwardRef<HTMLDivElement, { present: boolean }>(Slide);
