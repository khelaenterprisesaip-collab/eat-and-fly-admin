import { ChangeEvent } from 'react';
import { Grid, MenuItem, Pagination as MUIPagination, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  total: number | undefined;
}

const Pagination = ({ total }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const rowsPerPage = Number(searchParams.get('rows_per_page') || 10);

  const totalPaginated = Math.ceil((total as number) / rowsPerPage);

  const onPageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString() as string);
    setSearchParams(newSearchParams);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<unknown>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('rows_per_page', event.target.value?.toString() as string);
    setSearchParams(newSearchParams);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center" px={2} py={1}>
      {/* Showing from 1 to 16 of total 50 records */}
      <Typography variant="subtitle2" color="textSecondary">
        Showing {(page - 1) * rowsPerPage + 1} - {Math.min(rowsPerPage * page, total as number)} of {total} records
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <MUIPagination
          count={isNaN(totalPaginated) ? 0 : totalPaginated}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={onPageChange}
        />
        <Select size="small" variant="outlined" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <MenuItem value={10}>10 / page</MenuItem>
          <MenuItem value={25}>25 / page</MenuItem>
          <MenuItem value={50}>50 / page</MenuItem>
          <MenuItem value={100}>100 / page</MenuItem>
        </Select>
      </Stack>
    </Grid>
  );
};

export default Pagination;
