import styled from "styled-components";

const StyledButton = styled.button`
  padding: 1em;
  margin-right: 0.3em;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #737373;

  svg {
    vertical-align: middle;
    width: 1.5em;
    height: 1.5em;
  }

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  &:focus {
    border: 1px solid #737373;
  }

  &:active {
    box-shadow: inset 0 0 1px #000000;
  }

  &:hover {
    color: black;
  }
`;

export default StyledButton;
