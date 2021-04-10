import { forwardRef, useContext } from "react";
import { fileOpen } from "browser-fs-access";
import { ReactComponent as LoadIcon } from "bootstrap-icons/icons/folder.svg";

import { SlidesContext } from "../../../context/slides";
import { DeckContext } from "../../../context/deck";
import { ThumbnailsContext } from "../../../context/thumbnails";

import StyledButton from "../StyledButton";

function Load(_: any, ref: any) {
  const { setSlides } = useContext(SlidesContext);
  const { setThumbnails } = useContext(ThumbnailsContext);
  const { setLoading, setSize } = useContext(DeckContext);

  async function load() {
    setLoading(true);
    try {
      const blob = await fileOpen({
        extensions: [".prt"],
      });

      ref.current = blob.handle;

      const contents = await blob.text();
      const { slides, thumbnails, size } = JSON.parse(contents);
      setSlides(slides);
      setThumbnails(thumbnails);
      setSize(size);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <StyledButton onClick={load}>
      <LoadIcon />
    </StyledButton>
  );
}

export default forwardRef(Load);
