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
};
