import "./headerManyParagraphs.scss";

export default function HeaderManyParagraphs({
  children,
}: {
  children: JSX.Element[];
}) {
  const header = children.find((item) => item.type.displayName === "Header");
  const paragraphs = children.filter(
    (item) => item.type.displayName === "Paragraph"
  );

  if (!header) {
    return <></>;
  }

  return (
    <>
      <div className="top">{header}</div>
      <div className="bottom">{paragraphs}</div>
    </>
  );
}
