import React, { useMemo, useEffect, useState } from "react";
import { Typography, Chip } from "@mui/material";
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
import MenuList from "components/ui/menuList";
import { ProfileIcon } from "assets/svg/profile";
import TableLoading from "components/ui/TableLoading";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { Filter } from "components/filter";
import EmptyTable from "components/ui/EmptyTable";
import SelectColumnVisibility from "components/third-party/SelectColumnVisibility";
import { DeleteIcon } from "assets/svg/Delete";
import { deleteChassis, getAllChassis } from "services/chassis";
import dayjs from "dayjs";
import { InfoCircle } from "iconsax-react";
import ConfirmModal from "components/ui/confrimModal";
import FilterDrawer from "components/ColumnFilter";
import { useRole } from "hooks/useAuth";

const ChassisTable = ({ value, drawer, setDrawer }: any) => {
  const theme = useTheme();
  const {
    permission: { edit_chassis, delete_chassis },
  }: any = useRole();
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [chassisDetails, setChassisDetails] = useState<any>({
    id: "",
  });
  const [data, setData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("Columns");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const savedVisibility = localStorage.getItem("chassis");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });

  const options = (id: any) =>
    [
      {
        icon: <ProfileIcon />,
        value: "Edit",
        content: () => navigate(`/chassis/${id}`),
        disabled: !edit_chassis,
      },
      {
        icon: <DeleteIcon />,
        color: "#EB5757",
        value: "Delete",
        content: () => setOpen(true),
        disabled: !delete_chassis,
      },
    ].filter((column: any) => !column.disabled);

  useEffect(() => {
    localStorage.setItem("chassis", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const deleteStatus = () => {
    setStatusLoading(true);
    deleteChassis({
      pathParams: { id: chassisDetails?.id },
    })
      ?.then((res) => {
        fetchChassisDetails();
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

  const hidden_action = !(edit_chassis || delete_chassis);
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
        header: "Plate number",
        accessorKey: "plateNumber",
        meta: {
          type: "character_alpha",
        },
        minSize: 140,
      },
      {
        header: "Unit number",
        accessorKey: "unitNumber",
        meta: {
          type: "character_alpha",
        },
        minSize: 140,
      },

      {
        header: "Registration no.",
        accessorKey: "registration.number",

        meta: {
          type: "character_alpha",
        },
        minSize: 220,
      },

      {
        header: "Inspection expiry date",
        accessorKey: "inspection_date",
        meta: {
          filterVariant: "date",
        },
        cell: ({ cell }: any) => (
          <Typography variant="inherit" color={theme.palette.primary.main}>
            {dayjs(cell?.row?.original?.inspection?.expiryDate).format(
              "DD-MM-YYYY"
            ) || "N/A"}
          </Typography>
        ),
        minSize: 180,
      },
      {
        header: "Yard",
        meta: {
          type: "text",
        },
        accessorKey: "yard",
        minSize: 130,
        cell: (cell: any) => cell?.row?.original?.yardName || "N/A",
      },
      {
        header: "Availability",
        accessorKey: "availability",
        meta: {
          filterVariant: "select",
          filterOptions: [
            { label: " Available", value: "true" },
            { label: "Unavailable", value: "false" },
          ],
        },
        cell: (cell: any) => {
          return (
            <Box display={"flex"} justifyContent={"center"}>
              <Chip
                color={!cell?.row?.original?.is_active ? "success" : "error"}
                label={
                  !cell?.row?.original?.is_active ? "Available" : "Unavailable"
                }
                size="small"
                variant="light"
              />
            </Box>
          );
        },
        minSize: 80,
      },
      {
        header: "Action",
        id: "action",
        hidden: hidden_action,
        accessorKey: "action",
        minSize: 60,
        cell: (cell: any) => {
          return (
            <>
              <div
                className="flex justify-center"
                onClick={() => {
                  setChassisDetails({
                    id: cell?.row?.original?.uuid,
                  });
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

  const fetchChassisDetails = () => {
    let query: any = {
      limit: viewPage,
      type: "chassis",
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
    getAllChassis({ query: query })?.then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchChassisDetails();
  }, [viewPage, startIndex, columnFilters?.length && columnFilters, value]);
  const table = useReactTable({
    data: useMemo(() => data?.data || [], [data]),
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

          <Box sx={{ p: data?.count > 25 ? 2 : 0 }}>
            <TablePagination
              visibility={data?.count > 25}
              totalCount={data?.count}
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
        title={"Are you sure you want to delete this chassis?"}
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

export default ChassisTable;
