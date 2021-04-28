import "styled-components";

import { Colours } from "./context/deck";
interface IPalette {
  main: string;
  contrastText: string;
}
declare module "styled-components" {
  export interface DefaultTheme {
    colours: Colours;
  }
}
