import "./headerManyParagraphsImage.scss";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.displayName === "Header");
  const image = children.find((item) => item.type.displayName === "Image");
  const paragraphs = children.filter(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <>
      <div className="left">
        {header}
        <div className="paragraphs">{paragraphs}</div>
      </div>
      <div className="right">{image}</div>
    </>
  );
}
