import styled from "styled-components";
import { useContext } from "react";

import { SlidesContext } from "../context/slides";
import { DeckContext } from "../context/deck";

import StyledButton from "./menu/StyledButton";
import Image from "./menu/Image";

const LeftStyledButton = styled.button`
  padding: 10px;
  margin-right: 50px;
`;

function Elements({ togglePresent }: { togglePresent: () => void }) {
  const { addElement } = useContext(SlidesContext);
  const { currentSlide } = useContext(DeckContext);

  return (
    <div>
      <LeftStyledButton
        onClick={() => {
          togglePresent();
        }}
      >
        Present
      </LeftStyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "heading",
            level: 1,
            value: "Heading 1",
          })
        }
      >
        H1
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "heading",
            level: 2,
            value: "Heading 2",
          })
        }
      >
        H2
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "heading",
            level: 3,
            value: "Heading 3",
          })
        }
      >
        H3
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "heading",
            level: 4,
            value: "Heading 4",
          })
        }
      >
        H4
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "heading",
            level: 5,
            value: "Heading 5",
          })
        }
      >
        H5
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "heading",
            level: 6,
            value: "Heading 6",
          })
        }
      >
        H6
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "paragraph",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          })
        }
      >
        P
      </StyledButton>
      <Image />
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "list",
            value: "Point one to make",
          })
        }
      >
        Li
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement(currentSlide, {
            id: new Date().getTime(),
            type: "blockquote",
            value: "A wise man once said...",
          })
        }
      >
        Q
      </StyledButton>
    </div>
  );
}

export default Elements;
