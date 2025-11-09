import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface CustomInputProps {
  id?: string;
  label?: string;
  value?: any;
  name: any;
  onChange?: any;
  placeholder?: string;
  control: any;
  error?: { [key: string]: any };
  startAdornment?: any;
  labelStyle?: any;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  onInput?: any;
  allowNumbers?: boolean;
  wordLimit?: number; // New prop for word limit
}

const capitalizeFirstLetter = (string: string) => {
  if (!string) return "";
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const filterAlphabets = (string: string) => string.replace(/[^a-zA-Z\s]/g, "");

const filterAlphabetsAndNumbers = (string: string) =>
  string.replace(/[^a-zA-Z0-9\s]/g, "");

const CapitalizeInput = ({
  id,
  name,
  error,
  startAdornment,
  required,
  labelStyle,
  disabled,
  onChange,
  control,
  allowNumbers,
  wordLimit,
  ...props
}: CustomInputProps) => {
  const [firstKey, secondKey] = name?.split(".");

  const handleChange = (
    value: string,
    fieldOnChange: any,
    allowNumbers = false
  ) => {
    const filteredValue = allowNumbers
      ? filterAlphabetsAndNumbers(value)
      : filterAlphabets(value);
    const trimmedValue =
      value.length > 0 ? filteredValue : filteredValue.trim();
    const formattedValue = capitalizeFirstLetter(trimmedValue);
    const words: any = formattedValue?.trim();
    const wordCount = words.length;
    if (wordLimit && wordCount > wordLimit) {
      const truncatedValue = words.slice(0, wordLimit).join(" ");
      fieldOnChange(truncatedValue);
    } else {
      fieldOnChange(formattedValue);
    }
  };

  const handleBlur = (value: string, fieldOnChange: any) => {
    const trimmedValue = value.trim();
    fieldOnChange(trimmedValue);
  };

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        {props?.label && (
          <FormLabel
            required={required}
            sx={{
              mb: 0.5,
              color: "#5A667B",
              "& .MuiFormLabel-asterisk ": { color: "red" },
              fontWeight: 600,
              ...labelStyle,
              fontSize: "13px",
            }}
          >
            {props?.label}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <OutlinedInput
              notched={false}
              {...field}
              onChange={(e) =>
                handleChange(e.target.value, field.onChange, allowNumbers)
              }
              onBlur={(e) => handleBlur(e.target.value, field.onChange)}
              disabled={disabled}
              startAdornment={startAdornment}
              sx={{ height: "40px" }}
              fullWidth
              placeholder={props.placeholder}
              {...props}
            />
          )}
        />
        <FormHelperText sx={{ color: "red" }}>
          {error && name && name.includes(".")
            ? error?.[firstKey]?.[secondKey]?.message
            : error?.[firstKey]?.message}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default CapitalizeInput;
