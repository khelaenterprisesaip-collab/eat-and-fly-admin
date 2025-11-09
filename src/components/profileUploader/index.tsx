import { LoadingButton } from "@mui/lab";
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { openSnackbar } from "api/snackbar";
import { ProfileIcon } from "assets/svg/profile";
import { VisuallyHiddenInput } from "components/ui/HiddenUploadInput";
import { InfoCircle } from "iconsax-react";
import React, { ChangeEvent, useState } from "react";

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadProfilePictureProps {
  updateProfile: (payload: {
    body: { profile: { base64: string } };
  }) => Promise<void>;
  fetch?: any;
  previewImage: string;
  setPreviewImage: any;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  updateProfile,

  fetch,
  previewImage,
  setPreviewImage,
}) => {
  const [uploading, setUploading] = useState(false);

  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      openSnackbar({
        open: true,
        message: "File size must be less than 1MB",
        variant: "alert",
        alert: {
          color: "error",
          icon: <InfoCircle />,
        },
        transition: "SlideDown",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      } as any);
      return;
    }

    const previewURL: any = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    try {
      setUploading(true);
      const base64 = await toBase64(file);
      setBase64Image(base64);

      updateProfile({ body: { profile: { base64 } } })
        .then(() => {
          openSnackbar({
            open: true,
            message: "Profile updated successfully",
            variant: "alert",
            alert: { color: "success" },
          } as any);
          fetch();
        })
        .catch((err) => {
          openSnackbar({
            open: true,
            message: err?.data?.message || "Something went wrong",
            variant: "alert",
            alert: {
              color: "error",
              icon: <InfoCircle />,
            },
            anchorOrigin: { vertical: "top", horizontal: "right" },
          } as any);
        })
        .finally(() => setUploading(false));
    } catch (error) {
      console.error("Base64 conversion error:", error);
      setUploading(false);
    }
  };

  return (
    <Stack direction={{ md: "row" }} gap={3}>
      <Avatar
        variant="rounded"
        alt="Profile"
        src={previewImage}
        sx={{ width: 70, height: 70 }}
      />
      <Stack>
        <Typography
          color={"InfoText"}
          variant="caption"
          sx={{ fontWeight: "500" }}
        >
          Upload Profile Picture <VisuallyHiddenInput type="file" />
        </Typography>

        <LoadingButton
          component="label"
          loading={uploading}
          variant="text"
          color="secondary"
          startIcon={<ProfileIcon />}
          sx={{
            mt: 1,
            textTransform: "none",
            bgcolor: "#F3F3F3",
            width: "12rem",
            fontSize: "10px",
            py: 1,
          }}
        >
          Browse Files
          <VisuallyHiddenInput
            type="file"
            name="profile"
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
          />
        </LoadingButton>

        <Typography
          variant="subtitle2"
          color={"GrayText"}
          fontSize={10}
          ml={1}
          mt={0.8}
        >
          PNG, JPEG, JPG. Max file size: 1MB.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UploadProfilePicture;
