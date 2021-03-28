export type State =
  | "normal"
  | "singleHeader"
  | "twoHeaders"
  | "singleHeader"
  | "headerCodeblock"
  | "headerManyParagraphs"
  | "headerManyParagraphsImage"
  | "headerParagraphImage"
  | "image"
  | "blockquote"
  | "manyImages"
  | "twoHeaders"
  | "headerSingleParagraph"
  | "headerList"
  | "headerImage"
  | "singleHeader"
  | "headerManyParagraphs";

export type ElementType =
  | "heading"
  | "image"
  | "list"
  | "code_block"
  | "paragraph"
  | "blockquote";

export type Element = {
  type: ElementType;
  value: string;
  level?: number;
  id: number;
  slide: number;
};

export type Slide = {
  number: number;
  state: State;
};

export interface Builder {
  add: (type: ElementType, elements: Element[]) => State;
  remove: (type: ElementType, elements: Element[]) => State;
}
