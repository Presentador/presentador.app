import React, { useState } from "react";

import { Slide, Element } from "../types";

import { buildersMap } from "../renderers";

export function useSlidesState() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([
    { state: "normal", elements: [] },
  ]);

  function addSlide(at: number = slides.length) {
    const first = slides.slice(0, at);
    const rest = slides.slice(at);
    setSlides([...first, { state: "normal", elements: [] }, ...rest]);
    setCurrentSlide(at);
  }
  function removeSlide(number: number) {
    setSlides(slides.filter((_, index) => index !== number));
    setCurrentSlide(
      currentSlide === slides.length - 1 ? currentSlide - 1 : currentSlide
    );
  }

  async function addElement(slideNumber: number, item: Element) {
    setSlides(
      slides.map((slide, index) => {
        if (index !== slideNumber) {
          return slide;
        }

        const nextState = buildersMap[slide.state].add(
          item.type,
          slide.elements
        );

        return {
          elements: [...slide.elements, item],
          state: nextState,
        };
      })
    );
  }

  function removeElement(slideNumber: number, id: number) {
    setSlides(
      slides.map((slide, index) => {
        if (index !== slideNumber) {
          return slide;
        }

        const element = slide.elements.find((item) => item.id === id);

        if (!element) {
          return slide;
        }

        const nextState = buildersMap[slide.state].remove(
          element.type,
          slide.elements
        );

        return {
          elements: slide.elements.filter((item) => item.id !== id),
          state: nextState,
        };
      })
    );
  }

  function changeElementValue(slideNumber: number, id: number, value: string) {
    setSlides(
      slides.map((slide, index) => {
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

  function changeCurrentSlide(number: number) {
    setCurrentSlide(number);
  }

  return {
    slides,
    currentSlide,
    addElement,
    removeElement,
    changeElementValue,
    changeCurrentSlide,
    addSlide,
    removeSlide,
  };
}

export const SlidesContext = React.createContext<{
  currentSlide: number;
  slides: Slide[];
  removeSlide: (id: number) => void;
  addSlide: (id?: number) => void;
  addElement: (slideNumber: number, item: Element) => void;
  removeElement: (slideNumber: number, id: number) => void;
  changeElementValue: (slideNumber: number, id: number, value: string) => void;
  changeCurrentSlide: (number: number) => void;
}>({
  currentSlide: 0,
  slides: [],
  addSlide: () => {},
  removeSlide: () => {},
  changeCurrentSlide: () => {},
  addElement: () => {},
  removeElement: () => {},
  changeElementValue: () => {},
});
