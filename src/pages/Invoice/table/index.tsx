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
import { Edit } from "lucide-react";
import { useGetProduct } from "hooks/product/query";
import { DeleteIcon } from "assets/svg/Delete";
import ConfirmModal from "components/ui/confrimModal";
import { deleteProduct } from "services/product";

const InvoiceStateTable = ({ value, searchText, drawer, setDrawer }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  // ✅ Renamed state
  const [selectedInvoice, setSelectedInvoice] = useState<any>({ id: "" });

  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(25);
  const [statusLoading, setStatusLoading] = useState(false);

  const [filterValue, setFilterValue] = useState("Columns");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const savedVisibility = localStorage.getItem("invoiceColumns");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });

  let query: any = {};

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
    data: invoiceData,
    refetch: refetchInvoice,
    isFetching,
  }: any = useGetProduct({ query: { ...query } });

  const options = (rowData: any) => [
    {
      icon: <Edit color="#778194" width="18" height="18" />,
      value: "Edit Invoice",
      content: () => {
        navigate("");
      },
    },
    {
      icon: <DeleteIcon />,
      value: "Delete Invoice",
      content: () => {
        setOpen(true);
        setSelectedInvoice({ id: rowData?.uuid });
      },
    },
  ];

  useEffect(() => {
    localStorage.setItem("invoiceColumns", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const deleteStatus = () => {
    setStatusLoading(true);
    deleteProduct({
      pathParams: { id: selectedInvoice?.id },
    })
      ?.then((res) => {
        refetchInvoice();
        setOpen(false);
        openSnackbar({
          open: true,
          message: res?.message,
          variant: "alert",
          alert: { color: "success" },
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
          anchorOrigin: { vertical: "top", horizontal: "right" },
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
        meta: { type: "number" },
        minSize: 80,
        cell: (cell: any) => cell?.row?.index + 1 || "N/A",
      },
      {
        header: "Invoice Number",
        accessorKey: "name",
        meta: { type: "text" },
        cell: (cell: any) => `${cell?.row?.original?.name || ""}`,
        minSize: 120,
      },
      {
        header: "Bill Date",
        accessorKey: "billDate",
        meta: { type: "text" },
        cell: (cell: any) => `${cell?.row?.original?.billDate || ""}`,
        minSize: 120,
      },
      {
        header: "Customer Name",
        accessorKey: "customerName",
        minSize: 180,
        meta: { type: "text" },
        cell: ({ cell }: any) => (
          <Typography
            variant="inherit"
            textTransform="lowercase"
            color={theme.palette.primary.main}
          >
            {cell?.row?.original?.customerName || "N/A"}
          </Typography>
        ),
      },
      {
        header: "Customer Email",
        accessorKey: "customerEmail",
        minSize: 180,
        meta: { type: "text" },
        cell: ({ cell }: any) => (
          <Typography
            variant="inherit"
            textTransform="lowercase"
            color={theme.palette.primary.main}
          >
            {cell?.row?.original?.customerEmail || "N/A"}
          </Typography>
        ),
      },
      {
        header: "Total Amount",
        accessorKey: "totalAmount",
        minSize: 180,
        meta: { type: "text" },
        cell: ({ cell }: any) => (
          <Typography
            variant="inherit"
            textTransform="lowercase"
            color={theme.palette.primary.main}
          >
            {cell?.row?.original?.totalAmount || "N/A"}
          </Typography>
        ),
      },
      {
        header: "Action",
        id: "action",
        accessorKey: "action",
        minSize: 120,
        cell: (cell: any) => {
          const rowData = cell?.row?.original;
          return <MenuList option={options(rowData)} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    refetchInvoice();
  }, [
    viewPage,
    startIndex,
    searchText,
    columnFilters?.length && columnFilters,
    value,
  ]);

  const table = useReactTable({
    data: useMemo(() => invoiceData?.data || [], [invoiceData]),
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  const tabs = [
    {
      label: "Columns",
      value: "Columns",
      content: (
        <SelectColumnVisibility
          getVisibleLeafColumns={table.getVisibleLeafColumns}
          getIsAllColumnsVisible={table.getIsAllColumnsVisible}
          getToggleAllColumnsVisibilityHandler={
            table.getToggleAllColumnsVisibilityHandler
          }
          getAllColumns={table.getAllColumns}
        />
      ),
    },
  ];

  return (
    <>
      <ScrollX>
        <Stack>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          sx={{
                            fontSize: "12px",
                            paddingY: "6px",
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
                      ))}
                    </TableRow>
                  ))}
              </TableHead>

              <TableHead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id} sx={{ bgcolor: "white" }}>
                      {headerGroup.headers.map((header) =>
                        header.id !== "action" ? (
                          <TableCell
                            key={header.id}
                            sx={{
                              borderRight: "1px solid #C8D7F7",
                              borderBottom: "1px solid #C8D7F7",
                            }}
                          >
                            {header.column.getCanFilter() && (
                              <Filter column={header.column} />
                            )}
                          </TableCell>
                        ) : null
                      )}
                    </TableRow>
                  ))}
              </TableHead>

              <TableBody>
                {isFetching ? (
                  <TableLoading columns={columns} viewPage={5} />
                ) : table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row: any) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell
                          key={cell.id}
                          sx={{
                            fontSize: "12px",
                            paddingY: "10px",
                            borderRight: "1px solid #C8D7F7",
                            borderBottom: "1px solid #C8D7F7",
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

          <Box sx={{ p: invoiceData?.count > 25 ? 2 : 0 }}>
            <TablePagination
              visibility={invoiceData?.count > 25}
              totalCount={invoiceData?.count}
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
        title="Are you sure you want to delete this invoice?"
        onCancel={() => setOpen(false)}
        onConfirm={deleteStatus}
        confirmLoading={statusLoading}
      />

      <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="right">
        <Stack sx={{ width: 300 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={2.4}
            px={2}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filter (Hide/Show Columns)
            </Typography>
            <SvgIcon
              sx={{ width: 20, cursor: "pointer" }}
              onClick={() => setDrawer(false)}
            >
              <CloseIcon />
            </SvgIcon>
          </Stack>

          <Divider />

          <TabContext value={filterValue}>
            <Box>
              <TabList onChange={handleChange}>
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>

            {tabs.map((tab) => (
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

export default InvoiceStateTable;
