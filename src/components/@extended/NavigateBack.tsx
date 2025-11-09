import React from 'react';
import ArrowBack from 'assets/svg/ArrowBack';
import { useNavigate } from 'react-router';

interface IProps {
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const NavigateBack = ({ className = '', onClick }: IProps) => {
  const navigate = useNavigate();
  return (
    <ArrowBack
      className={className}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        navigate(-1);
      }}
    />
  );
};

export default NavigateBack;
