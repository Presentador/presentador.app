import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  width: 150px;
  height: 100px;
  vertical-align: middle;
  border: 1px solid black;
  cursor: pointer;
`;

function ThumbnailAdd({ addSlide }: { addSlide: () => void }) {
  return (
    <StyledButton
      onMouseDown={() => {
        addSlide();
      }}
    >
      +
    </StyledButton>
  );
}

export default ThumbnailAdd;
