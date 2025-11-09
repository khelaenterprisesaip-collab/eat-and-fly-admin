// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled';

import Logo from 'components/logo';
import logo2 from '/public/Logo.svg';
import { DRAWER_WIDTH, HEADER_HEIGHT, MenuOrientation, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import LogoSvg from 'assets/svg/header';

import MenuAltIcon from 'assets/svg/MenuAltIcon';
import IconButton from 'components/@extended/IconButton';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import LeftArrow from 'assets/svg/Drawer/leftArrow';
import RightArrow from 'assets/svg/Drawer/rightArrow';

interface Props {
  open: boolean;
}

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }: Props) {
  const theme = useTheme();

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { mode, menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const isClickB = menuMaster?.isClickB;
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;
  const iconBackColorOpen = mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200';
  const iconBackColor = mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : HEADER_HEIGHT,
        width: isHorizontal ? { xs: '100%', lg: DRAWER_WIDTH + 50 } : 'inherit',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0
      }}
    >
      {<Logo isIcon={!open} sx={{ width: open ? 'auto' : 52, height: 'auto' }} />}

      {!downLG && open && isClickB === 'hover' && (
        <IconButton
          aria-label="open drawer"
          onClick={(e) => {
            e?.preventDefault();
            handlerDrawerOpen(true, 'not_hover');
          }}
          edge="start"
          color="default"
          variant="light"
          size="large"
          sx={{
            color: 'secondary.main',
            bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor,
            ml: { xs: 0, lg: 2 },
            p: 0,
            backgroundColor: theme.palette.background.paper,
            ':hover': {
              background: theme.palette.secondary[100]
            }
          }}
        >
          <RightArrow />
        </IconButton>
      )}
      {!downLG && open && isClickB === 'not_hover' && (
        <IconButton
          aria-label="open drawer"
          onClick={(e) => {
            e?.preventDefault();
            handlerDrawerOpen(false, 'hover');
          }}
          edge="start"
          color="default"
          variant="light"
          size="large"
          sx={{
            color: 'secondary.main',
            bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor,
            ml: { xs: 0, lg: 2 },
            p: 0,
            backgroundColor: theme.palette.background.paper,
            ':hover': {
              background: theme.palette.secondary[100]
            }
          }}
        >
          <LeftArrow />
        </IconButton>
      )}
    </DrawerHeaderStyled>
  );
}
