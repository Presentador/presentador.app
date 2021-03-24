import { State } from "./types";

export const states: Record<State, any> = {
  normal: {
    add: (type: string) => {
      if (type === "heading") return "singleHeader";
      if (type === "image") return "image";
      if (type === "block_quote") return "blockquote";
    },
    remove: (type: string) => {
      return "normal";
    },
  },
  blockquote: {
    add: (type: string) => {
      if (type === "paragraph") return "blockquote";
    },
    remove: (type: string) => {
      return "normal";
    },
  },
  image: {
    add: (type: string) => {
      if (type === "image") return "manyImages";
    },
    remove: (type: string) => {
      return "normal";
    },
  },
  manyImages: {
    add: (type: string) => {
      if (type === "image") return "manyImages";
    },
    remove: (type: string) => {
      return "normal";
    },
  },
  singleHeader: {
    add: (type: string) => {
      if (type === "heading") return "twoHeaders";
      if (type === "paragraph") return "headerSingleParagraph";
      if (type === "list") return "headerList";
      if (type === "image") return "headerImage";
      if (type === "code_block") return "headerCodeblock";
    },
    remove: (type: string) => {
      return "normal";
    },
  },
  twoHeaders: {
    add: (type: string) => {
      return "normal";
    },
    remove: (type: string) => {
      return "singleHeader";
    },
  },
  headerList: {
    add: (type: string) => {
      return "normal";
    },
    remove: (type: string) => {
      return "singleHeader";
    },
  },
  headerImage: {
    add: (type: string) => {
      return "normal";
    },
    remove: (type: string) => {
      console.log(type);
      if (type === "image") return "singleHeader";
      if (type === "heading") return "image";
    },
  },
  headerSingleParagraph: {
    add: (type: string) => {
      if (type === "paragraph") return "headerManyParagraphs";
      if (type === "image") return "headerParagraphImage";
    },
    remove: (type: string) => {
      if (type === "heading") return "normal";
      if (type === "paragraph") return "singleHeader";
    },
  },
  headerManyParagraphs: {
    add: (type: string) => {
      if (type === "paragraph") return "headerManyParagraphs";
      if (type === "image") return "headerManyParagraphsImage";
    },
    remove: (type: string) => {
      return "normal";
    },
  },
};
