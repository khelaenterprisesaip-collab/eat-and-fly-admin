import { TableCell } from '@mui/material';
import { Skeleton } from '@mui/material';
import { TableRow } from '@mui/material';
import React from 'react';

const TableLoading = ({ columns, viewPage }: { columns: any; viewPage: number }) => {
  return (
    <TableRow>
      {columns?.map((_: any, index: number) => (
        <TableCell key={index} sx={{ width: 'auto' }}>
          {[...Array(viewPage)].map((_, idx) => (
            <Skeleton key={idx} height={40} />
          ))}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableLoading;
