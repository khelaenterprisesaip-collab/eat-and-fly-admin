import React from "react";
import { Grid, Stack, Button } from "@mui/material";
import Modal from "../Modal";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  modalTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  cancelText?: string;
  confirmText?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  modalTitle,
  title,
  onCancel,
  onConfirm,
  color,
  confirmLoading = false,
  cancelText = "Cancel",
  confirmText = "Confirm",
}) => {
  return (
    <Modal
      title={title}
      open={open}
      titleVariant="h6"
      handleClose={() => {
        onCancel();
      }}
      maxWidth="xs"
      sx={{
        "& .MuiBackdrop-root": { opacity: "0.5 !important" },
        "& .MuiDialogContent-root": { padding: "10px" },
      }}
    >
      <Grid item xs={12}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            size="small"
            variant="contained"
            color={color ? "error" : "primary"}
            onClick={onConfirm}
            disabled={confirmLoading}
          >
            {confirmLoading ? "Loading..." : confirmText}
          </Button>
        </Stack>
      </Grid>
    </Modal>
  );
};

export default ConfirmModal;
