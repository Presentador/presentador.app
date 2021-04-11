import { useContext, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as AddIcon } from "bootstrap-icons/icons/plus.svg";

import Slide from "../Slide/Slide";

import { SlidesContext } from "../../context/slides";
import { DeckContext } from "../../context/deck";
import { ThumbnailsContext } from "../../context/thumbnails";

const Container = styled.div<{
  width: number;
  height: number;
  active: boolean;
}>`
  position: relative;
  display: inline-block;
  height: ${({ height }) => height + 2}px;
  width: ${({ width }) => width + 2}px;
  vertical-align: middle;
  border: ${({ active }) => (active ? "1px solid #15aabf" : "1px solid #fff")};
  cursor: pointer;
`;

const StyledRemoveButton = styled.button`
  padding: 0.3em;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
`;
const StyledAddButton = styled.button`
  padding: 0.3em;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
`;

function Thumbnail({
  active,
  number,
}: {
  src: string;
  active: boolean;
  number: number;
}) {
  const { addSlide, removeSlide } = useContext(SlidesContext);
  const { currentSlide, setCurrentSlide, size } = useContext(DeckContext);
  const { thumbnails, setThumbnails } = useContext(ThumbnailsContext);
  const [hover, setHover] = useState(false);

  // Scale slides dimensions down to become a thumbnail
  const thumbnailWidth = size[0] * 0.15;
  const thumbnailHeight = size[1] * 0.15;

  // scale to fit window width and/or height
  const getScale = useCallback(
    () => Math.min(thumbnailWidth / size[0], thumbnailHeight / size[1]),
    [size]
  );

  const [scale, setScale] = useState(getScale());

  useEffect(() => {
    function updateSize() {
      const scale = getScale();
      setScale(scale);
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [setScale, size, getScale]);

  return (
    <Draggable key={number} draggableId={`${number}`} index={number}>
      {(provided) => (
        <Container
          width={thumbnailWidth}
          height={thumbnailHeight}
          active={active}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setCurrentSlide(number)}
        >
          <Slide slideNumber={number} present={true} scale={scale} />
          {hover && (
            <>
              {thumbnails.length > 1 && (
                <StyledRemoveButton
                  onClick={(event) => {
                    event.stopPropagation();
                    removeSlide(number);
                    setCurrentSlide(
                      currentSlide === number
                        ? number === 0
                          ? number
                          : number - 1
                        : currentSlide === 0
                        ? currentSlide
                        : currentSlide - 1
                    );
                    setThumbnails(
                      thumbnails.filter((item, index) => index !== number)
                    );
                  }}
                >
                  <TrashIcon />
                </StyledRemoveButton>
              )}
              <StyledAddButton
                onClick={(event) => {
                  event.stopPropagation();
                  addSlide(number + 1);
                  setCurrentSlide(number + 1);
                  const first = thumbnails.slice(0, number + 1);
                  const rest = thumbnails.slice(number + 1);
                  setThumbnails([...first, "", ...rest]);
                }}
              >
                <AddIcon />
              </StyledAddButton>
            </>
          )}
        </Container>
      )}
    </Draggable>
  );
}

export default Thumbnail;
