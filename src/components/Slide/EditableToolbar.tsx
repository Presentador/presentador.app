import sanitizeHtml from "sanitize-html";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as BoldIcon } from "bootstrap-icons/icons/type-bold.svg";
import { ReactComponent as ItalicIcon } from "bootstrap-icons/icons/type-italic.svg";
import { ReactComponent as LinkIcon } from "bootstrap-icons/icons/link-45deg.svg";
import { ReactComponent as CheckIcon } from "bootstrap-icons/icons/check.svg";
import { ReactComponent as CancelIcon } from "bootstrap-icons/icons/x.svg";

const StyledPopover = styled.div<{ left: number; top: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  background: none;
  font-size: 0.7em;
  text-align: center;
  border-radius: 3px;
`;

const ToolButton = styled.button`
  padding: 0.5em;
  margin-right: 0.2em;
  vertical-align: middle;
`;

const LinkInput = styled.input`
  margin-right: 0.2em;
  vertical-align: middle;
  padding: 0.5em;
`;

/**
 * REFS
 * - https://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376
 * - https://github.com/juliankrispel/use-text-selection/blob/master/src/index.tsx
 * - https://stackoverflow.com/questions/37054885/keep-text-selected-when-focus-input
 */
function saveSelection(containerEl: any) {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length,
    };
  } else {
    return {};
  }
}

function restoreSelection(containerEl: any, savedSel: any) {
  const nodeStack = [containerEl];

  const range = document.createRange();
  range.setStart(containerEl, 0);
  range.collapse(true);

  let charIndex = 0;
  let node;
  let foundStart = false;
  let stop = false;

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType === 3) {
      var nextCharIndex = charIndex + node.length;
      if (
        !foundStart &&
        savedSel.start >= charIndex &&
        savedSel.start <= nextCharIndex
      ) {
        range.setStart(node, savedSel.start - charIndex);
        foundStart = true;
      }
      if (
        foundStart &&
        savedSel.end >= charIndex &&
        savedSel.end <= nextCharIndex
      ) {
        range.setEnd(node, savedSel.end - charIndex);
        stop = true;
      }
      charIndex = nextCharIndex;
    } else {
      var i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  var sel = window.getSelection();
  if (sel) {
    console.log(sel);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function EditableToolbar(_: any, ref: any) {
  const [showLinkText, setShowLinkText] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [pos, setPos] = useState([0, 0]);
  const [range, setRange] = useState<Range | null>(null);
  const [selection, setSelection] = useState({});
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseup", () => {
        if (window.getSelection) {
          const selection = window.getSelection();
          if (selection) {
            const textContent = selection.toString().trim();
            setTextContent(textContent);

            if (selection.getRangeAt && selection.rangeCount) {
              setSelection(saveSelection(ref.current));
              const range = selection.getRangeAt(0);
              if (range && textContent !== "") {
                const rects = range.getBoundingClientRect();
                const parentPos = ref.current.getBoundingClientRect();

                setRange(range);
                setPos([
                  rects.top - parentPos.top - 40,
                  rects.left - parentPos.left + rects.width / 2,
                ]);
              }
            }
          }
        }
      });
    }
  }, []); // eslint-disable-line

  if (!ref.current) {
    return <></>;
  }

  if (textContent === "") {
    return <></>;
  }

  return (
    <StyledPopover top={pos[0]} left={pos[1]}>
      {showLinkText && (
        <>
          <LinkInput
            placeholder="https://example.com"
            type="text"
            onMouseDown={(e: any) => {
              e.stopPropagation();
              if (range) {
                const span = document.createElement("span");
                span.className = "selected";
                span.style.backgroundColor = "dodgerblue";
                span.style.color = "white";
                range.surroundContents(span);
              }
            }}
            onChange={(e: any) => setLinkText(e.target.value)}
          />
          <ToolButton
            data-tooltip="Insert"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (ref.current) {
                setShowLinkText(false);
                if (range) {
                  const link = document.createElement("a");
                  link.href = linkText;
                  range.surroundContents(link);
                  // remove span
                  ref.current.innerHTML = sanitizeHtml(ref.current.innerHTML, {
                    allowedTags: ["b", "i", "a", "li"],
                    allowedAttributes: { a: ["href"] },
                  });
                  restoreSelection(ref.current, selection);
                }
              }
            }}
          >
            <CheckIcon />
          </ToolButton>
          <ToolButton
            data-tooltip="Cancel"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (ref.current) {
                setShowLinkText(false);
              }
            }}
          >
            <CancelIcon />
          </ToolButton>
        </>
      )}
      {!showLinkText && (
        <>
          <ToolButton
            data-tooltip="Link"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowLinkText(true);
            }}
          >
            <LinkIcon />
          </ToolButton>
          <ToolButton
            data-tooltip="Bold"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (ref.current) {
                if (range) {
                  const currentHTML = Array.prototype.map
                    .call(
                      range.cloneContents().childNodes,
                      (item) => item.innerHTML
                    )
                    .join();

                  if (currentHTML.indexOf("<b>")) {
                    const template = document.createElement("div");
                    template.innerHTML = sanitizeHtml(currentHTML, {
                      allowedTags: ["i", "a"],
                      allowedAttributes: { a: ["href"] },
                    });
                    const frag = document.createDocumentFragment();
                    let child;
                    while ((child = template.firstChild)) {
                      frag.appendChild(child);
                    }
                    range.deleteContents();
                    range.insertNode(frag);
                  } else {
                    range.surroundContents(document.createElement("b"));
                  }
                }
              }
            }}
          >
            <BoldIcon />
          </ToolButton>
          <ToolButton
            data-tooltip="Italic"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (ref.current) {
                if (range) {
                  range.surroundContents(document.createElement("i"));
                }
              }
            }}
          >
            <ItalicIcon />
          </ToolButton>
        </>
      )}
    </StyledPopover>
  );
}

export default forwardRef(EditableToolbar);
