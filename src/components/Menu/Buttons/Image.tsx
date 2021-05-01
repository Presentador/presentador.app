import { useCallback, useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { fileOpen } from "browser-fs-access";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";
import { ReactComponent as ImageIcon } from "bootstrap-icons/icons/card-image.svg";

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
  padding: 1em;
  width: 15em;
  line-height: 150%;
  border: 1px solid #ccc;
  background: #fff;
  text-align: left;
  border-radius: 3px;
  margin-top: 0.1em;
`;

function Image() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { currentSlide, addElement, removeElement } = useContext(SlidesContext);
  const { setLoading } = useContext(DeckContext);
  const { addAction } = useContext(HistoryContext);

  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setImageModalOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const addImageFromFile = useCallback(
    function (file: File | null) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event?.target?.result) {
          const id = new Date().getTime();
          addAction(
            () =>
              addElement(currentSlide, {
                id,
                type: "image",
                value: event?.target?.result as string,
              }),
            () => removeElement(currentSlide, id)
          );

          setImageModalOpen(false);
          setLoading(false);
        }
      };
      file && reader.readAsDataURL(file);
    },
    [
      addElement,
      setImageModalOpen,
      setLoading,
      currentSlide,
      removeElement,
      addAction,
    ]
  );

  const addImageFromString = useCallback(
    async function (content: string) {
      try {
        setLoading(true);
        const url = new URL(content);
        const response = await fetch(url.toString());

        const reader = new FileReader();
        reader.onload = function (event) {
          if (event?.target?.result) {
            const id = new Date().getTime();
            addAction(
              () =>
                addElement(currentSlide, {
                  id,
                  type: "image",
                  value: event?.target?.result as string,
                }),
              () => removeElement(currentSlide, id)
            );
            setImageModalOpen(false);
            setLoading(false);
          }
        };
        reader.readAsDataURL(await response.blob());
      } catch (error) {
        setLoading(false);
        return false;
      }
    },
    [
      currentSlide,
      addElement,
      setLoading,
      setImageModalOpen,
      removeElement,
      addAction,
    ]
  );

  useEffect(() => {
    const callback = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items || [];
      for (const index in items) {
        const item = items[index];
        if (item.kind === "string") {
          item.getAsString(addImageFromString);
        }
        if (item.kind === "file") {
          addImageFromFile(item.getAsFile());
        }
      }
    };

    document.addEventListener("paste", callback);
    return () => document.removeEventListener("paste", callback);
  }, [addImageFromString, addImageFromFile]);

  useEffect(() => {
    const callback = (event: DragEvent) => {
      event.preventDefault();

      const items = event.dataTransfer?.items || [];
      for (const index in items) {
        const item = items[index];
        if (item.kind === "file") {
          addImageFromFile(item.getAsFile());
        }
      }
    };

    document.addEventListener("drop", callback);
    return () => document.removeEventListener("drop", callback);
  }, [addImageFromFile]);

  useEffect(() => {
    const callback = (event: DragEvent) => {
      event.preventDefault();
    };

    document.addEventListener("dragover", callback);
    return () => document.removeEventListener("dragover", callback);
  }, []);

  async function loadLocalImage(event: any) {
    event.preventDefault();

    const blob = await fileOpen({
      mimeTypes: ["image/*"],
    });

    addImageFromFile(blob);
  }

  return (
    <Container ref={ref}>
      <StyledButton
        data-tooltip="Image"
        onClick={() => setImageModalOpen(!imageModalOpen)}
      >
        <ImageIcon />
      </StyledButton>
      {imageModalOpen && (
        <Modal>
          {/* eslint-disable-next-line */}-{" "}
          <a href="#" onClick={loadLocalImage}>
            Load a local file <br />
          </a>
          - Paste the image directly or its remote URL
          <br />
          - Drag and drop it as a file anywhere in the page <br />
        </Modal>
      )}
    </Container>
  );
}

export default Image;
