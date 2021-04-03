import React, { useState } from "react";

import { Slide, Element } from "../types";

import { buildersMap } from "../renderers";

export function useSlidesState() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      state: "headerList",
      elements: [
        {
          id: 1,
          type: "heading",
          value: "Presentador: An opinionated presentation app",
          level: 1,
        },
        {
          id: 2,
          type: "list",
          value:
            "<li>It places your elements in the right place so you don't have to.</li><li>It's open-source.</li><li>Try removing this list element and add another one.</li>",
          level: 1,
        },
      ],
    },
  ]);

  function addSlide(at: number = slides.length) {
    setSlides((prev) => {
      const first = prev.slice(0, at);
      const rest = prev.slice(at);
      return [...first, { state: "normal", elements: [] }, ...rest];
    });
  }
  function removeSlide(number: number) {
    setSlides((prev) => prev.filter((_, index) => index !== number));
  }

  async function addElement(slideNumber: number, item: Element) {
    setSlides((prev) =>
      prev.map((slide, index) => {
        if (index !== slideNumber) {
          return slide;
        }

        const nextState =
          item.type === "footer"
            ? slide.state
            : buildersMap[slide.state].add(item.type, slide.elements);

        return {
          elements: [...slide.elements, item],
          state: nextState,
        };
      })
    );
  }

  function removeElement(slideNumber: number, id: number) {
    setSlides((prev) =>
      prev.map((slide, index) => {
        if (index !== slideNumber) {
          return slide;
        }

        const element = slide.elements.find((item) => item.id === id);

        if (!element) {
          return slide;
        }

        const remainingElements = slide.elements.filter(
          (item) => item.id !== id
        );
        const nextState =
          element.type === "footer"
            ? slide.state
            : buildersMap[slide.state].remove(element.type, remainingElements);

        return {
          elements: remainingElements,
          state: nextState,
        };
      })
    );
  }

  function changeElementValue(slideNumber: number, id: number, value: string) {
    setSlides((prev) =>
      prev.map((slide, index) => {
        if (index !== slideNumber) {
          return slide;
        }

        return {
          ...slide,
          elements: slide.elements.map((item) =>
            item.id === id ? { ...item, value } : item
          ),
        };
      })
    );
  }

  return {
    slides,
    setSlides,
    addElement,
    removeElement,
    changeElementValue,
    addSlide,
    removeSlide,
  };
}

export const SlidesContext = React.createContext<{
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  removeSlide: (id: number) => void;
  addSlide: (id?: number) => void;
  addElement: (slideNumber: number, item: Element) => void;
  removeElement: (slideNumber: number, id: number) => void;
  changeElementValue: (slideNumber: number, id: number, value: string) => void;
}>({
  slides: [],
  setSlides: () => {},
  addSlide: () => {},
  removeSlide: () => {},
  addElement: () => {},
  removeElement: () => {},
  changeElementValue: () => {},
});
