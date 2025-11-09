import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import MainCard from "components/MainCard";
import { Add } from "iconsax-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  flexRender,
  useReactTable,
  HeaderGroup,
  getCoreRowModel,
} from "@tanstack/react-table";
import ScrollX from "components/ScrollX";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router";
import { ProfileIcon } from "assets/svg/profile";
import MenuList from "components/ui/menuList";
import { fetchAllRoles } from "services/roleAndPermission";
import dayjs from "dayjs";
import TablePagination from "components/third-party/TablePagination";
import TableLoading from "components/ui/TableLoading";
import EmptyTable from "components/ui/EmptyTable";
import ThemeButton from "components/ui/Button";
import CreateRolePermission from "components/profile/rolePermission";
import MenuList2 from "components/ui/MenuItem2";

export const Section = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => (
  <Box
    sx={{
      backgroundColor: "#F9F9F9",
      borderBottom: "2px solid #C8D7F7",
      padding: 1.3,
    }}
  >
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyItems={"center"}
      gap={1}
    >
      {icon}
      <Typography sx={{ color: "#394663", fontWeight: 500, fontSize: "14px" }}>
        {title}
      </Typography>
    </Stack>
  </Box>
);

const RoleManager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [permissionsModal, SetPermissionModal] = useState(false);
  const [roles, setRoles] = useState<any>([]);
  const [role_id, setRole_id] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const options = [
    { icon: <ProfileIcon />, value: "Edit", content: () => setIsVisible(true) },
  ];

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    // {
    //   header: 'Users',
    //   accessorKey: 'users',
    //   cell: (cell: any) => {
    //     return <div>6</div>;
    //   }
    // },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (cell: any) => {
        return (
          <>{dayjs(cell?.row?.original?.createdAt).format("DD-MM-YYYY")}</>
        );
      },
    },
    {
      header: "Action",
      id: "action",
      accessorKey: "",
      cell: (cell: any) => {
        return (
          <>
            {console.log("cell", cell?.row?.original?.uuid)}
            <MenuList2
              option={options}
              onClick={() => {
                setRole_id(cell?.row?.original?.uuid);
              }}
            />
          </>
        );
      },
    },
  ];

  const getAllRoles = () => {
    setLoading(true);
    fetchAllRoles({ query: { limit: viewPage, start: startIndex } })?.then(
      (res) => {
        setRoles(res);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getAllRoles();
  }, [viewPage, startIndex]);
  const table = useReactTable({
    data: useMemo(() => roles?.data || [], [roles]),
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
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

  return (
    <div>
      <MainCard>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          marginBottom={6}
          gap={{ xs: 4, sm: 0 }}
        >
          <Stack width={{ xs: "100%", sm: 660 }}>
            <Typography
              variant="h5"
              sx={{ color: "#394663", fontWeight: "600" }}
            >
              User Role Manager
            </Typography>
            <Typography variant="caption" color={"#778194"} fontWeight={400}>
              Set up roles for users and their access rights. This setting helps
              set up permissions in a consistent way, which helps keep your
              workspace secure and compliant.
            </Typography>
          </Stack>

          <Stack>
            <ThemeButton
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={() => {
                setIsVisible(true);
              }}
            >
              Create New Role
            </ThemeButton>
          </Stack>
        </Stack>
        <MainCard content={false}>
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
                              width={250}
                              {...header.column.columnDef.meta}
                              sx={{
                                paddingY: "6px",
                                whiteSpace: "nowrap",
                                textTransform: "none",
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
                    {loading ? (
                      <TableLoading columns={columns} viewPage={viewPage} />
                    ) : table.getRowModel().rows?.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              {...cell.column.columnDef.meta}
                              sx={{
                                fontSize: "12px",
                                paddingY: "5px",
                              }}
                            >
                              <Box
                                sx={{ minWidth: cell.column.columnDef.minSize }}
                              >
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

              {/* PAGINATION */}
              <Divider />
              {roles?.count > 10 && (
                <Box sx={{ p: 2 }}>
                  <TablePagination
                    totalCount={roles?.count}
                    startIndex={startIndex}
                    setStartIndex={setStartIndex}
                    viewPage={viewPage}
                    setViewPage={setViewPage}
                  />
                </Box>
              )}
            </Stack>
          </ScrollX>
        </MainCard>
      </MainCard>

      <CreateRolePermission
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        role_id={role_id}
        setRole_id={setRole_id}
        getAllRoles={getAllRoles}
      />
    </div>
  );
};

export default RoleManager;
