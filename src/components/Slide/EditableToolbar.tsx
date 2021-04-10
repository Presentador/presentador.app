import { forwardRef } from "react";
import styled from "styled-components";
import { Popover } from "react-text-selection-popover";
import { position } from "caret-pos";
import { ReactComponent as BoldIcon } from "bootstrap-icons/icons/type-bold.svg";
import { ReactComponent as ItalicIcon } from "bootstrap-icons/icons/type-italic.svg";
import { ReactComponent as ClearFormattingIcon } from "bootstrap-icons/icons/x.svg";

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

function EditableToolbar(_: any, ref: any) {
  if (!ref.current) {
    return <></>;
  }

  return (
    <Popover
      render={({ clientRect, isCollapsed, textContent }) => {
        if (clientRect == null || isCollapsed) return null;

        return (
          <StyledPopover
            left={clientRect.left + clientRect.width / 2}
            top={clientRect.top - 40}
          >
            <ToolButton
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (ref.current) {
                  const pos = position(ref.current);
                  ref.current.innerHTML = ref.current.innerHTML.replace(
                    `${textContent}`,
                    `<b>${textContent}</b>`
                  );
                  position(ref.current, pos.pos);
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
                  const pos = position(ref.current);
                  ref.current.innerHTML = ref.current.innerHTML.replace(
                    `${textContent}`,
                    `<i>${textContent}</i>`
                  );
                  position(ref.current, pos.pos);
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
                  const pos = position(ref.current);
                  ref.current.innerHTML = ref.current.innerHTML.replace(
                    /<\/?[b|i]+(>|$)/g,
                    ""
                  );
                  position(ref.current, pos.pos);
                }
              }}
            >
              <ClearFormattingIcon />
            </ToolButton>
          </StyledPopover>
        );
      }}
    />
  );
}

export default forwardRef(EditableToolbar);
