import screenfull from "screenfull";
import { useEffect } from "react";
import styled from "styled-components";

import { SlidesContext, useSlidesState } from "../context/slides";
import { DeckContext, useDeckState } from "../context/deck";

import Menu from "./Menu/Menu";
import ThumbnailsBar from "./Thumbnails/ThumbnailsBar";
import Slide from "./Slide/SlideWrapper";
import LoadingBar from "./LoadingBar";

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
  const {
    slides,
    setSlides,
    addElement,
    removeSlide,
    removeElement,
    changeElementValue,
    addSlide,
    currentSlide,
    setCurrentSlide,
    undo,
    redo,
  } = useSlidesState();

  const {
    present,
    setPresent,
    size,
    setSize,
    loading,
    setLoading,
    colours,
    setColours,
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
  }, [present, setPresent]);

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
      if (present && event.code === "Space") {
        const totalSlides = slides.length;
        setCurrentSlide(
          currentSlide === totalSlides - 1 ? currentSlide : currentSlide + 1
        );
      }
    };

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
  }, [currentSlide, slides, setCurrentSlide, present]);

  return (
    <DeckContext.Provider
      value={{
        colours,
        setColours,
        loading,
        setLoading,
        present,
        setPresent,
        size,
        setSize,
      }}
    >
      <SlidesContext.Provider
        value={{
          undo,
          redo,
          currentSlide,
          setCurrentSlide,
          slides,
          setSlides,
          addElement,
          removeElement,
          changeElementValue,
          removeSlide,
          addSlide,
        }}
      >
        <Wrapper>
          <LoadingBar />
          {!present && (
            <Menu
              togglePresent={() => {
                setPresent(!present);
                if (screenfull.isEnabled) {
                  screenfull.request();
                }
              }}
            />
          )}
          <SlideWrapper>
            <Slide />
          </SlideWrapper>
          {!present && <ThumbnailsBar />}
        </Wrapper>
      </SlidesContext.Provider>
    </DeckContext.Provider>
  );
}

export default App;
