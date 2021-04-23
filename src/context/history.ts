import React, { useState } from "react";

export function useHistoryState() {
  const [actions, setActions] = useState<
    { undo: () => void; redo: () => void }[]
  >([]);
  const [currentAction, setCurrentAction] = useState(0);

  function addAction(redo: () => void, undo: () => void) {
    setActions([...actions.slice(0, currentAction), { redo, undo }]);
    setCurrentAction(currentAction + 1);

    redo();
  }

  function redo() {
    if (currentAction < actions.length) {
      const lastAction = actions[currentAction];
      setCurrentAction(currentAction + 1);
      lastAction.redo();
    }
  }

  function undo() {
    if (currentAction > 0) {
      const lastAction = actions[currentAction - 1];
      setCurrentAction(currentAction - 1);
      lastAction.undo();
    }
  }

  return { addAction, undo, redo };
}

export const HistoryContext = React.createContext<{
  addAction: (redo: () => void, undo: () => void) => void;
  undo: () => void;
  redo: () => void;
}>({
  addAction: () => {},
  undo: () => {},
  redo: () => {},
});
