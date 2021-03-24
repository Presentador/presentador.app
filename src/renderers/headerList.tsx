import "./headerList.scss";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const header = children.find((item) => item.type.name === "Header");
  const list = children.find((item) => item.type.name === "List");

  if (!header) {
    return <></>;
  }

  return (
    <>
      <div className="top">{header}</div>
      <div className="bottom">{list}</div>
    </>
  );
}
