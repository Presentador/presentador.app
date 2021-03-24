export type State =
  | "normal"
  | "singleHeader"
  | "twoHeaders"
  | "singleHeader"
  | "image"
  | "blockquote"
  | "manyImages"
  | "twoHeaders"
  | "headerSingleParagraph"
  | "headerList"
  | "headerImage"
  | "singleHeader"
  | "headerManyParagraphs";

export type Element = {
  type:
    | "heading"
    | "image"
    | "list"
    | "code_block"
    | "paragraph"
    | "block_quote";
  value: string;
  level?: number;
  id: number;
  slide: number;
};

export type Slide = {
  number: number;
  state: State;
};
