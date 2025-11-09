import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, ListSubheader, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const MultipleSelect = ({ control, error, options, name, direction, selectedItems, fieldStyle, setSelectedItems, ...props }: any) => {
  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelectedItems(value);
  };
  let rowStyle = {};

  return (
    <Stack spacing={1}>
      <FormControl sx={{ ...rowStyle }}>
        <FormLabel sx={{ color: '#394663', mb: 0.5 }}>{props.label}</FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              {...props}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              notched={false}
              value={selectedItems}
              sx={{ height: '40px', ...fieldStyle }}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected: any) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {options?.map((name: any) =>
                name?.isTitle ? (
                  <ListSubheader>{name?.label}</ListSubheader>
                ) : (
                  <MenuItem key={name?.value} value={name?.value}>
                    <Checkbox checked={selectedItems.indexOf(name?.value) > -1} />
                    <ListItemText primary={name?.label} />
                  </MenuItem>
                )
              )}
            </Select>
          )}
        />
        {/* <FormHelperText sx={{ color: 'red', marginTop: 2 }}>
          {error && name && name.includes('.') ? error?.[firstKey]?.[secondKey]?.message : error?.[firstKey]?.message}
        </FormHelperText> */}
      </FormControl>
    </Stack>
  );
};
export default MultipleSelect;
