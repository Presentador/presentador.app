import screenfull from "screenfull";
import { useRef, useEffect } from "react";
import styled from "styled-components";

import { SlidesContext, useSlidesState } from "../context/slides";
import { ThumbnailsContext, useThumbnailsState } from "../context/thumbnails";
import { DeckContext, useDeckState } from "../context/deck";

import Menu from "./Menu";
import Controls from "./Controls";
import Slide from "./Slide";
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
    };

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
  }, [currentSlide, slides, setCurrentSlide]);

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
