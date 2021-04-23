import { useCallback, useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

import EditableToolbar from "../EditableToolbar";
import { SlidesContext } from "../../../context/slides";
import { Element } from "../../../types";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  padding: 0.5em;
  position: absolute;
  top: -2em;
  right: -2em;
`;

const StyledList = styled.div<{
  listType?: "ordered" | "unordered";
  selected: boolean;
}>`
  white-space: pre-wrap;
  font-size: 1.3em;
  padding: 0.1em;
  padding-left: 1em; // fix lists' left padding
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};

  line-height: 1.4em;

  li {
    padding-bottom: 0.5em;
    list-style-type: ${({ listType }) =>
      listType === "ordered" ? "decimal" : "circle"};
  }
`;

function List({
  slideNumber,
  item,
  present,
}: {
  present: boolean;
  slideNumber: number;
  item: Element;
}) {
  const [selected, setSelected] = useState(false);
  const editingElement = useRef<HTMLUListElement | null>(null);

  const { addElement, removeElement, changeElementValue } = useContext(
    SlidesContext
  );
  const { addAction } = useContext(HistoryContext);

  function editHeading() {
    editingElement.current &&
      editingElement.current.setAttribute("contenteditable", "true");
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

  function remove() {
    addAction(
      () => removeElement(slideNumber, item.id),
      () => addElement(slideNumber, item)
    );
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
      <StyledList
        listType={item.listType}
        as={item.listType === "ordered" ? "ol" : "ul"}
        onMouseDown={() => !present && setSelected(true)}
        onKeyDown={(event: any) => event.stopPropagation()}
        onDoubleClick={() => !present && editHeading()}
        selected={selected}
        ref={editingElement}
        dangerouslySetInnerHTML={{
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
