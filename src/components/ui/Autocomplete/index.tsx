import { FormLabel } from '@mui/material';
import { Autocomplete, Stack, TextField, IconButton } from '@mui/material';
import { CrossIcon2, CrossIcon3 } from 'assets/svg/CrossIcon2';

import React, { useState } from 'react';

interface AutocompleteProps {
  id?: string;
  label: React.ReactNode;
  name: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options: Array<Object>;
  showSearch?: boolean;
  labelStyle?: any;
  value?: any;
  required?: any;
  disabled?: any;
}

const AutocompleteInput = ({ options, onChange, value, required, placeholder, name, disabled, ...props }: AutocompleteProps) => {
  const handleClear = () => {
    onChange && onChange(null);
  };

  return (
    <div>
      <Stack spacing={1}>
        <FormLabel
          required={required}
          sx={{
            '& .MuiFormLabel-asterisk ': { color: 'red' },
            color: '#5A667B',
            fontWeight: 600,
            mb: 0.5,
            ...props.labelStyle
          }}
        >
          {props?.label}
        </FormLabel>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Autocomplete
            disabled={disabled}
            sx={{ marginTop: 0, flex: 1 }}
            disableClearable
            value={value}
            options={options || []}
            renderInput={(params) => <TextField {...params} placeholder={placeholder} label="" name={name} autoComplete="new-password" />}
            onChange={(e: any, selectedOption: any) => {
              onChange && onChange(selectedOption?.value);
            }}
          />
          <IconButton
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: 20,
              visibility: value ? 'visible' : 'hidden'
            }}
          >
            <CrossIcon3 />
          </IconButton>
        </div>
      </Stack>
    </div>
  );
};

export default AutocompleteInput;
