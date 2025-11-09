import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainCard from "components/MainCard";
import AnimateButton from "components/@extended/AnimateButton";
import { openSnackbar } from "api/snackbar";
import {
  Typography,
  useMediaQuery,
  FormLabel,
  FormHelperText,
  Avatar,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import Input from "components/ui/Input";
import UploadButton from "components/ui/uploadButton";

import Dropdown from "components/ui/Dropdown";
import CustomDatePicker2 from "components/ui/newDatePicker";
import FormLabels from "components/ui/FormLabel";
import dayjs from "dayjs";
import { addChassis, getSingleChassis, updateChassis } from "services/chassis";
import { DateTime } from "luxon";
import { CloseCircle } from "iconsax-react";
// import { getAllYard } from "services/yard";
import InfiniteScrollSelect from "components/ui/InfiniteScrollSelect";

interface TruckFormData {
  unitNumber: string;
  plateNumber: string;
  registrationNumber: string;
  inspectionExpiry: string;
  yard: string;
  registrationImage: string;
  inspectionImage: string;
  sixMonthDate: string;
}

const schema = z.object({
  unitNumber: z.string().min(1, "Unit number is required."),
  plateNumber: z.string().min(1, "Plate number is required."),
  registrationNumber: z.string().min(1, "Registration number is required."),
  inspectionExpiry: z.string().min(1, "Inspection expiry date is required."),
  yard: z.string().min(1, "Yard selection is required."),
  registrationImage: z.any(),
  inspectionImage: z.any(),

  sixMonthDate: z.string().optional(),
});

const AddChassis: React.FC = () => {
  const { chassis_id }: any = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState({ fileName: "" });
  const [fileData2, setFileData2] = useState({ fileName: "" });
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  const [yardData, setYardData] = useState([]);
  const [yardViewSize, setYardViewSize] = useState(30);
  const [totalCount, setTotalCount] = useState(0);

  // useEffect(() => {
  //   getAllYard({
  //     query: {
  //       limit: yardViewSize,
  //     },
  //   })
  //     ?.then((res) => {
  //       const resData = res?.data?.map((ele: any) => {
  //         return {
  //           label: ele?.yardName,
  //           value: ele?.uuid,
  //           ...ele,
  //         };
  //       });
  //       setYardData(resData || []);
  //       setTotalCount(res?.count);
  //     })
  //     .catch(() => {
  //       setYardData([]);
  //     });
  // }, [yardViewSize]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TruckFormData>({
    defaultValues: {
      unitNumber: "",
      plateNumber: "",
      registrationNumber: "",
      inspectionExpiry: "",
      yard: "",
      registrationImage: "",
      inspectionImage: "",
      sixMonthDate: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "inspectionExpiry" && key !== "sixMonthDate") {
        formData.append(key, value as string);
      }
    });
    formData.append("toolType", "chassis");
    const parsedDate = DateTime.fromFormat(
      data?.inspectionExpiry ?? "",
      "dd-MM-yyyy"
    ).set({ hour: 23, minute: 59, second: 59, millisecond: 0 });

    const parsedDate2 = DateTime.fromFormat(
      data?.sixMonthDate ?? "",
      "dd-MM-yyyy"
    ).set({ hour: 23, minute: 59, second: 59, millisecond: 0 });

    formData.append(
      "inspectionExpiry",
      parsedDate.isValid ? parsedDate.toISO()! : ""
    );
    formData.append(
      "sixMonthDate",
      parsedDate2.isValid ? parsedDate2.toISO()! : ""
    );

    setLoading(true);
    if (chassis_id) {
      updateChassis({ pathParams: { id: chassis_id }, body: formData })
        ?.then((res) => {
          setLoading(false);
          navigate("/chassis");
          openSnackbar({
            open: true,
            message: res?.message,
            variant: "alert",
            alert: {
              color: "success",
            },
          } as any);
        })
        .catch((err) => {
          setLoading(false);
          openSnackbar({
            open: true,
            message: err?.data?.error?.message,
            variant: "alert",
            alert: {
              color: "error",
            },
          } as any);
        });
    } else {
      addChassis({ body: formData })
        ?.then((res) => {
          setLoading(false);
          navigate("/chassis");
          openSnackbar({
            open: true,
            message: res?.message,
            variant: "alert",
            alert: {
              color: "success",
            },
          } as any);
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
          openSnackbar({
            open: true,
            message: err?.data?.error?.message,
            variant: "alert",
            alert: {
              color: "error",
            },
          } as any);
        });
    }
  };

  useEffect(() => {
    if (chassis_id)
      getSingleChassis({ query: { id: chassis_id } })?.then((res: any) => {
        const response: any = res?.data?.[0];
        Object.keys(response).map((key: any) => {
          setValue(key, response[key]);
        });

        setValue("registrationNumber", response?.registration?.number);
        setValue("registrationImage", response?.registration?.image?.url);
        setValue(
          "inspectionExpiry",
          response.inspection?.expiryDate
            ? dayjs(response.inspection?.expiryDate).format("DD-MM-YYYY")
            : ""
        );

        setValue(
          "sixMonthDate",
          response.inspection?.sixMonthDate
            ? dayjs(response.inspection?.sixMonthDate).format("DD-MM-YYYY")
            : ""
        );

        setValue("inspectionImage", response.inspection?.image?.url);

        setFileData({ fileName: response?.registration?.image?.url });
        setFileData2({ fileName: response.inspection?.image?.url });
      });
  }, []);

  const FormAction = chassis_id ? "Update" : "Add";
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack direction="column" spacing={2}>
          <Typography variant={isMd ? "h3" : "h4"} color="#394663">
            Let's {FormAction} your chassis
          </Typography>
          <Typography variant="caption" color="secondary">
            Steps to get your chassis on its way
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <MainCard title={chassis_id ? "Update chassis" : "Add chassis"}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Controller
                  name="unitNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      label="Unit Number"
                      placeholder="Unit number"
                      control={control}
                      error={errors}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="plateNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      label="Plate Number"
                      control={control}
                      placeholder="Plate number"
                      error={errors}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Controller
                      name="registrationNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          required
                          label="Registration Number"
                          error={errors}
                          control={control}
                          placeholder="Registration number"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormLabel
                      sx={{
                        mb: 0.8,
                        color: "#5A667B",
                        "& .MuiFormLabel-asterisk ": { color: "red" },
                        fontWeight: 600,
                      }}
                    >
                      Upload Proof
                    </FormLabel>

                    <Controller
                      name="registrationImage"
                      control={control}
                      render={({ field: { onChange } }: any) => (
                        <UploadButton
                          setFileData={setFileData}
                          name="registrationImage"
                          onChange={onChange}
                        />
                      )}
                    />

                    {fileData?.fileName && (
                      <Stack
                        direction={"row"}
                        mt={0.5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography variant="subtitle2" color={"GrayText"}>
                          {`${fileData?.fileName?.split(".")?.[0]?.slice(0, 12)}.${fileData?.fileName?.split(".")?.[1]}`}
                        </Typography>
                        <CloseCircle
                          size={14}
                          color="red"
                          onClick={(e) => {
                            e.preventDefault();
                            setFileData({ fileName: "" });
                            setValue("registrationImage", "");
                          }}
                        />
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Controller
                      name="inspectionExpiry"
                      control={control}
                      render={({
                        field: {
                          onChange,
                          onBlur,
                          value,
                          ref,
                          name,
                          ...fieldProps
                        },
                      }: any) => (
                        <>
                          <FormLabels required>
                            Inspection Expiry Date
                          </FormLabels>
                          <CustomDatePicker2
                            {...fieldProps}
                            inputValue={value}
                            setValue={onChange}
                            onBlur={onBlur}
                            after
                            maxDate={dayjs()?.format("DD-MM-YYYY")}
                          />
                          <FormHelperText sx={{ color: "red" }}>
                            {errors &&
                              (errors as any)?.inspectionExpiry?.message}
                          </FormHelperText>
                        </>
                      )}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormLabel
                      sx={{
                        mb: 0.8,
                        color: "#5A667B",
                        "& .MuiFormLabel-asterisk ": { color: "red" },
                        fontWeight: 600,
                      }}
                    >
                      Upload Proof
                    </FormLabel>

                    <Controller
                      name="inspectionImage"
                      control={control}
                      render={({ field: { onChange } }: any) => (
                        <UploadButton
                          setFileData={setFileData2}
                          name="inspectionImage"
                          onChange={onChange}
                        />
                      )}
                    />
                    {fileData2?.fileName && (
                      <Stack
                        direction={"row"}
                        mt={0.5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography variant="subtitle2" color={"GrayText"}>
                          {`${fileData2?.fileName?.split(".")?.[0]?.slice(0, 12)}.${fileData2?.fileName?.split(".")?.[1]}`}
                        </Typography>
                        <CloseCircle
                          size={14}
                          color="red"
                          onClick={(e) => {
                            e.preventDefault();
                            setFileData2({ fileName: "" });
                            setValue("inspectionImage", "");
                          }}
                        />
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="sixMonthDate"
                  control={control}
                  render={({
                    field: {
                      onChange,
                      onBlur,
                      value,
                      ref,
                      name,
                      ...fieldProps
                    },
                  }: any) => (
                    <>
                      <FormLabels required>Six Month Date</FormLabels>
                      <CustomDatePicker2
                        {...fieldProps}
                        inputValue={value}
                        setValue={onChange}
                        onBlur={onBlur}
                        after
                        maxDate={dayjs()?.format("DD-MM-YYYY")}
                      />
                      <FormHelperText sx={{ color: "red" }}>
                        {errors && (errors as any)?.inspectionExpiry?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="yard"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormLabels required> Yard</FormLabels>
                      <InfiniteScrollSelect
                        options={yardData}
                        placeholder="Select"
                        viewSize={yardViewSize}
                        setViewSize={setYardViewSize}
                        totalCount={totalCount}
                        onChangeSelect={(event: any, selectedOption: any) => {
                          field.onChange(selectedOption?.value || null);
                        }}
                        isOptionEqualToValue={(option: any, value: any) =>
                          option.value === value?.value
                        }
                        value={
                          yardData?.find(
                            (opt: any) => opt.value === field.value
                          ) || null
                        }
                        renderTags={(tagValue: any, getTagProps: any) => {
                          return tagValue?.map((option: any, index: any) => (
                            <>
                              <Stack
                                {...getTagProps({ index })}
                                sx={{ bgcolor: "red" }}
                              >
                                {option?.label}
                                {option?.label}
                              </Stack>
                            </>
                          ));
                        }}
                        renderOption={(props: any, option: any) => {
                          return (
                            <>
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                                {...props}
                              >
                                <Avatar
                                  alt={option?.label?.[0]}
                                  src={option?.label}
                                  sx={{
                                    width: "30px",
                                    height: "30px",
                                    textTransform: "capitalize",
                                  }}
                                />
                                <Stack direction={"column"}>
                                  <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    color={"#394663"}
                                    ml={2}
                                    textTransform={"capitalize"}
                                  >
                                    {option?.label}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    color={"#394663"}
                                    ml={2}
                                    textTransform={"capitalize"}
                                  >
                                    {option?.address?.addressLine1}
                                  </Typography>
                                </Stack>
                              </Box>
                            </>
                          );
                        }}
                      />
                    </>
                  )}
                />

                {errors?.yard && (
                  <FormHelperText>{errors?.yard?.message}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} mt={3}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button variant="text" onClick={() => navigate("/chassis")}>
                    Cancel
                  </Button>
                  <AnimateButton>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={loading}
                    >
                      {FormAction} Chassis
                    </LoadingButton>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddChassis;
