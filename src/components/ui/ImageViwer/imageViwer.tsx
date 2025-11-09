import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Modal from '../Modal';

export const PdfImageDocModal = ({ fileUrl, open, setOpen }: any) => {
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getFileType = (url: any) => {
    const extension = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'doc';
    if (['others'].includes(extension)) return 'others';
    return 'no-document';
  };

  const fileType = getFileType(fileUrl);
  return (
    <>
      <Modal open={open} handleClose={handleClose} title={'Preview'}>
        <Box>
          {fileType === 'image' && (
            <Box position="relative" width="100%" height="100%">
              {loading && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={1}
                >
                  <CircularProgress />
                </Box>
              )}
              <img
                src={fileUrl}
                alt="preview"
                style={{
                  width: '500px',
                  height: '500px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          )}
          {fileType === 'pdf' && (
            <iframe
              src={`https://docs.google.com/viewer?url=${fileUrl}&embedded=true`}
              style={{ width: '500px', height: '500px' }}
              frameBorder="0"
              title="PDF Preview"
            />
          )}
          {fileType === 'doc' && (
            <iframe
              src={`https://docs.google.com/viewer?url=${fileUrl}&embedded=true`}
              style={{ width: '500px', height: '500px' }}
              frameBorder="0"
              title="Document Preview"
            />
          )}
          {fileType === 'others' && (
            <p>
              File preview not supported for this file type.{' '}
              <a href={fileUrl} download>
                Download file
              </a>
            </p>
          )}
          {fileType === 'no-document' && <p>User didn't upload any attachments.</p>}
        </Box>
      </Modal>
    </>
  );
};
