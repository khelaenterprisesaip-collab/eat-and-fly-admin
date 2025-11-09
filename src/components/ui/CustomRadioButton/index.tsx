import { Radio, SvgIcon } from "@mui/material";

const CustomRadioButton = (props: any) => (
  <Radio
    {...props}
    icon={
      <SvgIcon
        component={() => (
          <svg
            width="12"
            height="12"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="8.25" stroke="#778194" strokeWidth="1.5" />
          </svg>
        )}
        style={{ fontSize: 10 }}
      />
    }
    checkedIcon={
      <SvgIcon
        component={() => (
          <svg
            width="12"
            height="12"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="8.25" stroke="#778194" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="5" fill="#334735" />
          </svg>
        )}
        style={{ fontSize: 10 }}
      />
    }
  />
);

export default CustomRadioButton;
