import screenfull from "screenfull";
import { useState, useEffect } from "react";
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
    getCurrentSlide,
    addElement,
    changeCurrentSlide,
    removeSlide,
    removeElement,
    changeElementValue,
    getElementsForSlide,
    addSlide,
    elements,
    getItemById,
    getNumbersOfSlide,
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

  return (
    <Context.Provider
      value={{
        elements,
        getNumbersOfSlide,
        getCurrentSlide,
        addElement,
        getItemById,
        removeElement,
        changeElementValue,
        removeSlide,
        addSlide,
        getElementsForSlide,
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
