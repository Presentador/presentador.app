import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";

import EditableToolbar from "../EditableToolbar";
import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";
import { ReactComponent as TrashIcon } from "../../icons/trash.svg";

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

const StyledHeader = styled.div<{ level: number; selected: boolean }>`
  font-size: ${({ level }) =>
    level === 1
      ? "3.5em"
      : level === 2
      ? "3.2em"
      : level === 3
      ? "2.9em"
      : level === 4
      ? "2.6em"
      : level === 5
      ? "2.3em"
      : "2em"};

  padding: 0.1em;
  border: 1px solid ${({ selected }) => (selected ? "red" : "rgba(0, 0, 0, 0)")}; ;
`;

function Header({ slideNumber, item }: { slideNumber: number; item: Element }) {
  const editingElement = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(false);

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

  const Tag = `h${item.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Container>
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledHeader
        as={Tag}
        level={item.level as number}
        selected={selected}
        ref={editingElement}
        onKeyDown={checkMouseDown}
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

Header.displayName = "Header";

export default Header;
