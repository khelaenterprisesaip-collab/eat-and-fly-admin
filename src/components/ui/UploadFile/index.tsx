// material-ui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// third-party
import { useDropzone } from "react-dropzone";
import { DropzopType } from "config";
import { Avatar, LinearProgress, Typography } from "@mui/material";
import { Camera } from "iconsax-react";
import upload from "assets/images/common/uploadFile.svg";
import { DeleteIcon } from "assets/svg/Delete";
import CsvIcon from "../../../../public/svg/csv";

const DropzoneWrapper = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.paper,
  border: "1px dashed",
  borderColor: theme.palette.secondary.main,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

const UploadFile = ({
  error,
  file,
  setFile,
  sx,
  progress,
  setProgress,
  setFileType,
}: any) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: { ".csv": [], ".xlsx": [], ".xls": [] },
    multiple: false,
    onDrop: (acceptedFiles: any) => {
      console.log("acceptedFiles", acceptedFiles);
      setFile(
        acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      const fileExtension = acceptedFiles?.[0]?.name
        .split(".")
        .pop()
        ?.toLowerCase();

      if (fileExtension) {
        setFileType(fileExtension);
      }
      if (fileRejections.length > 0) {
        setProgress(0);
      } else {
        setInterval(() => {
          setProgress((prevProgress: any) =>
            prevProgress >= 100 ? 100 : prevProgress + 10
          );
        }, 200);
      }
    },
  });

  function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  const thumbs =
    file &&
    file.map((item: any) => {
      return { name: item?.name, size: item?.size };
    });

  const onRemove = () => {
    setFile(null);
    setProgress(0);
  };

  if (fileRejections.length > 0) {
    setFile(null);
  }
  return (
    <Box sx={{ width: { xs: "90%", md: "60%" }, ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && { padding: "3% 0" }),
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
      </DropzoneWrapper>

      {fileRejections.length > 0 && (
        <Stack mt={2} textAlign={"center"}>
          <Typography color={"red"}>
            Please upload a .csv, .xls, or .xlsx file
          </Typography>
        </Stack>
      )}

      {file && (
        <>
          <Stack direction={"row"} justifyContent={"center"} mt={2}>
            <Stack
              sx={{
                width: 550,
                padding: 1,
                border: "1px solid #EAECF0",
                borderRadius: 1,
              }}
            >
              <Box
                display="flex"
                alignItems={"start"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} flex={1} gap={2}>
                  <CsvIcon />

                  <Box display="flex" flex={1} flexDirection={"column"}>
                    <Typography variant="body1">{thumbs[0]?.name}</Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {formatFileSize(thumbs[0]?.size)}
                    </Typography>
                    {progress > 0 && (
                      <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                          />
                        </Box>
                        <Typography variant="body2">{`${progress}%`}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={onRemove}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};
export default UploadFile;

function PlaceholderContent({ type }: { type?: DropzopType }) {
  return (
    <>
      {type !== DropzopType.STANDARD && (
        <Stack sx={{ p: { xs: 0, md: 3 } }} spacing={1} alignItems="center">
          <Avatar
            src={upload}
            sx={{ height: "60px", width: "70px", borderRadius: 0 }}
          />
          <Typography>
            <Typography component="span" color="#334735" fontWeight="600">
              Upload file here&nbsp;
            </Typography>
            or drag and drop&nbsp;
          </Typography>
          <Typography color="secondary" variant="caption">
            .csv, .xls, or .xlsx file (max size 3MB)
          </Typography>
        </Stack>
      )}
      {type === DropzopType.STANDARD && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Camera style={{ fontSize: "32px" }} />
        </Stack>
      )}
    </>
  );
}
