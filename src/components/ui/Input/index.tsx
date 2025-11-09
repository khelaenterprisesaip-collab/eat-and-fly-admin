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
  disabled?: boolean | any;
  onInput?: any;
  sx?: any;
  endAdornment?: any;
}

const Input = ({
  id,
  name,
  error,
  startAdornment,
  required,
  labelStyle,
  disabled,
  endAdornment,
  sx,
  ...props
}: InputProps) => {
  const [firstKey, secondKey] = name?.split(".");

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
          control={props?.control}
          render={({ field }) => (
            <OutlinedInput
              notched={false}
              {...field}
              disabled={disabled}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              sx={{ height: "40px", ...sx }}
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

export default Input;
