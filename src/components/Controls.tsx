import html2canvas from "html2canvas";
import { useContext, useEffect, forwardRef } from "react";

import { SlidesContext } from "../context/slides";
import { ThumbnailsContext } from "../context/thumbnails";
import Thumbnail from "./Thumbnail";

function Controls(_: any, ref: any) {
  const { currentSlide, slides } = useContext(SlidesContext);
  const { thumbnails, setThumbnails } = useContext(ThumbnailsContext);

  async function update() {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      setThumbnails((currentThumbnails) =>
        currentThumbnails.map((item, index) =>
          index === currentSlide ? canvas.toDataURL() : item
        )
      );
    }
  }

  // Update on elements change
  useEffect(() => {
    update();
  }, [slides]); //eslint-disable-line

  // Update when a slide is added
  useEffect(() => {
    if (thumbnails[currentSlide] === "") {
      update();
    }
  }, [thumbnails]); //eslint-disable-line

  return (
    <div>
      {thumbnails.map((item, index) => (
        <Thumbnail
          key={index}
          src={item}
          number={index}
          active={currentSlide === index}
        />
      ))}
    </div>
  );
}

export default forwardRef<HTMLDivElement>(Controls);
