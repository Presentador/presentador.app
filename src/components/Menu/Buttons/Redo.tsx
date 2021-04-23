import { useContext } from "react";
import { ReactComponent as RedoIcon } from "bootstrap-icons/icons/arrow-clockwise.svg";

import { HistoryContext } from "../../../context/history";

import StyledButton from "../StyledButton";

function Redo(_: any, ref: any) {
  const { redo } = useContext(HistoryContext);

  return (
    <StyledButton onClick={redo}>
      <RedoIcon />
    </StyledButton>
  );
}

export default Redo;
