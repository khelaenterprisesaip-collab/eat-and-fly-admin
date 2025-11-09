import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface TablePaginationProps {
  startIndex: number;
  setStartIndex: (startIndex: number) => void;
  viewPage: number;
  setViewPage: (viewPage: number) => void;
  totalCount: number;
  visibility?: any;
  renderCurrentPage?: any;
}

const TablePagination = ({
  startIndex,
  setStartIndex,
  viewPage,
  setViewPage,
  totalCount,
  visibility,
  renderCurrentPage
}: TablePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = React.useState(false);
  let options = [10, 25, 50, 100];

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setStartIndex(viewPage * (value - 1));
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const pageSize = Number(event.target.value);
    setViewPage(pageSize);
    setCurrentPage(1);
    setStartIndex(0);
  };

  // if (Number(totalCount) === 0) {
  //   return null;
  // }

  useEffect(() => {
    if (renderCurrentPage) {
      setCurrentPage(1);
    }
  }, [renderCurrentPage]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: 'auto' }}
      visibility={visibility ? 'visible' : 'hidden'}
    >
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Show
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={viewPage}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
              >
                {options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Grid>

      <Stack direction={'row'} spacing={1} alignItems="center">
        {totalCount > 0 ? (
          <Typography variant="caption" color="secondary">
            Showing from {totalCount === 0 ? 0 : startIndex + 1} to {totalCount === 0 ? 0 : Math.min(startIndex + viewPage, totalCount)} of
            total {totalCount} records
          </Typography>
        ) : null}
        {Math.ceil((totalCount ?? 0) / viewPage) ? (
          <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
            <Pagination
              sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
              count={Math.ceil(totalCount / viewPage)}
              page={currentPage}
              onChange={handleChangePagination}
              color="primary"
              variant="combined"
              showFirstButton
              showLastButton
            />
          </Grid>
        ) : null}
      </Stack>
    </Grid>
  );
};

export default TablePagination;
