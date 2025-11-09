import {
  Box,
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { CloseIcon } from "assets/svg/CloseIcon";
import ThemeButton from "../Button";

interface ModalProps {
  open: boolean;
  handleClose?: () => void;
  title: any;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  handleSubmit?: () => void;
  closeIcon?: boolean;
  maxWidth?: Breakpoint;
  sx?: SxProps<Theme>;
  defaultFooter?: boolean;
  titleVariant?: any;
  titleAction?: any;
}

const Modal = ({
  open,
  handleClose,
  title,
  children,
  closeIcon,
  handleSubmit,
  titleVariant,
  titleAction,
  ...props
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={props.maxWidth}
      sx={props.sx}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color={"#394663"} variant={titleVariant || "h5"}>
            {title}
          </Typography>
          <Stack direction={"row"} alignItems={"center"}>
            {titleAction && titleAction}
            {closeIcon && (
              <Box
                sx={{
                  cursor: "pointer",
                }}
              >
                <CloseIcon onClick={handleClose} />
              </Box>
            )}
          </Stack>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>{children}</DialogContent>
      <Divider />
      {props.defaultFooter && (
        <DialogActions sx={{ p: 2.5 }}>
          <ThemeButton
            color="primary"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </ThemeButton>
          <ThemeButton
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </ThemeButton>
        </DialogActions>
      )}
      {props.footerActions && (
        <DialogActions sx={{ p: 2.5 }}>{props.footerActions}</DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
