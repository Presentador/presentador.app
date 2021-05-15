import styled from "styled-components";
import { ReactComponent as ExitIcon } from "bootstrap-icons/icons/box-arrow-left.svg";

import StyledButton from "./Menu/StyledButton";

const Container = styled.div`
  display: flex;
  flex-orientation: column;
  align-items: center;
  justify-content: center;
  padding: 0.1em 0.5em;
`;

const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 2;
  text-align: center;
`;
const Right = styled.div`
  text-align: right;
  flex: 1;
`;

function PresentMenu({ togglePresent }: { togglePresent: () => void }) {
  return (
    <Container>
      <Left>
        <StyledButton
          onClick={() => {
            togglePresent();
          }}
          title="Exit"
          data-tooltip="Exit present mode"
        >
          <ExitIcon />
        </StyledButton>
      </Left>
      <Center></Center>
      <Right></Right>
    </Container>
  );
}

export default PresentMenu;
