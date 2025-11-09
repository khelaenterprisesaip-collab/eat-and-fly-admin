import * as React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import { styled } from '@mui/system';

const Input = React.forwardRef(function CustomInput(props: InputProps, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <BaseInput
      slots={{
        root: RootDiv,
        input: 'input',
        textarea: TextareaElement
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function InputMultiline() {
  return <Input aria-label="Demo input" multiline />;
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2'
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
};

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled('textarea', {
  shouldForwardProp: (prop) => !['ownerState', 'minRows', 'maxRows'].includes(prop.toString())
})(
  ({ theme }) => `
  width: 100%;
  min-height: 6rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 8px 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? `primary.main` : `primary.main`};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? `primary.main` : `primary.lighter`};
  }
`
);
