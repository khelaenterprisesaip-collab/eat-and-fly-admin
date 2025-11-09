// @ts-nocheck
import MainCard from "components/MainCard";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Autocomplete,
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Grid,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Input from "components/ui/Input";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import useAuth from "hooks/useAuth";
import { FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { openSnackbar } from "api/snackbar";
import { CloseCircle, InfoCircle } from "iconsax-react";
import { SnackbarProps } from "types/snackbar";
import { VisuallyHiddenInput } from "components/ui/HiddenUploadInput";
import { ProfileIcon } from "assets/svg/profile";
import GooglePlacesAutocomplete from "components/Address";
import CapitalizeInput from "components/ui/CaptializeInput";
import EmailInput from "components/ui/emailInput";
import ThemeButton from "components/ui/Button";
import useFileUpload from "hooks/uploadFile";
import { countriesPhone } from "utils/locales/phone";
import UploadProfilePicture from "components/profileUploader";

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProfileInformation = () => {
  const { user, updateProfile, fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<any>(null);
  const { uploading, handleUpload } = useFileUpload();
  const [uploadings, setUploading] = useState(false);
  // const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formSchema = z.object({
    firstName: z.string().min(1, { message: "Pleas enter  firstName" }),
    lastName: z.string().min(1, { message: "Pleas enter lastName" }),
    phoneNumber: z.string().min(1, { message: "Pleas enter phoneNumber" }),
    email: z
      .string()
      .min(1, { message: "Please enter email" })
      .email({ message: "Please enter a valid email address" }),
    country: z.string().optional(),
    organizationName: z.string().optional(),
    countryCode: z.string().min(1, "Please select country code"),
    address: z.object({
      state: z.string().optional(),
      postal_code: z.string().optional(),
      city: z.string().optional(),
      line1: z.string().optional(),
      country: z.string().optional(),
    }),
  });

  const defaultValues: any = {
    first_name: "",
    last_name: "",
    phoneNumber: "",
    email: "",
    countryCode: "+1",
    address: {
      country: "",
      state: "",
      city: "",
      line1: "",
      postal_code: "",
    },
  };
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
  }: any = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName || "");
      setValue("lastName", user?.lastName || "");
      setValue("email", user?.email || "");
      setValue("profile", user?.profile || "");
      setValue(
        "phoneNumber",
        user?.phone?.number || user?.phoneNumber?.number || ""
      );
      setValue("address.line1", user?.address?.line1 || "");
      setValue("organizationName", user?.organizationName || "");
      setValue("address.country", user?.address?.country || "");
      setValue("address.state", user?.address?.state || "");
      setValue("address.city", user?.address?.city || "");
      setValue(
        "countryCode",
        user?.phone?.countryCode || user?.phoneNumber?.countryCode || "+1"
      );
      setValue("address.postal_code", user?.address?.postal_code || "");
      setLogoFile(user?.profile || "");

      setPreviewImage(user?.avatar_url || "");
    }
  }, [user]);

  const onSubmit = (data: any) => {
    setLoading(true);

    updateProfile({
      body: {
        ...data,
        address: data?.address ? data?.address : undefined,
        country: data?.country ? data?.country : undefined,
        state: data?.state ? data?.country : undefined,
        city: data?.city ? data?.country : undefined,
        postal_code: data?.postal_code ? data?.postal_code : undefined,
        email: data?.email?.toLowerCase(),
      },
    })
      .then((res: any) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: "Profile Updated",
          variant: "alert",
          alert: {
            color: "success",
          },
        } as SnackbarProps);
      })
      .catch((err: any) => {
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

  const handlePlaceSelect = (data: any) => {
    if (data) {
      setValue("address.city", data?.city);
      setValue("address.state", data?.state);
      setValue("address.country", data?.country);
      setValue("address.line1", data?.line1);
      setValue("address.postal_code", data?.postalCode);
      trigger([
        "address.city",
        "address.state",
        "address.country",
        "address.line1",
        "address.postal_code",
      ]);
    }
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File Size Check (1MB)
    if (file.size > 1 * 1024 * 1024) {
      openSnackbar({
        open: true,
        message: "File size must be less than 1MB",
        variant: "alert",
        alert: {
          color: "error",
          icon: <InfoCircle />,
        },
        transition: "SlideDown",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }

    // Preview Image URL
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    // Convert to base64

    try {
      setUploading(true);
      const base64 = await toBase64(file);
      setBase64Image(base64); // Store if needed
      setValue("profile", file); // setValue if using react-hook-form
      setLogoFile(file);

      // Send base64 in API payload
      updateProfile({
        body: {
          profile: { base64 },
        },
      })
        ?.then(() => {
          openSnackbar({
            open: true,
            message: "Profile updated successfully",
            variant: "alert",
            alert: { color: "success" },
          });
          setUploading(false);
          fetchCurrentUser();
        })
        .catch((err) => {
          setUploading(false);
          openSnackbar({
            open: true,
            message: err?.data?.message || "Something went wrong",
            variant: "alert",
            alert: {
              color: "error",
              icon: <InfoCircle />,
            },
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    } catch (error) {
      console.error("Base64 conversion error:", error);
    }
  };

  return (
    <MainCard
      title={
        <Stack>
          <Typography variant="h5" sx={{ color: "#394663", fontWeight: "600" }}>
            Profile Information
          </Typography>
          <Typography variant="caption" color={"#778194"} fontWeight={400}>
            Here you can update user settings
          </Typography>
        </Stack>
      }
    >
      <Grid item xs={12}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction={"row"} rowSpacing={0.5} columnSpacing={2}>
            <Grid item xs={8} mb={2}>
              <Stack direction={{ md: "row" }} gap={3}>
                <UploadProfilePicture
                  updateProfile={updateProfile}
                  fetch={fetchCurrentUser}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <CapitalizeInput
                control={control}
                required
                wordLimit={15}
                label={"First Name"}
                name={"firstName"}
                placeholder="Enter first name"
                error={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CapitalizeInput
                control={control}
                required
                wordLimit={15}
                label={"Last Name"}
                name={"lastName"}
                placeholder="Enter last name"
                error={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <EmailInput
                control={control}
                required
                label={"Email"}
                name={"email"}
                placeholder="Enter email"
                error={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk ": { color: "red" },
                    mb: 0.5,
                    color: "#5A667B",
                    fontWeight: 600,
                  }}
                >
                  Phone Number
                </FormLabel>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  width={"100%"}
                  gap={0}
                >
                  <Controller
                    name={"countryCode"}
                    control={control}
                    render={({ field }) => (
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
                        onChange={(event, selectedOption: any) =>
                          field.onChange(selectedOption?.phone || "")
                        }
                        value={countriesPhone.find(
                          (option) => option.phone === field.value || null
                        )}
                        autoHighlight
                        getOptionLabel={(option: any) => option.phone}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                            {...props}
                          >
                            {option.phone}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="countryCode"
                            sx={{ borderRadius: 0 }}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                    )}
                  />

                  <Controller
                    name={"phoneNumber"}
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        notched={false}
                        {...field}
                        placeholder="Enter phone number"
                        sx={{
                          height: "41px",
                          borderRadius: "0",
                          borderTopRightRadius: "6px",
                          borderBottomRightRadius: "6px",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                        }}
                        fullWidth
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length <= 10) {
                            field.onChange(value);
                          }
                        }}
                      />
                    )}
                  />
                </Stack>

                {(errors?.phone?.number?.message && (
                  <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                    {errors?.phoneNumber?.message}
                  </FormHelperText>
                )) ||
                  (errors?.phone?.isd?.message && (
                    <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                      {errors?.countryCode?.message}
                    </FormHelperText>
                  ))}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Input
                control={control}
                label={"Organization"}
                name={"organizationName"}
                placeholder="Enter organizationName name"
                error={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={"row"} columnSpacing={2}>
                <Grid item xs={12} md={8}>
                  <Controller
                    name={`address.line1`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <GooglePlacesAutocomplete
                          previousValue={watch()}
                          onPlaceSelect={handlePlaceSelect}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("address");
                          }}
                        />
                      </>
                    )}
                  />
                  <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                    {errors && errors?.address?.message}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name={`address.postal_code`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter postal code"
                        labelStyle={{ fontWeight: "600" }}
                        error={errors}
                        name="address.postal_code"
                        control={control}
                        label="PostalCode"
                        onChange={(e: any) => {
                          field.onChange(e);
                          trigger("postal_code");
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container columnSpacing={2}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name={`address.city`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        label={"City"}
                        name={"city"}
                        placeholder="Enter city"
                        error={errors}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name={`address.state`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        label={"Province"}
                        placeholder="Enter Province"
                        name={"state"}
                        error={errors}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name={`address.country`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        label={"Country"}
                        placeholder="Enter country"
                        name={"address.country"}
                        error={errors}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={4}>
            <Stack direction={"row"} justifyContent="flex-end" gap={2}>
              <ThemeButton variant="outlined" onClick={() => router.back()}>
                Cancel
              </ThemeButton>
              <LoadingButton
                variant="contained"
                loading={loading}
                type="submit"
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Grid>
        </form>
      </Grid>
    </MainCard>
  );
};

export default ProfileInformation;
