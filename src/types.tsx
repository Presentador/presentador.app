export type State =
  | "normal"
  | "singleHeader"
  | "twoHeaders"
  | "singleHeader"
  | "headerCodeblock"
  | "headerBlockquote"
  | "headerParagraphs"
  | "headerParagraphsImage"
  | "image"
  | "blockquote"
  | "manyImages"
  | "twoHeaders"
  | "headerList"
  | "headerListImage"
  | "headerImage"
  | "singleHeader";

export type ElementType =
  | "heading"
  | "image"
  | "list"
  | "codeblock"
  | "paragraph"
  | "footer"
  | "blockquote";

export type Element = {
  type: ElementType;
  value: string;
  level?: number;
  listType?: "ordered" | "unordered";
  id: number;
};

export type Slide = {
  state: State;
  elements: Element[];
};

export interface Builder {
  add: (type: ElementType, existingElements: Element[]) => State;
  remove: (type: ElementType, remainingElements: Element[]) => State;
}
