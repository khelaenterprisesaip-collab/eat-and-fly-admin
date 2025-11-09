import { FormControl, FormHelperText, FormLabel, Stack, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';

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
  labelStyle?: any;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

const NumberInput = ({ id, name, error, startAdornment, required, labelStyle, disabled, min, max, ...props }: NumberInputProps) => {
  const [firstKey, secondKey] = name?.split('.');

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
    // Remove any non-digit characters
    let value = event.target.value.replace(/[^\d]/g, '');

    // Convert to number
    let numValue = Number(value);

    // If max is defined and value exceeds max, set to max
    if (max !== undefined && numValue > max) {
      numValue = max;
      value = max.toString();
    }

    // If min is defined and value is less than min, set to min
    if (min !== undefined && numValue < min && value !== '') {
      numValue = min;
      value = min.toString();
    }

    // Update the input value
    event.target.value = value;
    onChange(value);
  };

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        {props?.label && (
          <FormLabel
            required={required}
            sx={{ mb: 0.5, color: '#5A667B', '& .MuiFormLabel-asterisk ': { color: 'red' }, fontWeight: 600, ...labelStyle }}
          >
            {props?.label}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={props?.control}
          render={({ field: { onChange, ...field } }) => (
            <OutlinedInput
              notched={false}
              {...field}
              onChange={(e: any) => handleNumberInput(e, onChange)}
              disabled={disabled}
              startAdornment={startAdornment}
              sx={{ height: '40px' }}
              fullWidth
              placeholder={props.placeholder}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              {...props}
            />
          )}
        />
        <FormHelperText sx={{ color: 'red', marginTop: 1 }}>
          {error && name && name.includes('.') ? error?.[firstKey]?.[secondKey]?.message : error?.[firstKey]?.message}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default NumberInput;
