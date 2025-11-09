import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthWrapper2 from "sections/auth/AuthWrapper2";
import AuthLogin from "sections/auth/auth-forms/AuthLogin";
import { useMediaQuery } from "@mui/system";
import { useTheme } from "@mui/material";
// import {
//   GoogleAuthProvider,
//   auth,
//   signInWithPopup,
// } from "../../../../firebaseConfig";

import { useState } from "react";
import useAuth from "hooks/useAuth";

// import { signInWithRedirect } from "firebase/auth";

// ================================|| LOGIN ||================================ //

export default function Login2() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.up("md"));

  const { register, googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     setIsLoading(true);
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     document.title = 'Enrolhere - Student';

  //     if (user) {
  //       const idToken = await user.getIdToken();
  //       await googleLogin(idToken);
  //       document.title = 'Enrolhere - Student';
  //     }

  //     openSnackbar({
  //       open: true,
  //       message: 'User logged in successfully',
  //       variant: 'alert',
  //       alert: {
  //         color: 'success'
  //       },
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'right'
  //       }
  //     } as SnackbarProps);
  //   } catch (error) {
  //     console.error('Google login failed:', error);
  //     openSnackbar({
  //       open: true,
  //       message: 'Google login failed. Please try again.',
  //       variant: 'alert',
  //       alert: {
  //         color: 'error'
  //       },
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'right'
  //       }
  //     } as SnackbarProps);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleGoogleLogin = async () => {
    // const provider = new GoogleAuthProvider();
    // setIsLoading(true);
    // try {
    //   const result = await signInWithPopup(auth, provider);
    //   const user = result.user;
    //   if (user) {
    //     const idToken = await user.getIdToken();
    //     const response = await googleLogin(idToken);
    //   }
    // } catch (error: any) {
    //   if (error.code === "auth/popup-blocked") {
    //     console.warn("Popup blocked. Switching to redirect login.");
    //     // await signInWithRedirect(auth, provider);
    //   } else {
    //     openSnackbar({
    //       open: true,
    //       message: "Google login failed. Please try again.",
    //       variant: "alert",
    //       alert: {
    //         color: "error",
    //       },
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "right",
    //       },
    //     } as SnackbarProps);
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <AuthWrapper2>
      <Stack flexDirection={{ xs: "column", md: "row" }} py={1} px={1}>
        <Grid container spacing={{ md: 2 }} rowSpacing={{ xs: 3, md: 0 }}>
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent={{ xs: "center" }}
            alignItems="flex-start"
          >
            <Stack
              flexDirection="column"
              alignItems={{ xs: "center", md: "flex-start" }}
              justifyContent="start"
              // spacing={{ xs: 1, md: 2 }}
              width={"100%"}
              mt={2}
            >
              <Grid style={{ position: "relative" }}>
                <img src="/Smart Global-logo.png" width={180} />
              </Grid>
              <Typography
                variant="h1"
                fontFamily={"unset"}
                style={{
                  textAlign: "center",
                }}
                mt={4.5}
                color="#414C69"
              >
                Login
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  textDecoration: "none",
                  fontSize: { xs: "13px", md: "14px" },
                }}
                style={{
                  marginTop: 11,
                  color: "#778194",
                }}
              >
                to continue as Smart Global
              </Typography>

              {downLG && (
                <Stack sx={{ visibility: { xs: "hidden", md: "visible" } }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                    color="GrayText"
                    mt={6}
                  >
                    {/* Don&apos;t have an account?{" "} */}
                    <Typography
                      component={Link}
                      to={"/register"}
                      variant="h6"
                      sx={{ textDecoration: "none", fontWeight: 600 }}
                      color="primary"
                    >
                      Sign Up
                    </Typography>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            mt={downLG ? 0 : 1}
            container
            justifyContent="center"
            alignItems="start"
          >
            <AuthLogin forgot="/auth/forgot-password2" />
          </Grid>

          {!downLG && (
            <Stack
              mt={{ xs: 6 }}
              spacing={2.3}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              width={"100%"}
            >
              <Typography
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
                color="GrayText"
              >
                Don&apos;t have an account?
                <Typography
                  component={Link}
                  to={"/register"}
                  variant="h6"
                  sx={{ textDecoration: "none", fontWeight: 600, ml: 1 }}
                  color="primary"
                >
                  Sign Up
                </Typography>
              </Typography>
            </Stack>
          )}
        </Grid>
      </Stack>
    </AuthWrapper2>
  );
}
