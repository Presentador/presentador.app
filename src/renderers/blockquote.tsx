import "./blockquote.scss";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const blockquote = children.find(
    (item) => item.type.displayName === "Blockquote"
  );

  if (!blockquote) {
    return <></>;
  }

  return (
    <>
      <div className="top">{blockquote}</div>
      <div className="bottom"></div>
    </>
  );
}
