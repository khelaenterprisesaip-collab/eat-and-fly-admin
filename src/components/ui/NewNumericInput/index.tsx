import { FormControl, FormHelperText, Stack, OutlinedInput, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

interface NumberInputProps {
  id?: string;
  label?: string;
  value?: any;
  name: any;
  onChange?: any;
  placeholder?: string;
  control: any;
  error?: { [key: string]: any };
  startAdornment?: any;
  endAdornment?: any;
  labelStyle?: any;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  field?: any;
  sx?: any;
  type?: 'number' | 'percent' | 'decimal'; // type for different input formats
}

const NumberInput2 = ({
  id,
  name,
  error,
  startAdornment,
  endAdornment,
  required,
  labelStyle,
  disabled,
  min = 0,
  max = 100,
  sx,
  type = 'number',
  field, // default type is 'number'
  ...props
}: NumberInputProps) => {
  const [tempValue, setTempValue] = useState<string>('');

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
    let value = event.target.value;

    // Handling for percent type
    if (type === 'percent') {
      value = value.replace(/[^0-9.]/g, '');
      if (value.includes('.')) {
        const parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
      }
    } else if (type === 'decimal') {
      // Handling for decimal type, allowing only one decimal point and one digit after decimal
      value = value.replace(/[^0-9.]/g, ''); // Allow digits and one decimal point
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      } else if (parts.length === 2 && parts[1].length > 1) {
        // Limit the number of digits after the decimal point to 1
        value = parts[0] + '.' + parts[1].slice(0, 1);
      }
    }

    if (value !== '') {
      const numericValue = parseFloat(value);
      if (numericValue > max || numericValue < min) {
        return; // Block invalid input
      }
    }
    onChange(value);
  };

  return (
    <Stack spacing={1}>
      <OutlinedInput
        {...field}
        value={field.value}
        onChange={(e: any) => {
          handleNumberInput(e, field.onChange);
        }}
        disabled={disabled}
        startAdornment={startAdornment}
        endAdornment={
          type === 'percent' ? (
            <InputAdornment position="end">%</InputAdornment>
          ) : type === 'decimal' ? (
            <InputAdornment position="end">.</InputAdornment>
          ) : (
            endAdornment
          )
        }
        sx={{ height: '38px', ...sx }}
        fullWidth
        placeholder={props.placeholder}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }}
        {...props}
      />
      <FormHelperText sx={{ color: 'red', marginTop: 1 }}>{error?.[name]?.message}</FormHelperText>
    </Stack>
  );
};

export default NumberInput2;
