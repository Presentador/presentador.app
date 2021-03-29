import screenfull from "screenfull";
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Context, useSlideState } from "../context";

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
  const {
    ref,
    currentSlide,
    addElement,
    changeCurrentSlide,
    removeSlide,
    removeElement,
    changeElementValue,
    addSlide,
    elements,
    numberOfSlides,
  } = useSlideState();

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
        const currentNumber = currentSlide.number;
        changeCurrentSlide(currentNumber === 0 ? 0 : currentNumber - 1);
      }
      if (event.code === "ArrowRight") {
        const currentNumber = currentSlide.number;
        const totalSlides = numberOfSlides;
        changeCurrentSlide(
          currentNumber === totalSlides - 1 ? currentNumber : currentNumber + 1
        );
      }
    };

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
  }, [currentSlide, numberOfSlides]); // eslint-disable-line

  return (
    <Context.Provider
      value={{
        elements,
        numberOfSlides,
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
          <Slide present={present} ref={ref} />
        </SlideWrapper>
        {!present && <Controls ref={ref} />}
      </Wrapper>
    </Context.Provider>
  );
}

export default App;
