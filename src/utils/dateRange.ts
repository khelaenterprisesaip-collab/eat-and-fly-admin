import dayjs from "dayjs";

const hasValue = (value: unknown) => value !== undefined && value !== null && value !== "";

const normalizeToBoundary = (value: any, boundary: "start" | "end") => {
  const date = dayjs(value);

  if (!date.isValid()) {
    return value;
  }

  return boundary === "start"
    ? date.startOf("day").valueOf()
    : date.endOf("day").valueOf();
};

export const normalizeDateRangeQuery = <T extends Record<string, any>>(query: T = {} as T): T => {
  const normalizedQuery: Record<string, any> = { ...query };

  if (hasValue(query.startDate)) {
    normalizedQuery.startDate = normalizeToBoundary(query.startDate, "start");
  }

  if (hasValue(query.endDate)) {
    normalizedQuery.endDate = normalizeToBoundary(query.endDate, "end");
  }

  return normalizedQuery as T;
};
