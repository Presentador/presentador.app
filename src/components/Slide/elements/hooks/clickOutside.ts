import { useRef, useEffect } from "react";

export default function useClickOutside(clickedOutside: () => void) {
  const clickContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        clickContainer.current &&
        !clickContainer.current.contains(event.target)
      ) {
        clickedOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickedOutside]);

  return { clickContainer };
}
