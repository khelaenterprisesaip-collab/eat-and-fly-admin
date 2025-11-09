import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  useReactTable,
  HeaderGroup,
  getCoreRowModel,
} from "@tanstack/react-table";
// material-ui
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
import MenuList from "components/ui/menuList";
import { ProfileIcon } from "assets/svg/profile";
import TableLoading from "components/ui/TableLoading";
import { Filter } from "components/filter";
import EmptyTable from "components/ui/EmptyTable";
import SelectColumnVisibility from "components/third-party/SelectColumnVisibility";
import { DeleteIcon } from "assets/svg/Delete";
import { deleteCustomer, fetchAllCustomers } from "services/customer";
import FilterDrawer from "components/ColumnFilter";
import ConfirmModal from "components/ui/confrimModal";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { InfoCircle } from "iconsax-react";
import { useRole } from "hooks/useAuth";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";

const CustomerTable = ({ value, searchText, drawer, setDrawer }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    permission: { edit_customer, delete_customer },
  }: any = useRole();

  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [CustomerId, setCustomerId] = useState<any>("");

  const [customersData, setCustomersData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("Columns");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const savedVisibility = localStorage.getItem("customer");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });

  const options = (id: any) =>
    [
      {
        icon: <ProfileIcon />,
        value: "Edit",
        content: () => navigate(`/customer/${id}`),
        disabled: !edit_customer,
      },
      {
        icon: <DeleteIcon />,
        color: "#EB5757",
        value: "Delete",
        content: () => setOpen(true),
        disabled: !delete_customer,
      },
    ].filter((column: any) => !column.disabled);

  useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const getAllCustomers = () => {
    let query: any = {
      limit: viewPage,
      userType: "customer",
      start: columnFilters?.length && columnFilters ? 0 : startIndex,
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
    setLoading(true);
    fetchAllCustomers({ query })?.then((res) => {
      setCustomersData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllCustomers();
  }, [viewPage, startIndex, columnFilters?.length && columnFilters, value]);

  const deleteStatus = () => {
    setStatusLoading(true);
    deleteCustomer({
      pathParams: { id: CustomerId },
    })
      ?.then((res) => {
        getAllCustomers();
        setStatusLoading(false);
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
        setStatusLoading(false);
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

  const hidden_action = !(edit_customer || delete_customer);
  const columns: any = useMemo(
    () => [
      {
        header: "Sr. No.",
        accessorKey: "serial_no",
        meta: {
          type: "number",
        },
        minSize: 80,
        cell: (cell: any) => cell?.row?.index + 1 || "N/A",
      },
      {
        header: "Customer  Name",
        accessorKey: "name",
        minSize: 280,
        cell: (cell: any) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/customer/${cell?.row?.original?.uuid}`);
            }}
          >
            <Tooltip
              arrow
              title={
                <Typography variant="caption">
                  {cell?.row?.original?.companyName}
                </Typography>
              }
              placement="top"
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                style={{ cursor: "pointer" }}
              >
                {cell?.row?.original?.profileImage ? (
                  <Avatar
                    sx={{ height: 26, width: 26, borderRadius: 11 }}
                    src={cell?.row?.original?.profileImage}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      fontWeight: "500",
                      height: 26,
                      width: 26,
                      fontSize: 13,
                      textTransform: "capitalize",
                    }}
                  >
                    {cell?.row?.original?.companyName.charAt(0)}
                  </Avatar>
                )}
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: "12px",
                    color: theme.palette.primary.main,
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "calc(100% - 40px)",
                  }}
                >
                  {`${cell?.row?.original?.companyName || ""} ${cell?.row?.original?.contactPerson ? `(${cell?.row?.original?.contactPerson || ""})` : ""}`}
                </Typography>
              </Stack>
            </Tooltip>
          </div>
        ),
      },

      {
        header: "Phone",
        accessorKey: "phone",
        meta: {
          type: "number",
        },
        cell: (cell: any) =>
          cell?.row?.original?.phone?.number
            ? `${cell.row.original.phone.countryCode} ${cell.row.original.phone.number}`
            : "N/A",
        minSize: 160,
      },

      {
        header: "Email",
        accessorKey: "email",
        meta: {
          type: "email",
        },

        cell: (cell: any) => (
          <Stack textTransform={"lowercase"}>
            {cell?.row?.original?.email || (
              <span className="capitalize">N/A</span>
            )}
          </Stack>
        ),

        minSize: 220,
      },

      {
        header: "Address",
        accessorKey: "address",
        cell: (cell: any) => {
          const addr = cell?.row?.original?.address?.[0];
          if (!addr) return "N/A";

          const line = addr.addressLine1 || "";
          const postal = addr.postalCode || "";
          return line || postal ? `${line} (${postal})` : "N/A";
        },
        minSize: 350,
      },
      {
        header: "City",
        accessorKey: "city",
        cell: (cell: any) =>
          ` ${cell?.row?.original?.address?.[0]?.city || "N/A"} `,
        minSize: 180,
      },
      {
        header: "State",
        accessorKey: "state",
        cell: (cell: any) =>
          ` ${cell?.row?.original?.address?.[0]?.state || "N/A"} `,
        minSize: 180,
      },

      {
        header: "Country",
        accessorKey: "country",
        cell: (cell: any) =>
          ` ${cell?.row?.original?.address?.[0]?.country || "N/A"} `,
        minSize: 180,
      },
      {
        header: "Action",
        id: "action",
        accessorKey: "action",
        hidden: hidden_action,
        minSize: 60,
        cell: (cell: any) => {
          return (
            <>
              <div
                className="flex justify-center"
                onClick={() => {
                  setCustomerId(cell?.row?.original?.uuid);
                }}
              >
                <MenuList option={options(cell?.row?.original?.uuid)} />
              </div>
            </>
          );
        },
      },
    ],
    [hidden_action]
  );

  const table = useReactTable({
    data: useMemo(() => customersData?.data || [], [customersData?.data]),
    columns: columns?.filter((column: any) => !column.hidden),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  let headers: any[];

  table.getVisibleLeafColumns()?.map((columns) =>
    // @ts-ignore
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
                        <TableCell
                          key={header.id}
                          {...header.column.columnDef.meta}
                          sx={{
                            fontSize: "12px",
                            paddingY: "6px",
                            textTransform: "none",
                            fontWeight: "600",
                            borderRight: "1px solid #C8D7F7",
                            minWidth: header.column.columnDef.minSize,
                          }}
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
                {loading ? (
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
                          {/* <Box sx={{ minWidth: cell.column.columnDef.minSize }}> */}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                          {/* </Box> */}
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

          {/* PAGINATION */}
          <Divider />

          <Box sx={{ p: customersData?.count > 25 ? 2 : 0 }}>
            <TablePagination
              visibility={customersData?.count > 25}
              totalCount={customersData?.count}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              viewPage={viewPage}
              setViewPage={setViewPage}
            />
          </Box>
        </Stack>
      </ScrollX>

      <ConfirmModal
        modalTitle=""
        open={open}
        title={"Are you sure you want to delete this customer?"}
        onCancel={() => setOpen(false)}
        onConfirm={deleteStatus}
        confirmLoading={statusLoading}
      />

      <FilterDrawer
        drawer={drawer}
        setDrawer={setDrawer}
        tabs={tabs}
        filterValue={filterValue}
        handleChange={handleChange}
      />
    </>
  );
};

export default CustomerTable;
