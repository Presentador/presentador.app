import { useLayoutEffect, useState, useContext, forwardRef } from "react";
import styled from "styled-components";

import { Context } from "../context";

import Header from "./elements/Header";
import Paragraph from "./elements/Paragraph";
import Image from "./elements/Image";
import List from "./elements/List";
import Blockquote from "./elements/Blockquote";

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
  transform-origin: left center;
  transform: ${({ scaleSize }) => `scale(${scaleSize})`};
`;

const FlexWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const AspectRatioWrapper = styled.div`
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  position: relative;
`;

const StyledSlide = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: white;

  a {
    color: #51c2f7;
  }

  ul {
    list-style-type: circle;
  }

  :root {
    // taken from https://websemantics.uk/tools/responsive-font-calculator/
    font-size: calc(1rem + ((1vw - 0.48rem) * 0.6944));
    padding: calc(1rem + ((1vw - 0.48rem) * 0.6944));
    min-height: 0vw;
  }
`;

function Slide(_: any, ref: any) {
  const { getCurrentSlide, getElementsForSlide } = useContext(Context);
  const [size, setSize] = useState(1);

  const Wrapper = renderersMap[getCurrentSlide().state];

  useLayoutEffect(() => {
    function updateSize() {
      const scale = Math.min(window.innerWidth / 960, window.innerHeight / 700);
      if (scale > 1) {
        return;
      }
      setSize(scale);
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <SizeWrapper scaleSize={size}>
      <FlexWrapper>
        <AspectRatioWrapper>
          <StyledSlide className={getCurrentSlide().state} ref={ref}>
            <Wrapper>
              {getElementsForSlide(getCurrentSlide().number).map((item) => {
                switch (item.type) {
                  case "heading": {
                    return <Header key={item.id} itemId={item.id} />;
                  }
                  case "paragraph": {
                    return <Paragraph key={item.id} itemId={item.id} />;
                  }
                  case "image": {
                    return <Image key={item.id} itemId={item.id} />;
                  }
                  case "list": {
                    return <List key={item.id} itemId={item.id} />;
                  }
                  case "blockquote": {
                    return <Blockquote key={item.id} itemId={item.id} />;
                  }
                  default: {
                    return <></>;
                  }
                }
              })}
            </Wrapper>
          </StyledSlide>
        </AspectRatioWrapper>
      </FlexWrapper>
    </SizeWrapper>
  );
}

export default forwardRef<HTMLDivElement>(Slide);
