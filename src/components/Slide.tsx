import { useContext, forwardRef } from "react";

import { Context } from "../context";

import Header from "./elements/Header";
import Paragraph from "./elements/Paragraph";
import Image from "./elements/Image";
import List from "./elements/List";
import renderers from "../renderers";

function App(_: any, ref: any) {
  const {
    getCurrentSlide,
    getElementsForSlide,
    removeElement,
    changeElementValue,
  } = useContext(Context);

  const Wrapper = renderers[getCurrentSlide().state];

  return (
    <div className={getCurrentSlide().state} ref={ref}>
      <Wrapper>
        {getElementsForSlide(getCurrentSlide().number).map((item) => {
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
  );
}

export default forwardRef<HTMLDivElement>(App);
