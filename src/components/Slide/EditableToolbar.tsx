import { forwardRef, useState } from "react";
import styled from "styled-components";
import { Popover } from "react-text-selection-popover";
import { position } from "caret-pos";
import { ReactComponent as BoldIcon } from "bootstrap-icons/icons/type-bold.svg";
import { ReactComponent as ItalicIcon } from "bootstrap-icons/icons/type-italic.svg";
import { ReactComponent as ClearFormattingIcon } from "bootstrap-icons/icons/x.svg";
import { ReactComponent as LinkIcon } from "bootstrap-icons/icons/link-45deg.svg";
import { ReactComponent as CheckIcon } from "bootstrap-icons/icons/check.svg";
import { ReactComponent as CancelIcon } from "bootstrap-icons/icons/x.svg";

const StyledPopover = styled.div<{ left: number; top: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  margin-left: -75px;
  width: 150px;
  background: none;
  font-size: 0.7em;
  text-align: center;
  border-radius: 3px;
`;

const ToolButton = styled.button`
  padding: 0.5em;
  margin-right: 0.2em;
`;

/**
 * INCOMPLETE
 * https://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376#13950376
 */
const saveSelection = function (containerEl: any) {
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
  }
};

const restoreSelection = function (containerEl: any, savedSel: any) {
  var charIndex = 0,
    range = document.createRange();
  range.setStart(containerEl, 0);
  range.collapse(true);
  var nodeStack = [containerEl],
    node,
    foundStart = false,
    stop = false;

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType == 3) {
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
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

function EditableToolbar(_: any, ref: any) {
  const [showLinkText, setShowLinkText] = useState(false);
  const [linkText, setLinkText] = useState("");

  if (!ref.current) {
    return <></>;
  }

  return (
    <Popover
      render={({ clientRect, isCollapsed, textContent }) => {
        if (clientRect == null || isCollapsed) return null;

        const range = saveSelection(ref.current);

        return (
          <StyledPopover
            left={clientRect.left + clientRect.width / 2}
            top={clientRect.top - 40}
          >
            {showLinkText && (
              <>
                <input
                  type="text"
                  onMouseDown={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    e.target.focus();
                  }}
                  onChange={(e: any) => setLinkText(e.target.value)}
                />
                <ToolButton
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (ref.current) {
                      setShowLinkText(false);
                      ref.current.innerHTML = ref.current.innerHTML.replace(
                        `${textContent}`,
                        `<b>${textContent}</b>`
                      );
                      if (range) {
                        restoreSelection(ref.current, range);
                      }
                    }
                  }}
                >
                  <CheckIcon />
                </ToolButton>
                <ToolButton
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
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowLinkText(true);
                  }}
                >
                  <LinkIcon />
                </ToolButton>
                <ToolButton
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (ref.current) {
                      ref.current.innerHTML = ref.current.innerHTML.replace(
                        `${textContent}`,
                        `<b>${textContent}</b>`
                      );
                      if (range) {
                        restoreSelection(ref.current, range);
                      }
                    }
                  }}
                >
                  <BoldIcon />
                </ToolButton>
                <ToolButton
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (ref.current) {
                      ref.current.innerHTML = ref.current.innerHTML.replace(
                        `${textContent}`,
                        `<i>${textContent}</i>`
                      );
                      if (range) {
                        restoreSelection(ref.current, range);
                      }
                    }
                  }}
                >
                  <ItalicIcon />
                </ToolButton>
                <ToolButton
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (ref.current) {
                      ref.current.innerHTML = ref.current.innerHTML.replace(
                        /<\/?[b|i]+(>|$)/g,
                        ""
                      );
                    }
                  }}
                >
                  <ClearFormattingIcon />
                </ToolButton>
              </>
            )}
          </StyledPopover>
        );
      }}
    />
  );
}

export default forwardRef(EditableToolbar);
