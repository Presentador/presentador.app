import { useContext } from "react";

import { Context } from "../context";

function App() {
  const { addElement, getCurrentSlide } = useContext(Context);

  const currentSlide = getCurrentSlide();
  return (
    <div style={{}}>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "heading",
            level: 1,
            value: "Heading 1",
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
            value: "Heading 2",
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
            value: "Heading 3",
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
            value: "Heading 4",
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
            value: "Heading 5",
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
            value: "Heading 6",
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
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
            value: "Point one to make",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        Li
      </button>
      <button
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "blockquote",
            value: "A wise man once said...",
          })
        }
        style={{ padding: "10px", marginRight: "5px" }}
      >
        Q
      </button>
    </div>
  );
}

export default App;
