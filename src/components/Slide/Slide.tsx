import { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";

import { SlidesContext } from "../../context/slides";
import { DeckContext } from "../../context/deck";

import Header from "./elements/Header";
import Codeblock from "./elements/Codeblock";
import Paragraph from "./elements/Paragraph";
import Image from "./elements/Image";
import List from "./elements/List";
import Blockquote from "./elements/Blockquote";
import FooterItem from "./elements/FooterItem";

import { renderersMap } from "../../renderers";

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

  white-space: normal;

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

function Slide({
  present,
  scale,
  slideNumber,
}: {
  present: boolean;
  scale: number;
  slideNumber: number;
}) {
  const { slides } = useContext(SlidesContext);
  const { colours, size } = useContext(DeckContext);
  const currentSlide = slideNumber;

  const slide = slides[currentSlide];
  const Wrapper = renderersMap[slide.state];

  return (
    <>
      <ThemeProvider theme={colours}>
        <SizeWrapper scaleSize={scale} width={size[0]} height={size[1]}>
          <StyledSlide className={slide.state}>
            <Wrapper>
              {slide.elements
                .filter((item) => item.type !== "footer")
                .map((item) => {
                  switch (item.type) {
                    case "heading": {
                      return (
                        <Header
                          present={present}
                          slideNumber={currentSlide}
                          key={item.id}
                          item={item}
                        />
                      );
                    }
                    case "paragraph": {
                      return (
                        <Paragraph
                          present={present}
                          slideNumber={currentSlide}
                          key={item.id}
                          item={item}
                        />
                      );
                    }
                    case "image": {
                      return (
                        <Image
                          present={present}
                          slideNumber={currentSlide}
                          key={item.id}
                          item={item}
                        />
                      );
                    }
                    case "list": {
                      return (
                        <List
                          present={present}
                          slideNumber={currentSlide}
                          key={item.id}
                          item={item}
                        />
                      );
                    }
                    case "blockquote": {
                      return (
                        <Blockquote
                          present={present}
                          slideNumber={currentSlide}
                          key={item.id}
                          item={item}
                        />
                      );
                    }
                    case "codeblock": {
                      return (
                        <Codeblock
                          present={present}
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
                    present={present}
                    key={item.id}
                    item={item}
                    slideNumber={currentSlide}
                  />
                ))}
            </Footer>
          </StyledSlide>
        </SizeWrapper>
      </ThemeProvider>
    </>
  );
}

export default Slide;
