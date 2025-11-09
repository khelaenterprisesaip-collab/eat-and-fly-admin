import { SVGProps } from "react";

export const PreviewIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 6.875V13.3438C12.5 13.5284 12.4636 13.7113 12.393 13.8819C12.3223 14.0525 12.2187 14.2075 12.0881 14.3381C11.9575 14.4687 11.8025 14.5723 11.6319 14.643C11.4613 14.7136 11.2784 14.75 11.0938 14.75H2.65625C2.28329 14.75 1.9256 14.6018 1.66188 14.3381C1.39816 14.0744 1.25 13.7167 1.25 13.3438V4.90625C1.25 4.53329 1.39816 4.1756 1.66188 3.91188C1.9256 3.64816 2.28329 3.5 2.65625 3.5H8.54422M10.8125 1.25H14.75V5.1875M6.875 9.125L14.4688 1.53125"
        stroke={props.color || "#334735"}
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
