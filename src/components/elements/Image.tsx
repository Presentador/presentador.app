import React, { useState } from "react";

import { Element } from "../../types";

function Image({
  item,
  removeElement,
}: {
  item: Element;
  removeElement: (id: number) => void;
}) {
  const [selected, setSelected] = useState(false);

  function finishEditing(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(false);
  }
  function edit(event: React.FocusEvent<HTMLDivElement>) {
    setSelected(true);
  }

  function remove() {
    removeElement(item.id);
  }

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <img
        src={item.value}
        alt={item.value}
        onBlur={finishEditing}
        onFocus={edit}
        tabIndex={-1}
        data-id={item.id}
        style={{
          padding: "5px",
          border: `${selected ? "1px solid red" : "none"}`,
        }}
      />
      {selected && (
        <button
          style={{ position: "absolute", top: 0, right: 0 }}
          onMouseDown={remove}
        >
          X
        </button>
      )}
    </span>
  );
}

export default Image;
