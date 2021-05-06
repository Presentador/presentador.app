import { useContext, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as AddIcon } from "bootstrap-icons/icons/plus.svg";

import Slide from "../Slide/Slide";

import { SlidesContext } from "../../context/slides";
import { DeckContext } from "../../context/deck";
import { HistoryContext } from "../../context/history";

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

function Thumbnail({ active, number }: { active: boolean; number: number }) {
  const {
    setCurrentSlide,
    setSlides,
    slides,
    addSlide,
    removeSlide,
  } = useContext(SlidesContext);
  const { size } = useContext(DeckContext);
  const { addAction } = useContext(HistoryContext);
  const [hover, setHover] = useState(false);

  // Scale slides dimensions down to become a thumbnail
  const thumbnailWidth = size[0] * 0.15;
  const thumbnailHeight = size[1] * 0.15;

  // scale to fit window width and/or height
  const getScale = useCallback(
    () => Math.min(thumbnailWidth / size[0], thumbnailHeight / size[1]),
    [size, thumbnailWidth, thumbnailHeight]
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
          onFocus={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setCurrentSlide(number);
            }
          }}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node) ||
              !event.relatedTarget
            ) {
              setHover(false);
            }
          }}
          onClick={() => setCurrentSlide(number)}
        >
          <Slide slideNumber={number} present={true} scale={scale} />
          {hover && (
            <>
              {slides.length > 1 && (
                <StyledRemoveButton
                  onClick={(event) => {
                    event.stopPropagation();
                    addAction(
                      () => removeSlide(number),
                      () => setSlides(slides)
                    );
                  }}
                >
                  <TrashIcon />
                </StyledRemoveButton>
              )}
              <StyledAddButton
                onClick={(event) => {
                  event.stopPropagation();

                  addAction(
                    () => addSlide(number + 1),
                    () => removeSlide(number + 1)
                  );
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
