import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Field } from "formik";

interface FormikDropdownProps {
  name: string;
  label: React.ReactNode;
  options: Array<{ label: string; value: string }>;
  error?: any;
  required?: boolean;
  PlaceholderValue?: string;
  width?: string;
  disabled?: boolean;
}

const FormikDropdown = ({
  name,
  label,
  options,
  error,
  required,
  PlaceholderValue,
  width,
  disabled,
}: FormikDropdownProps) => {
  return (
    <Stack>
      <FormLabel
        required={required}
        sx={{
          "& .MuiFormLabel-asterisk ": { color: "red" },
          color: "#5A667B",
          mb: 0.5,
          fontWeight: 600,
        }}
      >
        {label}
      </FormLabel>
      <Field name={name}>
        {({ field, form }: any) => (
          <Select
            disabled={disabled}
            {...field}
            value={field.value || ""}
            displayEmpty
            // sx={{ height: "44px", width: width || "100%" }}
            onChange={(e) => form.setFieldValue(name, e.target.value)}
          >
            <MenuItem value="" disabled>
              {PlaceholderValue}
            </MenuItem>
            {options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      </Field>
      <FormHelperText sx={{ color: "red" }}>{error?.[name]}</FormHelperText>
    </Stack>
  );
};

export default FormikDropdown;
