import React, { ChangeEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainCard from "components/MainCard";
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Input from "components/ui/Input";
import GooglePlacesAutocomplete from "components/Address";
import EmailInput from "components/ui/emailInput";
import ThemeButton from "components/ui/Button";
import { addCustomer, fetchCustomer, updateCustomer } from "services/customer";
import { countriesPhone } from "utils/locales/phone";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { InfoCircle } from "iconsax-react";
import BusinessHours from "components/daysComponent";
import {
  businessHours,
  convertArrayToObject,
  convertObjectToArray,
  defaultBusinessHours,
  NullBusinessHoursArray,
} from "components/daysComponent/schema";
import { toBase64 } from "components/profileUploader";

import { LoadingButton } from "@mui/lab";
import { ProfileIcon } from "assets/svg/profile";
import { VisuallyHiddenInput } from "components/ui/HiddenUploadInput";

const schema = z.object({
  companyName: z.string().min(1, "Company name is required."),
  contactPerson: z.string().optional(),
  phone: z.object({
    countryCode: z.string().optional(),
    number: z.string().optional(),
  }),
  tariff: z.string().optional(),
  email: z.string().trim().optional(),
  businessHours,
  address: z.object({
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    placeId: z.string().optional(),
  }),
});

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [loading, setLoading] = useState(false);
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  const [Business_id, setBusiness_id] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [base64Url, setBase64Url] = useState("");

  console.log("base64Url", base64Url);

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      companyName: "",
      contactPerson: "",
      tariff: 0,
      phone: {
        countryCode: "+1",
        number: "",
      },
      email: "",
      businessHours: defaultBusinessHours,
      address: {
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        placeId: "",
      },
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    const businessHoursObject = convertObjectToArray(data?.businessHours || {});
    const baseBody = {
      ...data,
      tariff: Number(data?.tariff),
      businessHours: businessHoursObject,
      email: data?.email?.toLowerCase(),
    };
    if (base64Url?.length > 0) {
      baseBody["profileImage"] = { base64: base64Url };
    }

    setLoading(true);
    if (customerId) {
      updateCustomer({
        body: {
          ...baseBody,
          businessHoursId: Business_id,
        },
        pathParams: { id: customerId },
      })
        ?.then((res) => {
          setLoading(false);
          navigate("/customers");
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
        });
    } else {
      addCustomer({
        body: {
          ...baseBody,
        },
      })
        ?.then((res) => {
          navigate("/customers");
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
        });
    }
  };

  useEffect(() => {
    if (customerId)
      fetchCustomer({ pathParams: { id: customerId } })?.then((res) => {
        const businessHoursRes = convertArrayToObject(
          res?.data?.businessDetails?.businessHours || NullBusinessHoursArray
        );
        const response = res?.data?.address?.[0];
        setValue("contactPerson", res?.data?.contactPerson);
        setValue("companyName", res?.data?.companyName);
        setValue("phone.countryCode", res?.data?.phone?.countryCode);
        setValue("phone.number", res?.data?.phone?.number);
        setValue("email", res?.data?.email);
        setValue("tariff", res?.data?.tariff?.toString());
        setValue("address.city", response?.city);
        setValue("address.state", response?.state);
        setValue("address.country", response?.country);
        setValue("address.addressLine1", response?.addressLine1);
        setValue("address.addressLine2", response?.addressLine2);
        setValue("address.postalCode", response?.postalCode);
        setValue("address.placeId", response?.placeId);

        setValue("businessHours", businessHoursRes);
        setBusiness_id(res?.data?.businessDetails?.uuid);
        setPreviewImage(res?.data?.profileImage);
      });
  }, [customerId]);

  const handlePlaceSelect = (data: any) => {
    if (data) {
      setValue("address.city", data?.city);
      setValue("address.state", data?.state);
      setValue("address.country", data?.country);
      setValue("address.addressLine1", data?.line1);
      setValue("address.postalCode", data?.postalCode);
      setValue("address.placeId", data?.placeId);
      trigger([
        "address.city",
        "address.state",
        "address.country",
        "address.addressLine1",
        "address.postalCode",
        "address.placeId",
      ]);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

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
      } as any);
      setUploading(false);
      return;
    }

    const previewURL: any = URL.createObjectURL(file);
    setPreviewImage(previewURL);
    const base64 = await toBase64(file);
    if (base64) {
      setBase64Url(base64);
      setUploading(false);
    }
  };

  const values = watch();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Stack direction="column" spacing={2}>
          <Typography variant={isMd ? "h3" : "h4"} color="#394663">
            {`${customerId ? "Update" : "Add"} Customer`}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={9}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <MainCard title="Customer Information">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction={{ md: "row" }} gap={3}>
                  <Avatar
                    variant="rounded"
                    alt="Profile"
                    src={previewImage || ""}
                    sx={{ width: 70, height: 70 }}
                  />
                  <Stack>
                    <Typography
                      color={"InfoText"}
                      variant="caption"
                      sx={{ fontWeight: "500" }}
                    >
                      Upload Profile Picture <VisuallyHiddenInput type="file" />
                    </Typography>

                    <LoadingButton
                      component="label"
                      loading={uploading}
                      variant="text"
                      color="secondary"
                      startIcon={<ProfileIcon />}
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        bgcolor: "#F3F3F3",
                        width: "12rem",
                        fontSize: "10px",
                        py: 1,
                      }}
                    >
                      Browse Files
                      <VisuallyHiddenInput
                        type="file"
                        name="profile"
                        accept=".png, .jpeg, .jpg"
                        onChange={handleImageChange}
                      />
                    </LoadingButton>

                    <Typography
                      variant="subtitle2"
                      color={"GrayText"}
                      fontSize={10}
                      ml={1}
                      mt={0.8}
                    >
                      PNG, JPEG, JPG. Max file size: 1MB.
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      label="Company Name"
                      placeholder="Enter company name"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="contactPerson"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Person of Contact"
                      placeholder="Enter  person of Contact"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel
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
                      name={"phone.countryCode"}
                      control={control}
                      render={({ field }) => (
                        <>
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
                            filterOptions={(options, state) =>
                              options.filter((option: any) =>
                                option.phone
                                  .toLowerCase()
                                  .includes(state.inputValue.toLowerCase())
                              )
                            }
                            onChange={(event, selectedOption: any) =>
                              field.onChange(selectedOption?.phone || "")
                            }
                            value={countriesPhone?.find(
                              (option: any) =>
                                option.phone === field.value || null
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
                                name="phone.countryCode"
                                sx={{ borderRadius: 0 }}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password",
                                }}
                              />
                            )}
                          />
                        </>
                      )}
                    />

                    <Controller
                      name={"phone.number"}
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
                            if (value?.length <= 10) {
                              field.onChange(value);
                            }
                          }}
                        />
                      )}
                    />
                  </Stack>

                  {(errors?.phone?.number?.message && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors?.phone?.number?.message}
                    </FormHelperText>
                  )) ||
                    (errors?.phone?.countryCode?.message && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors?.phone?.countryCode?.message}
                      </FormHelperText>
                    ))}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <EmailInput
                      {...field}
                      required={false}
                      label="Email"
                      placeholder="Enter email"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="tariff"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Tariff Charges (Per Hour)"
                      placeholder="Enter tariff charges"
                      error={errors}
                      control={control}
                      startAdornment="$"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </MainCard>

          <MainCard title="Company Address" sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name={"address.addressLine1"}
                  control={control}
                  render={({ field }) => (
                    // <Input
                    //   {...field}
                    //   label="Address Line 1"
                    //   placeholder="Enter address line 1"
                    //   error={errors}
                    //   control={control}
                    // />
                    <GooglePlacesAutocomplete
                      previousValue={values}
                      onPlaceSelect={handlePlaceSelect}
                      placeholder="Enter address line 1"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger("address.addressLine1");
                      }}
                    />
                  )}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors && errors?.address?.addressLine1?.message}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={"address.addressLine2"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Address Line 2"
                      placeholder="Enter address line 2 "
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name={"address.country"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Country"
                      placeholder="Enter country"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name={"address.state"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="State"
                      placeholder="Enter state"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name={"address.city"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="City"
                      placeholder="Enter city"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name={"address.postalCode"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Postal Code"
                      placeholder="Enter postal code"
                      error={errors}
                      control={control}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </MainCard>

          <Grid item xs={12} mt={4}>
            <BusinessHours
              methods={control}
              watch={watch}
              setValue={setValue}
            />
          </Grid>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            mt={4}
            mb={1}
          >
            <ThemeButton variant="text" onClick={() => navigate("/customers")}>
              Cancel
            </ThemeButton>

            <ThemeButton type={"submit"} variant="contained" loading={loading}>
              {`${customerId ? "Update" : "Add"} Customer`}
            </ThemeButton>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddCustomer;
