import React, { useState, useRef } from "react";

import { Slide, Element, State } from "./types";

import { buildersMap } from "./renderers";

export function useSlideState() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [elements, setElements] = useState<Element[]>([]);
  const [slideState, setSlideState] = useState<State[]>(["normal"]);

  function addSlide() {
    setSlideState([...slideState, "normal"]);
    setCurrentSlide(currentSlide + 1);
  }
  function removeSlide(number: number) {
    setElements([
      ...elements
        // remove all elements of that slide
        .filter((item) => item.slide !== number)
        // elements that were after that slide, move them exactly one slide before
        .map((item) =>
          item.slide > number ? { ...item, slide: item.slide - 1 } : item
        ),
    ]);
    // remove the state of that slide
    setSlideState([...slideState.filter((item, index) => index !== number)]);
    setCurrentSlide(
      currentSlide === slideState.length - 1 ? currentSlide - 1 : currentSlide
    );
  }

  async function addElement(item: Element) {
    setElements([...elements, item]);

    const nextState = buildersMap[slideState[item.slide]].add(
      item.type,
      getElementsForSlide(item.slide)
    );
    setSlideState(
      slideState.map((state, index) =>
        index === item.slide ? nextState : state
      )
    );
  }

  function removeElement(id: number) {
    const item = elements.find((item) => item.id === id);

    if (!item) {
      return;
    }

    setElements([...elements.filter((item) => item.id !== id)]);

    const nextState = buildersMap[slideState[item.slide]].remove(
      item.type,
      getElementsForSlide(item.slide)
    );
    setSlideState(
      slideState.map((state, index) =>
        index === item.slide ? nextState : state
      )
    );
  }

  function changeElementValue(id: number, value: string) {
    setElements(
      elements.map((item) => {
        if (item.id === id) {
          return { ...item, value };
        }

        return item;
      })
    );
  }

  function changeCurrentSlide(number: number) {
    setCurrentSlide(number);
  }

  function getElementsForSlide(id: number) {
    return elements.filter((item) => item.slide === id);
  }

  function getCurrentSlide() {
    return {
      number: currentSlide,
      state: slideState[currentSlide],
    };
  }

  function getNumbersOfSlide() {
    return slideState.length;
  }

  function getItemById(id: number) {
    return elements.find((item) => item.id === id) as Element;
  }

  return {
    getItemById,
    getNumbersOfSlide,
    getCurrentSlide,
    ref,
    addElement,
    removeElement,
    changeElementValue,
    changeCurrentSlide,
    getElementsForSlide,
    addSlide,
    elements,
    removeSlide,
  };
}

export const Context = React.createContext<{
  getNumbersOfSlide: () => number;
  getCurrentSlide: () => Slide;
  getElementsForSlide: (id: number) => Element[];
  elements: Element[];
  removeSlide: (id: number) => void;
  getItemById: (id: number) => Element;
  addSlide: () => void;
  addElement: (item: Element) => void;
  removeElement: (id: number) => void;
  changeElementValue: (id: number, value: string) => void;
  changeCurrentSlide: (number: number) => void;
}>({
  elements: [],
  getNumbersOfSlide: () => 1,
  getCurrentSlide: () => ({ number: 0, state: "normal" }),
  getItemById: () => ({} as Element),
  addSlide: () => {},
  removeSlide: () => {},
  changeCurrentSlide: () => {},
  getElementsForSlide: () => [],
  addElement: () => {},
  removeElement: () => {},
  changeElementValue: () => {},
});
