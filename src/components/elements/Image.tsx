import React, { useState } from "react";
import styled from "styled-components";

import { Element } from "../../types";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  padding: 5px;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledImage = styled.img<{ selected: boolean }>`
  font-size: 1.3em;
  padding: 5px;
  border: ${({ selected }) => (selected ? "1px solid red" : "none")};
`;

function Image({
  item,
  removeElement,
}: {
  item: Element;
  removeElement: (id: number) => void;
}) {
  const [selected, setSelected] = useState(false);

  function finishEditing(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(false);
  }
  function edit(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(true);
  }

  function remove() {
    removeElement(item.id);
  }

  return (
    <Container>
      <StyledImage
        selected={selected}
        src={item.value}
        alt={item.value}
        onBlur={finishEditing}
        onFocus={edit}
        tabIndex={-1}
        data-id={item.id}
      />
      {selected && <StyledButton onMouseDown={remove}>X</StyledButton>}
    </Container>
  );
}

Image.displayName = "Image";

export default Image;
