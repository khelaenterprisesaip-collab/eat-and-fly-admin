// material-ui
import { Theme } from '@mui/material/styles';

// types
import { ColorProps } from 'types/extended';

// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

export default function getColors(theme: Theme, color?: ColorProps) {
  switch (color!) {
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
}



export function truncateText(text: string, maxWords: number) {
  const words = text?.split(' ');
  return words.length > maxWords
    ? words.slice(0, maxWords)?.join(' ') + '...'
    : text;
}