import "./image.scss";

export default function TwoHeaders({ children }: { children: JSX.Element[] }) {
  const image = children.find((item) => item.type.displayName === "Image");

  if (!image) {
    return <></>;
  }

  return <>{image}</>;
}
