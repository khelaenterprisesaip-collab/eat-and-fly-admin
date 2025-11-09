import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import { X } from "lucide-react";
import StepOne from "./Step1";
import ThemeButton from "components/ui/Button";
import StepTwo from "./Step2";
// import { sendInvoiceEmail } from "services/order";
import { openSnackbar } from "api/snackbar";

const steps = ["Select Email Recipients", "Preview PDF"];

const NotifyCustomerDialog: React.FC<any> = ({
  open,
  onClose,
  orderBilling,
}: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [ccRecipients, setCcRecipients] = useState<any[]>([]);
  const [bccEnabled, setBccEnabled] = useState(false);
  const [bccRecipients, setBccRecipients] = useState<any[]>([]);
  const [subject, setSubject] = useState("Sales Invoice");
  const [message, setMessage] = useState(
    `Hello!
 Your invoice  is ready. Check out the details below.





`
  );
  const [loading, setLoading] = useState(false);
  const [activeStep2, setActiveStep2] = useState(0);

  const [errors, setErrors] = useState({
    recipients: false,
    subject: false,
    message: false,
  });

  const handleNext = () => {
    if (activeStep === 0) {
      const hasRecipients = recipients.length > 0;
      const hasSubject = subject.trim().length > 0;
      const hasMessage = message.trim().length > 0;

      const newErrors = {
        recipients: !hasRecipients,
        subject: !hasSubject,
        message: !hasMessage,
      };

      if (!hasRecipients) {
        setErrors(newErrors);
        setActiveStep(0);
        setActiveStep2(0);
        return;
      }

      if (!hasSubject) {
        setErrors(newErrors);
        setActiveStep(0);
        setActiveStep2(1);
        return;
      }

      if (!hasMessage) {
        setErrors(newErrors);
        setActiveStep(0);
        setActiveStep2(2);
        return;
      }

      setErrors({
        recipients: false,
        subject: false,
        message: false,
      });
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    // sendInvoiceEmail({
    //   body: {
    //     id: orderBilling?.orderId,
    //     to: recipients?.map((ele) => ele?.email),
    //     cc: ccRecipients?.map((ele) => ele?.email),
    //     bcc: bccRecipients?.map((ele) => ele?.email),
    //     subject,
    //     message,
    //   },
    // })
    //   ?.then((res) => {
    //     handleClose();
    //     setLoading(false);
    //     openSnackbar({
    //       open: true,
    //       message: res?.message,
    //       variant: "alert",
    //       alert: {
    //         color: "success",
    //       },
    //     } as any);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     setLoading(false);
    //     openSnackbar({
    //       open: true,
    //       message: err?.data?.error?.message,
    //       variant: "alert",
    //       alert: {
    //         color: "success",
    //       },
    //     } as any);
    //   });
  };

  const handleClose = () => {
    setActiveStep(0);
    setRecipients([]);
    setCcRecipients([]);
    setBccRecipients([]);
    setBccEnabled(false);

    setErrors({ recipients: false, subject: false, message: false });
    onClose();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepOne
            activeStep={activeStep2}
            setActiveStep={setActiveStep2}
            handleNext={handleNext}
            recipients={recipients}
            ccRecipients={ccRecipients}
            bccRecipients={bccRecipients}
            bccEnabled={bccEnabled}
            onAddRecipient={(r: any) => {
              setRecipients([...recipients, r]);
              if (errors.recipients)
                setErrors((e) => ({ ...e, recipients: false }));
            }}
            onRemoveRecipient={(email: string) =>
              setRecipients(recipients?.filter((r) => r.email !== email))
            }
            onAddCcRecipient={(r: any) => setCcRecipients([...ccRecipients, r])}
            onRemoveCcRecipient={(email: string) =>
              setCcRecipients(ccRecipients?.filter((r) => r.email !== email))
            }
            onAddBccRecipient={(r: any) =>
              setBccRecipients([...bccRecipients, r])
            }
            onRemoveBccRecipient={(email: string) =>
              setBccRecipients(bccRecipients?.filter((r) => r.email !== email))
            }
            onToggleBcc={() => setBccEnabled(!bccEnabled)}
            subject={subject}
            setSubject={(val: string) => {
              setSubject(val);
              if (errors?.subject) setErrors((e) => ({ ...e, subject: false }));
            }}
            message={message}
            setMessage={(val: string) => {
              setMessage(val);
              if (errors.message) setErrors((e) => ({ ...e, message: false }));
            }}
            errors={errors}
          />
        );
      case 1:
        return <StepTwo orderBilling={orderBilling} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { minHeight: "70vh", maxHeight: "90vh" } }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid #e5e7eb",
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Notify Customer</span>
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ py: 3, px: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "& .MuiStepIcon-text": { fill: "#fff" },
                      width: 32,
                      height: 32,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepContent()}
        </Box>
      </DialogContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <ThemeButton
          variant="text"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </ThemeButton>
        <ThemeButton
          loading={loading}
          variant="contained"
          onClick={() => (activeStep === 1 ? handleSubmit() : handleNext())}
          buttonStyle={{ px: 4 }}
        >
          {activeStep === 1 ? "Send" : "Next"}
        </ThemeButton>
      </Box>
    </Dialog>
  );
};

export default NotifyCustomerDialog;
