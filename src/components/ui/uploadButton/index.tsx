import { useState, useCallback } from "react";
import { LoadingButton } from "@mui/lab";
import { UploadIcon } from "assets/svg/UploadIcon";
import { VisuallyHiddenInput } from "../HiddenUploadInput";
import { defaultSx } from "../Button/styles";

interface UploadButtonProps {
  onChange: (file: File | null) => void;
  name: string;
  // onChange: any;
  setFileData: any;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  setFileData,
  onChange,
  name,
}) => {
  // const [fileData, setFileData] = useState<{ fileName?: string }>({});

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setFileData({ fileName: file?.name });
      onChange(file);
    },
    [onChange]
  );

  return (
    <div>
      <LoadingButton
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        endIcon={<UploadIcon />}
        sx={{
          mt: 0.5,
          textTransform: "none",
          bgcolor: "#EBF1FD",
          ...defaultSx,
        }}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          name={name}
          onChange={handleFileChange}
        />
      </LoadingButton>
    </div>
  );
};

export default UploadButton;
