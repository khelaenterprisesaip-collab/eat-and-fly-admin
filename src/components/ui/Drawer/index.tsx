import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { CloseIcon } from 'assets/svg/CloseIcon';
import { Stack, Typography } from '@mui/material';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'left' | 'top' | 'bottom';
  children: React.ReactNode;
  title: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const Drawer = ({ isOpen, onClose, position, children, title }: DrawerProps) => {
  return (
    <MuiDrawer
      disableEnforceFocus
      disablePortal
      anchor={position || 'right'}
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 0,
          width: '100%',
          '@media (min-width: 768px)': {
            width: '50%'
          },
          '@media (min-width: 1080px)': {
            width: '30%'
          }
        }
      }}
    >
      <Box component="section" sx={{ p: 2 }}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* TITLE */}
          <Typography variant="h4">{title}</Typography>

          {/* CLOSE ICON */}
          <Box sx={{ cursor: 'pointer' }}>
            <CloseIcon onClick={onClose} />
          </Box>
        </Stack>

        {/* CHILDREN */}
        {children}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
