import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";

import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";

const Container = styled.div`
  position: relative;
  flex: 1;

  text-align: center;

  &:last-child {
    text-align: right;
  }
  &:first-child {
    text-align: left;
  }
`;

const StyledButton = styled.button`
  padding: 0.5em;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledFooterItem = styled.div<{ selected: boolean }>`
  font-size: 0.9em;
  line-height: 1.4em;
  padding: 0.5em;
  border: 1px solid ${({ selected }) => (selected ? "red" : "rgba(0, 0, 0, 0)")}; ;
`;

function FooterItem({
  slideNumber,
  item,
}: {
  slideNumber: number;
  item: Element;
}) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLDivElement | null>(null);

  const { removeElement, changeElementValue } = useContext(SlidesContext);

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
      removeElement(slideNumber, item.id);
    } else {
      changeElementValue(slideNumber, item.id, event.target.innerText);
    }
  }

  function changeHeadingText(event: any) {}

  function remove() {
    removeElement(slideNumber, item.id);
  }

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      event.preventDefault();
      editingElement.current && editingElement.current.blur();
    }
  }

  return (
    <Container>
      <StyledFooterItem
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        tabIndex={-1}
        data-id={item.id}
      >
        {item.value}
      </StyledFooterItem>
      {selected && <StyledButton onMouseDown={remove}>X</StyledButton>}
    </Container>
  );
}

FooterItem.displayName = "FooterItem";

export default FooterItem;
