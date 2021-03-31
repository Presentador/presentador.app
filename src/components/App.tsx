import screenfull from "screenfull";
import { useRef, useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { SlidesContext, useSlidesState } from "../context/slides";
import { ThumbnailsContext, useThumbnailsState } from "../context/thumbnails";

import Elements from "./Elements";
import Controls from "./Controls";
import Slide from "./Slide";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: "Roboto", sans-serif;
  }
`;

const Wrapper = styled.div`
  background: #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SlideWrapper = styled.div`
  flex: 1;
`;

function App() {
  const slideWrapperRef = useRef<HTMLDivElement>(null);

  const {
    slides,
    currentSlide,
    addElement,
    changeCurrentSlide,
    removeSlide,
    removeElement,
    changeElementValue,
    addSlide,
  } = useSlidesState();

  const { thumbnails, setThumbnails } = useThumbnailsState();

  const [present, setPresent] = useState(false);

  useEffect(() => {
    const callback = () => {
      if (screenfull.isEnabled) {
        if (!screenfull.isFullscreen) {
          setPresent(false);
        }
      }
    };
    if (screenfull.isEnabled) {
      screenfull.on("change", callback);
    }
    const unsubscribe = () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", callback);
      }
    };
    return unsubscribe;
  }, [present]);

  useEffect(() => {
    const callback = (event: any) => {
      if (event.code === "ArrowLeft") {
        changeCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
      }
      if (event.code === "ArrowRight") {
        const totalSlides = slides.length;
        changeCurrentSlide(
          currentSlide === totalSlides - 1 ? currentSlide : currentSlide + 1
        );
      }
    };

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
  }, [currentSlide, slides]); // eslint-disable-line

  return (
    <ThumbnailsContext.Provider value={{ thumbnails, setThumbnails }}>
      <SlidesContext.Provider
        value={{
          slides,
          currentSlide,
          addElement,
          removeElement,
          changeElementValue,
          removeSlide,
          addSlide,
          changeCurrentSlide,
        }}
      >
        <GlobalStyle />
        <Wrapper>
          {!present && (
            <Elements
              togglePresent={() => {
                setPresent(!present);
                if (screenfull.isEnabled) {
                  screenfull.request();
                }
              }}
            />
          )}
          <SlideWrapper>
            <Slide present={present} ref={slideWrapperRef} />
          </SlideWrapper>
          {!present && <Controls ref={slideWrapperRef} />}
        </Wrapper>
      </SlidesContext.Provider>
    </ThumbnailsContext.Provider>
  );
}

export default App;
