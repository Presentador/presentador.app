import html2canvas from "html2canvas";
import { useState, useContext, useEffect, forwardRef } from "react";

import { Context } from "../context";
import Thumbnail from "./Thumbnail";

function App(_: any, ref: any) {
  const {
    changeCurrentSlide,
    getCurrentSlide,
    addSlide,
    elements,
    getNumbersOfSlide,
  } = useContext(Context);

  const [thumbnails, setThumbnails] = useState<string[]>([""]);

  const currentSlide = getCurrentSlide();

  useEffect(() => {
    async function update() {
      if (ref.current) {
        const canvas = await html2canvas(ref.current);
        setThumbnails(
          thumbnails.map((item, index) =>
            index === getCurrentSlide().number ? canvas.toDataURL() : item
          )
        );
      }
    }
    update();
  }, [elements]); //eslint-disable-line

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
      {thumbnails.map((item, index) => (
        <Thumbnail
          setThumbnails={setThumbnails}
          thumbnails={thumbnails}
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
            setThumbnails([...thumbnails, ""]);
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

export default forwardRef<HTMLDivElement>(App);
