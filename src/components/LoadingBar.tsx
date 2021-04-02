import styled from "styled-components";

const colours = [
  "#e3fafc",
  "#c5f6fa",
  "#99e9f2",
  "#66d9e8",
  "#3bc9db",
  "#22b8cf",
  "#15aabf",
  "#1098ad",
  "#0c8599",
  "#0b7285",
];

const StyledLoadingBar = styled.div<{ loading: boolean }>`
  height: 2px;
  width: 100%;
  ${({ loading }) =>
    loading
      ? `background-image: linear-gradient(to right, ${colours.join(",")})`
      : "background: #e3fafc"};
  animation: ${({ loading }) =>
    loading ? "colorAnimation 0.7s infinite" : "none"};

  @keyframes colorAnimation {
    ${colours
      .reduce(
        (initial, _, index) => {
          const current = initial[index];
          const first = current.slice(0, -1);
          const last = current.slice(-1);
          return [...initial, [...last, ...first]];
        },
        [colours]
      )
      .map(
        (item, index) => `
    ${(100 * index) / colours.length}% {
      background-image: linear-gradient(
        to right,
        ${item.join(",")}
      );
    }
    `
      )}
  }
`;

function LoadingBar() {
  return <StyledLoadingBar loading={false} />;
}

export default LoadingBar;
