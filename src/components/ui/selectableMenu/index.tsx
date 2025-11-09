import { Menu, Stack, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { MenuItem, Button } from '@mui/material';
import { TickIcon } from 'assets/svg/Tick';
import MoreIcon from 'components/@extended/MoreIcon';

import React, { useState } from 'react';

const SelectableMenu = ({ option, label, width, isChecked, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (content: () => void) => {
    if (typeof content === 'function') {
      content();
      setAnchorEl(null);
    }

    setAnchorEl(null);
  };
  return (
    <div style={{ display: 'flex', justifyItems: 'center' }}>
      <Button color="secondary" onClick={handleMenuOpen}>
        {label ? label : <MoreIcon />}
      </Button>
      <div style={{ position: 'absolute' }}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClick={props.onClick}
        >
          {option?.map((ele: any) => (
            <MenuItem
              onClick={() => {
                handleMenuClose(ele?.content);
              }}
              sx={{ width: '100%', bgcolor: isChecked == ele?.id ? '#F2F6FE' : 'white' }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <div style={{ display: 'flex', justifyItems: 'center', gap: 10, color: ele?.color, width: width ? width : '100%' }}>
                  <div>{ele?.icon}</div>
                  <Typography color={'#4A5568'} fontSize={'13px'}>
                    {ele?.value}
                  </Typography>
                </div>
                <div>{isChecked == ele?.id ? <TickIcon color={theme.palette.primary.main} /> : null}</div>
              </Stack>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default SelectableMenu;
