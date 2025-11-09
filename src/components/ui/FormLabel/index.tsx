import { FormLabel } from "@mui/material";
import React from "react";
import { boolean } from "zod";

const FormLabels = ({
  required,
  children,
  color,
}: {
  required?: boolean;
  children: any;
  color?: string;
}) => {
  return (
    <FormLabel
      required={required}
      sx={{
        "& .MuiFormLabel-asterisk ": { color: "red" },
        mb: 0.5,
        color: color || "#5A667B",
        fontWeight: 600,
        fontSize: "13px",
      }}
    >
      {children}
    </FormLabel>
  );
};

export default FormLabels;
