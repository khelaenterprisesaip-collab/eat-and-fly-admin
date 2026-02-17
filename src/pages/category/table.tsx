import React, { useMemo, useState } from "react";
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
import { Box, Stack, useTheme, Divider } from "@mui/material";
import TablePagination from "components/third-party/TablePagination";
import MenuList from "components/ui/menuList";
import TableLoading from "components/ui/TableLoading";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import EmptyTable from "components/ui/EmptyTable";
import { Edit } from "lucide-react";
import { DeleteIcon } from "assets/svg/Delete";
import ConfirmModal from "components/ui/confrimModal";
import { InfoCircle } from "iconsax-react";
import { useGetCategory } from "hooks/category/query";
import { deleteCategory } from "services/category";

const CategoryTable = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>("");
    const [startIndex, setStartIndex] = useState(0);
    const [viewPage, setViewPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusLoading, setStatusLoading] = useState(false);

    const query: any = {
        viewSize: viewPage,
        page: currentPage,
    };

    const {
        data: categoryData,
        refetch,
        isFetching,
    }: any = useGetCategory({ query });

    const options = (rowData: any) => [
        {
            icon: <Edit color="#778194" width="18" height="18" />,
            value: "Edit Category",
            content: () => {
                navigate(`/category/update/${rowData?.uuid}`);
            },
        },
        {
            icon: <DeleteIcon />,
            value: "Delete Category",
            content: () => {
                setOpen(true);
                setDeleteId(rowData?.uuid);
            },
        },
    ];

    const handleDelete = () => {
        setStatusLoading(true);
        deleteCategory({
            pathParams: { id: deleteId },
        })
            ?.then((res) => {
                refetch();
                setOpen(false);
                openSnackbar({
                    open: true,
                    message: res?.message || "Category deleted successfully",
                    variant: "alert",
                    alert: { color: "success" },
                } as SnackbarProps);
            })
            .catch((err) => {
                openSnackbar({
                    open: true,
                    message: err?.data?.message || "Something went wrong",
                    variant: "alert",
                    alert: { color: "error", icon: <InfoCircle /> },
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
                minSize: 50,
                cell: (cell: any) => cell?.row?.index + 1 || "N/A",
            },
            {
                header: "Name",
                accessorKey: "name",
                cell: (cell: any) => cell?.row?.original?.name || "N/A",
                minSize: 150,
            },
            {
                header: "Description",
                accessorKey: "description",
                cell: (cell: any) => cell?.row?.original?.description || "N/A",
                minSize: 200,
            },
            {
                header: "Action",
                id: "action",
                accessorKey: "action",
                minSize: 100,
                cell: (cell: any) => (
                    <MenuList option={options(cell?.row?.original)} />
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: useMemo(() => categoryData?.data || [], [categoryData]),
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <ScrollX>
                <Stack>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
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
                            <TableBody>
                                {isFetching ? (
                                    <TableLoading columns={columns} viewPage={5} />
                                ) : table.getRowModel().rows?.length > 0 ? (
                                    table.getRowModel().rows.map((row: any) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell: any) => (
                                                <TableCell
                                                    key={cell.id}
                                                    sx={{
                                                        fontSize: "12px",
                                                        textAlign: cell.column.id === "action" ? "center" : "left",
                                                        paddingY: "10px",
                                                        textTransform: "capitalize",
                                                        borderRight: "1px solid #C8D7F7",
                                                        borderBottom: "1px solid #C8D7F7",
                                                    }}
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
                                        <TableCell colSpan={columns.length}>
                                            <EmptyTable msg="No Data" />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Divider />

                    <Box sx={{ p: categoryData?.pagination?.totalItems > viewPage ? 2 : 0 }}>
                        <TablePagination
                            visibility={categoryData?.pagination?.totalItems > viewPage}
                            totalCount={categoryData?.pagination?.totalItems}
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
                title={"Are you sure you want to delete this category?"}
                onCancel={() => setOpen(false)}
                onConfirm={handleDelete}
                confirmLoading={statusLoading}
            />
        </>
    );
};

export default CategoryTable;
