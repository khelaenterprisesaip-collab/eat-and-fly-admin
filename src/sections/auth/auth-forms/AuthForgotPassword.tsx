import { useNavigate } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

// third-party
import * as Yup from "yup";
import { Formik } from "formik";

// project-imports
import useAuth from "hooks/useAuth";
import useScriptRef from "hooks/useScriptRef";
import AnimateButton from "components/@extended/AnimateButton";
import { openSnackbar } from "api/snackbar";

// types
import { SnackbarProps } from "types/snackbar";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { InfoCircle } from "iconsax-react";

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn, resetPassword, setEmail } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await resetPassword(values?.email).then(
              (res: any) => {
                setStatus({ success: true });
                setSubmitting(false);
                setEmail(values?.email);
                sessionStorage.setItem("email", values?.email);
                navigate(`/code-verification`);
                openSnackbar({
                  open: true,
                  message: res?.message,
                  variant: "alert",
                  alert: {
                    color: "success",
                  },
                } as SnackbarProps);
              },
              (err: any) => {
                setEmail("");
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

                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            );
          } catch (err: any) {
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-forgot">
                    {errors.email}
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
                    loading={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Forgot
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
