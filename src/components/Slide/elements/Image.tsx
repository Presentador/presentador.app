import React, { useLayoutEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

import { ActionsButton, ButtonsBar } from "../ActionsButton";
import useClickOutside from "./hooks/clickOutside";
import { SlidesContext } from "../../../context/slides";
import { HistoryContext } from "../../../context/history";
import { Element } from "../../../types";

function getImageDimensions(url: string): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve([img.width, img.height]);
    img.onerror = () => reject();
    img.src = url;
  });
}

const StyledImage = styled.img<{ selected: boolean }>`
  font-size: 1.3em;
  padding: 0.5em;
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  position: relative;
  display: inline-block;
`;

function Image2({
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
  const [style, setStyle] = useState({});

  const { addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  const { clickContainer } = useClickOutside(() => {
    if (selected) {
      setSelected(false);
    }
  });

  function remove() {
    addAction(
      () => removeElement(slideNumber, item.id),
      () => addElement(slideNumber, item)
    );
  }

  async function getSize() {
    const imageDimensions = await getImageDimensions(item.value);

    if (clickContainer.current) {
      const maxWidth = clickContainer.current.clientWidth;
      const maxHeight = clickContainer.current.clientHeight;

      const ratio = Math.min(
        1,
        maxWidth / imageDimensions[0],
        maxHeight / imageDimensions[1]
      );

      setStyle({
        width: `${imageDimensions[0] * ratio}px`,
        height: `${imageDimensions[1] * ratio}px`,
      });
    }
  }

  useLayoutEffect(() => {
    if (clickContainer.current) {
      getSize();
    }
  }, []); // eslint-disable-line

  function select() {
    if (!present && !selected) {
      setSelected(true);
    }
  }

  return (
    <Container
      style={
        "width" in style
          ? { height: "auto", width: "auto" }
          : { height: "100%", width: "100%" }
      }
      ref={clickContainer}
      tabIndex={0}
      onFocus={select}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setSelected(false);
        }
      }}
    >
      <InnerContainer>
        {"width" in style && (
          <StyledImage
            style={style}
            onMouseDown={select}
            selected={selected}
            src={item.value}
            alt={"Image"}
            ref={element}
          />
        )}
        {selected && (
          <ButtonsBar>
            <ActionsButton data-tooltip="Remove" onClick={remove}>
              <TrashIcon />
            </ActionsButton>
          </ButtonsBar>
        )}
      </InnerContainer>
    </Container>
  );
}

Image2.displayName = "Image";

export default Image2;
