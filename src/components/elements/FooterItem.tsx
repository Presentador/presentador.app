import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

import EditableToolbar from "../EditableToolbar";

import { SlidesContext } from "../../context/slides";
import { Element } from "../../types";

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
  top: -2em;
  right: -2em;
`;

const StyledFooterItem = styled.div<{ selected: boolean }>`
  font-size: 0.9em;
  line-height: 1.4em;
  padding: 0.5em;
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};
  color: ${({ theme }) => theme.lightText};
`;

function FooterItem({
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

  const { removeElement, changeElementValue } = useContext(SlidesContext);

  function editHeading() {
    editingElement.current &&
      editingElement.current.setAttribute("contenteditable", "true");
  }

  const finishEditing = useCallback(() => {
    if (editingElement.current) {
      editingElement.current.setAttribute("contenteditable", "false");
      setSelected(false);
      if (editingElement.current.innerHTML === "") {
        removeElement(slideNumber, item.id);
      } else if (editingElement.current.innerHTML !== item.value) {
        changeElementValue(
          slideNumber,
          item.id,
          editingElement.current.innerHTML
        );
      }
    }
  }, [
    editingElement,
    setSelected,
    removeElement,
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
    removeElement(slideNumber, item.id);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        selected &&
        editingElement.current &&
        !editingElement.current.contains(event.target)
      ) {
        finishEditing();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingElement, selected, finishEditing]);

  return (
    <Container>
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledFooterItem
        selected={selected}
        onKeyDown={checkMouseDown}
        ref={editingElement}
        onMouseDown={() => !present && setSelected(true)}
        onDoubleClick={() => !present && editHeading()}
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

FooterItem.displayName = "FooterItem";

export default FooterItem;
