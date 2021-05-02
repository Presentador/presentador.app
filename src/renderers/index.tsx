import { Builder, State } from "../types";

import { SingleHeaderRenderer, SingleHeaderBuilder } from "./singleHeader";
import { TwoHeadersRenderer, TwoHeadersBuilder } from "./twoHeaders";
import { NormalRenderer, NormalBuilder } from "./normal";
import { BlockquoteRenderer, BlockquoteBuilder } from "./blockquote";
import {
  HeaderParagraphsRenderer,
  HeaderParagraphsBuilder,
} from "./headerParagraphs";
import {
  HeaderCodeblockRenderer,
  HeaderCodeblockBuilder,
} from "./headerCodeblock";

import {
  HeaderParagraphsImageRenderer,
  HeaderParagraphsImageBuilder,
} from "./headerParagraphsImage";
import { ImageRenderer, ImageBuilder } from "./image";
import { ManyImagesRenderer, ManyImagesBuilder } from "./manyImages";
import { HeaderImageRenderer, HeaderImageBuilder } from "./headerImage";
import {
  HeaderBlockquoteRenderer,
  HeaderBlockquoteBuilder,
} from "./headerBlockquote";
import { HeaderListRenderer, HeaderListBuilder } from "./headerList";
import {
  HeaderListImageRenderer,
  HeaderListImageBuilder,
} from "./headerListImage";

export const renderersMap: Record<State, any> = {
  singleHeader: SingleHeaderRenderer,
  twoHeaders: TwoHeadersRenderer,
  normal: NormalRenderer,
  headerCodeblock: HeaderCodeblockRenderer,
  headerParagraphsImage: HeaderParagraphsImageRenderer,
  image: ImageRenderer,
  manyImages: ManyImagesRenderer,
  headerImage: HeaderImageRenderer,
  headerList: HeaderListRenderer,
  headerListImage: HeaderListImageRenderer,
  blockquote: BlockquoteRenderer,
  headerParagraphs: HeaderParagraphsRenderer,
  headerBlockquote: HeaderBlockquoteRenderer,
};

export const buildersMap: Record<State, Builder> = {
  singleHeader: SingleHeaderBuilder,
  twoHeaders: TwoHeadersBuilder,
  normal: NormalBuilder,
  headerCodeblock: HeaderCodeblockBuilder,
  headerParagraphsImage: HeaderParagraphsImageBuilder,
  image: ImageBuilder,
  manyImages: ManyImagesBuilder,
  headerImage: HeaderImageBuilder,
  headerList: HeaderListBuilder,
  headerListImage: HeaderListImageBuilder,
  blockquote: BlockquoteBuilder,
  headerParagraphs: HeaderParagraphsBuilder,
  headerBlockquote: HeaderBlockquoteBuilder,
};
