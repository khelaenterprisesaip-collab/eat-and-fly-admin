import { Box, ListItemText } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Autocomplete, ListSubheader, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DebouncedInput from "components/debounceInput/DebouncedInput";
import InfiniteScrollSelect from "components/ui/InfiniteScrollSelect";
import dayjs from "dayjs";
import { useState } from "react";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

export function Filter({ column, programViewSize, setProgramViewSize }: any) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, filterOptions, type, count, onSearch, isUnix } =
    column.columnDef.meta ?? {};
  const { header } = column?.columnDef ?? {};
  const formattedHeader = header ? header.toLowerCase() : "";
  return filterVariant === "select" ? (
    <>
      <Autocomplete
        options={filterOptions}
        autoHighlight
        sx={{
          "& .MuiOutlinedInput-root": { height: 38, minWidth: "100%" },
        }}
        getOptionLabel={(option) => option.label}
        onChange={(e, selectedOption) =>
          column.setFilterValue(selectedOption?.value)
        }
        value={columnFilterValue?.toString()}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={`Select ${formattedHeader} `}
          />
        )}
      />
    </>
  ) : filterVariant === "isTitle" ? (
    <>
      <Autocomplete
        sx={{
          "& .MuiOutlinedInput-root": { height: 38, minWidth: "100%" },
        }}
        value={columnFilterValue?.toString()}
        onChange={(e, selectedOption) =>
          column.setFilterValue(selectedOption?.value)
        }
        options={filterOptions}
        groupBy={(option) => (option.isTitle ? option.label : null)}
        getOptionLabel={(option) => option?.label}
        renderInput={(params) => (
          <TextField {...params} placeholder={`Select ${formattedHeader} `} />
        )}
        renderOption={(props, option) =>
          !option.isTitle ? (
            <li {...props}>
              <Typography variant="body2" fontWeight={600} color="#5A667B">
                {option.label}
              </Typography>
            </li>
          ) : null
        }
        renderGroup={(params) => (
          <div key={params.key}>
            {params.group && (
              <ListSubheader
                color="inherit"
                style={{ textDecoration: "underline" }}
                component="div"
              >
                <Typography variant="h6" fontWeight={600} color="#394663">
                  {params.group}
                </Typography>
              </ListSubheader>
            )}
            <ListItemText sx={{ ml: 2 }}>{params.children}</ListItemText>
          </div>
        )}
      />
    </>
  ) : filterVariant === "selectWithProfile" ? (
    <InfiniteScrollSelect
      options={filterOptions}
      placeholder="Select"
      viewSize={programViewSize}
      setViewSize={setProgramViewSize}
      totalCount={count}
      getOptionLabel={(option: any) => option.label}
      onChange={onSearch}
      onChangeSelect={(event: any, selectedOption: any) => {
        if (selectedOption) {
          const valueAsString = selectedOption?.value?.toString();
          column.setFilterValue(valueAsString);
        } else {
          column.setFilterValue("");
        }
      }}
      value={columnFilterValue?.toString()}
      renderTags={(tagValue: any, getTagProps: any) => {
        return tagValue?.map((option: any, index: any) => (
          <>
            <Stack {...getTagProps({ index })} sx={{ bgcolor: "red" }}>
              {option?.label}
              {option?.label}
            </Stack>
          </>
        ));
      }}
      renderOption={(props: any, option: any) => {
        return (
          <>
            <Box
              component="li"
              sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
              {...props}
              key={option?.value}
            >
              <Avatar
                src={option?.image}
                sx={{
                  color: "#334735",
                  bgcolor: "#C8D7F7",
                  width: "30px",
                  height: "30px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
              >
                {option?.label?.[0]}
              </Avatar>
              <Stack direction={"column"}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={"#394663"}
                  ml={2}
                  textTransform={"capitalize"}
                >
                  {option?.label}
                </Typography>
              </Stack>
            </Box>
          </>
        );
      }}
    />
  ) : filterVariant === "date" ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD/MM/YYYY"
        closeOnSelect
        onChange={(date: any) => {
          if (date && isUnix) {
            // Unix timestamp (seconds)
            column.setFilterValue(date.unix());
          } else if (date) {
            // ISO string (fallback if not Unix mode)
            column.setFilterValue(date.format("YYYY-MM-DD"));
          } else {
            // Clear filter
            column.setFilterValue(undefined);
          }
        }}
        sx={{ minWidth: 100 }}
        value={
          columnFilterValue
            ? isUnix
              ? dayjs.unix(columnFilterValue)?.format("DD/MM/YYYY")
              : columnFilterValue
            : null
        }
        slotProps={{
          textField: {
            size: "small",
            sx: {
              "& .MuiInputBase-root": {
                height: "40px",
              },
            },
          },
          actionBar: { actions: ["clear"] },
        }}
      />
    </LocalizationProvider>
  ) : filterVariant === "none" ? (
    ""
  ) : (
    <DebouncedInput
      onFilterChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      filterType={type}
      value={(columnFilterValue ?? "") as string}
    />
  );
}
