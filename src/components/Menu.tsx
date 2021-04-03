import styled from "styled-components";
import { useRef } from "react";
import { FileSystemHandle } from "browser-fs-access";

import StyledButton from "./menu/StyledButton";
import Elements from "./Elements";
import Save from "./menu/Save";
import Load from "./menu/Load";
import { ReactComponent as GitHubIcon } from "../icons/github.svg";
import { ReactComponent as HelpIcon } from "../icons/help.svg";

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

const ExternalLink = styled.a`
  color: #aaa;

  &:hover {
    color: black;
  }
`;

function Menu({ togglePresent }: { togglePresent: () => void }) {
  const fileHandle = useRef<FileSystemHandle | null>(null);

  return (
    <Container>
      <Left>
        <StyledButton
          onClick={() => {
            togglePresent();
          }}
          title="Present"
          style={{
            background: "#15aabf",
            color: "white",
            borderColor: "#15aabf",
          }}
        >
          Present
        </StyledButton>
        <Save ref={fileHandle} />
        <Load ref={fileHandle} />
      </Left>
      <Center>
        <Elements />
      </Center>
      <Right>
        <ExternalLink
          href="https://github.com/kbariotis/presentador.app"
          target="blank"
        >
          <GitHubIcon style={{ width: "32px", height: "32px" }} />
        </ExternalLink>
        <ExternalLink
          href="https://github.com/kbariotis/presentador.app/issues"
          target="blank"
        >
          <HelpIcon style={{ width: "32px", height: "32px" }} />
        </ExternalLink>
      </Right>
    </Container>
  );
}

export default Menu;
