import {
  Box,
  Button,
  Chip,
  Divider,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {
  HeaderGroup,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import MainCard from "components/MainCard";
import ScrollX from "components/ScrollX";
import TablePagination from "components/third-party/TablePagination";
import EmptyTable from "components/ui/EmptyTable";
import TableLoading from "components/ui/TableLoading";
import React, { useEffect, useMemo, useState } from "react";
import { GetAllStaff, resendInvite, UpdateStatus } from "services/staff";
import { ProfileIcon } from "assets/svg/profile";

import MenuList from "components/ui/menuList";
import { openSnackbar } from "api/snackbar";
import UpdateStaffStatus from "./changeStatus";
import { debounce } from "lodash";
import { useRole } from "hooks/useAuth";
import { InfoCircle } from "iconsax-react";
import { SnackbarProps } from "types/snackbar";

const ApprovedStaffTable = () => {
  const theme = useTheme();
  const [StaffData, setStaffData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({ id: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const options = (id: any, status: string) => [
    {
      value: "Update Status",
      content: () => setIsModalOpen({ id: id, status: status }),
      icon: <ProfileIcon />,
    },
  ];

  const debouncedSearch = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  const fetchAllStaff = () => {
    setTableLoading(true);
    GetAllStaff({
      query: {
        limit: viewPage,
        start: startIndex,
        status: "active",
        search: searchText,
      },
    })?.then((res) => {
      setTableLoading(false);
      setStaffData(res);
    });
  };

  useEffect(() => {
    fetchAllStaff();
  }, [viewPage, startIndex, searchText]);

  const handleUpdateStatus = () => {
    setLoading(true);
    UpdateStatus({
      pathParams: { id: isModalOpen?.id },
      body: {
        is_deleted: !isModalOpen?.status,
      },
    })
      ?.then((res: any) => {
        setIsModalOpen({ id: "", status: "" });
        fetchAllStaff();
        openSnackbar({
          open: true,
          message: "Status updated!",
          variant: "alert",
          alert: {
            color: "success",
          },
        } as any);
      })
      ?.catch((err: any) => {})
      ?.finally(() => setLoading(false));
  };

  const approvedStaffColumns: any = useMemo(
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
        cell: (cell: any) =>
          `${cell?.row?.original?.firstName || ""} ${cell?.row?.original?.lastName || ""} `,
        minSize: 120,
      },
      {
        header: "Email",
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
        header: "Phone",
        accessorKey: "phone",
        minSize: 180,
        cell: (cell: any) =>
          `${cell?.row?.original?.phoneNumber?.countryCode || ""} ${cell?.row?.original?.phoneNumber?.number || ""} `,
      },

      {
        header: "Role",
        accessorKey: "role",
        minSize: 180,
        cell: (cell: any) => {
          return (
            <Box display={"flex"} justifyContent={"start"}>
              <Chip
                color={"success"}
                label={cell?.row?.original?.roleDetails?.name || "--"}
                size="small"
                variant="light"
              />
            </Box>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        meta: {
          filterVariant: "select",
          filterOptions: [
            { label: " Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        },
        cell: (cell: any) => {
          return (
            <Box display={"flex"} justifyContent={"start"}>
              <Chip
                color={
                  cell?.row?.original?.status === "awaiting"
                    ? "warning"
                    : cell?.row?.original?.status === "active"
                      ? "success"
                      : "error"
                }
                label={
                  cell?.row?.original?.status === "awaiting"
                    ? "Awaiting"
                    : cell?.row?.original?.status === "active"
                      ? "Active"
                      : "Inactive"
                }
                size="small"
                variant="light"
              />
            </Box>
          );
        },
        minSize: 80,
      },
    ],
    []
  );

  const approvedStaffTable = useReactTable({
    data: useMemo(() => StaffData?.data || [], [StaffData?.data]),
    columns: approvedStaffColumns?.filter((column: any) => !column?.hidden),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <MainCard
      title={
        <Stack>
          <Stack direction="row" alignItems="center">
            <Typography
              variant="h5"
              sx={{ color: "#394663", fontWeight: "600" }}
            >
              {" "}
              Approved Staff Members{" "}
            </Typography>
            <Chip
              sx={{
                fontSize: "14px",
                paddingY: "6px",
                height: "20px",
                marginLeft: "8px",
                color: "#334735",
              }}
              label={`${StaffData?.count}  Member`}
              // color="primary"
              variant="light"
            />
          </Stack>
          <Typography variant="caption" color={"#778194"} fontWeight={400}>
            Keep track of your staff and associates here.
          </Typography>
        </Stack>
      }
      subtitle="Keep track of your staff and associates here"
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" width="100%">
          <OutlinedInput
            onChange={(e) => {
              debouncedSearch(e?.target?.value);
            }}
            placeholder="Search by name or email?"
            sx={{
              height: "35px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              bgcolor: "white",
            }}
            fullWidth
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              height: "35px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            Search
          </Button>
        </Stack>
        <MainCard content={false}>
          <ScrollX>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                  {approvedStaffTable
                    .getHeaderGroups()
                    .map((headerGroup: HeaderGroup<any>) => (
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
                      columns={approvedStaffColumns}
                      viewPage={viewPage}
                    />
                  ) : approvedStaffTable.getRowModel().rows?.length > 0 ? (
                    approvedStaffTable.getRowModel().rows.map((row) => (
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
                        colSpan={approvedStaffTable.getAllColumns().length}
                      >
                        <EmptyTable msg="No Data" height={150} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
          </ScrollX>
        </MainCard>
      </Stack>
      <UpdateStaffStatus
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        isTrue={isModalOpen?.status}
        handleUpdateStatus={handleUpdateStatus}
      />
    </MainCard>
  );
};

export default ApprovedStaffTable;
