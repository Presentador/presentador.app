import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Context, useSlideState } from "./context";

import Elements from "./components/Elements";
import Controls from "./components/Controls";
import Slide from "./components/Slide";

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

const ControlsWrapper = styled.div``;
const SlideWrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ElementsWrapper = styled.div``;
const Wrapper = styled.div`
  background: #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
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
        <ElementsWrapper>
          <Elements />
        </ElementsWrapper>
        <SlideWrapper>
          <Slide ref={ref} />
        </SlideWrapper>
        <ControlsWrapper>
          <Controls ref={ref} />
        </ControlsWrapper>
      </Wrapper>
    </Context.Provider>
  );
}

export default App;
