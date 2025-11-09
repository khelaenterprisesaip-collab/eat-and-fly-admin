import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Modal from 'components/ui/Modal';
import React from 'react';

const UpdateStaffStatus = ({ isModalOpen, isLoading, setIsModalOpen, isTrue, handleUpdateStatus }: any) => {
  return (
    <Modal
      open={isModalOpen?.id}
      maxWidth="xs"
      titleVariant="h6"
      title={`Are you sure you want to change status to ${!isTrue ? 'inactive' : 'active'}?`}
      sx={{
        '& .MuiDialog-paper': { p: 0, minWidth: { xl: 300, sm: 'calc(100% - 80%)' } },
        '& .MuiBackdrop-root': { opacity: '0.5 !important' },
        '& .MuiDialogContent-root': { padding: '10px' }
      }}
    >
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
          <AnimateButton>
            <Button size="small" type="submit" variant="outlined" color="primary" onClick={() => setIsModalOpen({})}>
              Cancel
            </Button>
          </AnimateButton>
          <AnimateButton>
            <LoadingButton loading={isLoading} size="small" type="submit" variant="contained" color="primary" onClick={handleUpdateStatus}>
              Confirm
            </LoadingButton>
          </AnimateButton>
        </Stack>
      </Grid>
    </Modal>
  );
};

export default UpdateStaffStatus;
