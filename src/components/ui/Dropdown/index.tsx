import {
  FormControl,
  FormHelperText,
  FormLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { CrossIcon3 } from "assets/svg/CrossIcon2";
import { Controller } from "react-hook-form";

const Dropdown = ({
  control,
  name,
  onChange,
  required,
  PlaceholderValue,
  width,
  error,
  disabled,
  multiple = false,
  ...props
}: any) => {
  const [firstKey, secondKey] = name?.split(".");
  const Placeholder = ({ children }: any) => (
    <Typography color={"#939AAD"}>{children}</Typography>
  );

  return (
    <Stack>
      <FormLabel
        required={required}
        sx={{
          "& .MuiFormLabel-asterisk ": { color: "red" },
          color: "#5A667B",
          mb: 0.5,
          fontWeight: 600,
          ...props.labelStyle,
          fontSize: "13px",
        }}
      >
        {props.label}
      </FormLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box sx={{ position: "relative", width: width || "100%" }}>
            <Select
              multiple={multiple}
              disabled={disabled}
              {...field}
              value={field?.value || (multiple ? [] : "")}
              notched={false}
              displayEmpty
              renderValue={
                [undefined, null, ""].includes(field?.value)
                  ? () => <Placeholder>{PlaceholderValue}</Placeholder>
                  : undefined
              }
              sx={{ height: "40px", width: "100%" }}
              id={name}
              {...props}
              onChange={(e, all) => {
                const selectedValues = e.target.value;
                field.onChange(selectedValues);
                onChange && onChange(selectedValues);
              }}
            >
              {props.options && props.options.length > 0 ? (
                props.options.map((item: any, index: any) =>
                  item?.isTitle ? (
                    <ListSubheader
                      key={index}
                      sx={{ textDecoration: "underline" }}
                    >
                      {item?.label}
                    </ListSubheader>
                  ) : (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  )
                )
              ) : (
                <MenuItem disabled>No options found</MenuItem>
              )}
            </Select>

            {props?.options?.length > 0 && field?.value?.length > 0 && (
              <IconButton
                onClick={() => {
                  field.onChange(multiple ? [] : "");
                  onChange && onChange(multiple ? [] : "");
                }}
                sx={{
                  position: "absolute",
                  right: 18,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#939AAD",
                }}
              >
                <CrossIcon3 />
              </IconButton>
            )}
          </Box>
        )}
      />

      <FormHelperText sx={{ color: "red" }}>
        {error && name && name.includes(".")
          ? error?.[firstKey]?.[secondKey]?.message
          : error?.[firstKey]?.message}
      </FormHelperText>
    </Stack>
  );
};

export default Dropdown;
