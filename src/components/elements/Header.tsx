import React, { useRef, useState } from "react";

import { Element } from "../../types";

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
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
        }}
      >
        {item.value}
      </h4>
    );

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {Tag}
      {selected && (
        <button
          style={{ position: "absolute", top: 0, right: 0 }}
          onMouseDown={remove}
        >
          X
        </button>
      )}
    </span>
  );
}

Header.displayName = "Header";

export default Header;
