import React, { useRef, useEffect } from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { CheckboxIcon } from 'assets/svg/Checkbox';

interface IndeterminateCheckboxProps extends CheckboxProps {
  indeterminate?: boolean;
}

export default function IndeterminateCheckbox({ indeterminate, ...rest }: IndeterminateCheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate) && !rest.checked;
    }
  }, [indeterminate, rest.checked]);

  return (
    <Checkbox
      icon={
        <SvgIcon>
          <CheckboxIcon />
        </SvgIcon>
      }
      checked={rest.checked}
      inputRef={checkboxRef}
      {...rest}
    />
  );
}
