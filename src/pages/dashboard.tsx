import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { state } = useAuth();

  return (
    <>dashboard</>
  );
}
