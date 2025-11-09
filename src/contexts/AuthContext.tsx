import {
  createContext,
  useEffect,
  useReducer,
  ReactElement,
  useState,
  useMemo,
} from "react";

// third-party
import { Chance } from "chance";
import { jwtDecode } from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT, UPDATE } from "store/reducers/actions";
import authReducer from "store/reducers/auth";

// project-imports
import Loader from "components/Loader";
import axios from "utils/axios";
import { KeyedObject } from "types/root";
import { AuthProps } from "types/auth";
import {
  forgotPasswordService,
  login as loginService,
  updateProfileService,
} from "services/auth";
import { getCurrentUser } from "services/user";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import {
  cancelNextBillingService,
  createCheckoutSessionService,
  getFutureInvoice,
} from "services/stripe";

const chance = new Chance();

// constant
export const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken: (st: string) => boolean = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(accessToken);

  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (accessToken?: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState(null as any);
  const [Tenant, setTenant] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && verifyToken(accessToken)) {
          setSession(accessToken);
          const response = await getCurrentUser();
          setTenant(response?.isTenant);
          setUser(response?.data);

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: response?.data,
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginService({ email, password });
    const { accessToken } = response;
    setSession(accessToken);
    const responseItem = await getCurrentUser();
    setTenant(response?.isTenant);
    setUser(responseItem?.data);

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user: responseItem,
      },
    });
  };

  const googleLogin = async (token: string) => {
    try {
      const response: any = {};
      const { accessToken } = response?.data;
      setSession(accessToken);
      if (response?.data?.existUser?.id) {
        document.title = "Enrolhere - Student";
        openSnackbar({
          open: true,
          message: response?.message,
          variant: "alert",
          alert: {
            color: "success",
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        } as SnackbarProps);
      } else {
        openSnackbar({
          open: true,
          message: response?.message,
          variant: "alert",
          alert: {
            color: "error",
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        } as SnackbarProps);
      }

      const responseItem = await getCurrentUser();
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: responseItem,
        },
      });
    } catch (err: any) {
      openSnackbar({
        open: true,
        message:
          err?.data?.message || "Something went wrong during registration.",
        variant: "alert",
        alert: {
          color: "error",
        },
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      } as SnackbarProps);
    }
  };
  const register = async (
    tenantEmail: string,
    password: string,
    firstName: string,
    lastName: string,
    organizationName: string,
    phoneNumber: string,
    countryCode: string,
    role: string
  ) => {
    const id = chance.bb_pin();
    await axios.post("/admin/tenant", {
      id,
      tenantEmail,
      password,
      firstName,
      lastName,
      organizationName,
      phoneNumber,
      countryCode,

      role,
    });

    return;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const fetchCurrentUser = async () => {
    const responseItem = await getCurrentUser();
    setTenant(responseItem?.isTenant);
    setUser(responseItem?.data);

    dispatch({
      type: UPDATE,
      payload: {
        isLoggedIn: true,
        user: responseItem,
      },
    });
  };

  const resetPassword = async (email: string) => {
    const response = forgotPasswordService({ body: { email } });
    return response;
  };

  const updateProfile = async ({ body }: any) => {
    dispatch({
      type: UPDATE,
      payload: {
        isLoggedIn: true,
        user: body,
      },
    });
    const response = await updateProfileService({ body: { ...body } });

    dispatch({
      type: UPDATE,
      payload: {
        isLoggedIn: true,
        user: response?.user,
      },
    });
  };

  const createCheckoutSession = async (planId: string, cb: any, errCb: any) => {
    createCheckoutSessionService(planId)
      .then((res) => {
        cb && cb(res?.url);
      })
      .catch((err) => {
        errCb && errCb(err);
        openSnackbar({
          open: true,
          message: err?.data?.error?.message || "Something went wrong",
          variant: "alert",
          alert: {
            color: "error",
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        } as SnackbarProps);
      })
      .finally(() => {});
  };

  const fetchFutureInvoice = (cb: any, errCb: any) => {
    getFutureInvoice()
      .then((res) => {
        cb && cb(res?.data);
      })
      .catch((err) => {
        errCb && errCb();
        // openSnackbar({
        //   open: true,
        //   message: err?.data?.error?.message || "Something went wrong",
        //   variant: "alert",
        //   alert: {
        //     color: "error",
        //   },
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        // } as SnackbarProps);
      });
  };

  const cancelSubscription = (
    cancelReason: any,
    cancel_at_period_end = true,
    cb: any,
    errCb: any
  ) => {
    cancelNextBillingService({
      body: {
        cancelReason,
        //if true then subscription will be cancelled at the end of the billing period
        //if false then subscription will be renewed for the next billing period
        cancel_at_period_end,
      },
    })
      .then((res) => {
        openSnackbar({
          open: true,
          message: cancel_at_period_end
            ? "Subscription cancelled successfully"
            : "Subscription renewed successfully",
          variant: "alert",
          alert: {
            color: "success",
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        } as SnackbarProps);
        cb && cb(res?.data);
      })
      .catch((err) => {
        errCb && errCb();
        openSnackbar({
          open: true,
          message: err?.data?.error?.message || "Something went wrong",
          variant: "alert",
          alert: {
            color: "error",
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        } as SnackbarProps);
      });
  };

  const isSubscriptionActive = useMemo(() => {
    if (user?.stripe?.subscriptionStatus === "active") {
      return true;
    }
    return false;
  }, [user]);

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        email,
        Tenant,
        googleLogin,
        setEmail,
        fetchCurrentUser,
        user,
        setUser,
        isSubscriptionActive,
        createCheckoutSession,
        fetchFutureInvoice,
        cancelSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
