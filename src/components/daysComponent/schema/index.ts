import dayjs from "dayjs";
import { z } from "zod";

export const dayScheduleSchema = z
  .object({
    isOpen: z.boolean().default(false),
    openTime: z.string().nullable().default(null),
    closeTime: z.string().nullable().default(null),
  })
  .superRefine((data, ctx) => {
    if (data.isOpen) return;

    const { openTime, closeTime } = data;

    const openEmpty = !openTime || openTime.trim() === "";
    const closeEmpty = !closeTime || closeTime.trim() === "";

    if (openEmpty) {
      // ctx.addIssue({
      //   path: ["openTime"],
      //   message: "Please enter opening time",
      //   code: z.ZodIssueCode.custom,
      // });
    }

    if (closeEmpty) {
      // ctx.addIssue({
      //   path: ["closeTime"],
      //   message: "Please enter closing time",
      //   code: z.ZodIssueCode.custom,
      // });
    }

    // If either is empty, skip comparison
    if (openEmpty || closeEmpty) return;

    const open = new Date(`1970-01-01T${openTime}`);
    const close = new Date(`1970-01-01T${closeTime}`);

    // if (open >= close) {
    //   ctx.addIssue({
    //     path: ["closeTime"],
    //     message: "Opening time must be earlier than closing time",
    //     code: z.ZodIssueCode.custom,
    //   });
    // }
  });

export const businessHours = z.object({
  monday: dayScheduleSchema,
  tuesday: dayScheduleSchema,
  wednesday: dayScheduleSchema,
  thursday: dayScheduleSchema,
  friday: dayScheduleSchema,
  saturday: dayScheduleSchema,
  sunday: dayScheduleSchema,
});

export const defaultBusinessHours = {
  monday: { isOpen: false, openTime: null, closeTime: null },
  tuesday: { isOpen: false, openTime: null, closeTime: null },
  wednesday: { isOpen: false, openTime: null, closeTime: null },
  thursday: { isOpen: false, openTime: null, closeTime: null },
  friday: { isOpen: false, openTime: null, closeTime: null },
  saturday: { isOpen: false, openTime: null, closeTime: null },
  sunday: { isOpen: false, openTime: null, closeTime: null },
};

export const NullBusinessHoursArray = [
  { day: "monday", isOpen: false, openTime: null, closeTime: null },
  { day: "tuesday", isOpen: false, openTime: null, closeTime: null },
  { day: "wednesday", isOpen: false, openTime: null, closeTime: null },
  { day: "thursday", isOpen: false, openTime: null, closeTime: null },
  { day: "friday", isOpen: false, openTime: null, closeTime: null },
  { day: "saturday", isOpen: false, openTime: null, closeTime: null },
  { day: "sunday", isOpen: false, openTime: null, closeTime: null },
];

const timeStringToUnix = (timeStr: string | null): number | null => {
  if (!timeStr) return null;
  const today = dayjs();
  const [hour, minute] = timeStr.split(":").map(Number);
  const dateWithTime = today.hour(hour).minute(minute).second(0).millisecond(0);

  return dateWithTime.unix();
};

const unixToTimeString = (unix: number | null): string | null => {
  if (!unix) return null;
  return dayjs.unix(unix).format("HH:mm");
};

export const convertObjectToArray = (businessHoursObj: any) => {
  return Object.entries(businessHoursObj)?.map(([day, value]: any) => ({
    day,
    isOpen: value.isOpen,
    openTime: timeStringToUnix(value.openTime),
    closeTime: timeStringToUnix(value.closeTime),
  }));
};

export const convertArrayToObject = (businessHoursArray: any) => {
  const result: any = {};
  businessHoursArray?.forEach(({ day, isOpen, openTime, closeTime }: any) => {
    result[day] = {
      isOpen,
      openTime: unixToTimeString(openTime) || "",
      closeTime: unixToTimeString(closeTime) || "",
    };
  });
  return result;
};

export const daysOfWeek: any[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const formatDayName = (day: string): string => {
  return day.charAt(0)?.toUpperCase() + day?.slice(1);
};
