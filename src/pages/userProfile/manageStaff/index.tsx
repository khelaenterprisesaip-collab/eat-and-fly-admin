import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import MainCard from "components/MainCard";
import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import Input from "components/ui/Input";
import Dropdown from "components/ui/Dropdown";
import ScrollX from "components/ScrollX";
import { useTheme } from "@mui/material";
import { countriesPhone } from "utils/locales/phone";
import {
  HeaderGroup,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { pendingStaffColumns } from "./columns";
import { GetAllStaff, inviteStaff } from "services/staff";
import { openSnackbar } from "api/snackbar";
import { useRole } from "hooks/useAuth";
import { InfoCircle } from "iconsax-react";
import { SnackbarProps } from "types/snackbar";
import TablePagination from "components/third-party/TablePagination";
import TableLoading from "components/ui/TableLoading";
import EmptyTable from "components/ui/EmptyTable";
import ThemeButton from "components/ui/Button";
import CapitalizeInput from "components/ui/CaptializeInput";
import EmailInput from "components/ui/emailInput";
import ApprovedStaffTable from "components/profile/approvedStaffTable";

const ManageStaff = () => {
  const [StaffData, setStaffData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);
  const theme = useTheme();
  const { roles }: any = useRole();
  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    countryCode: z.string().min(1, "Country code is required"),
    number: z.string().min(1, { message: "Phone number is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("Please enter a valid email address."),
    role: z
      .string()
      .or(z.number())
      .refine((value) => value !== undefined && value !== 0 && value !== "", {
        message: "Role selection is required.",
      }),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    role: "",
    countryCode: "+1",
  };
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  }: any = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema),
  });

  const fetchAllStaff = () => {
    setTableLoading(true);
    GetAllStaff({
      query: { limit: viewPage, start: startIndex, status: "awaiting" },
    })?.then((res) => {
      setTableLoading(false);
      setStaffData(res);
    });
  };

  useEffect(() => {
    fetchAllStaff();
  }, [viewPage, startIndex]);

  const onSubmit = (data: any) => {
    setLoading(true);
    inviteStaff({ body: { ...data, email: data?.email?.toLowerCase() } })
      ?.then((res) => {
        reset(defaultValues);
        setLoading(false);
        fetchAllStaff();
        openSnackbar({
          open: true,
          message: "Invite Send successfully.",
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
  };

  const pendingStaffTable = useReactTable({
    data: useMemo(() => StaffData?.data || [], [StaffData?.data]),
    columns: pendingStaffColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <Grid xs={12}>
      <Stack spacing={2}>
        {/* Invite staff form card */}

        <MainCard
          title={
            <Typography
              variant="h5"
              sx={{ color: "#394663", fontWeight: "600" }}
            >
              Invite Staff Members
            </Typography>
          }
        >
          <Grid item xs={12}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                direction={"row"}
                xs={12}
                rowSpacing={1}
                columnSpacing={2}
              >
                <Grid item xs={12} sm={4}>
                  <CapitalizeInput
                    required
                    wordLimit={15}
                    control={control}
                    label={"First Name"}
                    name={"firstName"}
                    placeholder="Enter first name"
                    error={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CapitalizeInput
                    required
                    wordLimit={15}
                    control={control}
                    label={"Last Name"}
                    name={"lastName"}
                    placeholder="Enter last name"
                    error={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <EmailInput
                    required
                    control={control}
                    label={"Email"}
                    name={"email"}
                    placeholder="Enter email"
                    error={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                        name="countryCode"
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
                        name="number"
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
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              if (value.length <= 10) {
                                field.onChange(value);
                              }
                            }}
                          />
                        )}
                      />
                    </Stack>

                    {(errors?.number?.message && (
                      <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                        {errors?.number?.message}
                      </FormHelperText>
                    )) ||
                      (errors?.countryCode?.message && (
                        <FormHelperText sx={{ color: "red", marginTop: 1 }}>
                          {errors?.countryCode?.message}
                        </FormHelperText>
                      ))}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Dropdown
                    required
                    control={control}
                    PlaceholderValue="Select role"
                    label="Role"
                    name="role"
                    options={
                      roles?.map((ite: any) => {
                        return {
                          label: ite?.name,
                          value: ite?.name,
                        };
                      }) || []
                    }
                    error={errors}
                  />
                </Grid>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  width="100%"
                  mt={2}
                >
                  <ThemeButton
                    size="small"
                    loading={loading}
                    type="submit"
                    variant="contained"
                  >
                    Send Invite
                  </ThemeButton>
                </Stack>
              </Grid>
            </form>
          </Grid>
        </MainCard>

        <MainCard
          content={false}
          title={
            <Typography
              variant="h5"
              sx={{ color: "#394663", fontWeight: "600" }}
            >
              Invited Staff Members
            </Typography>
          }
        >
          <Stack sx={{ padding: 2 }}>
            <MainCard content={false}>
              <ScrollX>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                      {pendingStaffTable
                        ?.getHeaderGroups()
                        ?.map((headerGroup: HeaderGroup<any>) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <TableCell
                                key={header.id}
                                {...header.column.columnDef.meta}
                                sx={{ fontSize: "10px", paddingY: "4px" }}
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                      {tableLoading ? (
                        <TableLoading
                          columns={pendingStaffColumns}
                          viewPage={viewPage}
                        />
                      ) : pendingStaffTable.getRowModel().rows.length > 0 ? (
                        pendingStaffTable.getRowModel().rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                {...cell.column.columnDef.meta}
                                sx={{ fontSize: "12px", paddingY: "10px" }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={pendingStaffTable.getAllColumns().length}
                          >
                            <EmptyTable msg="No Data" height={150} />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Divider />
                  {StaffData?.count > 10 && (
                    <Box sx={{ p: 2 }}>
                      <TablePagination
                        totalCount={StaffData?.count}
                        startIndex={startIndex}
                        setStartIndex={setStartIndex}
                        viewPage={viewPage}
                        setViewPage={setViewPage}
                      />
                    </Box>
                  )}
                </TableContainer>
              </ScrollX>
            </MainCard>
          </Stack>
        </MainCard>

        <ApprovedStaffTable />
      </Stack>
    </Grid>
  );
};

export default ManageStaff;
