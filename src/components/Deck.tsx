import screenfull from "screenfull";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { SlidesContext, useSlidesState } from "../context/slides";
import { DeckContext, useDeckState } from "../context/deck";
import { HistoryContext, useHistoryState } from "../context/history";

import Menu from "./Menu/Menu";
import PresentMenu from "./PresentMenu";
import ThumbnailsBar from "./Thumbnails/ThumbnailsBar";
import Slide from "./Slide/SlideWrapper";
import LoadingBar from "./LoadingBar";

const Wrapper = styled.div`
  background: #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SlideWrapper = styled.div<{ inactive: boolean }>`
  flex: 1;
  ${({ inactive }) => inactive && `cursor: none;`}
`;

function App() {
  const [inactive, setInactive] = useState(false);

  const {
    slides,
    setSlides,
    addElement,
    removeSlide,
    removeElement,
    changeElementValue,
    changeHeaderSize,
    addSlide,
    currentSlide,
    setCurrentSlide,
  } = useSlidesState();

  const { addAction, undo, redo } = useHistoryState();
  const {
    template,
    setTemplate,
    present,
    setPresent,
    size,
    setSize,
    loading,
    setLoading,
    colours,
    setColours,
  } = useDeckState();

  // fullscreen change handling
  useEffect(() => {
    const callback = () => {
      if (screenfull.isEnabled) {
        if (!screenfull.isFullscreen) {
          setPresent(false);
          setInactive(false);
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

  // presentation keyboard controls shortcuts
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

  // undo/redo keyboard shortcuts
  useEffect(() => {
    function callback(event: KeyboardEvent) {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        event.key === "z"
      ) {
        if (event.shiftKey === true) {
          redo();
        } else {
          undo();
        }
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [redo, undo]);

  // inactive detection
  useEffect(() => {
    let time: NodeJS.Timeout;
    function resetTimer() {
      setInactive(false);
      clearTimeout(time);
      time = setTimeout(() => {
        setInactive(true);
      }, 3000);
    }
    if (present) {
      document.addEventListener("mousemove", resetTimer);
      document.addEventListener("mousedown", resetTimer);
      document.addEventListener("touchstart", resetTimer);
      document.addEventListener("click", resetTimer);
      return () => {
        document.removeEventListener("mousemove", resetTimer);
        document.removeEventListener("mousedown", resetTimer);
        document.removeEventListener("touchstart", resetTimer);
        document.removeEventListener("click", resetTimer);
      };
    }
  }, [present]);

  return (
    <HistoryContext.Provider value={{ addAction, undo, redo }}>
      <DeckContext.Provider
        value={{
          template,
          setTemplate,
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
            currentSlide,
            setCurrentSlide,
            slides,
            setSlides,
            addElement,
            removeElement,
            changeElementValue,
            changeHeaderSize,
            removeSlide,
            addSlide,
          }}
        >
          <Wrapper>
            <LoadingBar />
            {present && !inactive && (
              <PresentMenu
                togglePresent={() => {
                  setPresent(false);
                  setInactive(false);
                  if (screenfull.isEnabled) {
                    screenfull.exit();
                  }
                }}
              />
            )}
            {!present && (
              <Menu
                togglePresent={() => {
                  setPresent(true);
                  if (screenfull.isEnabled) {
                    screenfull.request();
                  }
                }}
              />
            )}
            <SlideWrapper inactive={inactive}>
              <Slide />
            </SlideWrapper>
            {!present && <ThumbnailsBar />}
          </Wrapper>
        </SlidesContext.Provider>
      </DeckContext.Provider>
    </HistoryContext.Provider>
  );
}

export default App;
