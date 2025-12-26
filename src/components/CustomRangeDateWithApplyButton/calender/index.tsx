"use client";

import type * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      mode="range"
      showOutsideDays={showOutsideDays}
      className="p-2"
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
