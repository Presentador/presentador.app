import React, { useState, useContext } from "react";
import styled from "styled-components";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";
import { Element } from "../../../types";

const StyledImage = styled.img<{ selected: boolean; loadingState: boolean }>`
  font-size: 1.3em;
  padding: 0.5em;
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};
  background: ${({ loadingState }) =>
    loadingState ? "rgba(0, 0, 0, 0.1)" : "none"};
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
  const [selected, setSelected] = useState(false);

  const { loading } = useContext(DeckContext);
  const { removeElement } = useContext(SlidesContext);

  function finishEditing(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(false);
  }
  function edit() {
    setSelected(true);
  }

  function keydown(event: React.KeyboardEvent<HTMLImageElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      removeElement(slideNumber, item.id);
    }
  }

  return (
    <div
      onBlur={finishEditing}
      onKeyDown={keydown}
      onFocus={() => !present && edit()}
      tabIndex={-1}
    >
      <StyledImage
        loadingState={loading}
        selected={selected}
        src={item.value}
        alt={item.value}
        data-id={item.id}
      />
    </div>
  );
}

Image.displayName = "Image";

export default Image;
