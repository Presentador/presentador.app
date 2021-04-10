import styled from "styled-components";

import { useEffect, useRef, useState, useContext } from "react";
import { ReactComponent as ListUlIcon } from "bootstrap-icons/icons/list-ul.svg";
import { ReactComponent as ListOlIcon } from "bootstrap-icons/icons/list-ol.svg";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";

import StyledButton from "../StyledButton";

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
  const { addElement } = useContext(SlidesContext);
  const { currentSlide } = useContext(DeckContext);

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
        title="List"
        onClick={() => {
          setListSelected(true);
        }}
      >
        <ListUlIcon />
      </StyledButton>
      {listSelected && (
        <Modal>
          <StyledButton
            title="List"
            onClick={() => {
              setListSelected(false);
              addElement(currentSlide, {
                id: new Date().getTime(),
                type: "list",
                value: "<li>Point one to make</li>",
                listType: "unordered",
              });
            }}
          >
            <ListUlIcon />
          </StyledButton>
          <StyledButton
            title="List"
            onClick={() => {
              setListSelected(false);
              addElement(currentSlide, {
                id: new Date().getTime(),
                type: "list",
                value: "<li>Point one to make</li>",
                listType: "ordered",
              });
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
