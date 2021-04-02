import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { DeckContext } from "../../context/deck";

import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";

const StyledImage = styled.img<{ selected: boolean; loadingState: boolean }>`
  font-size: 1.3em;
  border: ${({ selected }) => (selected ? "1px solid red" : "none")};
  background: ${({ loadingState }) =>
    loadingState ? "rgba(0, 0, 0, 0.1)" : "none"};
`;

function Image({ slideNumber, item }: { slideNumber: number; item: Element }) {
  const [selected, setSelected] = useState(false);

  const { loading, setLoading } = useContext(DeckContext);
  const { removeElement } = useContext(SlidesContext);

  function finishEditing(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(false);
  }
  function edit(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(true);
  }

  function keydown(event: React.KeyboardEvent<HTMLImageElement>) {
    if (event.key === "Backspace") {
      removeElement(slideNumber, item.id);
    }
  }

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <StyledImage
      onLoad={() => setLoading(false)}
      loadingState={loading}
      selected={selected}
      src={item.value}
      alt={item.value}
      onBlur={finishEditing}
      onKeyDown={keydown}
      onFocus={edit}
      tabIndex={-1}
      data-id={item.id}
    />
  );
}

Image.displayName = "Image";

export default Image;
