// UploadData.tsx
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import UploadFile from "components/ui/UploadFile";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import { openSnackbar } from "api/snackbar";
import ThemeButton from "components/ui/Button";
import { LoadingButton } from "@mui/lab";
import excel from "assets/images/common/excel.svg";

const UploadData = ({
  handleNext,
  setActiveStep,
  setBulkData,
  validateService,
  uploadCsv,
  redirectPath,
  handleUploadSuccess,
  csvFile,
  setFileType,
}: any) => {
  const [file, setFile] = useState<any>();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const handleBulkImport = async () => {
    if (!file?.[0]) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file[0]);
      const response = await validateService({ body: formData });
      if (response?.errors?.length === 0) {
        const records = response?.data?.map((item: any) => item);
        const submitResponse = await uploadCsv({ body: { records: records } });
        if (submitResponse?.data?.length === records?.length) {
          openSnackbar({
            open: true,
            message: "Records uploaded successfully!",
            variant: "alert",
            alert: { color: "success" },
          } as any);
          setActiveStep(2);
        }
      } else {
        setBulkData(response);
        openSnackbar({
          open: true,
          message: `Error in ${response?.errors?.length} ${response?.errors?.length === 1 ? "record" : "records"}`,
          variant: "alert",
          alert: { color: "error" },
        } as any);
        handleNext();
      }
    } catch (err) {
      console.error(err);
      openSnackbar({
        open: true,
        message: "An error occurred!",
        variant: "alert",
        alert: { color: "error" },
      } as any);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async () => {
    setExcelLoading(true);

    // try {
    //   const apiEndPoint = id ? `${hostname()}/api/v1/programs/excel?college_id=${id}` : `${hostname()}/api/v1/programs/excel`;
    //   const response = await axios.get(apiEndPoint, {
    //     responseType: 'arraybuffer',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       authorization: localStorage.getItem('accessToken')
    //     }
    //   });
    //   setExcelLoading(false);
    //   const url = window.URL.createObjectURL(
    //     new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    //   );
    //   const link = document.createElement('a');
    //   link.href = url;
    //   const contentDisposition = response.headers['content-disposition'];
    //   let fileName = 'program.xlsx';
    //   if (contentDisposition) {
    //     const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    //     if (fileNameMatch && fileNameMatch.length === 2) {
    //       fileName = fileNameMatch[1];
    //     }
    //   }
    //   link.setAttribute('download', fileName);
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // } catch (error) {
    //   console.error('Error downloading the file', error);
    // }
  };

  const downloadCSV = (filename: any) => {
    setExcelLoading(true);
    const link = document.createElement("a");
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExcelLoading(false);
  };

  return (
    <Grid xs={12}>
      <Stack spacing={8} alignItems="center" px={{ xs: 0, md: 20 }}>
        <Stack spacing={3} alignItems="center">
          <Typography color={"GrayText"} variant="h6">
            Use the template below to prepare your data
          </Typography>

          <a>
            <LoadingButton
              loading={excelLoading}
              variant="outlined"
              sx={{ height: "30px" }}
              startIcon={
                <Avatar
                  src={excel}
                  sx={{ height: 18, width: 18, borderRadius: 0 }}
                />
              }
              className="size-small"
              onClick={() => {
                downloadCSV(csvFile);
              }}
            >
              Download Template
            </LoadingButton>
          </a>
        </Stack>

        <Stack spacing={1} width="100%">
          <Typography color="GrayText" variant="h6" textAlign="center">
            Once you are finished entering data in template, click or drag and
            drop to upload
          </Typography>

          <Grid container spacing={{ xs: 0, md: 3 }}>
            <Grid item xs={12}>
              <Stack spacing={1.5} mt={{ xs: 3, md: 0 }} alignItems="center">
                <UploadFile
                  setFileType={setFileType}
                  setFile={setFile}
                  file={file}
                  progress={progress}
                  setProgress={setProgress}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          width="100%"
        >
          {/* <Link component={RouterLink} t color="text.primary"> */}
          <ThemeButton
            buttonStyle={{ fontSize: 12, fontWeight: 600 }}
            color="primary"
            variant="outlined"
            onClick={() => {
              handleUploadSuccess();
            }}
          >
            Cancel
          </ThemeButton>
          {/* </Link> */}

          <ThemeButton
            loading={loading}
            variant="contained"
            disabled={!file || progress !== 100}
            onClick={handleBulkImport}
            endIcon={<ArrowRight />}
          >
            Next
          </ThemeButton>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default UploadData;
