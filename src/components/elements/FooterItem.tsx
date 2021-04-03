import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";

import EditableToolbar from "../EditableToolbar";

import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";
import { ReactComponent as TrashIcon } from "../../icons/trash.svg";

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
      <StyledFooterItem
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

FooterItem.displayName = "FooterItem";

export default FooterItem;
