import { useContext } from "react";
import { ReactComponent as UndoIcon } from "bootstrap-icons/icons/arrow-counterclockwise.svg";

import { HistoryContext } from "../../../context/history";

import StyledButton from "../StyledButton";

function Undo() {
  const { undo } = useContext(HistoryContext);

  return (
    <StyledButton data-tooltip="Undo" onClick={undo}>
      <UndoIcon />
    </StyledButton>
  );
}

export default Undo;
