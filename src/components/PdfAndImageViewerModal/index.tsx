import axios from 'axios';
import Modal from 'components/ui/Modal';
import React, { useEffect, useState } from 'react';

const PdfAndImageViewerModal = ({ mediaUrl, setMediaUrl }: any) => {
  const [base64Data, setBase64Data] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (mediaUrl) {
      setLoading(true);
      axios({
        url: mediaUrl,
        method: 'GET',
        responseType: 'arraybuffer'
      })
        .then((response) => {
          const data = Buffer.from(response.data, 'binary').toString('base64');
          setBase64Data(data);
          setLoading(false);
        })
        .catch((err) => {
          {
            setLoading(false);
          }
        });
    }
  }, [mediaUrl]);

  return (
    <Modal title={'Document Preview'} open={mediaUrl} handleClose={() => setMediaUrl('')}>
      {base64Data ? (
        <iframe
          src={`${mediaUrl?.includes('.pdf') ? 'data:application/pdf;base64,' : 'data:image/png;base64,'}${base64Data}`}
          height="100%"
          style={{ height: '75vh' }}
          width="100%"
        ></iframe>
      ) : null}
    </Modal>
  );
};

export default PdfAndImageViewerModal;
