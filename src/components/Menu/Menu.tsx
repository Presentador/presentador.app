import styled from "styled-components";
import { useRef } from "react";
import { FileSystemHandle } from "browser-fs-access";
import { ReactComponent as PlayIcon } from "bootstrap-icons/icons/play.svg";
import { ReactComponent as GitHubIcon } from "bootstrap-icons/icons/github.svg";
import { ReactComponent as HelpIcon } from "bootstrap-icons/icons/question-circle.svg";

import StyledButton from "./StyledButton";
import Quote from "./Buttons/Quote";
import Codeblock from "./Buttons/Codeblock";
import Header from "./Buttons/Header";
import Footer from "./Buttons/Footer";
import List from "./Buttons/List";
import Image from "./Buttons/Image";
import Paragraph from "./Buttons/Paragraph";
import Save from "./Buttons/Save";
import Undo from "./Buttons/Undo";
import Redo from "./Buttons/Redo";
import Load from "./Buttons/Load";
import New from "./Buttons/New";
import Settings from "./Buttons/Settings";

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

const StyledGithubIcon = styled(GitHubIcon)`
  vertical-align: middle;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.3em;
`;
const StyledHelpIcon = styled(HelpIcon)`
  vertical-align: middle;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.3em;
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
          data-tooltip="Present"
        >
          <PlayIcon />
        </StyledButton>
        <New ref={fileHandle} />
        <Save ref={fileHandle} />
        <Load ref={fileHandle} />
        <Settings />
        <Undo />
        <Redo />
      </Left>
      <Center>
        <>
          <Header />
          <Paragraph />
          <Image />
          <List />
          <Quote />
          <Footer />
          <Codeblock />
        </>
      </Center>
      <Right>
        <ExternalLink
          href="https://github.com/kbariotis/presentador.app"
          target="blank"
          data-tooltip="GitHub"
        >
          <StyledGithubIcon />
        </ExternalLink>
        <ExternalLink
          href="https://github.com/kbariotis/presentador.app/issues"
          target="blank"
          data-tooltip="GitHub Issues"
        >
          <StyledHelpIcon />
        </ExternalLink>
      </Right>
    </Container>
  );
}

export default Menu;
