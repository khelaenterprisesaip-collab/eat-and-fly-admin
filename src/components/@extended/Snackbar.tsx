import { SyntheticEvent } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import MuiSnackbar from '@mui/material/Snackbar';
import IconButton from './IconButton';
import { closeSnackbar, useGetSnackbar } from 'api/snackbar';
import { KeyedObject } from 'types/root';
import { Add } from 'iconsax-react';
import { MdiCancelBold } from 'assets/svg/CrossIcon2';
import { Box, Typography } from '@mui/material';
import ErrorIcon, { CiInfo, MaterialSymbolsWarningOutline, MingcuteCheckFill } from 'assets/svg/alterIcon';

function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| SNACKBAR ||============================== //

export default function Snackbar() {
  const { snackbar }: any = useGetSnackbar();

  const context: any = {
    success: {
      color: '#5f7457',
      bgColor: '#def3d6',
      border: '#d2ddc9',
      icon: <MingcuteCheckFill />,
      text: 'Success'
    },
    error: {
      color: '#c50d0d',
      bgColor: '#ecc8c4',
      border: '#c09c9a',
      icon: <ErrorIcon />,
      text: 'Error'
    },
    info: {
      color: '#4d84ac',
      bgColor: '#cce8f5',
      border: '#aac1cc',
      icon: <CiInfo />,
      text: 'Info'
    },
    warning: {
      color: '#8a7135',
      bgColor: '#f8f3d6',
      border: '#d0ceae',
      icon: <MaterialSymbolsWarningOutline />,
      text: 'Warning'
    }
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const alertColor = snackbar?.alert?.color;
  const { color, icon, text, bgColor, border } = context[alertColor] || {};

  const isMessageLengthInRange = (message: any) => {
    const wordCount = message.split(' ').length;
    return wordCount >= 0 && wordCount <= 20;
  };

  return (
    <>
      {snackbar?.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={snackbar.message}
          TransitionComponent={animation[snackbar.transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <Add style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </>
          }
        />
      )}

      {snackbar?.variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[snackbar.transition]}
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleClose}
          sx={{ mt: 7 }}
        >
          <Alert
            icon={false}
            color={snackbar.alert.color}
            severity={snackbar.alert.color}
            sx={{
              display: 'flex',
              border: `1px solid ${border}`,
              backgroundColor: bgColor || 'transparent',
              alignItems: 'center',
              height: 'auto',

              borderRadius: 1,
              ...snackbar.alert.sx,
              ...(snackbar.alert.variant === 'outlined' && {
                bgcolor: 'transparent'
              }),
              '@media (max-width: 600px)': {
                height: 'auto',
                flexDirection: 'column',
                padding: 1
              }
            }}
          >
            <Stack
              direction="row"
              py={0.4}
              mt={0.4}
              alignItems={{ xs: 'flex-start' }}
              gap={{ xs: 0, sm: 1 }}
              justifyContent="space-between"
              width={'100%'}
              minWidth={{ md: 350 }}
              maxWidth={{ md: 500 }}
              boxSizing={'border-box'}
            >
              <Stack direction="row" gap={1.8} alignItems="flex-start">
                <Box>{icon}</Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={0.5} alignItems="flex-start">
                  <Typography variant="body1" fontSize={15} color={color} fontWeight={600} display="flex" gap={0.5}>
                    {text}
                    <span>:</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={450}
                    fontSize={14.8}
                    color={color}
                    display="flex"
                    flexShrink={1}
                    gap={0.5}
                    sx={{
                      flexWrap: 'wrap',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {snackbar?.message}
                  </Typography>
                </Stack>
              </Stack>

              {/* Close Button */}
              <span onClick={handleClose} style={{ cursor: 'pointer' }} aria-label="Close">
                <MdiCancelBold fill={color} fillOpacity={0.5} style={{ marginTop: 2 }} />
              </span>
            </Stack>
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
}
