// @ts-nocheck
import useAuth from "hooks/useAuth";
import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchAllRoles } from "services/roleAndPermission";

const RoleContext = createContext({});

const RoleProvider = ({ children }: any) => {
  const [roles, setRoles] = useState([]);
  const [permission, setPermission] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { pathName } = useParams();

  const defaultPermissions = {
    add_truck: true,
    edit_truck: true,
    delete_truck: true,
    view_truck: true,
    add_chassis: true,
    edit_chassis: true,
    delete_chassis: true,
    view_chassis: true,
    add_yard: true,
    edit_yard: true,
    delete_yard: true,
    view_yard: true,
    invite_staff: true,
    delete_staff: true,
    add_edit_role: true,
    add_customer: true,
    edit_customer: true,
    delete_customer: true,
    view_customer: true,
    add_consignors: true,
    edit_consignors: true,
    delete_consignors: true,
    view_consignors: true,
    add_order: true,
    edit_order: true,
    delete_order: true,
    view_order: true,
    add_port: true,
    edit_port: true,
    delete_port: true,
    view_port: true,
    add_driver: true,
    edit_driver: true,
    delete_driver: true,
    view_driver: true,
    edit_billing: true,
    view_billing: true,
  };

  const FetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetchAllRoles({});
      if (user?.tenantRoles?.[0]?.role) {
        setRoles(res?.data);
        setPermission({ ...defaultPermissions, user_type: "admin" });
      } else {
        setRoles(res?.data);
        setPermission({ ...res?.data, user_type: "staff" });
      }
    } catch (error) {
      console.error("Error fetching roles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      FetchRoles();
    }
  }, [user, pathName]);

  return (
    <RoleContext.Provider value={{ roles, permission, loading, FetchRoles }}>
      {children}
    </RoleContext.Provider>
  );
};

export { RoleContext, RoleProvider };
