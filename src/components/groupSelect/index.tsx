import React, { useState } from 'react';
import { Autocomplete, Avatar, Checkbox, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import ThemeButton from 'components/ui/Button';

interface Option {
  group: string;
  label: string;
  value: string;
}

const groupedCategories: Option[] = [
  { group: 'Technology', label: 'AI', value: 'ai' },
  { group: 'Technology', label: 'Blockchain', value: 'blockchain' },
  { group: 'Health', label: 'Fitness', value: 'fitness' },
  { group: 'Health', label: 'Nutrition', value: 'nutrition' },
  { group: 'Sports', label: 'Cricket', value: 'cricket' },
  { group: 'Sports', label: 'Football', value: 'football' }
];

const groupByFn = (option: Option) => option.group;

const AutocompleteGroupedWithSelectAll = ({ programOption, setValue, selectedOptions, setSelectedOptions }: any) => {
  const handleSelectAll = (group: string) => {
    const groupOptions = programOption.filter((item: any) => item?.group === group);
    const isAllSelected = groupOptions.every((item: any) => selectedOptions?.some((selected: any) => selected?.value === item.value));

    const updatedOptions = isAllSelected
      ? selectedOptions.filter((item: any) => item.group !== group)
      : [
          ...selectedOptions,
          ...groupOptions.filter((item: any) => !selectedOptions?.some((selected: any) => selected?.value === item?.value))
        ];

    setSelectedOptions(updatedOptions);
    const values = updatedOptions?.map((ele: any) => ele?.value);
    setValue('program_ids', values);
  };

  const handleChange = (event: React.ChangeEvent<{}>, value: Option[]) => {
    const values = value?.map((ele) => ele?.value);
    setSelectedOptions(value);
    setValue('program_ids', values);
  };

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={programOption || []}
      groupBy={groupByFn}
      value={selectedOptions}
      onChange={handleChange}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: 'flex', alignItems: 'center', width: '100%', height: '38px' }}>
          <Typography style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'calc(100% - 32px)' }} pl={3.9}>
            {option.label}
          </Typography>
        </li>
      )}
      renderGroup={(params) => (
        <div key={params.key} style={{ marginBottom: 15 }}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
            <Checkbox
              checked={programOption
                ?.filter((item: any) => item.group === params.group)
                ?.every((item: any) => selectedOptions?.some((selected: any) => selected?.value === item?.value))}
              onChange={() => handleSelectAll(params.group)}
              style={{ width: '40px' }}
            />
            <Typography
              variant="h6"
              style={{ fontWeight: 600, display: 'flex', alignItems: 'center', padding: 10, marginTop: -10, marginBottom: -10 }}
            >
              Select All
            </Typography>
          </Stack>

          <Stack>{params.children}</Stack>
        </div>
      )}
      getOptionLabel={(option) => option?.label}
      isOptionEqualToValue={(option, value) => option?.value === value?.value}
      renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Select" sx={{ mt: 0.3 }} />}
    />
  );
};

export default AutocompleteGroupedWithSelectAll;
