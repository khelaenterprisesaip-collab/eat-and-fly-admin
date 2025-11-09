import React, { useEffect } from "react";
import { Mail } from "lucide-react";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate, useParams } from "react-router";
import axios from "utils/axios";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";

function EmailVerification() {
  const { token } = useParams();

  console.log("token", token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) return navigate("/login");
    axios
      .put(`/admin/tenant/verify/${token}`)
      ?.then(() => {
        openSnackbar({
          open: true,
          message: "Your email verified  successfully.",
          variant: "alert",
          alert: {
            color: "success",
          },
        } as SnackbarProps);
        navigate("/login");
      })
      ?.catch((err) => {
        openSnackbar({
          open: true,
          message: err?.error?.message || "Something went wrong",
          variant: "alert",
          alert: {
            color: "error",
          },
        } as SnackbarProps);
        navigate("/login");
      });
  }, [token]);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 8,
      }}
    >
      <Container maxWidth="sm">
        <Stack
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.light",
              color: "primary.main",
            }}
          >
            <Mail size={50} />
          </Avatar>

          <Typography variant="h5" fontWeight={600}>
            Please Wait
          </Typography>

          <Typography variant="body1" fontSize={15} color="text.secondary">
            We are verifying your email...
          </Typography>

          <Box sx={{ mt: 3 }}>
            <CircularProgress color="primary" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default EmailVerification;
