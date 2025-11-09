import { useEffect, useState, ChangeEvent } from "react";

// material-ui
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

// assets
import { SearchNormal } from "iconsax-react";
import { Search } from "lucide-react";

// types
interface Props extends OutlinedInputProps {
  value: string | number;
  onFilterChange: (value: string | number) => void;
  debounce?: number;
  filterType: "number" | "text" | "character_alpha";
}

// ==============================|| FILTER - INPUT ||============================== //

export default function DebouncedInput({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  filterType,
  size,
  startAdornment = <SearchNormal />,
  ...props
}: Props) {
  const [value, setValue] = useState<number | string>(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Filter logic based on filterType
    if (filterType === "number") {
      if (!/^\d*$/.test(inputValue)) return; // Allow only numbers (0-9)
    } else if (filterType === "text") {
      if (!/^[a-zA-Z ]*$/.test(inputValue)) return;
    } else if (filterType === "character_alpha") {
      if (
        !/^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/.test(inputValue)
      )
        return;
    }

    setValue(inputValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={{
        width: "100%", // Auto ki jagah full width karein
        height: 40, // 40px fix karein
      }}
      // startAdornment={<Search style={{ fontSize: 24 }} />} // Icon ka size fix karein
      {...(size && { size })}
    />
  );
}
