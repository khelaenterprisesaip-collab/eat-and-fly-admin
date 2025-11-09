import { LoadingButton } from "@mui/lab";
import { defaultSx } from "./styles";
import { useTheme } from "@mui/material";
interface ButtonProps {
  id?: string;
  buttonStyle?: any;
  onClick?: () => void;
  startIcon?: any;
  variant?: any;
  size?: any;
  children?: React.ReactNode;
  endIcon?: any;
  color?: any;
  type?: any;
  disabled?: boolean;
  loading?: boolean;
}

const ThemeButton = ({
  id,
  startIcon,
  variant,
  size = "medium",
  type,
  buttonStyle,
  endIcon,
  color,
  onClick,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <LoadingButton
      variant={variant}
      color={color}
      loading={loading}
      type={type}
      size={size}
      startIcon={startIcon}
      onClick={onClick}
      endIcon={endIcon}
      sx={{
        ...defaultSx,
        ...buttonStyle,
        ...(variant === "contained" &&
          disabled && {
            backgroundColor: "#334735 !important", // Force blue
            color: "#ffffff !important", // White text
            opacity: 0.9, // Slight dim effect
            pointerEvents: "none",
          }),
      }}
      disabled={disabled}
    >
      {props?.children}
    </LoadingButton>
  );
};

export default ThemeButton;
