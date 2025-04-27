import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

export default function DashboardPage() {
  const { state } = useAuth();
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.primaryColor }}>
      <img src={theme.logoUrl} alt="Tenant Logo" />
      <h1>Welcome {state.user?.name}!</h1>
    </div>
  );
}
