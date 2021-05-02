import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import styled from "styled-components";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

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

const Buttons = styled.div`
  position: absolute;
  top: -2em;
  right: 0;
`;
const StyledButton = styled.button`
  padding: 0.5em;
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
  const containerElement = useRef<HTMLDivElement | null>(null);
  const element = useRef<HTMLImageElement | null>(null);
  const [selected, setSelected] = useState(false);
  const [style, setStyle] = useState({});

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

  async function getSize() {
    const imageDimensions = await getImageDimensions(item.value);

    if (containerElement.current) {
      const maxWidth = containerElement.current.clientWidth;
      const maxHeight = containerElement.current.clientHeight;

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
    console.log(1);
    if (containerElement.current) {
      getSize();
    }
  }, []); // eslint-disable-line

  return (
    <Container
      style={
        "width" in style
          ? { height: "auto", width: "auto" }
          : { height: "100%", width: "100%" }
      }
      ref={containerElement}
    >
      <InnerContainer>
        {"width" in style && (
          <StyledImage
            style={style}
            onMouseDown={() => {
              if (!present) {
                setSelected(true);
              }
            }}
            selected={selected}
            src={item.value}
            alt={"Image"}
            ref={element}
          />
        )}
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

Image2.displayName = "Image";

export default Image2;
