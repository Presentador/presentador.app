import styled from "styled-components";

import { useEffect, useRef, useState, useContext } from "react";
import { ReactComponent as ListUlIcon } from "bootstrap-icons/icons/list-ul.svg";
import { ReactComponent as ListOlIcon } from "bootstrap-icons/icons/list-ol.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";
import { HistoryContext } from "../../../context/history";

const Container = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
`;

const Modal = styled.div`
  position: absolute;
  top: 100%;
  z-index: 999999;
  padding: 0.2em;
  width: 10em;
  line-height: 120%;
  text-align: left;
  margin-top: 0.1em;
`;
function List() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { currentSlide, addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  const [listSelected, setListSelected] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setListSelected(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={ref}>
      <StyledButton
        data-tooltip="List"
        onClick={() => {
          setListSelected(true);
        }}
      >
        <ListUlIcon />
      </StyledButton>
      {listSelected && (
        <Modal>
          <StyledButton
            data-tooltip="Unordered list"
            onClick={() => {
              setListSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "list",
                    value: "<li>Point one to make</li>",
                    listType: "unordered",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            <ListUlIcon />
          </StyledButton>
          <StyledButton
            data-tooltip="Ordered list"
            onClick={() => {
              setListSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "list",
                    value: "<li>Point one to make</li>",
                    listType: "ordered",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            <ListOlIcon />
          </StyledButton>
        </Modal>
      )}
    </Container>
  );
}

export default List;
