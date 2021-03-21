import React, { useState, useRef } from "react";

import { Element } from "./types";
import Header from "./Header";
import Paragraph from "./Paragraph";
import Image from "./Image";
import List from "./List";
import renderers from "./renderers";
import { states } from "./builder";

import "./renderers/index.scss";

function useSlideState() {
  const [elements, setElements] = useState<Element[]>([]);
  const [slideState, setSlideState] = useState<
    "normal" | "singleHeader" | "twoHeaders"
  >("normal");

  function addElement(item: Element) {
    setElements([...elements, item]);

    if (states[slideState]) {
      const nextState = states[slideState].add(item.type);
      if (nextState) {
        setSlideState(nextState);
      }
    } else {
      setSlideState("normal");
    }
  }

  function removeElement(id: number) {
    const item = elements.find((item) => item.id === id);
    setElements([...elements.filter((item) => item.id !== id)]);

    if (states[slideState]) {
      const nextState = states[slideState].remove(item && item.type);
      if (nextState) {
        setSlideState(nextState);
      }
    } else {
      setSlideState("normal");
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

  return {
    slideState,
    elements,
    addElement,
    removeElement,
    changeElementValue,
  };
}
function App() {
  const {
    slideState,
    elements,
    addElement,
    removeElement,
    changeElementValue,
  } = useSlideState();

  const Wrapper = renderers[slideState];

  return (
    <>
      <div style={{ position: "absolute" }}>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "heading",
              level: 1,
              value: "Edit me",
            })
          }
        >
          Heading 1
        </button>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "heading",
              level: 2,
              value: "Edit me",
            })
          }
        >
          Heading 2
        </button>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "heading",
              level: 3,
              value: "Edit me",
            })
          }
        >
          Heading 3
        </button>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "heading",
              level: 4,
              value: "Edit me",
            })
          }
        >
          Heading 4
        </button>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "paragraph",
              value: "Long text here, double click to edit",
            })
          }
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "image",
              value: "https://via.placeholder.com/500x500",
            })
          }
        >
          Image
        </button>
        <button
          onClick={() =>
            addElement({
              id: new Date().getTime(),
              type: "list",
              value: " · hello there",
            })
          }
        >
          List
        </button>
      </div>
      <div className={slideState}>
        <Wrapper>
          {elements.map((item) => {
            switch (item.type) {
              case "heading": {
                return (
                  <Header
                    key={item.id}
                    removeElement={removeElement}
                    changeElementValue={changeElementValue}
                    level={item.level as number}
                    item={item}
                  />
                );
              }
              case "paragraph": {
                return (
                  <Paragraph
                    key={item.id}
                    item={item}
                    removeElement={removeElement}
                    changeElementValue={changeElementValue}
                  />
                );
              }
              case "image": {
                return (
                  <Image
                    key={item.id}
                    item={item}
                    removeElement={removeElement}
                  />
                );
              }
              case "list": {
                return (
                  <List
                    key={item.id}
                    item={item}
                    removeElement={removeElement}
                    changeElementValue={changeElementValue}
                  />
                );
              }
              default: {
                return <></>;
              }
            }
          })}
        </Wrapper>
      </div>
    </>
  );
}

export default App;
