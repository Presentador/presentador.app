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
        <Elements />
        <SlideWrapper>
          <Slide ref={ref} />
        </SlideWrapper>
        <Controls ref={ref} />
      </Wrapper>
    </Context.Provider>
  );
}

export default App;
