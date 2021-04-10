import styled from "styled-components";
import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";
import { ThumbnailsContext } from "../context/thumbnails";
import Thumbnail from "./Thumbnail";

const Container = styled.div`
  overflow-y: scroll;
  white-space: pre-wrap;
`;

function Controls() {
  const { slides, setSlides } = useContext(SlidesContext);
  const { currentSlide, setCurrentSlide } = useContext(DeckContext);
  const { thumbnails, setThumbnails } = useContext(ThumbnailsContext);

  function reorder(array: any[], source: number, destination: number) {
    const beforeSource = array.slice(0, source);
    const sourceItem = array.slice(source, source + 1);
    const afterSource = array.slice(source + 1);
    const arrayWithoutSource = [...beforeSource, ...afterSource];

    const first = arrayWithoutSource.slice(0, destination);
    const rest = arrayWithoutSource.slice(destination);

    return [...first, ...sourceItem, ...rest];
  }

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          const source = result.source.index;
          const destination = result.destination.index;
          setThumbnails(reorder(thumbnails, source, destination));
          setSlides(reorder(slides, source, destination));
          setCurrentSlide(destination);
        }}
      >
        <Droppable droppableId="thumbnails" direction="horizontal">
          {(provided: any) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {thumbnails.map((item, index) => (
                <Thumbnail
                  key={index}
                  src={item}
                  number={index}
                  active={currentSlide === index}
                />
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Controls;
