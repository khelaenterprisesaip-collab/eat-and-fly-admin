"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import Popover from "@mui/material/Popover";

import { Calendar } from "./calender";

import { Button } from "@mui/material";
import { cn } from "utils/getage";

interface DateRangePickerProps {
  className?: string;
  date?: DateRange;
  onDateChange?: (date: DateRange | undefined) => void;
  placeholder?: string;
  clearState?: any;
}

export function DateRangePicker({
  className,
  date,
  clearState,
  onDateChange,
  placeholder = "Pick a date range",
}: DateRangePickerProps) {
  // committedDate is the value shown on the input ("applied" value)
  const [committedDate, setCommittedDate] = React.useState<
    DateRange | undefined
  >(date);

  // tempDate is the interactive, in-popover selection
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // keep committedDate in sync with external prop changes
  React.useEffect(() => {
    setCommittedDate(date);
    setTempDate(date);
  }, [date]);

  const handleTempChange = (newDate: DateRange | undefined) => {
    // user is interacting with the calendar inside the popover
    setTempDate(newDate);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    // initialize temp with the currently committed value when opening
    setTempDate(committedDate);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // when closing via backdrop or escape, revert temp to committed
    setTempDate(committedDate);
  };

  const handleApply = () => {
    setCommittedDate(tempDate);
    onDateChange?.(tempDate);
    setAnchorEl(null);
  };

  const handleCancel = () => {
    // discard changes and close
    setTempDate(committedDate);
    setAnchorEl(null);
  };

  const handleClear = () => {
    setTempDate(undefined);
    clearState([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? "mui-popover-date-range" : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <div
        id="date"
        className={cn(
          " flex border border-[#D1D1D1] w-[381px] rounded-[2px] justify-start text-left font-normal p-[9px] h-[42px] px-4 cursor-pointer",
          !committedDate && "text-muted-foreground"
        )}
        onClick={handleClick}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <CalendarIcon className="mr-3 h-5 w-5 flex-shrink-0" />

        <div className="text-[13.67px] leading-[24px]">
          {committedDate?.from ? (
            committedDate.to ? (
              <>
                {format(committedDate.from, "dd MMM yyyy")} —{" "}
                {format(committedDate.to, "dd MMM yyyy")}
              </>
            ) : (
              format(committedDate.from, "dd MMM yyyy")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="p-4">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={handleTempChange}
            numberOfMonths={2}
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-sm px-3 py-1 rounded border"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm px-3 py-1 rounded border"
              >
                Cancel
              </button>

              <Button
                variant="contained"
                onClick={handleApply}
                className="text-sm px-3 py-1 rounded "
                // disable apply when nothing selected and it's unchanged
                disabled={
                  // treat equality simply: both undefined or same from/to timestamps
                  (tempDate === undefined && committedDate === undefined) ||
                  (tempDate &&
                    committedDate &&
                    tempDate.from?.getTime() ===
                      committedDate.from?.getTime() &&
                    ((tempDate.to === undefined &&
                      committedDate.to === undefined) ||
                      (tempDate.to &&
                        committedDate.to &&
                        tempDate.to.getTime() === committedDate.to.getTime())))
                }
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
