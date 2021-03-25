import { useContext, useState } from "react";

import { Context } from "../context";

function Thumbnail({
  src,
  active,
  number,
}: {
  src: string;
  active: boolean;
  number: number;
}) {
  const { removeSlide, getThumbnails } = useContext(Context);
  const [hover, setHover] = useState(false);

  const Tag =
    src !== "" ? (
      <img
        src={src}
        alt={`Slide`}
        style={{
          width: "100px",
          height: "100px",
          verticalAlign: "middle",
          border: active ? "1px solid red" : "none",
        }}
      />
    ) : (
      <div
        style={{
          display: "inline-block",
          width: "100px",
          height: "100px",
          verticalAlign: "middle",
          border: active ? "1px solid red" : "none",
        }}
      >
        Loading
      </div>
    );

  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {Tag}
      {hover && getThumbnails().length > 1 && (
        <button
          style={{ position: "absolute", top: 0, right: 0 }}
          onMouseDown={() => {
            removeSlide(number);
          }}
        >
          X
        </button>
      )}
    </span>
  );
}

export default Thumbnail;
