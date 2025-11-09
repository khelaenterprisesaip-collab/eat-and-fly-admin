import { FormControl, FormHelperText, FormLabel, Stack, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useRef, useEffect } from 'react';

interface InputProps {
  id?: string;
  label?: string;
  name: string;
  control: any;
  error?: { [key: string]: { message?: string } };
  startAdornment?: any;
  labelStyle?: React.CSSProperties;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: any;
}

const CurrencyInput = ({ id, name, error, startAdornment, required, labelStyle, onChange, disabled, ...props }: InputProps) => {
  const [firstKey, secondKey] = name?.split('.');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current && props.autoFocus) {
      inputRef.current.focus();
    }
  }, [props.autoFocus]);

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        {props.label && (
          <FormLabel
            required={required}
            sx={{
              mb: 0.5,
              color: '#5A667B',
              '& .MuiFormLabel-asterisk ': { color: 'red' },
              fontWeight: 600,
              ...labelStyle
            }}
          >
            {props.label}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={props.control}
          render={({ field }) => (
            <NumericFormat
              {...field}
              value={field.value}
              thousandSeparator={true}
              decimalScale={0}
              allowNegative={false}
              customInput={OutlinedInput}
              placeholder={props.placeholder}
              startAdornment={startAdornment}
              onChange={(e) => {
                const numericValue = e?.target?.value.replace(/,/g, '');
                field.onChange(numericValue);
                onChange(numericValue);
              }}
              onValueChange={(values) => {
                const numericValue = values.value.replace(/,/g, '');
                field.onChange(numericValue);
              }}
              inputRef={inputRef}
              sx={{ height: '40px' }}
            />
          )}
        />
      </FormControl>
      {error && (
        <FormHelperText sx={{ color: 'red', marginTop: 1 }}>
          {(error as any) && name && name?.includes('.') ? (error as any)?.[firstKey]?.[secondKey]?.message : error?.[firstKey]?.message}
        </FormHelperText>
      )}
    </Stack>
  );
};

export default CurrencyInput;
