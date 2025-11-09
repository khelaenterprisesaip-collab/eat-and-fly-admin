import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import * as Yup from "yup";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { Eye, EyeSlash } from "iconsax-react";
import FormLabels from "components/ui/FormLabel";
import FormikDropdown from "components/formikDropdown";
import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { countriesPhone } from "utils/locales/phone";

export default function AuthRegister() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        organizationName: "",
        tenantEmail: "",

        phoneNumber: "",
        countryCode: "+1",

        // industry: "",
        // signature: "",
        role: "",
        password: "",
        terms: false,
        // tenantDomain: "",
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255),
        organizationName: Yup.string()
          .max(255)
          .required("Organization name is required"),
        tenantEmail: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),

        countryCode: Yup.string().required("Country code is required"),
        phoneNumber: Yup.string().max(15).required("Phone number is required"),

        // phoneNumber: Yup.string().max(15).required("Phone number is required"),
        referral: Yup.string(),
        // industry: Yup.string().max(255).required("Industry is required"),
        role: Yup.string().max(255).required("Role is required"),
        // tenantDomain: Yup.string()
        //   .max(255)
        //   .required("Tenant domain is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters long")
          .required("Password is required"),
        terms: Yup.boolean().oneOf(
          [true],
          "You must accept the Terms and Conditions"
        ),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(
            values.tenantEmail,
            values.password,
            values.firstName,
            values.lastName,
            values.organizationName,
            values.phoneNumber,
            values.countryCode,
            // values.industry,
            // values.signature,
            values.role
            // values.tenantDomain
          )
            ?.then((res: any) => {
              navigate("/login");
              openSnackbar({
                open: true,
                message: "Email verification link sent to your email",
                variant: "alert",
                alert: { color: "success" },
              } as SnackbarProps);
              setSubmitting(false);
            })
            .catch((err: any) => {
              console.log("err", err);
              openSnackbar({
                open: true,
                message: err?.error?.message,
                variant: "alert",
                alert: { color: "error" },
              } as SnackbarProps);
            });
        } catch (err: any) {
          setSubmitting(false);
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
        <>
          {console.log("errors", errors)}
          <form noValidate onSubmit={handleSubmit} autoComplete="off">
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <FormLabels required>First Name</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="firstName-signup"
                    value={values.firstName}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.firstName}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <FormLabels>Last Name</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="lastName-signup"
                    value={values.lastName}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.lastName}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormLabels required>Your Organization Name</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="organizationName-signup"
                    value={values.organizationName}
                    name="organizationName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your organization name"
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.organizationName}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormLabels required>Email</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="email-signup"
                    value={values.tenantEmail}
                    name="tenantEmail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.tenantEmail}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormLabels required>Password</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>

                <FormHelperText sx={{ color: "red" }}>
                  {errors?.password}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormLabels required>Phone</FormLabels>
                  <Stack
                    direction="row"
                    alignItems="center"
                    width="100%"
                    gap={0}
                  >
                    <Autocomplete
                      id="country-select-demo"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        },
                        width: 70,
                      }}
                      disableClearable
                      options={countriesPhone}
                      value={
                        countriesPhone.find(
                          (option) => option.phone === values.countryCode
                        ) || { phone: "+1" }
                      } // Ensure default is +1
                      onChange={(event, selectedOption) => {
                        handleChange({
                          target: {
                            name: "phone.countryCode",
                            value: selectedOption.phone,
                          },
                        });
                      }}
                      autoHighlight
                      getOptionLabel={(option: any) => option.phone}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          {option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="phone.countryCode"
                          sx={{ borderRadius: 0 }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />

                    <OutlinedInput
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      sx={{
                        height: "41px",
                        borderRadius: 0,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      }}
                      fullWidth
                      value={values.phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        handleChange({
                          target: {
                            name: "phoneNumber",
                            value: value,
                          },
                        });
                      }}
                      onBlur={handleBlur}
                    />
                  </Stack>

                  {(errors?.phoneNumber && (
                    <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                      {errors?.phoneNumber}
                    </FormHelperText>
                  )) ||
                    (errors?.countryCode && (
                      <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                        {errors?.countryCode}
                      </FormHelperText>
                    ))}
                </Stack>
              </Grid>

              {/* <Grid item xs={6}>
                <Stack spacing={1}>
                  <FormLabels required>Tenant Domain</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="tenantDomain-signup"
                    value={values.tenantDomain}
                    name="tenantDomain"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your tenant domain"
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.tenantDomain}
                </FormHelperText>
              </Grid> */}
              {/* <Grid item xs={6}>
                <Stack spacing={1}>
                  <FormLabels required>Signature</FormLabels>
                  <OutlinedInput
                    fullWidth
                    id="signature-signup"
                    value={values.signature}
                    name="signature"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your signature"
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.signature}
                </FormHelperText>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <FormikDropdown
                    name="referral"
                    required
                    label="How did you hear about us?"
                    options={[
                      { label: "Email Advertisement", value: "email" },
                      { label: "Event", value: "event" },
                      { label: "Friend/Associate", value: "friend" },
                      { label: "Facebook", value: "facebook" },
                    ]}
                    PlaceholderValue="Select"
                    error={errors}
                  />
                </Stack>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <FormikDropdown
                    name="industry"
                    required
                    label="Your Industry"
                    options={[
                      { label: "Agriculture", value: "agriculture" },
                      { label: "Government", value: "government" },
                      { label: "eCommerce", value: "ecommerce" },
                      { label: "Education", value: "education" },
                      {
                        label: "Advertising and Marketing",
                        value: "marketing",
                      },
                    ]}
                    PlaceholderValue="Select"
                    error={errors}
                  />
                </Stack>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <FormikDropdown
                    name="role"
                    required
                    label="Your Role"
                    options={[
                      { label: "CEO/President/GM", value: "ceo" },
                      { label: "CFO", value: "cfo" },
                      { label: "IT Manager", value: "manager" },
                      { label: "Others", value: "others" },
                    ]}
                    PlaceholderValue="Select"
                    error={errors}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.terms}
                      onChange={handleChange}
                      name="terms"
                    />
                  }
                  label={
                    <Typography>
                      I have read the{" "}
                      <RouterLink to="/terms">Terms and Conditions</RouterLink>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Stack mt={2}>
              {/* <ThemeButton
                loading={isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting || !values.terms}
              >
                Sign Up
              </ThemeButton> */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="bg-primary"
                disabled={isSubmitting || !values.terms}
              >
                {isSubmitting ? "Loading..." : "Sign Up"}
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Formik>
  );
}
