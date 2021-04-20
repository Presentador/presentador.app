import React, { useState } from "react";

type ColourLabels =
  | "primaryHeaderText"
  | "primaryNormalText"
  | "secondaryHeaderText"
  | "secondaryNormalText"
  | "primaryBackground"
  | "secondaryBackground";

type Colours = Record<ColourLabels, string>;

export function useDeckState() {
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<[number, number]>([960, 700]);
  const [colours, setColours] = useState<Colours>({
    primaryBackground: "#4285f4",
    primaryHeaderText: "#ffffff",
    primaryNormalText: "#ffffff",
    secondaryBackground: "#ffffff",
    secondaryHeaderText: "#424242",
    secondaryNormalText: "#737373",
  });

  return {
    colours,
    setColours,
    loading,
    setLoading,
    present,
    setPresent,
    size,
    setSize,
  };
}

export const DeckContext = React.createContext<{
  colours: Colours;
  setColours: (colours: Colours) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  present: boolean;
  setPresent: (present: boolean) => void;
  size: [number, number];
  setSize: (size: [number, number]) => void;
}>({
  colours: ([] as unknown) as Colours,
  setColours: () => {},
  size: [0, 0],
  setSize: () => {},
  present: false,
  setPresent: () => {},
  loading: false,
  setLoading: () => {},
});
