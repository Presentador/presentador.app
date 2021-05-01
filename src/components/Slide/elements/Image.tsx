import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

import { SlidesContext } from "../../../context/slides";
import { Element } from "../../../types";
import { HistoryContext } from "../../../context/history";

const StyledImage = styled.img<{ selected: boolean }>`
  font-size: 1.3em;
  padding: 0.5em;
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};
  width: 100%;
`;

const Buttons = styled.div`
  position: absolute;
  top: -2em;
  right: 0;
`;
const StyledButton = styled.button`
  padding: 0.5em;
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`;

const InnerContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

function Image({
  slideNumber,
  item,
  present,
}: {
  present: boolean;
  slideNumber: number;
  item: Element;
}) {
  const element = useRef<HTMLImageElement | null>(null);
  const [selected, setSelected] = useState(false);
  const [size, setSize] = useState([0, 0]);

  const { addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        selected &&
        element.current &&
        !element.current.contains(event.target)
      ) {
        setSelected(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [element, selected]);

  function remove() {
    addAction(
      () => removeElement(slideNumber, item.id),
      () => addElement(slideNumber, item)
    );
  }

  return (
    <Container style={{ width: size[0], height: size[1] }}>
      <InnerContainer>
        <StyledImage
          onMouseDown={() => {
            if (!present) {
              setSelected(true);
            }
          }}
          selected={selected}
          src={item.value}
          alt={"Image"}
          onLoad={() => {
            if (element.current) {
              setSize([
                element.current.naturalWidth,
                element.current.naturalHeight,
              ]);
            }
          }}
          ref={element}
        />
        {selected && (
          <Buttons>
            <StyledButton data-tooltip="Remove" onMouseDown={remove}>
              <TrashIcon />
            </StyledButton>
          </Buttons>
        )}
      </InnerContainer>
    </Container>
  );
}

Image.displayName = "Image";

export default Image;
