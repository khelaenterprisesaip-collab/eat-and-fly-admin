import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { borderRadius } from '@mui/system';
import { Children } from 'react';
import { Stack } from '@mui/material';

type modal = {
  visible: boolean;
  setVisible: any;
  children: React.ReactNode;
  title: string;
};

const ModalComponent = ({ visible, setVisible, children, title }: modal) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 2
  };
  return (
    <div>
      <Modal
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <div>
              <h2>{title}</h2>
            </div>

            <div>{children}</div>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
