import React, { useState, KeyboardEvent } from "react";
import { Box, TextField, Chip, Avatar } from "@mui/material";
import { UserCircle2, X } from "lucide-react";

const RecipientInput: React.FC<any> = ({
  recipients,
  onAdd,
  onRemove,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddRecipient = (value: string) => {
    const emails = value
      .split(/[,;]/)
      .map((e) => e.trim())
      .filter((e) => e);

    emails.forEach((email) => {
      if (
        validateEmail(email) &&
        !recipients.some((r: any) => r?.email === email)
      ) {
        onAdd({ email });
      }
    });

    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e?.key === ",") && inputValue) {
      e.preventDefault();
      handleAddRecipient(inputValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        p: 1,
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#fff",
      }}
    >
      {recipients.map((recipient: any) => (
        <Chip
          key={recipient.email}
          label={recipient.email}
          onDelete={() => onRemove(recipient.email)}
          deleteIcon={<X size={16} />}
          avatar={
            <Avatar sx={{ bgcolor: "#e5e7eb" }}>
              <UserCircle2 size={20} color="#6b7280" />
            </Avatar>
          }
          sx={{
            mr: 1,
            mb: 1,
            backgroundColor: "#f3f4f6",
            color: "#1f2937",
            "& .MuiChip-deleteIcon": {
              color: "#6b7280",
              "&:hover": {
                color: "#ef4444",
              },
            },
          }}
        />
      ))}

      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue) {
            handleAddRecipient(inputValue);
          }
        }}
        placeholder={recipients.length === 0 ? placeholder : ""}
        variant="standard"
        sx={{ width: "100%", flex: 1, height: 29 }}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Box>
  );
};

export default RecipientInput;
