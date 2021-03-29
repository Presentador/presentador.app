import styled from "styled-components";
import { useContext } from "react";

import { Context } from "../context";

const StyledButton = styled.button`
  padding: 10px;
  margin-right: 5px;
`;

const LeftStyledButton = styled.button`
  padding: 10px;
  margin-right: 50px;
`;

function Elements({ togglePresent }: { togglePresent: () => void }) {
  const { addElement, currentSlide } = useContext(Context);

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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "paragraph",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          })
        }
      >
        P
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "image",
            value: "https://via.placeholder.com/500x500",
          })
        }
      >
        Img
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
            type: "list",
            value: "Point one to make",
          })
        }
      >
        Li
      </StyledButton>
      <StyledButton
        onClick={() =>
          addElement({
            id: new Date().getTime(),
            slide: currentSlide.number,
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
