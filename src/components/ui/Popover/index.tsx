import { Box, ClickAwayListener, Paper, Popper, Typography, useTheme } from '@mui/material';
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
import { useRef } from 'react';

interface PopoverProps {
  isOpen: any;
  handleClose?: any;
  children: React.ReactElement;
}

const Popover = ({ isOpen, handleClose, children }: PopoverProps) => {
  const anchorRef = useRef<any>(null);
  return (
    <Popper
      placement="top-end"
      open={isOpen}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 9] } }] }}
    >
      {({ TransitionProps }) => (
        <Transitions type="grow" position="auto" in={isOpen} {...TransitionProps}>
          <Paper
            sx={{
              width: 290,
              minWidth: 240,
              maxWidth: 290,
              //   [theme.breakpoints.down('md')]: { maxWidth: 250 },
              borderRadius: 1.5
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </Popper>
  );
};
export default Popover;
