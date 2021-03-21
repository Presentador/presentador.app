import SingleHeader from "./singleHeader";
import TwoHeaders from "./twoHeaders";
import Normal from "./normal";
import HeaderSingleParagraph from "./headerSingleParagraph";
import Image from "./image";
import ManyImages from "./manyImages";
import HeaderImage from "./headerImage";
import HeaderList from "./headerList";

const map = {
  singleHeader: SingleHeader,
  twoHeaders: TwoHeaders,
  normal: Normal,
  headerSingleParagraph: HeaderSingleParagraph,
  image: Image,
  manyImages: ManyImages,
  headerImage: HeaderImage,
  headerList: HeaderList,
};

export default map;
