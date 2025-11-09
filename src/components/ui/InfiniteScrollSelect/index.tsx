import { CircularProgress, IconButton, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { CrossIcon3 } from "assets/svg/CrossIcon2";
import React, { useEffect, useState } from "react";

interface InfiniteScrollSelectProps {
  viewSize?: number;
  options?: any[];
  totalCount?: number;
  setViewSize?: (size: number) => void;
  loading?: boolean;
  renderTags?: (value: any[], getTagProps: any) => React.ReactNode;
  onChangeSelect?: (event: React.SyntheticEvent, value: any) => void;
  value?: any;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => React.ReactNode;
  multiple?: boolean;
  placeholder?: string;
  noOptionsText?: string;
  onChange?: any;
  disabled?: any;
  getOptionLabel?: any;
  sx?: any;
  isOptionEqualToValue?: any;
  freeSolo?: any;
}
const InfiniteScrollSelect: React.FC<InfiniteScrollSelectProps> = ({
  viewSize,
  options,
  totalCount,
  setViewSize,
  loading,
  renderTags,
  onChangeSelect,
  value,
  renderOption,
  multiple,
  placeholder,
  noOptionsText,
  onChange,
  disabled,
  getOptionLabel,
  sx,
  isOptionEqualToValue,
  freeSolo,
}: any) => {
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const nearBottom: any = (
    target: {
      scrollHeight?: any;
      scrollTop?: any;
      clientHeight?: any;
    } = {}
  ) => {
    if (totalCount > viewSize) {
      const diff = Math.round(target?.scrollHeight - target?.scrollTop);
      return diff - 25 <= target?.clientHeight;
    }
  };

  useEffect(() => {
    if (isScrollBottom) {
      fetchMoreData();
    }
  }, [isScrollBottom]);

  const fetchMoreData = () => {
    setViewSize(viewSize + 10);
  };
  const handleClear = () => {
    if (onChangeSelect) {
      onChangeSelect(null, multiple ? [] : null);
    }
    setSelectedOption("");
    if (onChange) {
      onChange(null, null);
    }
  };
  return (
    <Autocomplete
      freeSolo={freeSolo}
      autoHighlight
      filterOptions={(options) => options}
      sx={{ width: "100%", ...sx }}
      disableCloseOnSelect={multiple}
      multiple={multiple}
      id="country-select-demo"
      options={options || []}
      ListboxProps={{
        onScroll: ({ target }: any) => {
          setIsScrollBottom(nearBottom(target));
        },
      }}
      onChange={(event, selectedOption: any) => {
        if (selectedOption) {
          onChangeSelect(event, selectedOption);
          setSelectedOption(selectedOption);
        } else {
          onChangeSelect(null, multiple ? [] : null);
          setSelectedOption("");
          onChange();
        }
      }}
      value={value}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      disabled={disabled}
      noOptionsText={noOptionsText}
      renderTags={renderTags}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          onChange={(event) => {
            onChange && onChange(event?.target?.value);
          }}
          onBlur={(e) => {
            if (!selectedOption) {
              onChange();
            }
          }}
          autoComplete="new-password"
          {...params}
          placeholder={placeholder}
          sx={{
            borderRadius: 0,
          }}
          inputProps={{
            ...params.inputProps,

            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                <IconButton
                  onClick={() => {
                    onChange();
                    handleClear();
                  }}
                  sx={{
                    visibility: value ? "visible" : "hidden",
                    position: "absolute",
                    right: 20,
                  }}
                >
                  <CrossIcon3 />
                </IconButton>

                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default InfiniteScrollSelect;
