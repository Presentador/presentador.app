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
  transform-origin: center center;
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
`;

function Slide({ present }: { present: boolean }, ref: any) {
  const { elements, currentSlide } = useContext(Context);
  const [size, setSize] = useState(1);

  const Wrapper = renderersMap[currentSlide.state];

  function updateSize() {
    // scale to fit window width
    const scale = window.innerWidth / 960;
    setSize(scale);
  }
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <SizeWrapper scaleSize={size > 1 && !present ? 1 : size}>
      <FlexWrapper>
        <AspectRatioWrapper>
          <StyledSlide className={currentSlide.state} ref={ref}>
            <Wrapper>
              {elements
                .filter((item) => item.slide === currentSlide.number)
                .map((item) => {
                  switch (item.type) {
                    case "heading": {
                      return <Header key={item.id} item={item} />;
                    }
                    case "paragraph": {
                      return <Paragraph key={item.id} item={item} />;
                    }
                    case "image": {
                      return <Image key={item.id} item={item} />;
                    }
                    case "list": {
                      return <List key={item.id} item={item} />;
                    }
                    case "blockquote": {
                      return <Blockquote key={item.id} item={item} />;
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

export default forwardRef<HTMLDivElement, { present: boolean }>(Slide);
