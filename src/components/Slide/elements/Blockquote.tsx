import React, { useCallback, useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as ClearFormattingIcon } from "bootstrap-icons/icons/x.svg";

import useClickOutside from "./hooks/clickOutside";
import EditableToolbar from "../EditableToolbar";
import { SlidesContext } from "../../../context/slides";
import { Element } from "../../../types";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Buttons = styled.div`
  position: absolute;
  top: -2em;
  right: 0;
`;
const StyledButton = styled.button`
  padding: 0.5em;
`;

const StyledBlockquote = styled.blockquote<{ selected: boolean }>`
  font-size: 1.6em;
  line-height: 1.4em;
  padding: 1em;
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};
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
  present,
}: {
  present: boolean;
  slideNumber: number;
  item: Element;
}) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLDivElement | null>(null);

  const { addElement, removeElement, changeElementValue } = useContext(
    SlidesContext
  );
  const { addAction } = useContext(HistoryContext);

  const { clickContainer } = useClickOutside(() => {
    if (selected) {
      finishEditing();
    }
  });

  function editHeading() {
    if (editingElement.current) {
      if (editingElement.current.getAttribute("contenteditable") !== "true") {
        editingElement.current.setAttribute("contenteditable", "true");
      }
    }
  }

  const finishEditing = useCallback(() => {
    if (editingElement.current) {
      editingElement.current.setAttribute("contenteditable", "false");
      setSelected(false);
      if (editingElement.current.innerHTML === "") {
        addAction(
          () => removeElement(slideNumber, item.id),
          () => addElement(slideNumber, item)
        );
      } else if (editingElement.current.innerHTML !== item.value) {
        addAction(
          () =>
            editingElement.current &&
            changeElementValue(
              slideNumber,
              item.id,
              editingElement.current.innerHTML
            ),
          () => changeElementValue(slideNumber, item.id, item.value)
        );
      }
    }
  }, [
    editingElement,
    setSelected,
    removeElement,
    addElement,
    addAction,
    changeElementValue,
    item,
    slideNumber,
  ]);

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (event.code === "Enter") {
      event.preventDefault();
      finishEditing();
    }
  }

  function remove() {
    addAction(
      () => removeElement(slideNumber, item.id),
      () => addElement(slideNumber, item)
    );
  }

  return (
    <Container ref={clickContainer}>
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledBlockquote
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onMouseDown={() => {
          if (!present) {
            setSelected(true);
            editHeading();
          }
        }}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(item.value, {
            allowedTags: ["b", "i", "a"],
            allowedAttributes: { a: ["href"] },
          }),
        }}
      />
      {selected && (
        <Buttons>
          <StyledButton
            data-tooltip="Clear formatting"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (editingElement.current) {
                editingElement.current.innerHTML = sanitizeHtml(
                  editingElement.current.innerHTML,
                  {}
                );
              }
            }}
          >
            <ClearFormattingIcon />
          </StyledButton>
          <StyledButton data-tooltip="Remove" onMouseDown={remove}>
            <TrashIcon />
          </StyledButton>
        </Buttons>
      )}
    </Container>
  );
}

Blockquote.displayName = "Blockquote";

export default Blockquote;
