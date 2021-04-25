import { forwardRef, useContext } from "react";
import { ReactComponent as NewIcon } from "bootstrap-icons/icons/file-earmark-plus.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";

function New(_: any, ref: any) {
  const { setCurrentSlide, setSlides } = useContext(SlidesContext);

  async function newFile() {
    setCurrentSlide(0);
    ref.current = null;
    setSlides([{ state: "normal", elements: [] }]);
  }

  return (
    <StyledButton onClick={newFile} data-tooltip="New">
      <NewIcon />
    </StyledButton>
  );
}

export default forwardRef(New);
