import { forwardRef, useContext } from "react";
import { fileOpen } from "browser-fs-access";
import { ReactComponent as LoadIcon } from "bootstrap-icons/icons/folder.svg";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";

import StyledButton from "../StyledButton";

function Load(_: any, ref: any) {
  const { setSlides } = useContext(SlidesContext);
  const { setLoading, setSize, setColours } = useContext(DeckContext);

  async function load() {
    setLoading(true);
    try {
      const blob = await fileOpen({
        extensions: [".prt"],
      });

      ref.current = blob.handle;

      const contents = await blob.text();
      const { slides, size, colours } = JSON.parse(contents);
      setSlides(slides);
      setSize(size);
      setColours(colours);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <StyledButton onClick={load} data-tooltip="Load">
      <LoadIcon />
    </StyledButton>
  );
}

export default forwardRef(Load);
