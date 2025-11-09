import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  HeaderGroup,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import MainCard from "components/MainCard";
import ScrollX from "components/ScrollX";
import { useEffect, useState } from "react";
import TanstackTable from "@mui/material/Table";
import EmptyTable from "../EmptyTable";

interface TableProps {
  data: Array<Object>;
  columns: ColumnDef<Object>[];
  secondary?: React.ReactNode;
}

const Table = ({ data, columns, secondary }: TableProps) => {
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  useEffect(
    () =>
      setColumnVisibility({
        id: false,
        role: false,
        contact: false,
      }),
    []
  );

  let headers: any[];
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
  return (
    <MainCard content={false} secondary={secondary}>
      <ScrollX>
        <TableContainer component={Paper}>
          <TanstackTable>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <TableRow key={headerGroup.id} sx={{ bgcolor: "#EBF1FD" }}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      {...header.column.columnDef.meta}
                      sx={{
                        fontSize: "10px",
                        paddingY: "6px",
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
            {data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length}>
                  <EmptyTable msg="No records found!" />
                </TableCell>
              </TableRow>
            ) : null}
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      {...cell.column.columnDef.meta}
                      sx={{ fontSize: "12px", paddingY: "8px" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TanstackTable>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
};

export default Table;
