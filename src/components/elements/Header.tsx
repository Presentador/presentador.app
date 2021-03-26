import React, { useRef, useState } from "react";
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

function Header({
  level,
  item,
  removeElement,
  changeElementValue,
}: {
  level: number;
  item: Element;
  removeElement: (id: number) => void;
  changeElementValue: (id: number, value: string) => void;
}) {
  const editingElement = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(false);

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

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      event.preventDefault();
    }
  }

  function changeHeadingText(event: any) {}

  function remove() {
    removeElement(item.id);
  }

  const Tag =
    level === 1 ? (
      <h1
        ref={editingElement}
        onKeyDown={checkMouseDown}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        data-id={item.id}
        tabIndex={-1}
        style={{
          fontSize: "5em",
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
        }}
      >
        {item.value}
      </h1>
    ) : level === 2 ? (
      <h2
        ref={editingElement}
        onKeyDown={checkMouseDown}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        data-id={item.id}
        tabIndex={-1}
        style={{
          fontSize: "4.5em",
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
        }}
      >
        {item.value}
      </h2>
    ) : level === 3 ? (
      <h3
        ref={editingElement}
        onKeyDown={checkMouseDown}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        data-id={item.id}
        tabIndex={-1}
        style={{
          fontSize: "4em",
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
        }}
      >
        {item.value}
      </h3>
    ) : (
      <h4
        ref={editingElement}
        onKeyDown={checkMouseDown}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        data-id={item.id}
        tabIndex={-1}
        style={{
          fontSize: "3em",
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
        }}
      >
        {item.value}
      </h4>
    );

  return (
    <Container>
      {Tag}
      {selected && <StyledButton onMouseDown={remove}>X</StyledButton>}
    </Container>
  );
}

Header.displayName = "Header";

export default Header;
