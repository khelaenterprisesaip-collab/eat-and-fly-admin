import { lazy } from "react";

// project-imports
import AuthLayout from "layout/Auth";
import Loadable from "components/Loadable";

// render - login
const AuthLogin = Loadable(lazy(() => import("pages/auth/auth1/login")));
const AuthRegister = Loadable(lazy(() => import("pages/auth/auth2/register2")));
const AuthForgotPassword = Loadable(
  lazy(() => import("pages/auth/auth1/forgot-password"))
);
const AuthCheckMail = Loadable(
  lazy(() => import("pages/auth/auth1/check-mail"))
);
const AuthResetPassword = Loadable(
  lazy(() => import("pages/auth/auth2/reset-password2"))
);
const AuthCodeVerification = Loadable(
  lazy(() => import("pages/auth/auth1/code-verification"))
);
const ResetPassword = Loadable(
  lazy(() => import("pages/auth/auth1/reset-password"))
);

const PricingPage = Loadable(
  lazy(() => import("pages/auth/paymentCard/payment"))
);
const EmailVerification = Loadable(
  lazy(() => import("pages/auth/auth2/EmailVerification"))
);

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <AuthLogin />,
        },
        {
          path: "register",
          element: <AuthRegister />,
        },
        {
          path: "forgot-password",
          element: <AuthForgotPassword />,
        },
        {
          path: "check-mail",
          element: <AuthCheckMail />,
        },
        {
          path: "reset",
          element: <ResetPassword />,
        },

        {
          path: "Choose-plan",
          element: <PricingPage />,
        },

        {
          path: "/recruiter/accept",
          element: <AuthResetPassword />,
        },
        {
          path: "/staffs/accept",
          element: <AuthResetPassword />,
        },
        {
          path: "/driver/accept",
          element: <AuthResetPassword />,
        },
        {
          path: "code-verification",
          element: <AuthCodeVerification />,
        },
        {
          path: "email-verification/:token",
          element: <EmailVerification />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
