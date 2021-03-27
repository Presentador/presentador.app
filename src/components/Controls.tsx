import { useContext } from "react";

import { Context } from "../context";
import Thumbnail from "./Thumbnail";

function App() {
  const {
    changeCurrentSlide,
    getCurrentSlide,
    addSlide,
    getThumbnails,
    getNumbersOfSlide,
  } = useContext(Context);

  const currentSlide = getCurrentSlide();

  return (
    <div style={{}}>
      <button
        onClick={() => {
          changeCurrentSlide(currentSlide.number - 1);
        }}
        disabled={currentSlide.number === 0}
        style={{ height: "100px" }}
      >
        {"<"}
      </button>
      {getThumbnails().map((item, index) => (
        <Thumbnail
          key={index}
          src={item}
          number={index}
          active={currentSlide.number === index}
        />
      ))}
      <button
        style={{ height: "100px" }}
        onClick={() => {
          if (currentSlide.number === getNumbersOfSlide() - 1) {
            addSlide();
          } else {
            changeCurrentSlide(currentSlide.number + 1);
          }
        }}
      >
        {currentSlide.number === getNumbersOfSlide() - 1 ? "+" : ">"}
      </button>
    </div>
  );
}

export default App;
