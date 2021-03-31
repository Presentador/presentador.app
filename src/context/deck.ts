import React, { useState } from "react";

export function useDeckState() {
  const [present, setPresent] = useState(false);
  const [size, setSize] = useState<[number, number]>([960, 700]);
  const [currentSlide, setCurrentSlide] = useState(0);

  return { currentSlide, setCurrentSlide, present, setPresent, size, setSize };
}

export const DeckContext = React.createContext<{
  currentSlide: number;
  setCurrentSlide: (number: number) => void;
  present: boolean;
  setPresent: (present: boolean) => void;
  size: [number, number];
  setSize: (size: [number, number]) => void;
}>({
  size: [0, 0],
  setSize: () => {},
  present: false,
  setPresent: () => {},
  currentSlide: 0,
  setCurrentSlide: () => {},
});
