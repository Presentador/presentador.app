import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ReactComponent as GearIcon } from "bootstrap-icons/icons/gear.svg";

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
  padding: 1em;
  width: 20em;
  line-height: 120%;
  background: #fff;
  border-radius: 3px;
  margin-top: 0.1em;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const RowContainer = styled.div`
  width: 100%;
`;
const FieldContainer = styled.div`
  padding: 1em;
  display: inline-block;
  vertical-align: middle;
`;

function Settings() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { size, setSize, colours, setColours } = useContext(DeckContext);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setModalOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function changeSize(event: any) {
    const selectedSize = event.target.value;
    setSize(selectedSize.split(" - ")[0].split("x"));
  }

  const sizesOptions = [
    "960x700 - Default",
    "1024x576 - 16:9",
    "1280x720 - 16:9",
    "960x720 - 4:3",
    "600x800 - 3:4",
  ];

  return (
    <Container ref={ref}>
      <StyledButton onClick={() => setModalOpen(!modalOpen)}>
        <GearIcon />
      </StyledButton>
      {modalOpen && (
        <Modal>
          <FormContainer>
            <RowContainer>
              <FieldContainer>Size</FieldContainer>
              <FieldContainer>
                <select onChange={changeSize} defaultValue={size.join("x")}>
                  {sizesOptions.map((option, index) => (
                    <option key={index} value={option.split(" - ")[0]}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldContainer>
            </RowContainer>
            <RowContainer>
              <FieldContainer>Colours</FieldContainer>
              <FieldContainer>
                {Object.entries(colours).map((item, index) => (
                  <div key={index}>
                    {item[0]}:{" "}
                    <input
                      type="color"
                      defaultValue={item[1]}
                      onBlur={(e) =>
                        setColours({ ...colours, [item[0]]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </FieldContainer>
            </RowContainer>
          </FormContainer>
        </Modal>
      )}
    </Container>
  );
}

export default Settings;
