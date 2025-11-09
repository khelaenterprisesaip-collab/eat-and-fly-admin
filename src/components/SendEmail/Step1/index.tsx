import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import RecipientInput from "../input";
import { QuillEditor } from "components/editor";
import ThemeButton from "components/ui/Button";

const StepOne: React.FC<any> = ({
  recipients,
  ccRecipients,
  bccRecipients,
  bccEnabled,
  onAddRecipient,
  onRemoveRecipient,
  onAddCcRecipient,
  onRemoveCcRecipient,
  onAddBccRecipient,
  onRemoveBccRecipient,
  onToggleBcc,
  subject,
  setSubject,
  message,
  setMessage,
  errors,
  handleNext,
  activeStep,
  setActiveStep,
}) => {
  const handleAddMe = (section: "to" | "cc" | "bcc") => {
    const currentUser = {
      name: "Me",
      email: "info@codekraftsolutions.com",
    };
    if (section === "to") onAddRecipient(currentUser);
    else if (section === "cc") onAddCcRecipient(currentUser);
    else if (section === "bcc") onAddBccRecipient(currentUser);
  };

  const handleClearRecipients = (section: "to" | "cc" | "bcc") => {
    if (section === "to")
      recipients.forEach((r: any) => onRemoveRecipient(r?.email));
    else if (section === "cc")
      ccRecipients.forEach((r: any) => onRemoveCcRecipient(r?.email));
    else if (section === "bcc")
      bccRecipients.forEach((r: any) => onRemoveBccRecipient(r?.email));
  };

  const steps = [
    {
      label: "SEND TO",
      content: (
        <>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              BCC
            </Typography>
            <Switch size="small" checked={bccEnabled} onChange={onToggleBcc} />
          </Box>

          <Typography variant="body2" fontWeight="medium">
            TO:
          </Typography>
          <RecipientInput
            recipients={recipients}
            onAdd={onAddRecipient}
            onRemove={onRemoveRecipient}
            placeholder="Select or type Contacts"
          />

          {errors.recipients && (
            <Typography variant="caption" color="error">
              At least one recipient is required
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              You can paste multiple emails separated by commas.
            </Typography>
            <Box>
              <Button
                size="small"
                variant="text"
                onClick={() => handleAddMe("to")}
                sx={{ mr: 1 }}
              >
                Add Me
              </Button>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={() => handleClearRecipients("to")}
              >
                Clear
              </Button>
            </Box>
          </Box>

          <Typography variant="body2" fontWeight="medium">
            CC:
          </Typography>
          <RecipientInput
            recipients={ccRecipients}
            onAdd={onAddCcRecipient}
            onRemove={onRemoveCcRecipient}
            placeholder="Select or type Contacts"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              You can paste multiple emails separated by commas.
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={() => handleAddMe("cc")}
            >
              Add Me
            </Button>
          </Box>

          {bccEnabled && (
            <>
              <Typography variant="body2" fontWeight="medium">
                BCC:
              </Typography>
              <RecipientInput
                recipients={bccRecipients}
                onAdd={onAddBccRecipient}
                onRemove={onRemoveBccRecipient}
                placeholder="Select or type Contacts"
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  You can paste multiple emails separated by commas.
                </Typography>
                <Box>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => handleAddMe("bcc")}
                  >
                    Add Me
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </>
      ),
    },
    {
      label: "SUBJECT",
      content: (
        <>
          <TextField
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            variant="outlined"
            InputProps={{ sx: { backgroundColor: "white" } }}
          />
          {errors.subject && (
            <Typography variant="caption" color="error">
              Subject is required"
            </Typography>
          )}
        </>
      ),
    },
    {
      label: "MESSAGE",
      content: (
        <>
          <QuillEditor
            minHeight={150}
            value={message}
            onChange={(value: any) => setMessage(value)}
            placeholder="Enter your message here"
          />
          {errors.message && (
            <Typography variant="caption" color="error">
              Message is required
            </Typography>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography fontWeight={500}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Box>{step.content}</Box>
              <Stack direction="row" spacing={2} mt={1.5}>
                {index < steps.length - 1 && (
                  <ThemeButton
                    variant="contained"
                    size="md"
                    onClick={() => {
                      setActiveStep(index + 1);
                    }}
                  >
                    Continue
                  </ThemeButton>
                )}
                {index > 0 && (
                  <ThemeButton
                    variant="outlined"
                    size="md"
                    onClick={() => setActiveStep(index - 1)}
                  >
                    Back
                  </ThemeButton>
                )}
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepOne;
