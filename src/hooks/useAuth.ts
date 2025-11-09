import { useContext } from "react";

// auth provider
import AuthContext from "contexts/AuthContext";
import { RoleContext } from "contexts/rolePermission";

// import AuthContext from 'contexts/FirebaseContext';
// import AuthContext from 'contexts/AWSCognitoContext';
// import AuthContext from 'contexts/Auth0Context';

// ==============================|| HOOKS - AUTH ||============================== //

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("context must be use inside provider");

  return context;
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) throw new Error("context must be use inside provider");

  return context;
}
