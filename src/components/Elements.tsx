import { useContext } from "react";

import { Context } from "../context";

function App() {
  const { addElement, getCurrentSlide } = useContext(Context);

  const currentSlide = getCurrentSlide();
  return (
    <div style={{ position: "absolute" }}>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 1,
            value: "Edit me",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        H1
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 2,
            value: "Edit me",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        H2
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 3,
            value: "Edit me",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        H3
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 4,
            value: "Edit me",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        H4
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 5,
            value: "Edit me",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        H5
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 6,
            value: "Edit me",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        H6
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "paragraph",
            value: "Long text here, double click to edit",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        P
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "image",
            value: "https://via.placeholder.com/500x500",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        Img
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "list",
            value: " · hello there",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        Li
      </button>
    </div>
  );
}

export default App;
