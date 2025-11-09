import { Chip, Tooltip, Typography, Zoom } from "@mui/material";
import dayjs from "dayjs";

import { InfoCircle, TickCircle } from "iconsax-react";

export const yardCsvTable: any = (type: string, errors?: any) => [
  {
    id: "select",
    header: "",
    cell: ({ row }: any) => {
      if (type === "all") {
        return row.original.success ? (
          <TickCircle color="green" size={18} />
        ) : row.original.error ? (
          <Tooltip
            title={row.original?.errors
              ?.map((err: any) => err.message)
              .join(",")
              .replaceAll('"', "")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
            style={{
              textTransform: "capitalize",
            }}
          >
            <InfoCircle color="orange" size={18} />
          </Tooltip>
        ) : null;
      }
      return type == "success" ? (
        <TickCircle color="green" size={18} />
      ) : type == "error" ? (
        <Tooltip
          title={errors
            ?.find((val: any) => val?.index === row?.id)
            ?.error?.join(",")
            ?.replaceAll('"', "")}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          style={{
            textTransform: "capitalize",
          }}
        >
          <InfoCircle color="orange" size={18} />
        </Tooltip>
      ) : null;
    },
  },

  {
    header: "Yard  Name",
    accessorKey: "yardName",
    minSize: 150,
  },

  {
    header: "Address Line 1",
    accessorKey: "addressLine1",
    cell: (cell: any) => `${cell?.row?.original?.addressLine1 || ""}` || "N/A",
    minSize: 200,
  },

  {
    header: "Address Line 2",
    accessorKey: "addressLine2",
    cell: (cell: any) => `${cell?.row?.original?.addressLine2 || ""}` || "N/A",
    minSize: 150,
  },

  {
    header: "City",
    accessorKey: "city",
    cell: (cell: any) => ` ${cell?.row?.original?.city || ""} ` || "N/A",
    minSize: 120,
  },

  {
    header: "PostalCode",
    accessorKey: "postalCode",
    cell: (cell: any) => ` ${cell?.row?.original?.postalCode || ""} ` || "N/A",
    minSize: 120,
  },

  {
    header: "State",
    accessorKey: "state",
    cell: (cell: any) => ` ${cell?.row?.original?.state || ""}` || "N/A",
    minSize: 120,
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: (cell: any) => `${cell?.row?.original?.country || ""} ` || "N/A",
    minSize: 120,
  },
];

export const CustomerCsvTable: any = (type: string, errors?: any) => [
  {
    id: "select",
    header: "",
    cell: ({ row }: any) => {
      if (type === "all") {
        return row.original.success ? (
          <TickCircle color="green" size={18} />
        ) : row.original.error ? (
          <Tooltip
            title={row.original?.errors
              ?.map((err: any) => err.message)
              .join(",")
              .replaceAll('"', "")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
            style={{
              textTransform: "capitalize",
            }}
          >
            <InfoCircle color="orange" size={18} />
          </Tooltip>
        ) : null;
      }
      return type == "success" ? (
        <TickCircle color="green" size={18} />
      ) : type == "error" ? (
        <Tooltip
          title={errors
            ?.find((val: any) => val?.index === row?.id)
            ?.error?.join(",")
            ?.replaceAll('"', "")}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          style={{
            textTransform: "capitalize",
          }}
        >
          <InfoCircle color="orange" size={18} />
        </Tooltip>
      ) : null;
    },
  },

  {
    header: "company Name",
    accessorKey: "companyName",
    minSize: 180,
  },

  {
    header: "Email",
    accessorKey: "email",
    minSize: 100,
  },

  {
    header: "Contact Person",
    accessorKey: "contactPerson",
    minSize: 180,
  },

  {
    header: "country Code",
    accessorKey: "countryCode",
    minSize: 180,
  },

  {
    header: "Phone Number",
    accessorKey: "phoneNumber",
    minSize: 180,
  },

  {
    header: "Address Line 1",
    accessorKey: "addressLine1",
    cell: (cell: any) => `${cell?.row?.original?.addressLine1 || ""}` || "N/A",
    minSize: 200,
  },

  {
    header: "Address Line 2",
    accessorKey: "addressLine2",
    cell: (cell: any) => `${cell?.row?.original?.addressLine2 || ""}` || "N/A",
    minSize: 150,
  },

  {
    header: "City",
    accessorKey: "city",
    cell: (cell: any) => ` ${cell?.row?.original?.city || ""} ` || "N/A",
    minSize: 120,
  },

  {
    header: "PostalCode",
    accessorKey: "postalCode",
    cell: (cell: any) => ` ${cell?.row?.original?.postalCode || ""} ` || "N/A",
    minSize: 120,
  },

  {
    header: "State",
    accessorKey: "state",
    cell: (cell: any) => ` ${cell?.row?.original?.state || ""}` || "N/A",
    minSize: 120,
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: (cell: any) => `${cell?.row?.original?.country || ""} ` || "N/A",
    minSize: 120,
  },
];

export const ToolCsvTable: any = (type: string, errors?: any) => [
  {
    id: "select",
    header: "",
    cell: ({ row }: any) => {
      if (type === "all") {
        return row.original.success ? (
          <TickCircle color="green" size={18} />
        ) : row.original.error ? (
          <Tooltip
            title={row.original?.errors
              ?.map((err: any) => err.message)
              .join(",")
              .replaceAll('"', "")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
            style={{
              textTransform: "capitalize",
            }}
          >
            <InfoCircle color="orange" size={18} />
          </Tooltip>
        ) : null;
      }
      return type == "success" ? (
        <TickCircle color="green" size={18} />
      ) : type == "error" ? (
        <Tooltip
          title={errors
            ?.find((val: any) => val?.index === row?.id)
            ?.error?.join(",")
            ?.replaceAll('"', "")}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          style={{
            textTransform: "capitalize",
          }}
        >
          <InfoCircle color="orange" size={18} />
        </Tooltip>
      ) : null;
    },
  },

  {
    header: "Plate number",
    accessorKey: "plateNumber",
    minSize: 100,
  },
  {
    header: "Unit number",
    accessorKey: "unitNumber",
  },

  {
    header: "Registration no.",
    accessorKey: "registrationNumber",

    minSize: 220,
  },

  {
    header: "Inspection expiry date",
    accessorKey: "inspection_date",
    cell: ({ cell }: any) => (
      <Typography variant="inherit">
        {dayjs(cell?.row?.original?.inspection_date).format("DD-MM-YYYY") ||
          "N/A"}
      </Typography>
    ),
    minSize: 180,
  },
  {
    header: "Yard",
    meta: {
      type: "number",
    },
    accessorKey: "yard",
    minSize: 130,
  },
];

export const TruckCsvTable: any = (type: string, errors?: any) => [
  {
    id: "select",
    header: "",
    cell: ({ row }: any) => {
      if (type === "all") {
        return row.original.success ? (
          <TickCircle color="green" size={18} />
        ) : row.original.error ? (
          <Tooltip
            title={row.original?.errors
              ?.map((err: any) => err.message)
              .join(",")
              .replaceAll('"', "")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
            style={{
              textTransform: "capitalize",
            }}
          >
            <InfoCircle color="orange" size={18} />
          </Tooltip>
        ) : null;
      }
      return type == "success" ? (
        <TickCircle color="green" size={18} />
      ) : type == "error" ? (
        <Tooltip
          title={errors
            ?.find((val: any) => val?.index === row?.id)
            ?.error?.join(",")
            ?.replaceAll('"', "")}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          style={{
            textTransform: "capitalize",
          }}
        >
          <InfoCircle color="orange" size={18} />
        </Tooltip>
      ) : null;
    },
  },

  {
    header: "Plate number",
    accessorKey: "plateNumber",
    minSize: 100,
  },
  {
    header: "Unit number",
    accessorKey: "unitNumber",
  },

  {
    header: "Registration no.",
    accessorKey: "registrationNumber",

    minSize: 220,
  },

  {
    header: "Inspection expiry date",
    accessorKey: "inspection_date",
    cell: ({ cell }: any) => (
      <Typography variant="inherit">
        {dayjs(cell?.row?.original?.inspection_date).format("DD-MM-YYYY") ||
          "N/A"}
      </Typography>
    ),
    minSize: 180,
  },
  {
    header: "Truck Type",
    meta: {
      type: "number",
    },
    accessorKey: "truckType",
    minSize: 130,
  },
];
