import { useRef, useState, useContext } from "react";
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

const StyledList = styled.ul<{ selected: boolean }>`
  white-space: pre-wrap;
  font-size: 1.3em;
  padding: 0.1em;
  padding-left: 1em; // fix lists' left padding
  border: 1px solid ${({ selected }) => (selected ? "red" : "rgba(0, 0, 0, 0)")};

  line-height: 1.4em;
  list-style-type: circle;

  li {
    padding-bottom: 0.5em;
  }
`;

function List({ slideNumber, item }: { slideNumber: number; item: Element }) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLUListElement | null>(null);

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

  return (
    <Container>
      {selected && <EditableToolbar ref={editingElement} />}
      <StyledList
        selected={selected}
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

List.displayName = "List";

export default List;
