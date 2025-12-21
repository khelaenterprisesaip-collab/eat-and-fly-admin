// ==============================|| CUSTOM FUNCTION - STRING TRIM ||============================== //

function ltrim(str: any) {
  if (!str) return str;
  return str.replace(/^\s+/g, "");
}

function rtrim(str: any) {
  if (!str) return str;
  return str.replace(/\s+$/g, " ");
}

export default function trimFc(formik: any) {
  return (e: any) => {
    const ff = ltrim(rtrim(e.target.value));
    formik.setFieldValue(e.target.name, ff);
  };
}

export function formatDollar(amount: any) {
  if (amount == null || isNaN(amount)) {
    return "$0.00"; // Default value for invalid input
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatINR(amount: any) {
  if (amount == null || isNaN(amount)) {
    return "₹0.00"; // Default value for invalid input
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const removeCommas = (value: string | null | undefined): string => {
  if (value == null) return ""; // Return an empty string if the value is null or undefined
  return value.replace(/,/g, ""); // Remove all commas from the string
};

export const UserRole = {
  staff: "staff",
  admin: "admin",
};
