import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress, IconButton } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { CloseIcon } from 'assets/svg/CloseIcon';
import debounce from 'lodash/debounce';

type HighlightedAutocompleteProps = {
  label?: string;
  fetchOptions: (inputValue: string) => Promise<any[]>;
  getOptionLabel?: (option: any) => string;
  onOptionSelect?: (option: any) => void;
  inputValue: any;
  setInputValue: any;
  placeholder: string;
  defaultSx?: any;
  handleKeyDown: (value: string) => void;
  handleClear: any;
  setDropdownSelected?: any;
};

function HighlightedAutocomplete({
  fetchOptions,
  getOptionLabel = (option: any) => option.name,
  inputValue,
  setInputValue,
  placeholder,
  defaultSx,
  handleKeyDown,
  handleClear,
  setDropdownSelected
}: HighlightedAutocompleteProps) {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }

    const debouncedFetch = debounce((value) => {
      setLoading(true);
      fetchOptions(value)
        .then((results: any[]) => {
          setOptions(results);
          setLoading(false);
        })
        .catch(() => {
          setOptions([]);
          setLoading(false);
        });
    }, 300);

    debouncedFetch(inputValue);

    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={options || []}
      loading={loading}
      inputValue={inputValue}
      getOptionLabel={getOptionLabel}
      clearOnEscape={false}
      clearIcon={null}
      filterOptions={(options) => options}
      onInputChange={(event: any, newInputValue) => {
        if (newInputValue || event?.target?.value) {
          setInputValue(newInputValue || event?.target?.value);
        } else {
          setInputValue('');
          setDropdownSelected(false);
        }
      }}
      onChange={(event: any, newInputValue) => {
        if (newInputValue) {
          setDropdownSelected('not_render');
        }
      }}
      onKeyUp={(event: any) => {
        if (event.key === 'Enter') {
          const latestValue = event.target.value;
          if (latestValue) {
            handleKeyDown(latestValue);
          } else {
            setDropdownSelected('not_render');
          }
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            sx: {
              height: '40px',
              padding: '0px 14px',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: 'white',
              ...defaultSx
            },
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {inputValue && (
                  <IconButton
                    onClick={handleClear}
                    size="small"
                    sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', mr: 1 }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                {params?.InputProps?.endAdornment}
              </>
            )
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = match(getOptionLabel(option), inputValue);
        const parts = parse(getOptionLabel(option), matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}

export default HighlightedAutocomplete;
