import "./headerSingleParagraph.scss";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const paragraph = children.find(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <>
      <div className="top">{header}</div>
      <div className="bottom">{paragraph}</div>
    </>
  );
}
