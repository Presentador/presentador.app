import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as BoldIcon } from "bootstrap-icons/icons/type-bold.svg";
import { ReactComponent as ItalicIcon } from "bootstrap-icons/icons/type-italic.svg";
import { ReactComponent as LinkIcon } from "bootstrap-icons/icons/link-45deg.svg";
import { ReactComponent as CheckIcon } from "bootstrap-icons/icons/check.svg";
import { ReactComponent as CancelIcon } from "bootstrap-icons/icons/x.svg";
import rangyClassApplier from "rangy/lib/rangy-classapplier";
import rangySelectionSaveRestore from "rangy/lib/rangy-selectionsaverestore";

const StyledPopover = styled.div<{ left: number; top: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  transform: translate(-50%, 0);
  z-index: 9999999999;
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

function EditableToolbar(_: any, ref: any) {
  const [showLinkText, setShowLinkText] = useState(false);
  const [textSelected, setTextSelected] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [pos, setPos] = useState([0, 0]);
  const [selection, setSelection] = useState({});
  const [textContent, setTextContent] = useState("");

  // user text selection handling
  useEffect(() => {
    const handler = () => {
      const selection = rangySelectionSaveRestore.getSelection();
      const textContent = selection.toString().trim();
      setTextContent(textContent);
      setShowLinkText(false);
      setTextSelected(false);

      if (selection.getRangeAt && selection.rangeCount) {
        const range = selection.getAllRanges()[0].nativeRange;
        if (range && textContent !== "") {
          const rects = range.getBoundingClientRect();
          const parentPos = ref.current.getBoundingClientRect();

          setTextSelected(true);
          setPos([
            rects.top - parentPos.top - 40,
            rects.left - parentPos.left + rects.width / 2,
          ]);
        }
      }
    };

    const element = ref.current;
    if (ref.current) {
      element.addEventListener("mouseup", handler);
      element.addEventListener("keyup", handler);

      return () => {
        element.removeEventListener("mouseup", handler);
        element.removeEventListener("keyup", handler);
      };
    }
  }, []); // eslint-disable-line

  // keyboard shortcuts
  useEffect(() => {
    const handler = (event: any) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        applyBold();
      }
      if (event.key === "i" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        applyItalic();
      }
    };

    const element = ref.current;
    if (ref.current) {
      element.addEventListener("keydown", handler);

      return () => {
        element.removeEventListener("keydown", handler);
      };
    }
  }, []); // eslint-disable-line

  function applyLink() {
    const sel = rangySelectionSaveRestore.getSelection();
    if (sel.anchorNode.parentNode.tagName === "A") {
      const applier = (rangyClassApplier as any).createClassApplier("link", {
        elementTagName: "a",
        elementAttributes: {
          href: sel.anchorNode.parentNode.getAttribute("href"),
        },
      });
      if (applier.isAppliedToSelection()) {
        applier.undoToSelection();
      } else {
        setShowLinkText(true);
      }
    } else {
      setShowLinkText(true);
    }
  }

  function applyItalic() {
    const applier = (rangyClassApplier as any).createClassApplier("italic");
    applier.toggleSelection();
  }

  function applyBold() {
    const applier = (rangyClassApplier as any).createClassApplier("bold");
    applier.toggleSelection();
  }

  if (!ref.current) {
    return <></>;
  }

  if (textContent === "") {
    return <></>;
  }

  if (!textSelected) {
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
              setSelection(rangySelectionSaveRestore.saveSelection());
            }}
            onChange={(e: any) => setLinkText(e.target.value)}
          />
          <ToolButton
            data-tooltip="Insert"
            disabled={
              !linkText.match(
                new RegExp(
                  // eslint-disable-next-line
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
                )
              )
            }
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowLinkText(false);
              rangySelectionSaveRestore.restoreSelection(selection);
              const applier = (rangyClassApplier as any).createClassApplier(
                "link",
                {
                  elementTagName: "a",
                  elementAttributes: { href: linkText },
                }
              );
              applier.toggleSelection();
            }}
          >
            <CheckIcon />
          </ToolButton>
          <ToolButton
            data-tooltip="Cancel"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowLinkText(false);
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
              applyLink();
            }}
          >
            <LinkIcon />
          </ToolButton>
          <ToolButton
            data-tooltip="Bold"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              applyBold();
            }}
          >
            <BoldIcon />
          </ToolButton>
          <ToolButton
            data-tooltip="Italic"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              applyItalic();
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
