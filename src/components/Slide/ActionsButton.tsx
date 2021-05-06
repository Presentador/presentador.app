import styled from "styled-components";

export const ActionsButton = styled.button`
  padding: 0.5em;

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

export const ButtonsBar = styled.div`
  position: absolute;
  top: -2em;
  right: 0;
`;
