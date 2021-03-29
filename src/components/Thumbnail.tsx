import { useContext, useState } from "react";
import styled from "styled-components";

import { Context } from "../context";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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
  thumbnails,
  setThumbnails,
}: {
  thumbnails: string[];
  setThumbnails: (thumbnails: string[]) => void;
  src: string;
  active: boolean;
  number: number;
}) {
  const { removeSlide, currentSlide, changeCurrentSlide } = useContext(Context);
  const [hover, setHover] = useState(false);

  const Tag =
    src !== "" ? (
      <StyledImage
        active={active}
        src={src}
        alt={`Slide`}
        onClick={() => changeCurrentSlide(number)}
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
      {hover && thumbnails.length > 1 && (
        <StyledButton
          onMouseDown={() => {
            removeSlide(number);
            setThumbnails(
              thumbnails.filter((item, index) => index !== currentSlide.number)
            );
          }}
        >
          X
        </StyledButton>
      )}
    </Container>
  );
}

export default Thumbnail;
