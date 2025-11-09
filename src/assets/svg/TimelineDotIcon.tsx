import React from "react";
import type { SVGProps } from "react";

export function TimelineDotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 31 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.2969 14.4138C28.2969 7.71674 22.3252 2.70315 15.5 2.70315C8.67479 2.70315 2.70313 7.71674 2.70313 14.4138C2.70312 21.1109 8.67479 26.1245 15.5 26.1245C22.3252 26.1245 28.2969 21.1109 28.2969 14.4138Z"
        fill="white"
        stroke="#E1EBFD"
        stroke-width="4.59375"
      />
      <ellipse
        cx="15.5"
        cy="14.413"
        rx="5.88363"
        ry="6.5625"
        transform="rotate(-90 15.5 14.413)"
        fill="#334735"
      />
    </svg>
  );
}
