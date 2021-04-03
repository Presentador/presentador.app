import React, { useState } from "react";

const initial = require("./initial-presentation.json");

export function useThumbnailsState() {
  const [thumbnails, setThumbnails] = useState<string[]>(initial.thumbnails);

  return { thumbnails, setThumbnails };
}

export const ThumbnailsContext = React.createContext<{
  thumbnails: string[];
  setThumbnails: (
    callback: string[] | ((thumbnails: string[]) => string[])
  ) => void;
}>({
  thumbnails: [],
  setThumbnails: () => {},
});
