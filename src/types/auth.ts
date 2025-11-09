import { ReactElement } from "react";

// ==============================|| TYPES - AUTH  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

// export type UserProfile = {
//   id?: string;
//   email?: string;
//   avatar?: string;
//   image?: string;
//   // name?: string;
//   first_name?: string;
//   last_name?: string;
//   role?: string;
//   tier?: string;
// };

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null;
  token?: string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    company: string,
    phone: string,
    industry: string,
    signature: string,
    role: string,

    tenantDomain: string
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: any;
  email?: string;
  setEmail?: any;
  fetchCurrentUser?: any;
  googleLogin?: any;
  setUser?: any;
};
