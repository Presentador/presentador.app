import { useContext } from "react";
import { ReactComponent as UndoIcon } from "bootstrap-icons/icons/arrow-counterclockwise.svg";

import { HistoryContext } from "../../../context/history";

import StyledButton from "../StyledButton";

function Undo(_: any, ref: any) {
  const { undo } = useContext(HistoryContext);

  return (
    <StyledButton onClick={undo}>
      <UndoIcon />
    </StyledButton>
  );
}

export default Undo;
