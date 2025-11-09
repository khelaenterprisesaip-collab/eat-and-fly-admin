import PublicLayout from "layout/Public";

// ==============================|| AUTH ROUTES ||============================== //

export const PUBLIC_ROUTES = ["/search-program"];

const PublicRoutes = {
  path: "/",
  children: [
    // {
    //   path: "/",
    //   element: <PublicLayout />,
    //   children: [
    //     {
    //       path: "search-program",
    //       element: <></>,
    //     },
    //   ],
    // },
  ],
};

export default PublicRoutes;
