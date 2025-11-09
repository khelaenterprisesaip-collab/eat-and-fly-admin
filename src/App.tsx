import { RouterProvider } from "react-router-dom";

// project import
import router from "routes";
import ThemeCustomization from "themes";

import Locales from "components/Locales";
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from "components/ScrollTop";
import Snackbar from "components/@extended/Snackbar";

// auth-provider
import { AuthProvider } from "contexts/AuthContext";

import { RoleProvider } from "contexts/rolePermission";
import Customization from "components/Customization";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import useNetworkStatus from "hooks/useNetwork";
// import Customization from 'components/Customization';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        return failureCount < 3 && error instanceof AxiosError;
      },
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {},
      onSuccess: ({ message }: any) => {},
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
      }
    },
  }),
});

export default function App() {
  const { isOnline } = useNetworkStatus();
  return (
    <>
      <ThemeCustomization>
        {/* <RTLLayout> */}
        <Locales>
          <ScrollTop>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <RoleProvider>
                  <>
                    <RouterProvider router={router} />
                    {/* <Customization /> */}
                    <Snackbar />
                  </>
                </RoleProvider>
              </AuthProvider>
            </QueryClientProvider>
          </ScrollTop>
        </Locales>
        {/* </RTLLayout> */}
      </ThemeCustomization>
    </>
  );
}
