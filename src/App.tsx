import { Context, useSlideState } from "./context";

import Elements from "./components/Elements";
import Controls from "./components/Controls";
import Slide from "./components/Slide";

import "./renderers/index.scss";

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
      <Elements />
      <Controls />
      <Slide ref={ref} />
    </Context.Provider>
  );
}

export default App;
