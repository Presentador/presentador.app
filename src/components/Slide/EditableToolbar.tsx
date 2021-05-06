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
  const [linkText, setLinkText] = useState("");
  const [pos, setPos] = useState([0, 0]);
  const [selection, setSelection] = useState({});
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseup", () => {
        const selection = rangySelectionSaveRestore.getSelection();
        const textContent = selection.toString().trim();
        setTextContent(textContent);

        if (selection.getRangeAt && selection.rangeCount) {
          const range = selection.getAllRanges()[0].nativeRange;
          if (range && textContent !== "") {
            const rects = range.getBoundingClientRect();
            const parentPos = ref.current.getBoundingClientRect();

            setPos([
              rects.top - parentPos.top - 40,
              rects.left - parentPos.left + rects.width / 2,
            ]);
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
              setSelection(rangySelectionSaveRestore.saveSelection());
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
                rangySelectionSaveRestore.restoreSelection(selection);
                const applier = (rangyClassApplier as any).createClassApplier(
                  "link",
                  {
                    elementTagName: "a",
                    elementAttributes: { href: linkText },
                  }
                );
                applier.toggleSelection();
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
              const applier = (rangyClassApplier as any).createClassApplier(
                "link",
                {
                  elementTagName: "a",
                  elementAttributes: { href: linkText },
                }
              );
              if (applier.isAppliedToSelection()) {
                applier.undoToSelection();
              } else {
                setShowLinkText(true);
              }
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
                const applier = (rangyClassApplier as any).createClassApplier(
                  "bold"
                );
                applier.toggleSelection();
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
                const applier = (rangyClassApplier as any).createClassApplier(
                  "italic"
                );
                applier.toggleSelection();
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
