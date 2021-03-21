import React, { useRef, useState } from "react";

import { Element } from "./types";

function List({
  item,
  removeElement,
  changeElementValue,
}: {
  item: Element;
  removeElement: (id: number) => void;
  changeElementValue: (id: number, value: string) => void;
}) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLDivElement | null>(null);

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

  function changeHeadingText(event: any) {
    // console.log(event.target.innerText.replace("\n", "\n * "));
  }

  function remove() {
    removeElement(item.id);
  }

  function insertTextAtCursor(text: string) {
    const sel = window.getSelection();
    if (!sel) {
      return;
    }
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      event.preventDefault();
      if (editingElement.current) {
        insertTextAtCursor("\n · ");
      }
    }
  }

  return (
    <>
      <p
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onInput={changeHeadingText}
        onBlur={finishEditing}
        onFocus={editHeading}
        tabIndex={-1}
        data-id={item.id}
        style={{
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
          whiteSpace: "pre",
        }}
      >
        {item.value}
      </p>
      {selected && <button onMouseDown={remove}>X</button>}
    </>
  );
}

export default List;
