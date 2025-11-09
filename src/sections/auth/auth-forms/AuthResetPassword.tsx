import { useEffect, useState, SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// material-ui

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

// third-party
import * as Yup from "yup";
import { Formik } from "formik";

// project-imports
import useAuth from "hooks/useAuth";
import useScriptRef from "hooks/useScriptRef";
import IconButton from "components/@extended/IconButton";
import AnimateButton from "components/@extended/AnimateButton";
import { openSnackbar } from "api/snackbar";

// types
import { SnackbarProps } from "types/snackbar";

// assets
import { Eye, EyeSlash, InfoCircle } from "iconsax-react";
// import { acceptRecruiter } from 'services/recruiter';
import { acceptStaff } from "services/staff";
import { resetPassword } from "services/auth";
import LoadingButton from "components/@extended/LoadingButton";
import { encode } from "js-base64";

// ============================|| FIREBASE - RESET PASSWORD ||============================ //

export default function AuthResetPassword() {
  const scriptedRef = useScriptRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword2 = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  const storedEmail = sessionStorage.getItem("email");
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!storedEmail && !token) {
      navigate("/forgot-password");
      sessionStorage.removeItem("email");
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required("Password is required"),
          confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .test(
              "confirmPassword",
              "Both passwords must match!",
              (confirmPassword, yup) => yup.parent.password === confirmPassword
            ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (location?.pathname === "/staffs/accept") {
              await acceptStaff({
                body: {
                  password: values?.password,
                  token: location?.search?.split("=")[1],
                },
              })
                ?.then((res) => {
                  openSnackbar({
                    open: true,
                    message: res?.message || "Password reset successfully",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                  } as SnackbarProps);

                  setTimeout(() => {
                    navigate(isLoggedIn ? "/auth/login" : "/login", {
                      replace: true,
                    });
                  }, 1500);
                })
                .catch((err) => {
                  openSnackbar({
                    open: true,
                    message:
                      err?.error?.data?.message || "Something went wrong",
                    variant: "alert",
                    alert: {
                      color: "error",
                      icon: <InfoCircle />,
                    },

                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  } as SnackbarProps);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                });
            } else if (location?.pathname === "/staffs/accept") {
              await acceptStaff({
                body: {
                  password: values?.password,
                  token: location?.search?.split("=")[1],
                },
              })
                ?.then((res) => {
                  openSnackbar({
                    open: true,
                    message: "Password reset successfully",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                  } as SnackbarProps);
                  setTimeout(() => {
                    navigate(isLoggedIn ? "/auth/login" : "/login", {
                      replace: true,
                    });
                  }, 1500);
                })
                .catch((err) => {
                  openSnackbar({
                    open: true,
                    message: err?.data?.message || "Something went wrong",
                    variant: "alert",
                    alert: {
                      color: "error",
                      icon: <InfoCircle />,
                    },
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  } as SnackbarProps);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                });
            } else {
              setLoading(true);
              const email = new URLSearchParams(window.location.search).get(
                "email"
              );
              resetPassword({
                pathParams: {
                  token: encode(`${email}-${values?.password}`),
                },
              })
                ?.then((res) => {
                  setLoading(false);
                  openSnackbar({
                    open: true,
                    message: "Successfully  reset password.",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                  } as SnackbarProps);

                  setTimeout(() => {
                    navigate(isLoggedIn ? "/auth/login" : "/login", {
                      replace: true,
                    });
                  }, 1500);
                })
                .catch((err) => {
                  setLoading(false);
                  openSnackbar({
                    open: true,
                    message: err?.data?.message || "Something went wrong",
                    variant: "alert",
                    alert: {
                      color: "error",
                      icon: <InfoCircle />,
                    },

                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  } as SnackbarProps);
                });
            }
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
              setLoading(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} width={0}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-reset">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-reset"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-reset">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirm-password-reset">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    type={showPassword2 ? "text" : "password"}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    id="confirm-password-reset"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter confirm password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword2 ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="helper-text-confirm-password-reset">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <LoadingButton
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting || loading}
                  >
                    Reset Password
                  </LoadingButton>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
