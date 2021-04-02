import screenfull from "screenfull";
import { useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { SlidesContext, useSlidesState } from "../context/slides";
import { ThumbnailsContext, useThumbnailsState } from "../context/thumbnails";
import { DeckContext, useDeckState } from "../context/deck";

import Elements from "./Elements";
import Controls from "./Controls";
import Slide from "./Slide";
import LoadingBar from "./LoadingBar";

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
    setSlides,
    addElement,
    removeSlide,
    removeElement,
    changeElementValue,
    addSlide,
  } = useSlidesState();

  const { thumbnails, setThumbnails } = useThumbnailsState();
  const {
    currentSlide,
    setCurrentSlide,
    present,
    setPresent,
    size,
    setSize,
    loading,
    setLoading,
  } = useDeckState();

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
  }, [present]); // eslint-disable-line

  useEffect(() => {
    const callback = (event: any) => {
      if (event.code === "ArrowLeft") {
        setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
      }
      if (event.code === "ArrowRight") {
        const totalSlides = slides.length;
        setCurrentSlide(
          currentSlide === totalSlides - 1 ? currentSlide : currentSlide + 1
        );
      }
    };

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
  }, [currentSlide, slides]); // eslint-disable-line

  return (
    <ThumbnailsContext.Provider value={{ thumbnails, setThumbnails }}>
      <DeckContext.Provider
        value={{
          loading,
          setLoading,
          currentSlide,
          setCurrentSlide,
          present,
          setPresent,
          size,
          setSize,
        }}
      >
        <SlidesContext.Provider
          value={{
            slides,
            setSlides,
            addElement,
            removeElement,
            changeElementValue,
            removeSlide,
            addSlide,
          }}
        >
          <GlobalStyle />
          <LoadingBar />
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
      </DeckContext.Provider>
    </ThumbnailsContext.Provider>
  );
}

export default App;
