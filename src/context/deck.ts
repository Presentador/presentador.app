import React, { useState, useEffect } from "react";

export type ColourLabels =
  | "primaryHeaderText"
  | "primaryNormalText"
  | "secondaryHeaderText"
  | "secondaryNormalText"
  | "primaryBackground"
  | "secondaryBackground";

export type Colours = Record<ColourLabels, string>;

type ColourTemplate = "default" | "dark" | "purple";

const colourTemplates: Record<ColourTemplate, Record<ColourLabels, string>> = {
  default: {
    primaryBackground: "#4285f4",
    primaryHeaderText: "#ffffff",
    primaryNormalText: "#ffffff",
    secondaryBackground: "#ffffff",
    secondaryHeaderText: "#424242",
    secondaryNormalText: "#737373",
  },
  dark: {
    primaryBackground: "#222222",
    primaryHeaderText: "#ffffff",
    primaryNormalText: "#adadad",
    secondaryBackground: "#303030",
    secondaryHeaderText: "#ffffff",
    secondaryNormalText: "#adadad",
  },
  purple: {
    primaryBackground: "#313a4c",
    primaryHeaderText: "#ffffff",
    primaryNormalText: "#d9c4b1",
    secondaryBackground: "#ece3da",
    secondaryHeaderText: "#002f4a",
    secondaryNormalText: "#ffffff",
  },
};

export function useDeckState() {
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<[number, number]>([960, 700]);
  const [template, setTemplate] = useState<ColourTemplate>("default");
  const [colours, setColours] = useState<Colours>(colourTemplates[template]);

  useEffect(() => {
    setColours(colourTemplates[template]);
  }, [template]);

  return {
    template,
    setTemplate,
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
  template: ColourTemplate;
  setTemplate: (template: ColourTemplate) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  present: boolean;
  setPresent: (present: boolean) => void;
  size: [number, number];
  setSize: (size: [number, number]) => void;
}>({
  colours: [] as unknown as Colours,
  setColours: () => {},
  template: "default",
  setTemplate: () => {},
  size: [0, 0],
  setSize: () => {},
  present: false,
  setPresent: () => {},
  loading: false,
  setLoading: () => {},
});
