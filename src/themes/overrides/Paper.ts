// ==============================|| OVERRIDES - CARD ||============================== //

import { Theme } from '@mui/material/styles';

export default function CardContent(theme: Theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    }
  };
}
