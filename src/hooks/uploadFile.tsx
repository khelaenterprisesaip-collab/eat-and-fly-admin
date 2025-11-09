import { useState } from 'react';
import { uploadFile } from 'services/upload';
import { openSnackbar } from 'api/snackbar';
import { InfoCircle } from 'iconsax-react';
import { SnackbarProps } from 'types/snackbar';

const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [fileData, setFileData] = useState({ type: '', fileName: '' });
  const handleUpload = async (file: any, setFileValue: any) => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await uploadFile({
          body: formData
        });
        setUploading(false);
        setFileValue(res?.link);
        openSnackbar({
          open: true,
          message: 'File uploaded successfully!',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        } as SnackbarProps);
        return { res, error: null };
      } catch (err: any) {
        setUploading(false);
        openSnackbar({
          open: true,
          message: err?.message,
          variant: 'alert',
          alert: {
            color: 'error',
            icon: <InfoCircle />
          },

          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        } as SnackbarProps);
        return { res: null, error: err };
      }
    } else {
      setUploading(false);
      return { res: null, error: new Error('No file provided') };
    }
  };

  return { uploading, handleUpload, fileData, setFileData };
};

export default useFileUpload;
