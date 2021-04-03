import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Popover } from "react-text-selection-popover";
import sanitizeHtml from "sanitize-html";
import { position } from "caret-pos";

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

const StyledParagraph = styled.p<{ selected: boolean }>`
  font-size: 1.3em;
  padding: 0.1em;
  border: 1px solid ${({ selected }) => (selected ? "red" : "rgba(0, 0, 0, 0)")};
  line-height: 1.4em;
`;

const StyledPopover = styled.div<{ left: number; top: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  margin-left: -75px;
  width: 150px;
  background: white;
  font-size: 0.7em;
  text-align: center;
  border-radius: 3px;
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
      {selected && (
        <Popover
          render={({ clientRect, isCollapsed, textContent }) => {
            if (clientRect == null || isCollapsed) return null;

            return (
              <StyledPopover
                left={clientRect.left + clientRect.width / 2}
                top={clientRect.top - 40}
              >
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (editingElement.current) {
                      const pos = position(editingElement.current);
                      editingElement.current.innerHTML = editingElement.current.innerHTML.replace(
                        `${textContent}`,
                        `<b>${textContent}</b>`
                      );
                      position(editingElement.current, pos.pos);
                    }
                  }}
                >
                  <b>Bold</b>
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (editingElement.current) {
                      const pos = position(editingElement.current);
                      editingElement.current.innerHTML = editingElement.current.innerHTML.replace(
                        `${textContent}`,
                        `<i>${textContent}</i>`
                      );
                      position(editingElement.current, pos.pos);
                    }
                  }}
                >
                  <i>Italic</i>
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (editingElement.current) {
                      const pos = position(editingElement.current);
                      editingElement.current.innerHTML = editingElement.current.innerHTML.replace(
                        /<\/?[^>]+(>|$)/g,
                        ""
                      );
                      position(editingElement.current, pos.pos);
                    }
                  }}
                >
                  Clear
                </button>
              </StyledPopover>
            );
          }}
        />
      )}
      <StyledParagraph
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onBlur={finishEditing}
        onClick={editHeading}
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
