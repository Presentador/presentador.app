import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";

import { Context } from "../../context";

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

const StyledBlockquote = styled.blockquote<{ selected: boolean }>`
  font-size: 1.3em;
  padding: 50px;
  border: ${({ selected }) => (selected ? "1px solid red" : "none")};
  quotes: "“" "”" "‘" "’";

  background: #f9f9f9;

  &:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  p {
    display: inline;
  }
`;

function Blockquote({ itemId }: { itemId: number }) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLDivElement | null>(null);

  const { getItemById, removeElement, changeElementValue } = useContext(
    Context
  );

  const item = getItemById(itemId);

  function editHeading(event: React.FocusEvent<HTMLDivElement>) {
    editingElement.current &&
      editingElement.current.setAttribute("contenteditable", "true");
    setSelected(true);
  }

  function finishEditing(event: React.FocusEvent<HTMLDivElement>) {
    editingElement.current &&
      editingElement.current.setAttribute("contenteditable", "false");
    setSelected(false);
    if (event.target.innerText === "") {
      removeElement(item.id);
    } else {
      changeElementValue(item.id, event.target.innerText);
    }
  }

  function changeHeadingText(event: any) {}

  function remove() {
    removeElement(item.id);
  }

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      event.preventDefault();
      editingElement.current && editingElement.current.blur();
    }
  }

  return (
    <Container>
      <StyledBlockquote
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        tabIndex={-1}
        data-id={item.id}
      >
        <p>{item.value}</p>
      </StyledBlockquote>
      {selected && <StyledButton onMouseDown={remove}>X</StyledButton>}
    </Container>
  );
}

Blockquote.displayName = "Blockquote";

export default Blockquote;
