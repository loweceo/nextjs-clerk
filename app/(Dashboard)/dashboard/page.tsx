import { useParams } from "next/navigation";

export default function Dashboard({ params }: { params: { dashboard: string } }) {
  return <h1>Dashboard</h1>;
}
