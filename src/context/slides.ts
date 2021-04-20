import React, { useState } from "react";

import { Slide, Element } from "../types";

import { buildersMap } from "../renderers";

const initial = require("./initial-presentation.json");

export function useSlidesState() {
  const [slides, setSlides] = useState<Slide[]>(initial.slides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [actions, setActions] = useState<
    { undo: () => void; redo: () => void }[]
  >([]);
  const [currentAction, setCurrentAction] = useState(-1);

  function addSlide(at: number = slides.length) {
    const redo = () => {
      setSlides((prev) => {
        const first = prev.slice(0, at);
        const rest = prev.slice(at);
        return [...first, { state: "normal", elements: [] }, ...rest];
      });
      setCurrentSlide(at);
    };

    const undo = () => {
      setSlides((prev) => {
        return prev.filter((item, index) => index !== at);
      });
      setCurrentSlide(currentSlide);
    };

    setActions([...actions, { redo, undo }]);
    setCurrentAction(currentAction + 1);
    redo();
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

        const elementsWithoutFooter = slide.elements.filter(
          (item) => item.type !== "footer"
        );

        const nextState =
          item.type === "footer"
            ? slide.state
            : buildersMap[slide.state].add(item.type, elementsWithoutFooter);

        return {
          ...slide,
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

        const elementsWithoutFooter = slide.elements.filter(
          (item) => item.type !== "footer"
        );
        const remainingElements = elementsWithoutFooter.filter(
          (item) => item.id !== id
        );

        const nextState =
          element.type === "footer"
            ? slide.state
            : buildersMap[slide.state].remove(element.type, remainingElements);

        return {
          ...slide,
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

  function redo() {
    console.log(actions);
    console.log(currentAction);
    if (currentAction !== -1 && currentAction < actions.length) {
      console.log("redo");
      const lastAction = actions[currentAction];
      setCurrentAction(currentAction + 1);
      lastAction.redo();
    }
  }

  function undo() {
    console.log(actions);
    console.log(currentAction);
    if (currentAction > 0) {
      console.log("undo");
      const lastAction = actions[currentAction];
      setCurrentAction(currentAction - 1);
      lastAction.undo();
    }
  }

  return {
    undo,
    redo,
    slides,
    setSlides,
    addElement,
    removeElement,
    changeElementValue,
    addSlide,
    removeSlide,
    currentSlide,
    setCurrentSlide,
  };
}

export const SlidesContext = React.createContext<{
  currentSlide: number;
  setCurrentSlide: (number: number) => void;
  undo: () => void;
  redo: () => void;
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  removeSlide: (id: number) => void;
  addSlide: (id?: number) => void;
  addElement: (slideNumber: number, item: Element) => void;
  removeElement: (slideNumber: number, id: number) => void;
  changeElementValue: (slideNumber: number, id: number, value: string) => void;
}>({
  currentSlide: 0,
  setCurrentSlide: () => {},
  slides: [],
  undo: () => {},
  redo: () => {},
  setSlides: () => {},
  addSlide: () => {},
  removeSlide: () => {},
  addElement: () => {},
  removeElement: () => {},
  changeElementValue: () => {},
});
