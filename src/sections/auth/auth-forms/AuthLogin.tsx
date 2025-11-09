import { useState, SyntheticEvent, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { preload } from "swr";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { InfoCircle } from "iconsax-react";
import * as Yup from "yup";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";
import useScriptRef from "hooks/useScriptRef";
import IconButton from "components/@extended/IconButton";
import { fetcher } from "utils/axios";
import { Eye, EyeSlash } from "iconsax-react";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { LoadingButton } from "@mui/lab";

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ forgot }: { forgot?: string }) {
  const { isLoggedIn, login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            localStorage.setItem("tenantDomain", "8572F564");
            await login(values.email, values.password);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              preload("api/menu/dashboard", fetcher);
            }
          } catch (err: any) {
            if (err?.status === 403) {
            } else {
              openSnackbar({
                open: true,
                message: err?.data?.error?.message || "Something went wrong",
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
            }

            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
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
            <Grid
              container
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    sx={{ height: "42px" }}
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    sx={{ height: "42px" }}
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="end"
                  alignItems="center"
                  spacing={2}
                >
                  <Link
                    variant="h6"
                    fontSize={13}
                    fontWeight={"600"}
                    component={RouterLink}
                    to={isLoggedIn && forgot ? forgot : "/forgot-password"}
                    color="primary"
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack
                  flexDirection={"row"}
                  justifyContent={{ xs: "flex-start", md: "flex-end" }}
                  width={"100%"}
                >
                  <LoadingButton
                    loading={isSubmitting}
                    disableElevation
                    disabled={isSubmitting}
                    sx={{
                      width: { xs: "100%" },
                    }}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
