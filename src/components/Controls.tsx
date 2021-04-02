import html2canvas from "html2canvas";
import styled from "styled-components";
import { useContext, useEffect, forwardRef } from "react";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";
import { ThumbnailsContext } from "../context/thumbnails";
import Thumbnail from "./Thumbnail";

const Container = styled.div`
  overflow-y: scroll;
  white-space: nowrap;
`;

function Controls(_: any, ref: any) {
  const { slides } = useContext(SlidesContext);
  const { currentSlide } = useContext(DeckContext);
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
    <Container>
      {thumbnails.map((item, index) => (
        <Thumbnail
          key={index}
          src={item}
          number={index}
          active={currentSlide === index}
        />
      ))}
    </Container>
  );
}

export default forwardRef<HTMLDivElement>(Controls);
