import { createGlobalStyle } from "styled-components";
// import reset from "styled-reset";

import { Context, useSlideState } from "./context";

import Elements from "./components/Elements";
import Controls from "./components/Controls";
import Slide from "./components/Slide";

import "./renderers/index.scss";

const GlobalStyle = createGlobalStyle`
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
    getThumbnails,
    getNumbersOfSlide,
  } = useSlideState();

  return (
    <Context.Provider
      value={{
        getNumbersOfSlide,
        getCurrentSlide,
        getThumbnails,
        addElement,
        removeElement,
        changeElementValue,
        removeSlide,
        addSlide,
        getElementsForSlide,
        changeCurrentSlide,
      }}
    >
      <GlobalStyle />
      <Elements />
      <Controls />
      <Slide ref={ref} />
    </Context.Provider>
  );
}

export default App;
