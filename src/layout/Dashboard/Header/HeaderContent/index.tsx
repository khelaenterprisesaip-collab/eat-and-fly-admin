// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports
// import Search from './Search';
// import Message from './Message';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import FullScreen from './FullScreen';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import { useLocation, useNavigate } from 'react-router';
import ThemeButton from 'components/ui/Button';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && (
        <div
          style={{
            width: '100%'
          }}
        />
      )}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {pathname === '/search-program' ? (
        <ThemeButton
          variant={'contained'}
          buttonStyle={{ px: 4 }}
          onClick={() => {
            navigate('https://app.enrolhere.in/');
          }}
        >
          Login/Register
        </ThemeButton>
      ) : (
        <>
          <Notification />
          {/* <FullScreen /> */}
          {/* <Message /> */}
          {<Profile />}
          {/* {downLG && <MobileSection />} */}
        </>
      )}
    </>
  );
}
