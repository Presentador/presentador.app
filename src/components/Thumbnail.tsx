import { useContext, useState } from "react";
import styled from "styled-components";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";
import { ThumbnailsContext } from "../context/thumbnails";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledRemoveButton = styled.button`
  padding: 5px;
  font-size: 1.1em;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
`;
const StyledAddButton = styled.button`
  padding: 5px;
  font-size: 1.1em;
  position: absolute;
  top: 0;
  right: -25px;
  z-index: 9999;
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
  const { setCurrentSlide } = useContext(DeckContext);
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
    <Container
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
                setCurrentSlide(number === 0 ? number : number - 1);
                setThumbnails(
                  thumbnails.filter((item, index) => index !== number)
                );
              }}
            >
              X
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
            +
          </StyledAddButton>
        </>
      )}
    </Container>
  );
}

export default Thumbnail;
