import Operation from "./Operation";

export default function OperationsList({ operations }) {
  return operations?.map((op) => <Operation key={op.id} {...op} />);
}
