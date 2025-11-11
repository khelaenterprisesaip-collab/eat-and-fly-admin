import React, { useMemo, useEffect, useState } from "react";
import {
  Typography,
  Chip,
  Drawer,
  SvgIcon,
  Tab,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import { InfoCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  useReactTable,
  HeaderGroup,
  getCoreRowModel,
} from "@tanstack/react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ScrollX from "components/ScrollX";
import { Box, Stack, useTheme } from "@mui/material";
import { Divider } from "@mui/material";
import TablePagination from "components/third-party/TablePagination";
import Button from "@mui/material/Button";
import MenuList from "components/ui/menuList";
import { StyleLockIcon, StyleUnLockIcon } from "assets/svg/lock";
import { ProfileIcon } from "assets/svg/profile";
import { Modal } from "@mui/material";
// import { changeStatus, fetchAllRecruiter } from "services/recruiter";
import TableLoading from "components/ui/TableLoading";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { Filter } from "components/filter";
import EmptyTable from "components/ui/EmptyTable";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import ThemeButton from "components/ui/Button";
import { defaultSx } from "components/ui/Button/styles";
import { CloseIcon } from "assets/svg/CloseIcon";
import SelectColumnVisibility from "components/third-party/SelectColumnVisibility";
import { DeleteIcon } from "assets/svg/Delete";
import { useGetStaff } from "hooks/staff/query";
import {
  UpdateStatus,
  resendInvite,
  updateStaffPassword,
} from "services/staff";
import { Edit, LockKeyhole, Send } from "lucide-react";
import { setupPassword } from "services/auth";
import OtherModal from "../../../components/ui/Modal";
import { airportCities } from "../addStaff/constant";

const StaffTable = ({ value, searchText, drawer, setDrawer }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState({
    boolean: false,
    uuid: "",
    newPassword: "",
  });
  const [recruiterStatus, setRecruiterStatus] = useState<any>({
    id: "",
    status: "",
  });
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(25);
  const [statusLoading, setStatusLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("Columns");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const savedVisibility = localStorage.getItem("staff");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });

  let query: any = {
    viewSize: viewPage,
    startIndex: columnFilters?.length && columnFilters ? 0 : startIndex,
    isActive: value === "active" ? true : false,
  };
  if (columnFilters && columnFilters.length > 0) {
    const data = columnFilters?.map((ele: any) => {
      return { [ele?.id]: ele?.value };
    });
    data.forEach((obj: any) => {
      let key = Object.keys(obj)[0];
      let value = obj[key];
      query[key] = value;
    });
  }

  const {
    data: staffData,
    refetch: refetchStaff,
    isFetching,
  }: any = useGetStaff({ query: { ...query } });

  const options = (rowData: any) => [
    {
      icon: <Edit color="#778194" width="18" height="18" />,
      value: "Edit Profile",

      content: () => {
        navigate(`/staff/update/${rowData?.uuid}`);
      },
    },
    {
      icon: <ProfileIcon />,
      value: "Update Status",

      content: () => {
        setRecruiterStatus({
          id: rowData?.uuid,
          status: rowData?.isActive,
        });
        setOpen(true);
      },
    },

    {
      icon: <LockKeyhole color="#778194" width="18" height="18" />,
      value: "Update Password",

      content: () => {
        setUpdatePassword((prev) => ({
          ...prev,
          boolean: true,
          uuid: rowData?.uuid,
        }));
      },
    },
  ];

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const changeRecruiterStatus = () => {
    setStatusLoading(true);
    UpdateStatus({
      pathParams: { id: recruiterStatus?.id },
      body: {
        isActive: !recruiterStatus?.status,
      },
    })
      ?.then((res) => {
        refetchStaff();
        setOpen(false);
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
      })
      ?.finally(() => {
        setStatusLoading(false);
      });
  };

  const columns: any = useMemo(
    () => [
      {
        header: "Sr. No.",
        accessorKey: "serial_no",
        meta: {
          type: "number",
        },
        minSize: 50,
        cell: (cell: any) => cell?.row?.index + 1 || "N/A",
      },
      {
        header: "Name",
        accessorKey: "firstName",
        meta: {
          type: "text",
        },
        cell: (cell: any) =>
          `${cell?.row?.original?.firstName || ""} ${cell?.row?.original?.lastName || ""} `,
        minSize: 120,
      },
      {
        header: "Email",
        meta: {
          type: "character_alpha",
        },
        accessorKey: "email",
        minSize: 180,

        cell: ({ cell }: any) => (
          <Typography
            variant="inherit"
            textTransform={"lowercase"}
            color={theme.palette.primary.main}
          >
            {cell?.row?.original?.email || "N/A"}
          </Typography>
        ),
      },

      {
        header: "Airport",
        accessorKey: "airport",
        minSize: 180,
        meta: {
          filterVariant: "select",
          filterOptions: airportCities,
        },
        cell: (cell: any) => {
          return (
            <Box display={"flex"} justifyContent={"center"}>
              <Chip
                color={"success"}
                label={cell?.row?.original?.airport || "--"}
                size="small"
                variant="light"
              />
            </Box>
          );
        },
      },
      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   meta: {
      //     filterVariant: "select",
      //     filterOptions: [
      //       { label: " Active", value: "active" },
      //       { label: "Inactive", value: "inactive" },
      //     ],
      //   },
      //   cell: (cell: any) => {
      //     return (
      //       <Box display={"flex"} justifyContent={"center"}>
      //         <Chip
      //           color={
      //             cell?.row?.original?.status === "awaiting"
      //               ? "warning"
      //               : cell?.row?.original?.status === "active"
      //                 ? "success"
      //                 : "error"
      //           }
      //           label={
      //             cell?.row?.original?.status === "awaiting"
      //               ? "Awaiting"
      //               : cell?.row?.original?.status === "active"
      //                 ? "Active"
      //                 : "Inactive"
      //           }
      //           size="small"
      //           variant="light"
      //         />
      //       </Box>
      //     );
      //   },
      //   minSize: 80,
      // },
      {
        header: "Action",
        id: "action",

        accessorKey: "action",
        minSize: 120,
        cell: (cell: any) => {
          const rowData = cell?.row?.original;
          return (
            <>
              <MenuList option={options(rowData)} />
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    refetchStaff();
  }, [
    viewPage,
    startIndex,
    searchText,
    columnFilters?.length && columnFilters,
    value,
  ]);

  const table = useReactTable({
    data: useMemo(() => staffData?.data || [], [staffData]),
    columns: columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  let headers: any[] = [];

  table.getVisibleLeafColumns()?.map((columns) =>
    headers?.push({
      label:
        typeof columns.columnDef.header === "string"
          ? columns.columnDef.header
          : "#",
      // @ts-ignore
      key: columns.columnDef.accessorKey,
    })
  );

  const tabs = [
    {
      label: "Columns",
      value: "Columns",
      content: (
        <>
          <SelectColumnVisibility
            {...{
              getVisibleLeafColumns: table.getVisibleLeafColumns,
              getIsAllColumnsVisible: table.getIsAllColumnsVisible,
              getToggleAllColumnsVisibilityHandler:
                table.getToggleAllColumnsVisibilityHandler,
              getAllColumns: table.getAllColumns,
            }}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <ScrollX>
        <Stack>
          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  bgcolor: theme.palette.primary.lighter,
                }}
              >
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <>
                          <TableCell
                            key={header.id}
                            {...header.column.columnDef.meta}
                            sx={{
                              fontSize: "12px",
                              paddingY: "6px",
                              textTransform: "none",
                              fontWeight: "600",
                              borderRight: "1px solid #C8D7F7",
                              width: header.column.columnDef.minSize,
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableCell>
                        </>
                      ))}
                    </TableRow>
                  ))}
              </TableHead>
              <TableHead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id} sx={{ bgcolor: "white" }}>
                      {headerGroup.headers.map((header) => (
                        <>
                          {header.id !== "action" && (
                            <TableCell
                              key={header.id}
                              {...header.column.columnDef.meta}
                              sx={{
                                borderRight: "1px solid #C8D7F7",
                                borderBottom: "1px solid #C8D7F7",
                              }}
                            >
                              {header.column.getCanFilter() && (
                                <Filter column={header.column} />
                              )}
                            </TableCell>
                          )}
                        </>
                      ))}
                    </TableRow>
                  ))}
              </TableHead>

              <TableBody>
                {isFetching ? (
                  <TableLoading columns={columns} viewPage={5} />
                ) : table.getRowModel().rows?.length > 0 ? (
                  table.getRowModel().rows.map((row: any) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{
                            fontSize: "12px",
                            textAlign: ["application", "action"]?.includes(
                              cell?.column?.id
                            )
                              ? "center"
                              : "left",
                            paddingY: "10px",
                            textTransform: "capitalize",
                            borderRight: "1px solid #C8D7F7",
                            borderBottom: "1px solid #C8D7F7",
                            position: "relative",
                            width: cell.column.columnDef.minSize,
                          }}
                        >
                          <Box sx={{ minWidth: cell.column.columnDef.minSize }}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length}>
                      <EmptyTable msg="No Data" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider />

          <Box sx={{ p: staffData?.count > 25 ? 2 : 0 }}>
            <TablePagination
              visibility={staffData?.count > 25}
              totalCount={staffData?.count}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              viewPage={viewPage}
              setViewPage={setViewPage}
            />
          </Box>
        </Stack>
      </ScrollX>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box sx={style}>
          <Stack
            direction={"column"}
            alignItems={"center"}
            gap={4}
            sx={{ width: "100%" }}
          >
            <Stack
              sx={{
                backgroundColor: "white",
                borderRadius: 100,
                boxShadow: 1,
                padding: 2,
              }}
            >
              {recruiterStatus?.status === true ? (
                <StyleUnLockIcon />
              ) : (
                <StyleLockIcon />
              )}
            </Stack>
            <Stack sx={{ textAlign: "center" }}>
              <Typography variant="h4">{`${recruiterStatus?.status === true ? "Deactivate" : "Activate"} Staff`}</Typography>
              <Typography variant="caption" marginTop={1}>
                Are you sure you want to{" "}
                {recruiterStatus?.status === true ? "deactivate" : "activate"}{" "}
                this staff?{" "}
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={2} sx={{ width: "100%" }}>
              <ThemeButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  setOpen(false);
                }}
                buttonStyle={{
                  width: "100%",
                }}
              >
                <Typography>Cancel</Typography>
              </ThemeButton>
              <LoadingButton
                loading={statusLoading}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ ...defaultSx }}
                onClick={() => {
                  changeRecruiterStatus();
                }}
              >
                <Typography> Confirm</Typography>
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <OtherModal
        title="Update Password"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={updatePassword?.boolean}
        handleClose={() => {
          setUpdatePassword({ boolean: false, uuid: "", newPassword: "" });
        }}
        footerActions={
          <Stack direction={"row"} gap={2}>
            <ThemeButton
              variant={"outlined"}
              onClick={() => {
                setUpdatePassword({
                  boolean: false,
                  uuid: "",
                  newPassword: "",
                });
              }}
            >
              Cancel
            </ThemeButton>
            <ThemeButton
              loading={updateLoading}
              variant={"contained"}
              onClick={() => {
                setUpdateLoading(true);
                updateStaffPassword({
                  body: {
                    userUuid: updatePassword?.uuid,
                    newPassword: updatePassword?.newPassword,
                  },
                })
                  ?.then(() => {
                    setUpdateLoading(false);
                    openSnackbar({
                      open: true,
                      message: "Staff password update successfully.",
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                    } as SnackbarProps);
                  })
                  .catch((err) => {
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
                    setUpdateLoading(false);
                  });
              }}
            >
              Update
            </ThemeButton>
          </Stack>
        }
      >
        <Stack width={400}>
          <FormLabel
            required
            sx={{
              mb: 0.5,
              color: "#5A667B",
              "& .MuiFormLabel-asterisk ": { color: "red" },
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            New Password
          </FormLabel>
          <OutlinedInput
            notched={false}
            sx={{ height: "40px" }}
            fullWidth
            value={updatePassword?.newPassword}
            placeholder={" Enter new password"}
            onChange={(e) => {
              setUpdatePassword((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }));
            }}
          />
        </Stack>
      </OtherModal>

      <Drawer
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
        anchor="right"
        title=""
      >
        <Stack sx={{ width: 300 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            py={2.4}
            px={2}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filter (Hide/Show Columns)
            </Typography>
            <div
              onClick={() => {
                setDrawer(false);
              }}
            >
              <SvgIcon sx={{ width: 20, cursor: "pointer" }}>
                <CloseIcon />
              </SvgIcon>
            </div>
          </Stack>
          <Divider />
          <TabContext value={filterValue}>
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>

            {tabs?.map((tab) => (
              <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
                {tab.content}
              </TabPanel>
            ))}
          </TabContext>
        </Stack>
      </Drawer>
    </>
  );
};

export default StaffTable;
