import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MainCard from "components/MainCard";
import IconButton from "components/@extended/IconButton";
import { Eye, EyeSlash, InfoCircle } from "iconsax-react";
import { Box, FormHelperText, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updatePassword } from "services/auth";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { defaultSx } from "components/ui/Button/styles";
import { encode } from "js-base64";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<Boolean>();
  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    if (name === "newPassword") {
      if (formData?.confirm && formData.confirm !== value) {
        setConfirmPasswordError(true);
        setFormErrors({
          ...formErrors,
          confirm: "Passwords do not match",
        });
      } else {
        setConfirmPasswordError(false);
        setFormErrors({
          ...formErrors,
          confirm: "",
        });
      }
    } else if (name === "confirm") {
      if (value && value !== formData.newPassword) {
        setConfirmPasswordError(true);
        setFormErrors({
          ...formErrors,
          confirm: "Passwords do not match",
        });
      } else {
        setConfirmPasswordError(false);
        setFormErrors({
          ...formErrors,
          confirm: "",
        });
      }
    }
  };

  const handleClickShowOldPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirm } = formData;
    if (!oldPassword.trim() || !newPassword.trim() || !confirm.trim()) {
      setFormErrors({
        oldPassword: !oldPassword.trim()
          ? "Please enter your current password"
          : "",
        newPassword: !newPassword.trim() ? "Please enter a new password" : "",
        confirm: !confirm.trim() ? "Please confirm your new password" : "",
      });
      return;
    }
    if (confirmPasswordError) {
      setFormErrors({
        ...formErrors,
        confirm: "Passwords do not match",
      });
      return;
    }
    setLoading(true);

    updatePassword({
      pathParams: {
        token: encode(`${formData?.oldPassword}:${formData?.confirm}`),
      },
    })
      ?.then((res) => {
        setLoading(false);
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirm: "",
        });
        openSnackbar({
          open: true,
          message: res?.message,
          variant: "alert",
          alert: {
            color: "success",
          },
        } as SnackbarProps);
      })
      ?.catch((err) => {
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
  };

  return (
    <MainCard
      title={
        <Stack>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
            }}
          >
            Change Password
          </Typography>
          <Typography variant="caption" color={"#778194"} fontWeight={400}>
            Here you can set your new password
          </Typography>
        </Stack>
      }
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={6}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel
                  htmlFor="password-current"
                  sx={{
                    color: "#5A667B",
                    mb: 0.5,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Current Password
                </InputLabel>
                <OutlinedInput
                  id="password-current"
                  placeholder="Enter Current Password"
                  type={showCurrentPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showCurrentPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="current-password"
                />
                {formErrors.oldPassword && (
                  <FormHelperText error>
                    {formErrors.oldPassword}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel
                  htmlFor="password-password"
                  sx={{
                    color: "#5A667B",
                    mb: 0.5,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  New Password
                </InputLabel>
                <OutlinedInput
                  id="password-password"
                  placeholder="Enter New Password"
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showNewPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formErrors.newPassword && (
                  <FormHelperText error>
                    {formErrors.newPassword}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel
                  htmlFor="password-confirm"
                  sx={{
                    color: "#5A667B",
                    mb: 0.5,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="password-confirm"
                  placeholder="Enter Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="new-password"
                />
                {formErrors.confirm && (
                  <FormHelperText error>{formErrors.confirm}</FormHelperText>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
          <LoadingButton
            sx={defaultSx}
            loading={loading}
            size="medium"
            type="submit"
            variant="contained"
            color="primary"
          >
            Change Password
          </LoadingButton>
        </Box>
      </form>
    </MainCard>
  );
};

export default ChangePassword;
