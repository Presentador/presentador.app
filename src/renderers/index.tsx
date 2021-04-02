import { Builder, State } from "../types";

import { SingleHeaderRenderer, SingleHeaderBuilder } from "./singleHeader";
import { TwoHeadersRenderer, TwoHeadersBuilder } from "./twoHeaders";
import { NormalRenderer, NormalBuilder } from "./normal";
import {
  HeaderSingleParagraphRenderer,
  HeaderSingleParagraphBuilder,
} from "./headerSingleParagraph";
import { BlockquoteRenderer, BlockquoteBuilder } from "./blockquote";
import {
  HeaderManyParagraphsRenderer,
  HeaderManyParagraphsBuilder,
} from "./headerManyParagraphs";
import {
  HeaderCodeblockRenderer,
  HeaderCodeblockBuilder,
} from "./headerCodeblock";
import {
  HeaderManyParagraphsImageRenderer,
  HeaderManyParagraphsImageBuilder,
} from "./headerManyParagraphsImage";
import {
  HeaderParagraphImageRenderer,
  HeaderParagraphImageBuilder,
} from "./headerParagraphImage";
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
  headerSingleParagraph: HeaderSingleParagraphRenderer,
  headerCodeblock: HeaderCodeblockRenderer,
  headerManyParagraphsImage: HeaderManyParagraphsImageRenderer,
  headerParagraphImage: HeaderParagraphImageRenderer,
  image: ImageRenderer,
  manyImages: ManyImagesRenderer,
  headerImage: HeaderImageRenderer,
  headerList: HeaderListRenderer,
  headerListImage: HeaderListImageRenderer,
  blockquote: BlockquoteRenderer,
  headerManyParagraphs: HeaderManyParagraphsRenderer,
  headerBlockquote: HeaderBlockquoteRenderer,
};

export const buildersMap: Record<State, Builder> = {
  singleHeader: SingleHeaderBuilder,
  twoHeaders: TwoHeadersBuilder,
  normal: NormalBuilder,
  headerSingleParagraph: HeaderSingleParagraphBuilder,
  headerCodeblock: HeaderCodeblockBuilder,
  headerManyParagraphsImage: HeaderManyParagraphsImageBuilder,
  headerParagraphImage: HeaderParagraphImageBuilder,
  image: ImageBuilder,
  manyImages: ManyImagesBuilder,
  headerImage: HeaderImageBuilder,
  headerList: HeaderListBuilder,
  headerListImage: HeaderListImageBuilder,
  blockquote: BlockquoteBuilder,
  headerManyParagraphs: HeaderManyParagraphsBuilder,
  headerBlockquote: HeaderBlockquoteBuilder,
};
