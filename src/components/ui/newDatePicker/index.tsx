import React, { useEffect, useState } from "react";
import { TextField, Popover, InputAdornment, Stack } from "@mui/material";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "iconsax-react";
import "react-calendar/dist/Calendar.css";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface CustomDatePickerProps {
  inputValue: string;
  setValue: (value: string) => void;
  onBlur: () => void;
  maxDate?: any;
  minDate?: any;
  before?: any;
  after?: any;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  inputValue,
  setValue,
  onBlur,
  maxDate,
  minDate,
  before,
  after,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const validateAndFormatDate = (value: string): string | null => {
    const dateParts = value.split("-");
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts.map((part) => parseInt(part, 10));
      if (
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 1000 &&
        year <= 9999
      ) {
        return `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`;
      }
    }
    return null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9-]/g, "");
    setValue(rawValue);
  };

  const handleBlur = () => {
    const formattedDate = validateAndFormatDate(inputValue);
    if (formattedDate) {
      setValue(formattedDate);
    }
    onBlur();
  };

  const handleCalendarIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date: Date) => {
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    setValue(formattedDate);
    setSelectedDate(date);
    handleCloseCalendar();
  };

  const parsedMinDate = minDate
    ? dayjs(minDate, "DD-MM-YYYY").toDate()
    : undefined;
  const parsedMaxDate = maxDate
    ? dayjs(maxDate, "DD-MM-YYYY").toDate()
    : undefined;

  useEffect(() => {
    if (inputValue) {
      const date = dayjs(inputValue, "DD-MM-YYYY").toDate();
      setSelectedDate(dayjs(date).isValid() ? date : null);
    }
  }, [inputValue]);

  return (
    <Stack>
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="DD-MM-YYYY"
        variant="outlined"
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack
                onClick={handleCalendarIconClick}
                sx={{ cursor: "pointer" }}
              >
                <CalendarIcon size="22" color="#939AAD" />
              </Stack>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": { height: "40px", width: "100%" },
        }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseCalendar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Calendar
          onChange={(date) => handleDateChange(date as Date)}
          value={selectedDate || new Date()}
          maxDate={before ? parsedMaxDate || new Date() : undefined}
          minDate={after ? parsedMinDate || new Date() : undefined}
        />
      </Popover>
    </Stack>
  );
};

export default CustomDatePicker;
