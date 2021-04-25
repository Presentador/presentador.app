import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import styled from "styled-components";
import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";
import hightlight from "highlight.js";

import "highlight.js/styles/github.css";

import { SlidesContext } from "../../../context/slides";
import { Element } from "../../../types";

const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 0.5em;
  position: absolute;
  top: -2em;
  right: -2em;
`;

const StyledCode = styled.code<{ selected: boolean }>`
  display: block;
  width: 100%;
  font-size: 1.3em;
  padding: 0.5em;
  border: 2px solid
    ${({ selected }) => (selected ? "#15aabf" : "rgba(0, 0, 0, 0)")};
  line-height: 1.4em;
  white-space: wrap;
`;

function Codeblock({
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
      hightlight.highlightBlock(editingElement.current);
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

  useEffect(() => {
    if (editingElement.current) {
      hightlight.highlightBlock(editingElement.current);
    }
  }, []);

  return (
    <Container>
      <pre>
        <StyledCode
          selected={selected}
          onKeyDown={(event) => event.stopPropagation()}
          ref={editingElement}
          onMouseDown={() => !present && setSelected(true)}
          onDoubleClick={() => !present && editHeading()}
          dangerouslySetInnerHTML={{
            __html: item.value,
          }}
        />
      </pre>
      {selected && (
        <StyledButton onMouseDown={remove}>
          <TrashIcon />
        </StyledButton>
      )}
    </Container>
  );
}

Codeblock.displayName = "Codeblock";

export default Codeblock;
