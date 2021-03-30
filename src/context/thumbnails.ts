import React, { useState } from "react";

export function useThumbnailsState() {
  const [thumbnails, setThumbnails] = useState<string[]>([""]);

  return { thumbnails, setThumbnails };
}

export const ThumbnailsContext = React.createContext<{
  thumbnails: string[];
  setThumbnails: (thumbnails: string[]) => void;
}>({
  thumbnails: [],
  setThumbnails: () => {},
});
