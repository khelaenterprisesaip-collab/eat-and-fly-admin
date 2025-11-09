import { FormControl, FormHelperText, FormLabel, Stack, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';

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
  disabled?: boolean;
  onInput?: any;
}

const Input = ({ id, name, error, startAdornment, required, labelStyle, disabled, ...props }: InputProps) => {
  const [firstKey, secondKey] = name?.split('.');

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
          render={({ field }) => (
            <OutlinedInput
              notched={false}
              value={field.value}
              disabled={disabled}
              startAdornment={startAdornment}
              sx={{ height: '40px' }}
              fullWidth
              placeholder={props.placeholder}
              {...props}
              onInput={(event: any) => {
                let value = event.target.value;
                value = value.replace(/[^0-9.]/g, '');
                if ((value.match(/\./g) || []).length > 1) {
                  value = value.replace(/\.+$/, '');
                }
                const [beforeDot, afterDot] = value.split('.');
                if (beforeDot && beforeDot.length > 2) {
                  value = beforeDot.slice(0, 2);
                  if (afterDot) {
                    value += '.' + afterDot;
                  }
                }
                if (value.includes('.')) {
                  const [before, after] = value.split('.');
                  if (after && after !== '5') {
                    value = before + '.';
                  }
                }
                event.target.value = value;
                field.onChange(event.target.value);
              }}
              onBlur={(e) => {
                const value = e?.target?.value;

                if (value?.length !== 3 && value?.includes('.')) {
                  field?.onChange(value + '0');
                }
              }}
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

export default Input;
1;
