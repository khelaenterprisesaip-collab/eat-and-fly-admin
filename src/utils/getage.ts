import dayjs from "dayjs";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function getAge(birthdate: any) {
  const age = dayjs().diff(dayjs(birthdate), "year");
  return age;
}
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
