import { createContext, useState } from "react";

export function useWorkspaceState() {
  const [present, setPresent] = useState(false);

  return {
    present,
    setPresent,
  };
}

export const Context = createContext<{
  present: boolean;
  setPresent: (value: boolean) => void;
}>({
  present: false,
  setPresent: () => {},
});
