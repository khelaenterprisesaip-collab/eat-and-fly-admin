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
import { Eye } from "lucide-react";
import { DeleteIcon } from "assets/svg/Delete";
import ConfirmModal from "components/ui/confrimModal";
import { useGetInvoices } from "hooks/Invoice/query";
import dayjs from "dayjs";
import { formatINR } from "utils/trimFc";
import ThemeButton from "components/ui/Button";
import { deleteInvoice } from "services/invoice";
import PdfDialog from "../pdf";

const InvoiceStateTable = ({ value, searchText, drawer, setDrawer }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Renamed state
  const [selectedInvoice, setSelectedInvoice] = useState<any>({ id: "" });

  const [startIndex, setStartIndex] = useState(1);
  const [viewPage, setViewPage] = useState(10);
  const [statusLoading, setStatusLoading] = useState(false);
  const [pdfModal, setPdfModal] = useState({ visible: false, url: "" });

  const [filterValue, setFilterValue] = useState("Columns");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const savedVisibility = localStorage.getItem("invoiceColumns");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });

  let query: any = {
    limit: viewPage,
    page: columnFilters?.length && columnFilters ? 1 : currentPage,
  };

  if (columnFilters && columnFilters.length > 0) {
    const data = columnFilters?.map((ele: any) => {
      return { [ele?.id]: ele?.value };
    });
    data?.forEach((obj: any) => {
      let key = Object.keys(obj)[0];
      let value = obj[key];
      query[key] = value;
    });
  }

  const {
    data: invoiceData,
    refetch: refetchInvoice,
    isFetching,
  }: any = useGetInvoices({ query: { ...query } });

  const options = (rowData: any) => [
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
    deleteInvoice({
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
        accessorKey: "invoiceNumber",
        meta: { type: "text" },
        cell: (cell: any) => `${cell?.row?.original?.invoiceNumber || ""}`,
        minSize: 120,
      },
      {
        header: "Bill Date",
        accessorKey: "dateTime",
        meta: { type: "text" },
        cell: (cell: any) =>
          `${cell?.row?.original?.dateTime ? dayjs.unix(cell?.row?.original?.dateTime).format("DD/MM/YYYY HH:mm") : "-"}`,
        minSize: 120,
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
            {formatINR(cell?.row?.original?.totalAmount) || "N/A"}
          </Typography>
        ),
      },
      {
        header: "Download Pdf",
        accessorKey: "pdf",
        minSize: 110,
        meta: { type: "text" },
        cell: ({ row }: any) => {
          return (
            <Stack direction={"row"} gap={2}>
              <ThemeButton
                buttonStyle={{ width: "100%" }}
                variant="contained"
                component="a"
                href={row.original.pdf?.url}
                download
                target="_blank"
              >
                Download
              </ThemeButton>

              <ThemeButton
                buttonStyle={{ width: "100%" }}
                startIcon={<Eye />}
                variant="outlined"
                onClick={() => {
                  setPdfModal({ visible: true, url: row.original.pdf?.url });
                }}
              >
                Preview
              </ThemeButton>
            </Stack>
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
    data: useMemo(() => invoiceData?.invoices || [], [invoiceData]),
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

          <Box sx={{ p: invoiceData?.total > viewPage ? 2 : 0 }}>
            <TablePagination
              visibility={invoiceData?.total > viewPage}
              totalCount={invoiceData?.total}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              viewPage={viewPage}
              setViewPage={setViewPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
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

      <PdfDialog
        open={pdfModal?.visible}
        onClose={() => {
          setPdfModal({ visible: false, url: "" });
        }}
        pdfUrl={pdfModal?.url}
      />
    </>
  );
};

export default InvoiceStateTable;
