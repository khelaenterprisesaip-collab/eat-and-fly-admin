import { FormControl, FormHelperText, FormLabel, Stack, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';

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
}

const filterAlphabetsAndNumbers = (string: string) => string.replace(/[^a-zA-Z0-9]/g, ''); // Allow only alphabets and numbers

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); // Capitalize the first letter
};

const PassportNumberInput = ({
  id,
  name,
  error,
  startAdornment,
  required,
  labelStyle,
  disabled,
  onChange,
  control,
  ...props
}: CustomInputProps) => {
  const [firstKey, secondKey] = name?.split('.');

  const handleChange = (value: string, fieldOnChange: any) => {
    let filteredValue = filterAlphabetsAndNumbers(value);
    if (filteredValue.length > 10) {
      filteredValue = filteredValue.slice(0, 13);
    }
    filteredValue = capitalizeFirstLetter(filteredValue);
    fieldOnChange(filteredValue);
  };

  const handleBlur = (value: string, fieldOnChange: any) => {
    const formattedValue = value?.toUpperCase();
    fieldOnChange(formattedValue);
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
          control={control}
          render={({ field }) => (
            <OutlinedInput
              notched={false}
              {...field}
              onChange={(e) => handleChange(e.target.value, field.onChange)}
              onBlur={(e) => handleBlur(e.target.value, field.onChange)}
              disabled={disabled}
              startAdornment={startAdornment}
              sx={{ height: '40px' }}
              fullWidth
              placeholder={props.placeholder}
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

export default PassportNumberInput;
