import { State } from "../types";

import SingleHeader from "./singleHeader";
import TwoHeaders from "./twoHeaders";
import Normal from "./normal";
import HeaderSingleParagraph from "./headerSingleParagraph";
import Blockquote from "./blockquote";
import HeaderManyParagraphs from "./headerManyParagraphs";
import HeaderCodeblock from "./headerCodeblock";
import HeaderManyParagraphsImage from "./headerManyParagraphsImage";
import HeaderParagraphImage from "./headerParagraphImage";
import Image from "./image";
import ManyImages from "./manyImages";
import HeaderImage from "./headerImage";
import HeaderList from "./headerList";

const map: Record<State, any> = {
  singleHeader: SingleHeader,
  twoHeaders: TwoHeaders,
  normal: Normal,
  headerSingleParagraph: HeaderSingleParagraph,
  headerCodeblock: HeaderCodeblock,
  headerManyParagraphsImage: HeaderManyParagraphsImage,
  headerParagraphImage: HeaderParagraphImage,
  image: Image,
  manyImages: ManyImages,
  headerImage: HeaderImage,
  headerList: HeaderList,
  blockquote: Blockquote,
  headerManyParagraphs: HeaderManyParagraphs,
};

export default map;
