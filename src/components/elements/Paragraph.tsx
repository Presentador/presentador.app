import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";

import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";
import { ReactComponent as TrashIcon } from "../../trash.svg";
import EditableToolbar from "../EditableToolbar";

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

const StyledParagraph = styled.p<{ selected: boolean }>`
  font-size: 1.3em;
  padding: 0.1em;
  border: 1px solid ${({ selected }) => (selected ? "red" : "rgba(0, 0, 0, 0)")};
  line-height: 1.4em;
`;

function Paragraph({
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

  function remove() {
    removeElement(slideNumber, item.id);
  }

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      event.preventDefault();
      finishEditing();
    }
  }

  return (
    <Container>
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledParagraph
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onBlur={finishEditing}
        onMouseDown={editHeading}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(item.value, {
            allowedTags: ["b", "i", "a"],
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

Paragraph.displayName = "Paragraph";

export default Paragraph;
