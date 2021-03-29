import React, { useState, useContext } from "react";
import styled from "styled-components";

import { Context } from "../../context";
import { Element } from "../../types";

const StyledImage = styled.img<{ selected: boolean }>`
  font-size: 1.3em;
  border: ${({ selected }) => (selected ? "1px solid red" : "none")};
`;

function Image({ item }: { item: Element }) {
  const [selected, setSelected] = useState(false);

  const { removeElement } = useContext(Context);

  function finishEditing(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(false);
  }
  function edit(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(true);
  }

  function keydown(event: React.KeyboardEvent<HTMLImageElement>) {
    if (event.key === "Backspace") {
      removeElement(item.id);
    }
  }

  return (
    <StyledImage
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
