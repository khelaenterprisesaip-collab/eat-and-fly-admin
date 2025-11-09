import React, { useMemo, useEffect, useState } from "react";
import { Typography, Drawer, SvgIcon, Tab } from "@mui/material";
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
import MenuList from "components/ui/menuList";
import TableLoading from "components/ui/TableLoading";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { Filter } from "components/filter";
import EmptyTable from "components/ui/EmptyTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CloseIcon } from "assets/svg/CloseIcon";
import SelectColumnVisibility from "components/third-party/SelectColumnVisibility";
import { UpdateStatus } from "services/staff";
import { Edit } from "lucide-react";
import { useGetProduct } from "hooks/product/query";
import { DeleteIcon } from "assets/svg/Delete";
import ConfirmModal from "components/ui/confrimModal";
import { deleteProduct } from "services/product";

const ProductTable = ({ value, searchText, drawer, setDrawer }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [recruiterStatus, setRecruiterStatus] = useState<any>({
    id: "",
  });
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(25);
  const [statusLoading, setStatusLoading] = useState(false);

  const [filterValue, setFilterValue] = useState("Columns");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const savedVisibility = localStorage.getItem("staff");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });

  let query: any = {
    // viewSize: viewPage,
    // startIndex: columnFilters?.length && columnFilters ? 0 : startIndex,
    // isActive: value === "active" ? true : false,
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
  }: any = useGetProduct({ query: { ...query } });

  const options = (rowData: any) => [
    {
      icon: <Edit color="#778194" width="18" height="18" />,
      value: "Edit Profile",

      content: () => {
        navigate(`/product/update/${rowData?.uuid}`);
      },
    },
    {
      icon: <DeleteIcon />,
      value: "Delete Product",

      content: () => {
        setOpen(true);
        setRecruiterStatus({ id: rowData?.uuid });
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

  const deleteStatus = () => {
    setStatusLoading(true);
    deleteProduct({
      pathParams: { id: recruiterStatus?.id },
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
        header: "Item",
        accessorKey: "name",
        meta: {
          type: "text",
        },
        cell: (cell: any) => `${cell?.row?.original?.name || ""}  `,
        minSize: 120,
      },

      {
        header: "Description",
        accessorKey: "description",
        meta: {
          type: "text",
        },
        cell: (cell: any) => `${cell?.row?.original?.description || ""}  `,
        minSize: 120,
      },
      {
        header: "Item Code",
        meta: {
          type: "character_alpha",
        },
        accessorKey: "itemCode",
        minSize: 180,

        cell: ({ cell }: any) => (
          <Typography
            variant="inherit"
            textTransform={"lowercase"}
            color={theme.palette.primary.main}
          >
            {cell?.row?.original?.itemCode || "N/A"}
          </Typography>
        ),
      },
      {
        header: "Airport & Price",
        accessorKey: "pricing",
        minSize: 250,
        cell: (cell: any) => {
          const pricing = cell?.row?.original?.pricing || [];

          if (!pricing.length) return "--";

          return (
            <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
              {pricing.map((item: any, idx: number) => (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  px={1}
                  py={0.5}
                  sx={{
                    borderRadius: "9999px",
                    backgroundColor: "#F5F6FA",
                    border: "1px solid #E0E0E0",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#2E7D32", fontWeight: 500 }}
                  >
                    {item.airport}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#1565C0", fontWeight: 500 }}
                  >
                    ₹{item.price}
                  </Typography>
                </Box>
              ))}
            </Box>
          );
        },
      },
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

      <ConfirmModal
        modalTitle=""
        open={open}
        title={"Are you sure you want to delete this chassis?"}
        onCancel={() => setOpen(false)}
        onConfirm={deleteStatus}
        confirmLoading={statusLoading}
      />

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

export default ProductTable;
