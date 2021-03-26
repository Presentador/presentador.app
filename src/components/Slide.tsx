import { useContext, forwardRef } from "react";
import styled from "styled-components";

import { Context } from "../context";

import Header from "./elements/Header";
import Paragraph from "./elements/Paragraph";
import Image from "./elements/Image";
import List from "./elements/List";
import Blockquote from "./elements/Blockquote";

import renderers from "../renderers";

const StyledSlide = styled.div`
  height: 100%;

  a {
    color: #51c2f7;
  }

  // taken from https://websemantics.uk/tools/responsive-font-calculator/
  @media (min-width: 12em) {
    font-size: calc(1rem + ((1vw - 0.48rem) * 0.6944));
    min-height: 0vw;
  }
  @media (min-width: 120em) {
    font-size: 1.5rem;
  }
`;

function Slide(_: any, ref: any) {
  const {
    getCurrentSlide,
    getElementsForSlide,
    removeElement,
    changeElementValue,
  } = useContext(Context);

  const Wrapper = renderers[getCurrentSlide().state];

  return (
    <StyledSlide className={getCurrentSlide().state} ref={ref}>
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
            case "blockquote": {
              return (
                <Blockquote
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
    </StyledSlide>
  );
}

export default forwardRef<HTMLDivElement>(Slide);
