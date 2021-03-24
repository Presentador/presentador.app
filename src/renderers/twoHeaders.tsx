import "./twoHeaders.scss";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const [mainHeader, secondHeader] = children.filter(
    (item) => item.type.name === "Header"
  );

  if (!mainHeader) {
    return <></>;
  }

  return (
    <>
      <div className="top">{mainHeader}</div>
      <div className="bottom">{secondHeader}</div>
    </>
  );
}
