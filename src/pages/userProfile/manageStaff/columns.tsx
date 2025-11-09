import { Chip, Stack } from "@mui/material";
import { openSnackbar } from "api/snackbar";
import { CharmMenuKebab } from "assets/svg";
import LoadingButton from "components/@extended/LoadingButton";

import { InfoCircle } from "iconsax-react";
import { resendInvite } from "services/staff";
import { SnackbarProps } from "types/snackbar";

export const pendingStaffColumns = [
  {
    header: "First Name",
    accessorKey: "firstName",
  },

  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (cell: any) => (
      <Chip
        size="small"
        sx={{ height: "15px", py: "6px", fontSize: "12px" }}
        color="warning"
        label={cell?.row?.original?.status?.is_active ? "" : "Invitation Sent"}
        variant="light"
      />
    ),
  },
  {
    header: "Action",
    accessorKey: "extra",
    cell: (cell: any) => (
      <>
        <LoadingButton
          variant="text"
          onClick={() => {
            resendInvite({ pathParams: { id: cell?.row?.original?.staff_id } })
              ?.then((res) => {
                openSnackbar({
                  open: true,
                  message: "Invite Send successfully.",
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
              });
          }}
        >
          Resend
        </LoadingButton>
      </>
    ),
  },
];

const getStatusColor: any = (status: string) => {
  let color = "";
  switch (status) {
    case "false":
      color = "warning";
      break;
    case "Not Approved":
      color = "error";
      break;
    default:
      color = "success";
      break;
  }
  return color;
};

export const approvedStaffColumns = [
  {
    header: "First Name",
    accessorKey: "first_name",
  },

  {
    header: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: (cell: any) => {
      return (
        <Stack sx={{ textTransform: "capitalize" }}>
          {cell?.row?.original?.role}
        </Stack>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (cell: any) => (
      <Chip
        size="small"
        sx={{ height: "20px", py: "6px", fontSize: "10px" }}
        color={cell?.row?.original?.is_active ? "success" : "secondary"}
        label={cell?.row?.original?.is_active ? "Active" : "Inactive"}
        variant="light"
      />
    ),
  },

  {
    header: "Action",
    accessorKey: "action",
    cell: (cell: any) => {
      return (
        <Stack flexDirection="row" justifyContent="center">
          <CharmMenuKebab />
        </Stack>
      );
    },
  },
];
