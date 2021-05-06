import React, { useCallback, useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { ReactComponent as ClearFormattingIcon } from "bootstrap-icons/icons/x.svg";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IncreaseIcon } from "bootstrap-icons/icons/plus.svg";
import { ReactComponent as DecreaseIcon } from "bootstrap-icons/icons/dash.svg";

import useClickOutside from "./hooks/clickOutside";
import EditableToolbar from "../EditableToolbar";
import { ActionsButton, ButtonsBar } from "../ActionsButton";
import { SlidesContext } from "../../../context/slides";
import { Element } from "../../../types";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledHeader = styled.div<{ level: number; selected: boolean }>`
  line-height: 120%;
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
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};

  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }
  .rangySelectionBoundary {
    background-color: dodgerblue;
    color: white;
  }
`;

function Header({
  slideNumber,
  item,
  present,
}: {
  present: boolean;
  slideNumber: number;
  item: Element;
}) {
  const editingElement = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(false);

  const { clickContainer } = useClickOutside(() => {
    if (selected) {
      finishEditing();
    }
  });

  const {
    addElement,
    removeElement,
    changeElementValue,
    changeHeaderSize,
  } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  function editHeading() {
    if (editingElement.current) {
      if (editingElement.current.getAttribute("contenteditable") !== "true") {
        editingElement.current.setAttribute("contenteditable", "true");
        editingElement.current.focus();
      }
    }
  }

  function remove() {
    addAction(
      () => removeElement(slideNumber, item.id),
      () => addElement(slideNumber, item)
    );
  }

  const finishEditing = useCallback(() => {
    if (editingElement.current) {
      editingElement.current.setAttribute("contenteditable", "false");
      setSelected(false);
      if (editingElement.current.innerHTML !== item.value) {
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
    }
  }, [
    editingElement,
    setSelected,
    removeElement,
    addElement,
    changeElementValue,
    item,
    slideNumber,
    addAction,
  ]);

  function checkMouseDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (event.code === "Enter") {
      event.preventDefault();
      finishEditing();
    }
  }

  const Tag = `h${item.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  function increase(e: any) {
    e.stopPropagation();
    changeHeaderSize(slideNumber, item.id, (item.level as number) - 1);
  }
  function decrease(e: any) {
    e.stopPropagation();
    changeHeaderSize(slideNumber, item.id, (item.level as number) + 1);
  }

  function select() {
    if (!present && !selected) {
      setSelected(true);
      editHeading();
    }
  }

  return (
    <Container
      ref={clickContainer}
      tabIndex={0}
      onFocus={select}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          finishEditing();
        }
      }}
    >
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledHeader
        as={Tag}
        level={item.level as number}
        selected={selected}
        ref={editingElement}
        onKeyDown={checkMouseDown}
        onMouseDown={select}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(item.value, {
            allowedTags: ["b", "i", "a"],
            allowedAttributes: { a: ["href"] },
          }),
        }}
      />
      {selected && (
        <ButtonsBar>
          <ActionsButton
            data-tooltip="Increase size"
            onClick={increase}
            disabled={item.level === 1}
          >
            <IncreaseIcon />
          </ActionsButton>
          <ActionsButton
            data-tooltip="Decrease size"
            onClick={decrease}
            disabled={item.level === 6}
          >
            <DecreaseIcon />
          </ActionsButton>
          <ActionsButton
            data-tooltip="Clear formatting"
            onClick={(e) => {
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
          </ActionsButton>
          <ActionsButton data-tooltip="Remove" onClick={remove}>
            <TrashIcon />
          </ActionsButton>
        </ButtonsBar>
      )}
    </Container>
  );
}

Header.displayName = "Header";

export default Header;
