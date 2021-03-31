import React, { useState } from "react";

export function useDeckState() {
  const [present, setPresent] = useState(false);
  const [size, setSize] = useState<[number, number]>([960, 700]);

  return { present, setPresent, size, setSize };
}

export const DeckContext = React.createContext<{
  present: boolean;
  setPresent: (present: boolean) => void;
  size: [number, number];
  setSize: (size: [number, number]) => void;
}>({
  size: [0, 0],
  setSize: () => {},
  present: false,
  setPresent: () => {},
});
