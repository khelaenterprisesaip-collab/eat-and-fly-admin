import useAuth from "hooks/useAuth";
import { Navigate } from "react-router";

interface RoleAccess2Props {
  viewPermission: "admin" | "staff" | "allow_both";
  children: React.ReactNode;
}

function RoleAccess2({ viewPermission, children }: RoleAccess2Props) {
  const { user } = useAuth();

  const role = user?.role;

  if (viewPermission === "allow_both") return <>{children}</>;

  if (viewPermission === role) return <>{children}</>;

  return <Navigate to="/maintenance/404" replace />;
}

export default RoleAccess2;
