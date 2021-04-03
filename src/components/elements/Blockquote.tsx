import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";

import EditableToolbar from "../EditableToolbar";
import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";
import { ReactComponent as TrashIcon } from "../../trash.svg";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  padding: 0.5em;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledBlockquote = styled.blockquote<{ selected: boolean }>`
  font-size: 1.3em;
  line-height: 1.4em;
  padding: 1em;
  border: 1px solid ${({ selected }) => (selected ? "red" : "rgba(0, 0, 0, 0)")};
  quotes: "“" "”" "‘" "’";

  &:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
`;

function Blockquote({
  slideNumber,
  item,
}: {
  slideNumber: number;
  item: Element;
}) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLDivElement | null>(null);

  const { removeElement, changeElementValue } = useContext(SlidesContext);

  function editHeading() {
    editingElement.current &&
      editingElement.current.setAttribute("contenteditable", "true");
    setSelected(true);
  }

  function finishEditing() {
    if (editingElement.current) {
      editingElement.current.setAttribute("contenteditable", "false");
      setSelected(false);
      if (editingElement.current.innerHTML === "") {
        removeElement(slideNumber, item.id);
      }
      changeElementValue(
        slideNumber,
        item.id,
        editingElement.current.innerHTML
      );
    }
  }

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      event.preventDefault();
      finishEditing();
    }
  }

  function remove() {
    removeElement(slideNumber, item.id);
  }

  return (
    <Container>
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledBlockquote
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onBlur={finishEditing}
        onMouseDown={editHeading}
        dangerouslySetInnerHTML={{
          // React can't deal with a content editable list and manage its children
          __html: sanitizeHtml(item.value, {
            allowedTags: ["b", "i", "a", "li"],
            allowedAttributes: { a: ["href"] },
          }),
        }}
      />
      {selected && (
        <StyledButton onMouseDown={remove}>
          <TrashIcon />
        </StyledButton>
      )}
    </Container>
  );
}

Blockquote.displayName = "Blockquote";

export default Blockquote;
