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
    overflow: hidden;
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


  // Credits to: https://codepen.io/cbracco/pen/qzukg
  /* Add this attribute to the element that needs a tooltip */
  [data-tooltip] {
    position: relative;
    z-index: 99999999;
    cursor: pointer;
    white-space: nowrap;
  }

  /* Hide the tooltip content by default */
  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: hidden;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
    opacity: 0;
    pointer-events: none;
  }

  /* Position tooltip above the element */
  [data-tooltip]:before {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-top: 5px;
    transform: translate(-50%, 0);
    padding: 7px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    // text-align: center;
    font-size: 0.9em;
    line-height: 1.2;
  }

  /* Triangle hack to make tooltip look like a speech bubble */
  [data-tooltip]:after {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 0;
    border-bottom: 5px solid #000;
    border-bottom: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  /* Show tooltip content on hover */
  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    visibility: visible;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
    opacity: 1;
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
