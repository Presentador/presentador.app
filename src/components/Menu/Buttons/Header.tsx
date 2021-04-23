import styled from "styled-components";
import { useEffect, useRef, useState, useContext } from "react";
import { ReactComponent as H1Icon } from "bootstrap-icons/icons/type-h1.svg";

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
  width: 20em;
  line-height: 120%;
  text-align: left;
  margin-top: 0.1em;
`;

function Header() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { currentSlide, addElement, removeElement } = useContext(SlidesContext);
  const { addAction } = useContext(HistoryContext);

  const [headingSelected, setHeadingSelected] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setHeadingSelected(false);
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
        title="Heading"
        onClick={() => {
          setHeadingSelected(true);
        }}
      >
        <H1Icon />
      </StyledButton>
      {headingSelected && (
        <Modal>
          <StyledButton
            title="Heading 1"
            onClick={() => {
              setHeadingSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "heading",
                    level: 1,
                    value: "Heading 1",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            H1
          </StyledButton>
          <StyledButton
            title="Heading 2"
            onClick={() => {
              setHeadingSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "heading",
                    level: 2,
                    value: "Heading 2",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            H2
          </StyledButton>
          <StyledButton
            title="Heading 3"
            onClick={() => {
              setHeadingSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "heading",
                    level: 3,
                    value: "Heading 3",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            H3
          </StyledButton>
          <StyledButton
            title="Heading 4"
            onClick={() => {
              setHeadingSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "heading",
                    level: 4,
                    value: "Heading 4",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            H4
          </StyledButton>
          <StyledButton
            title="Heading 5"
            onClick={() => {
              setHeadingSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "heading",
                    level: 5,
                    value: "Heading 5",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            H5
          </StyledButton>
          <StyledButton
            title="Heading 6"
            onClick={() => {
              setHeadingSelected(false);
              const id = new Date().getTime();

              addAction(
                () =>
                  addElement(currentSlide, {
                    id,
                    type: "heading",
                    level: 6,
                    value: "Heading 6",
                  }),
                () => removeElement(currentSlide, id)
              );
            }}
          >
            H6
          </StyledButton>
        </Modal>
      )}
    </Container>
  );
}

export default Header;
