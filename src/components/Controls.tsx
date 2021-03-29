import html2canvas from "html2canvas";
import { useState, useContext, useEffect, forwardRef } from "react";

import { Context } from "../context";
import Thumbnail from "./Thumbnail";
import ThumbnailAdd from "./ThumbnailAdd";

function Controls(_: any, ref: any) {
  const { currentSlide, addSlide, elements } = useContext(Context);

  const [thumbnails, setThumbnails] = useState<string[]>([""]);

  async function update() {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      setThumbnails(
        thumbnails.map((item, index) =>
          index === currentSlide.number ? canvas.toDataURL() : item
        )
      );
    }
  }

  // Update on elements change
  useEffect(() => {
    update();
  }, [elements]); //eslint-disable-line

  // Update when a slide is added
  useEffect(() => {
    if (thumbnails[currentSlide.number] === "") {
      update();
    }
  }, [thumbnails]); //eslint-disable-line

  return (
    <div>
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
      <ThumbnailAdd
        addSlide={() => {
          addSlide();
          setThumbnails([...thumbnails, ""]);
        }}
      />
    </div>
  );
}

export default forwardRef<HTMLDivElement>(Controls);
