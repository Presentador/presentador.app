import { useContext, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { ReactComponent as TrashIcon } from "../icons/trash.svg";
import { ReactComponent as AddIcon } from "../icons/add.svg";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";
import { ThumbnailsContext } from "../context/thumbnails";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledRemoveButton = styled.button`
  padding: 0.3em;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
`;
const StyledAddButton = styled.button`
  display: inline-block;
  width: 20px;
  height: 100px;
  vertical-align: middle;
  cursor: pointer;
`;

const StyledImage = styled.img<{ active: boolean }>`
  display: inline-block;
  width: 150px;
  height: 100px;
  vertical-align: middle;
  border: ${({ active }) => (active ? "1px solid red" : "none")};
  cursor: pointer;
`;
const StyledLoadingPlaceholder = styled.div<{ active: boolean }>`
  display: inline-block;
  width: 150px;
  height: 100px;
  vertical-align: middle;
  border: ${({ active }) => (active ? "1px solid red" : "none")};
`;

function Thumbnail({
  src,
  active,
  number,
}: {
  src: string;
  active: boolean;
  number: number;
}) {
  const { addSlide, removeSlide } = useContext(SlidesContext);
  const { currentSlide, setCurrentSlide } = useContext(DeckContext);
  const { thumbnails, setThumbnails } = useContext(ThumbnailsContext);
  const [hover, setHover] = useState(false);

  const Tag =
    src !== "" ? (
      <StyledImage
        active={active}
        src={src}
        alt={`Slide`}
        onClick={() => setCurrentSlide(number)}
      />
    ) : (
      <StyledLoadingPlaceholder active={active}>
        Loading
      </StyledLoadingPlaceholder>
    );

  return (
    <Draggable key={number} draggableId={`${number}`} index={number}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {Tag}
          {hover && (
            <>
              {thumbnails.length > 1 && (
                <StyledRemoveButton
                  onClick={() => {
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
                onClick={() => {
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
