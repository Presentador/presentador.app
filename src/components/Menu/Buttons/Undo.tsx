import { useContext } from "react";
import { ReactComponent as UndoIcon } from "bootstrap-icons/icons/arrow-counterclockwise.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";

function Undo(_: any, ref: any) {
  const { undo } = useContext(SlidesContext);

  return (
    <StyledButton onClick={undo}>
      <UndoIcon />
    </StyledButton>
  );
}

export default Undo;
