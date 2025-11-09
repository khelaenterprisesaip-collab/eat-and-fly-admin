import { SVGProps } from 'react';

const ArrowDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1 1.09363L5.4064 5.50003L1 9.90643"
        stroke={props.stroke || '#5B6B79'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowDown;
