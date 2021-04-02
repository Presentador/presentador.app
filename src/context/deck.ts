import React, { useState } from "react";

export function useDeckState() {
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<[number, number]>([960, 700]);
  const [currentSlide, setCurrentSlide] = useState(0);

  return {
    loading,
    setLoading,
    currentSlide,
    setCurrentSlide,
    present,
    setPresent,
    size,
    setSize,
  };
}

export const DeckContext = React.createContext<{
  currentSlide: number;
  setCurrentSlide: (number: number) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
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
  loading: false,
  setLoading: () => {},
});
