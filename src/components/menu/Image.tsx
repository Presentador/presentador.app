import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { SlidesContext } from "../../context/slides";
import { DeckContext } from "../../context/deck";

import StyledButton from "./StyledButton";

const Container = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
`;

const Modal = styled.div`
  position: absolute;
  top: 100%;
  z-index: 999999;
  width: 15em;
  height: 10em;
  border: 1px solid #ccc;
  background: #fff;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CenteredContainer = styled.div`
  flex: 1;
  text-align: center;
`;

function Image() {
  const { addElement } = useContext(SlidesContext);
  const { currentSlide, setLoading } = useContext(DeckContext);

  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    const callback = (event: any) => {
      const items = event.clipboardData.items;
      for (const index in items) {
        const item = items[index];
        if (item.kind === "string") {
          setLoading(true);
          item.getAsString(async (string: string) => {
            try {
              const url = new URL(string);
              const response = await fetch(url.toString());

              const reader = new FileReader();
              reader.onload = function (event) {
                if (event?.target?.result) {
                  addElement(currentSlide, {
                    id: new Date().getTime(),
                    type: "image",
                    value: event?.target?.result as string,
                  });
                  setImageModalOpen(false);
                  setLoading(false);
                }
              };
              reader.readAsDataURL(await response.blob());
            } catch (error) {
              setLoading(false);
              return false;
            }
          });
        }
        if (item.kind === "file") {
          setLoading(true);
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = function (event) {
            if (event?.target?.result) {
              addElement(currentSlide, {
                id: new Date().getTime(),
                type: "image",
                value: event?.target?.result as string,
              });
              setImageModalOpen(false);
              setLoading(false);
            }
          };
          blob && reader.readAsDataURL(blob);
        }
      }
    };

    document.addEventListener("paste", callback);
    return () => document.removeEventListener("paste", callback);
  }, [currentSlide, addElement, setLoading, setImageModalOpen]);

  return (
    <Container>
      <StyledButton onClick={() => setImageModalOpen(!imageModalOpen)}>
        Img
      </StyledButton>
      {imageModalOpen && (
        <Modal>
          <TextContainer>
            <CenteredContainer>
              Past the image directly or its remote URL or drag and drop it as a
              file.
            </CenteredContainer>
          </TextContainer>
        </Modal>
      )}
    </Container>
  );
}

export default Image;
