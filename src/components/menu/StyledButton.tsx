import styled from "styled-components";

const StyledButton = styled.button`
  padding: 1em;
  margin-right: 0.3em;
  font-size: 1em;
  border: 1px solid #737373;
  border-radius: 5px;
  color: #737373;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: inset 0 0 1px #000000;
  }

  &:hover {
    color: black;
  }
`;

export default StyledButton;
