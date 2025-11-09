// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
// import { motion } from 'framer-motion';

// project-imports
// import Logo from 'components/logo';

// assets
import { Dribbble, Facebook, Link2, Youtube, Xrp } from 'iconsax-react';

// link - custom style
// const FooterLink = styled(Link)(({ theme }) => ({
//   color: theme.palette.text.primary,
//   '&:hover, &:active': {
//     color: theme.palette.primary.main
//   }
// }));

type showProps = {
  isFull?: boolean;
};

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function FooterBlock({ isFull }: showProps) {
  const theme = useTheme();

  const linkSX = {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    opacity: '0.6',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  };

  return (
    <>
      <Box
        sx={{
          py: 2.4,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: 'secondary.200'
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography>
                © Handcrafted by Team{' '}
                <Link href="https://1.envato.market/xk3bQd" underline="none">
                  {' '}
                  Phoenixcoded
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                  <Tooltip title="Linkedin">
                    <Link href="https://in.linkedin.com/company/phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                      <Link2 variant="Bold" size={24} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Twitter">
                    <Link href="https://twitter.com/phoenixcoded?lang=en" underline="none" target="_blank" sx={linkSX}>
                      <Xrp variant="Bold" size={16} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Facebook">
                    <Link href="https://www.facebook.com/Phoenixcoded/" underline="none" target="_blank" sx={linkSX}>
                      <Facebook variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Dribbble">
                    <Link href="https://dribbble.com/Phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                      <Dribbble variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Youtube">
                    <Link href="https://www.youtube.com/@Phoenixcodedwebsolution?app=desktop" underline="none" target="_blank" sx={linkSX}>
                      <Youtube variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
