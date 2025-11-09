import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth, { useRole } from "hooks/useAuth";
import Loader from "components/Loader";

interface RoleAccess2Props {
  viewPermission: string;
  children: React.ReactNode;
}

function RoleAccess2({
  viewPermission,
  children,
}: RoleAccess2Props): JSX.Element {
  const { logout, user, Tenant } = useAuth();
  const { permission, loading }: any = useRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { state: { from: "" } });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // useEffect(() => {
  //   if (user && typeof Tenant === "boolean" && !Tenant) {
  //     handleLogout();
  //   }
  // }, [user, logout, navigate]);

  if (loading) {
    return <Loader />;
  }

  const isAuthorized = viewPermission
    ? permission?.[viewPermission] || ["allow_both"].includes(viewPermission)
    : false;

  // if (!isAuthorized) {
  //   return <Navigate to="/404" />;
  // }

  return <>{children}</>;
}

export default RoleAccess2;
