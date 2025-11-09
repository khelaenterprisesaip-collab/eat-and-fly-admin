import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// third-party
import OtpInput from "react18-input-otp";

// project-imports
import AnimateButton from "components/@extended/AnimateButton";
import { ThemeMode } from "config";
import { verifyOtp } from "services/auth";
import { useLocation, useNavigate } from "react-router";
import { openSnackbar } from "api/snackbar";
import { InfoCircle } from "iconsax-react";
import { SnackbarProps } from "types/snackbar";
import LoadingButton from "components/@extended/LoadingButton";
import useAuth from "hooks/useAuth";
import ThemeButton from "components/ui/Button";
import { encode } from "js-base64";

// ============================|| STATIC - CODE VERIFICATION ||============================ //

export default function AuthCodeVerification() {
  const theme = useTheme();
  const [otp, setOtp] = useState<string>();
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, resetPassword, email }: any = useAuth();
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const borderColor =
    theme.palette.mode === ThemeMode.DARK
      ? theme.palette.secondary[200]
      : theme.palette.secondary.light;

  console.log("location", location);

  const storedEmail = sessionStorage.getItem("email");

  console.log("storedEmail", storedEmail);

  useEffect(() => {
    if (!storedEmail?.length) {
      sessionStorage.removeItem("email");
      navigate("/forgot-password");
    }
  }, [storedEmail]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleResendOtp = () => {
    setOtpLoading(true);
    resetPassword(email).then(
      (res: any) => {
        setOtpLoading(false);
        setIsButtonDisabled(true);
        setTimer(60);
        openSnackbar({
          open: true,
          message: res?.message,
          variant: "alert",
          alert: {
            color: "info",
          },
        } as SnackbarProps);
      },
      (err: any) => {
        setOtpLoading(false);
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
      }
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} width={0}>
        <OtpInput
          value={otp}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={4}
          containerStyle={{ justifyContent: "space-between" }}
          inputStyle={{
            width: "100%",
            margin: "8px",
            padding: "10px",
            border: "1px solid",
            borderColor: { borderColor },
            borderRadius: 4,
            ":hover": { borderColor: theme.palette.primary.main },
          }}
          focusStyle={{
            outline: "none",
            boxShadow: theme.customShadows.primary,
            border: "1px solid",
            borderColor: theme.palette.primary.main,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <LoadingButton
            disableElevation
            fullWidth
            loading={loading}
            size="large"
            onClick={() => {
              if (otp) {
                let token = encode(`${email}-${otp}`);
                setLoading(true);
                verifyOtp({
                  pathParams: {
                    token: encode(`${email}-${otp}`),
                    // otp,
                    // email: email,
                  },
                })
                  ?.then((res) => {
                    location?.pathname !== "/code-verification"
                      ? navigate(`/reset`)
                      : navigate(`/reset?email=${email}`);

                    setLoading(false);
                    openSnackbar({
                      open: true,
                      message: res?.message,
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                    } as SnackbarProps);
                  })
                  .catch((err) => {
                    setLoading(false);
                    openSnackbar({
                      open: true,
                      message:
                        err?.data?.error?.message || "Something went wrong",
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
              } else {
                openSnackbar({
                  open: true,
                  message: "Please enter One-Time Password (OTP).",
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
            }}
            variant="contained"
          >
            Continue
          </LoadingButton>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="column"
          alignItems="flex-end"
          justifyContent={"flex-end"}
          width={"100%"}
        >
          <Typography>Haven't received the code?</Typography>
          <ThemeButton
            loading={otpLoading}
            variant="body1"
            buttonStyle={{ textDecoration: "none", cursor: "pointer" }}
            onClick={handleResendOtp}
            disabled={isButtonDisabled}
          >
            <Typography
              color={isButtonDisabled ? "text.disabled" : "primary"}
              variant="body1"
              sx={{
                textDecoration: "none",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              Resend code {isButtonDisabled && `(${timer}s)`}
            </Typography>
          </ThemeButton>
        </Stack>
      </Grid>
    </Grid>
  );
}
