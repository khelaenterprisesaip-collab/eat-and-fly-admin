import React, { Suspense, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const Editor = React.lazy(() => import('react-quill'));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 2
    }}
  >
    <CircularProgress size={20} />
  </Box>
);

const QuillEditorBase = forwardRef(({ modules, ...props }: any, ref) => {
  const editorRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      getEditor: () => editorRef.current.getEditor()
    }),
    []
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Editor
        {...props}
        modules={modules}
        ref={(r: any) => {
          editorRef.current = r;
        }}
      />
    </Suspense>
  );
});

export const QuillEditor = styled(QuillEditorBase)(({ theme, minHeight = undefined }) => ({
  border: '1.5px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '& .quill': {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden'
  },
  '& .ql-snow.ql-toolbar': {
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    '& button:hover': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main
      }
    },
    '& button:focus': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main
      }
    }
  },
  '& .ql-snow.ql-container': {
    minHeight,
    borderBottom: 'none',
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden',
    '& .ql-editor': {
      color: theme.palette.text.primary,
      flex: 1,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      height: 'auto',
      overflowY: 'auto',
      padding: theme.spacing(2),
      '&.ql-blank::before': {
        color: theme.palette.text.secondary,
        fontStyle: 'normal',
        left: theme.spacing(2)
      }
    }
  }
}));
