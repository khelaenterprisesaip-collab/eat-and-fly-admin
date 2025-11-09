import {
  Avatar,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import MainCard from "components/MainCard";
import Page from "components/ui/PageLayout";
import { Dispatch, SetStateAction, useState } from "react";
import UploadData from "../uploadData";
import PreviewData from "../previewData";
import success from "assets/images/common/success.svg";
import { useNavigate } from "react-router";
import useRedirect from "../redirectFunc";

type BulkImportProps = {
  title: string;
  subtitle: string;
  csvTable: any;
  steps?: string[];
  validateService: any;
  uploadCsv: any;
  redirectPath: any;
  csvFile: any;
};

const GetStepContent = (
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setActiveStep: Dispatch<SetStateAction<number>>,
  setBulkData: any,
  bulkData: any,
  validateService: any,
  uploadCsv: any,
  csvTable: any,
  redirectPath: any,
  navigate: any,
  handleUploadSuccess: any,
  csvFile: any,
  allTable: any,
  successTable: any,
  errorTable: any,
  fileType: any,
  setFileType: any
) => {
  switch (step) {
    case 0:
      return (
        <UploadData
          handleNext={handleNext}
          setActiveStep={setActiveStep}
          uploadCsv={uploadCsv}
          validateService={validateService}
          setBulkData={setBulkData}
          redirectPath={redirectPath}
          handleUploadSuccess={handleUploadSuccess}
          csvFile={csvFile}
          setFileType={setFileType}
        />
      );
    case 1:
      return (
        <PreviewData
          handleNext={handleNext}
          handleBack={handleBack}
          bulkData={bulkData}
          setBulkData={setBulkData}
          redirectPath={redirectPath}
          // uploadService={uploadService}
          fileType={fileType}
          csvTable={csvTable}
          allTable={allTable}
          successTable={successTable}
          errorTable={errorTable}
        />
      );
    case 2:
      return (
        <Stack alignItems="center" spacing={1}>
          <Typography>
            <Avatar
              src={success}
              sx={{ height: "120px", width: "120px", borderRadius: 0 }}
            />
          </Typography>
          <Typography variant="h4" fontWeight="600">
            Success!
          </Typography>
          <Typography variant="caption" color="GrayText">
            data uploaded successfully.
          </Typography>
          <Button
            sx={{
              width: "40px",
              fontSize: 12,
              fontWeight: 600,
              marginTop: "20px",
            }}
            variant="contained"
            onClick={(e) => {
              handleUploadSuccess();
            }}
          >
            Done
          </Button>
        </Stack>
      );
    default:
      throw new Error("Unknown step");
  }
};

const BulkImport = ({
  title,
  subtitle,
  csvTable,
  uploadCsv,
  validateService,
  redirectPath,
  csvFile,

  steps = ["Upload Data", "Preview & Edit", "Done"],
}: BulkImportProps) => {
  console.log(redirectPath, "wdkejnfd");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [bulkData, setBulkData] = useState();
  const navigate = useNavigate();
  const [fileType, setFileType] = useState("");
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const redirectTo = useRedirect();
  const handleUploadSuccess = () => {
    redirectTo(redirectPath);
  };

  // console.log("csvTable", csvTable);

  console.log("fileType", fileType);

  const allTable = csvTable("all");
  const successTable = csvTable("success");
  const errorTable = csvTable("error");

  return (
    <Page
      title={title}
      subtitle={`Bulk import ${subtitle} by uploading the data in csv format`}
    >
      <MainCard>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {GetStepContent(
          activeStep,
          handleNext,
          handleBack,
          setActiveStep,
          setBulkData,
          bulkData,
          validateService,
          uploadCsv,
          redirectPath,
          csvTable,
          navigate,
          handleUploadSuccess,
          csvFile,
          allTable,
          successTable,
          errorTable,
          fileType,
          setFileType
        )}
      </MainCard>
    </Page>
  );
};

export default BulkImport;
