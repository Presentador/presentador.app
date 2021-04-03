import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Deck from "./Deck";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: "Roboto", sans-serif;
  }

  b {
    font-weight: bold;
  }

  i {
    font-style: italic;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Deck />
    </>
  );
}

export default App;
