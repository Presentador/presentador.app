import { useContext } from "react";
import { ReactComponent as RedoIcon } from "bootstrap-icons/icons/arrow-clockwise.svg";

import { SlidesContext } from "../../../context/slides";

import StyledButton from "../StyledButton";

function Redo(_: any, ref: any) {
  const { redo } = useContext(SlidesContext);

  return (
    <StyledButton onClick={redo}>
      <RedoIcon />
    </StyledButton>
  );
}

export default Redo;
