import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormLabels from '../FormLabel';
import { formatDollar } from 'utils/trimFc';
import { Box } from '@mui/material';

const PriceRangeSlider = ({ priceRangeValue, setPriceRangeValue, minimum, maximum, field, label }: any) => {
  const minmin = minimum;
  const maxmax = maximum;

  const handlePriceRangeChange = (event: any, newValue: any) => {
    setPriceRangeValue(newValue);
    field(newValue);
  };

  return (
    <Stack>
      <FormLabels>{label}</FormLabels>
      <Stack px={1}>
        <Slider
          value={priceRangeValue}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatDollar(value)} //
          min={minmin}
          max={maxmax}
          marks={[
            {
              value: minmin,
              label: ''
            },
            {
              value: maxmax,
              label: ''
            }
          ]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" onClick={() => setPriceRangeValue(minmin)} sx={{ cursor: 'pointer' }}>
            {formatDollar(minmin)}
          </Typography>
          <Typography variant="body2" onClick={() => setPriceRangeValue(maxmax)} sx={{ cursor: 'pointer' }}>
            {formatDollar(maxmax)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PriceRangeSlider;
