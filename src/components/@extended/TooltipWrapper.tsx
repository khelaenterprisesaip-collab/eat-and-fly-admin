import React from 'react';
import { Tooltip, TooltipProps } from '@mui/material';

const ToolTipWrapper = ({
  title = '',
  arrow = true,
  placement,
  children
}: {
  children: React.ReactElement;
  title?: string;
  arrow?: boolean;
  placement?: TooltipProps['placement'];
}) => {
  return title ? (
    <Tooltip title={title} arrow={arrow} placement={placement}>
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

export default ToolTipWrapper;
