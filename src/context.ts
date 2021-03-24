import html2canvas from "html2canvas";
import React, { useState, useRef, useEffect } from "react";

import { Slide, Element, State } from "./types";

import { states } from "./builder";

export function useSlideState() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([""]);
  const [elements, setElements] = useState<Element[]>([]);
  const [slideState, setSlideState] = useState<State[]>(["normal"]);

  useEffect(() => {
    async function update() {
      if (ref.current) {
        const canvas = await html2canvas(ref.current);
        setThumbnails(
          thumbnails.map((item, index) =>
            index === currentSlide ? canvas.toDataURL() : item
          )
        );
      }
    }
    update();
  }, [currentSlide, elements]); // eslint-disable-line

  function addSlide() {
    setSlideState([...slideState, "normal"]);
    setCurrentSlide(currentSlide + 1);
    setThumbnails([...thumbnails, ""]);
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
      currentSlide === thumbnails.length - 1 ? currentSlide - 1 : currentSlide
    );
    setThumbnails(thumbnails.filter((item, index) => index !== currentSlide));
  }

  async function addElement(item: Element) {
    setElements([...elements, item]);

    if (states[slideState[item.slide]]) {
      const nextState = states[slideState[item.slide]].add(item.type);
      if (nextState) {
        setSlideState(
          slideState.map((state, index) =>
            index === item.slide ? nextState : state
          )
        );
      }
    } else {
      setSlideState(
        slideState.map((state, index) =>
          index === item.slide ? "normal" : state
        )
      );
    }
  }

  function removeElement(id: number) {
    const item = elements.find((item) => item.id === id);

    if (!item) {
      return;
    }

    setElements([...elements.filter((item) => item.id !== id)]);

    if (states[slideState[item.slide]]) {
      const nextState = states[slideState[item.slide]].remove(
        item && item.type
      );
      if (nextState) {
        setSlideState(
          slideState.map((state, index) =>
            index === item.slide ? nextState : state
          )
        );
      }
    } else {
      setSlideState(
        slideState.map((state, index) =>
          index === item.slide ? "normal" : state
        )
      );
    }
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

  function getThumbnails() {
    return thumbnails;
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

  return {
    getNumbersOfSlide,
    getThumbnails,
    getCurrentSlide,
    ref,
    addElement,
    removeElement,
    changeElementValue,
    changeCurrentSlide,
    getElementsForSlide,
    addSlide,
    removeSlide,
  };
}

export const Context = React.createContext<{
  getNumbersOfSlide: () => number;
  getCurrentSlide: () => Slide;
  getThumbnails: () => string[];
  getElementsForSlide: (id: number) => Element[];
  removeSlide: (id: number) => void;
  addSlide: () => void;
  addElement: (item: Element) => void;
  removeElement: (id: number) => void;
  changeElementValue: (id: number, value: string) => void;
  changeCurrentSlide: (number: number) => void;
}>({
  getNumbersOfSlide: () => 1,
  getCurrentSlide: () => ({ number: 0, state: "normal" }),
  getThumbnails: () => [],
  addSlide: () => {},
  removeSlide: () => {},
  changeCurrentSlide: () => {},
  getElementsForSlide: () => [],
  addElement: () => {},
  removeElement: () => {},
  changeElementValue: () => {},
});
