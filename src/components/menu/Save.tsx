import { useRef, useContext } from "react";
import { fileSave, FileSystemHandle } from "browser-fs-access";

import { SlidesContext } from "../../context/slides";
import { DeckContext } from "../../context/deck";
import { ThumbnailsContext } from "../../context/thumbnails";

import StyledButton from "./StyledButton";

function Save() {
  const fileHandle = useRef<FileSystemHandle | null>(null);
  const { slides } = useContext(SlidesContext);
  const { thumbnails } = useContext(ThumbnailsContext);
  const { setLoading, size } = useContext(DeckContext);

  async function save() {
    setLoading(true);
    const obj = { version: 1, slides, thumbnails, size };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    try {
      fileHandle.current = await fileSave(
        blob,
        {
          fileName: "presentation.prt",
          extensions: [".prt"],
        },
        fileHandle.current
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return <StyledButton onClick={save}>Save</StyledButton>;
}

export default Save;
