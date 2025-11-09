import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface InputProps {
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
  disabled?: any;
  onInput?: any;
  clearErrors?: any;
  setError?: any;
}

const EmailInput = ({
  id,
  name,
  error,
  startAdornment,
  required,
  labelStyle,
  setError,
  clearErrors,
  disabled,
  ...props
}: InputProps) => {
  const [firstKey, secondKey] = name?.split(".");

  const validateEmail = (value: string, fieldOnChange: any) => {
    fieldOnChange(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailPattern.test(value);
    if (value) {
      if (validEmail) {
        clearErrors(name);
      } else {
        setError(name, {
          type: "manual",
          message: "Please enter a valid email address",
        });
      }
    } else {
      clearErrors(name);
    }
  };

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        {props?.label && (
          <FormLabel
            required={required}
            sx={{
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
          control={props?.control}
          render={({ field }) => (
            <OutlinedInput
              notched={false}
              {...field}
              disabled={disabled}
              startAdornment={startAdornment}
              onChange={(e) => {
                validateEmail(e?.target?.value, field.onChange);
              }}
              sx={{ height: "40px", mt: 0.5 }}
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

export default EmailInput;
