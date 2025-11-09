// import { useState } from 'react';
// import { TextField, Autocomplete, InputAdornment, Popover } from '@mui/material';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Stack } from '@mui/system';
// import { Controller } from 'react-hook-form';
// import { FormControl } from '@mui/material';
// import { FormLabel } from '@mui/material';
// import { Calendar as CalendarIcon } from 'iconsax-react';

// dayjs.extend(customParseFormat);

// // Define accepted date formats
// const dateFormats = ['DDMMYYYY', 'DD-MM-YYYY', 'DD/MM/YYYY', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY', 'YYYYMMDD', 'DD-MM-YYYY'];

// const formatInputDate = (input: any) => {
//   const validDates = dateFormats
//     .map((format) => {
//       const date = dayjs(input, format, true);
//       return date.isValid() ? date.format('DD-MM-YYYY') : null;
//     })
//     .filter((date) => date !== null);
//   return validDates.length > 0 ? [validDates[validDates.length - 1]] : [];
// };

// const CustomDatePicker = ({ control, name, required, setError, clearErrors, before, after, ...props }: any) => {
//   const [inputValue, setInputValue] = useState('');
//   const [options, setOptions] = useState<any>([]);
//   const [anchorEl, setAnchorEl] = useState<any>(null);
//   const [selectedDate, setSelectedDate] = useState<any>(null);
//   const [openDropdown, setOpenDropdown] = useState(false); // Control dropdown manually

//   const handleInputChange = (event: any, newInputValue: any) => {
//     setInputValue(newInputValue);
//     const formattedDates = formatInputDate(newInputValue);
//     setOptions(formattedDates);

//     if (formattedDates.length > 0) {
//       const selectedDate = dayjs(formattedDates[0], 'DD-MM-YYYY', true);

//       if (before && selectedDate.isAfter(dayjs())) {
//         setError(name, { type: 'manual', message: 'Future dates are not allowed' });
//       } else if (after && selectedDate.isBefore(dayjs())) {
//         setError(name, { type: 'manual', message: 'Past dates are not allowed' });
//       } else {
//         clearErrors(name);
//         setSelectedDate(selectedDate);
//       }
//     }
//     setOpenDropdown(true); // Open dropdown after formatting
//   };

//   const handleDateSelect = (event: any, newValue: any) => {
//     if (newValue) {
//       if (before && dayjs(newValue).isAfter(dayjs())) {
//         setError(name, { type: 'manual', message: 'Future dates are not allowed' });
//       } else if (after && dayjs(newValue).isBefore(dayjs())) {
//         setError(name, { type: 'manual', message: 'Past dates are not allowed' });
//       } else {
//         setInputValue(newValue);
//         setSelectedDate(dayjs(newValue));
//         setOptions([]);
//       }
//     }
//     setOpenDropdown(false); // Close dropdown after selection
//   };

//   const handleCalendarIconClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseCalendar = () => {
//     setAnchorEl(null);
//   };

//   const handleDateChange = (date: any) => {
//     const formattedDate = dayjs(date).format('DD-MM-YYYY');

//     if (before && dayjs(date).isAfter(dayjs())) {
//       setError(name, { type: 'manual', message: 'Future dates are not allowed' });
//     } else if (after && dayjs(date).isBefore(dayjs())) {
//       setError(name, { type: 'manual', message: 'Past dates are not allowed' });
//     } else {
//       clearErrors(name);
//       setInputValue(formattedDate);
//       setSelectedDate(dayjs(date));
//       setOptions([]);
//       handleCloseCalendar();
//     }
//   };

//   const isValidDate = (dateString: string) => {
//     return dateFormats?.some((format) => dayjs(dateString, format, true).isValid());
//   };

//   return (
//     <FormControl fullWidth error={!!props.errors?.[name]}>
//       <FormLabel
//         required={required}
//         sx={{
//           '& .MuiFormLabel-asterisk ': { color: 'red' },
//           mb: 0.5,
//           color: '#5A667B',
//           ...props.labelStyle,
//           fontWeight: props.fontWeight || 600
//         }}
//       >
//         {props?.label}
//       </FormLabel>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <div>
//             <Autocomplete
//               freeSolo
//               sx={{
//                 '& .MuiOutlinedInput-root': { height: 38 }
//               }}
//               value={inputValue}
//               options={options}
//               inputValue={inputValue?.length ? inputValue : field.value}
//               onInputChange={handleInputChange}
//               onChange={(event, newValue) => {
//                 field.onChange(newValue);
//                 handleDateSelect(event, newValue);
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   onBlur={() => {
//                     if (inputValue && !isValidDate(inputValue)) {
//                       setError(name, { type: 'manual', message: 'Please Provide valid date ' });
//                       return;
//                     } else {
//                       clearErrors(name);
//                     }
//                   }}
//                   placeholder="DD/MM/YYYY"
//                   variant="outlined"
//                   error={!!props.errors?.[name]}
//                   helperText={props.errors?.[name]?.message}
//                   InputProps={{
//                     ...params.InputProps,
//                     endAdornment: (
//                       <InputAdornment position="start">
//                         <Stack onClick={handleCalendarIconClick} sx={{ cursor: 'pointer' }}>
//                           <CalendarIcon size="22" color="#939AAD" />
//                         </Stack>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               )}
//               open={openDropdown && inputValue !== '' && options.length > 0} // Control dropdown with state
//               disableClearable
//             />

//             {/* Custom Calendar Popover */}
//             <Popover
//               open={Boolean(anchorEl)}
//               anchorEl={anchorEl}
//               onClose={handleCloseCalendar}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right'
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'center'
//               }}
//             >
//               <Calendar
//                 showNavigation
//                 onChange={(date: any) => {
//                   handleDateChange(date);
//                   field.onChange(dayjs(date).format('DD-MM-YYYY'));
//                 }}
//                 value={selectedDate ? selectedDate.toDate() : new Date()}
//                 maxDate={before ? new Date() : undefined}
//                 minDate={after ? new Date() : undefined}
//               />
//             </Popover>
//           </div>
//         )}
//       />
//     </FormControl>
//   );
// };

// export default CustomDatePicker;
// //
// import { useState, useMemo } from 'react';
// import { TextField, Autocomplete, InputAdornment, Popover } from '@mui/material';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Stack } from '@mui/system';
// import { Controller } from 'react-hook-form';
// import { FormControl, FormLabel } from '@mui/material';
// import { Calendar as CalendarIcon } from 'iconsax-react';

// dayjs.extend(customParseFormat);

// const CustomDatePicker = ({ control, name, required, setError, clearErrors, before, after, ...props }: any) => {
//   const [inputValue, setInputValue] = useState('');
//   const [formattedInput, setFormattedInput] = useState(''); // Keep the formatted version of input
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
//   const [selectedDate, setSelectedDate] = useState<any>(null);
//   const [open, setOpen] = useState(false);
//   const [isValidDate, setIsValidDate] = useState(true); // Keep track of date validity

//   const dateFormats = useMemo(
//     () => ['DDMMYYYY', 'DD-MM-YYYY', 'DD/MM/YYYY', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY', 'YYYYMMDD', 'DD-MM-YYYY'],
//     []
//   );

//   const formatInputDateProgressively = (input: string) => {
//     for (const format of dateFormats) {
//       const date = dayjs(input, format, true);
//       if (date.isValid()) {
//         return date.format('DD-MM-YYYY');
//       }
//     }
//     return input;
//   };

//   const handleInputChange = (event: any, newInputValue: string, field) => {
//     if (event?.target?.value) {
//       setOpen(true); // Open dropdown if there is input
//     }

//     setInputValue(newInputValue);
//     const formattedDate = formatInputDateProgressively(newInputValue);
//     setFormattedInput(newInputValue);
//     field.onChange(newInputValue);

//     const selected = dayjs(formattedDate, 'DD-MM-YYYY', true);
//     const isValid = validateDate(selected);
//     setIsValidDate(isValid); // Update the validity state
//   };

//   const validateDate = (date: any) => {
//     if (before && date.isAfter(dayjs())) {
//       setError(name, { type: 'manual', message: 'Future dates are not allowed' });
//       return false;
//     } else if (after && date.isBefore(dayjs())) {
//       setError(name, { type: 'manual', message: 'Past dates are not allowed' });
//       return false;
//     } else {
//       clearErrors(name);
//       setSelectedDate(date);
//       return true;
//     }
//   };

//   const handleDateSelect = (event: any, newValue: string | null, field: any) => {
//     if (newValue) {
//       setOpen(false);
//       const selected = dayjs(newValue, 'DD-MM-YYYY', true);
//       const isValid = validateDate(selected);

//       if (isValid) {
//         setInputValue(newValue);
//         setSelectedDate(selected);
//         setFormattedInput(newValue);
//         field.onChange(newValue);
//       } else {
//         // Show today's date in case of invalid selection
//         setInputValue(dayjs().format('DD-MM-YYYY'));
//         setFormattedInput(dayjs().format('DD-MM-YYYY'));
//         setSelectedDate(dayjs());
//       }
//     }
//   };

//   const handleCalendarIconClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseCalendar = () => {
//     setAnchorEl(null);
//   };

//   const handleDateChange = (date: Date, field: any) => {
//     const formattedDate = dayjs(date).format('DD-MM-YYYY');

//     const isValid = validateDate(date);

//     if (isValid) {
//       validateDate(dayjs(date));
//       setInputValue(formattedDate);
//       setFormattedInput(formattedDate);
//       setSelectedDate(dayjs(date));
//       field.onChange(formattedDate);
//       handleCloseCalendar();
//     } else {
//       setSelectedDate(dayjs());
//     }
//   };

//   return (
//     <FormControl fullWidth error={!!props.errors?.[name]}>
//       <FormLabel
//         required={required}
//         sx={{
//           '& .MuiFormLabel-asterisk ': { color: 'red' },
//           mb: 0.5,
//           color: '#5A667B',
//           fontWeight: props.fontWeight || 600,
//           ...props.labelStyle
//         }}
//       >
//         {props.label}
//       </FormLabel>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <>
//             <Autocomplete
//               freeSolo
//               value={dayjs(field.value)?.format('DD-MM-YYYY')}
//               inputValue={field?.value}
//               onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue, field)}
//               onChange={(event, newValue) => {
//                 handleDateSelect(event, newValue, field);
//               }}
//               open={open}
//               onClose={() => setOpen(false)}
//               sx={{ '& .MuiOutlinedInput-root': { height: 38 } }}
//               options={formattedInput ? [formattedInput] : []}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   placeholder="DD/MM/YYYY"
//                   variant="outlined"
//                   error={!!props.errors?.[name]}
//                   helperText={props.errors?.[name]?.message}
//                   onBlur={() => {
//                     if (inputValue && !dayjs(inputValue, 'DD-MM-YYYY', true).isValid()) {
//                       setError(name, { type: 'manual', message: 'Please provide a valid date' });
//                     } else {
//                       clearErrors(name);
//                     }
//                   }}
//                   InputProps={{
//                     ...params.InputProps,
//                     endAdornment: (
//                       <InputAdornment position="start">
//                         <Stack onClick={handleCalendarIconClick} sx={{ cursor: 'pointer' }}>
//                           <CalendarIcon size="22" color="#939AAD" />
//                         </Stack>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               )}
//               disableClearable
//             />

//             {/* Calendar Popover */}
//             <Popover
//               open={Boolean(anchorEl)}
//               anchorEl={anchorEl}
//               onClose={handleCloseCalendar}
//               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//               transformOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//               <Calendar
//                 showNavigation
//                 onChange={(date) => handleDateChange(date as Date, field)}
//                 value={selectedDate?.toDate() || new Date()}
//                 maxDate={before ? new Date() : undefined}
//                 minDate={after ? new Date() : undefined}
//               />
//             </Popover>
//           </>
//         )}
//       />
//     </FormControl>
//   );
// };

// export default CustomDatePicker;

import { useState, useMemo } from 'react';
import { TextField, Autocomplete, InputAdornment, Popover, FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Stack } from '@mui/system';
import { Controller } from 'react-hook-form';
import { FormControl, FormLabel } from '@mui/material';
import { Calendar as CalendarIcon } from 'iconsax-react';

dayjs.extend(customParseFormat);

const CustomDatePicker = ({ control, name, required, setError, clearErrors, before, after, ...props }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [formattedInput, setFormattedInput] = useState<any>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [isValidDate, setIsValidDate] = useState(true);

  const dateFormats = useMemo(
    () => ['DDMMYYYY', 'DD-MM-YYYY', 'DD/MM/YYYY', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY', 'YYYYMMDD', 'DD-MM-YYYY'],
    []
  );

  const formatInputDateProgressively = (input: string) => {
    for (const format of dateFormats) {
      const date = dayjs(input, format, true);
      if (date.isValid()) {
        return date.format('DD-MM-YYYY');
      }
    }
    return input;
  };

  const handleInputChange = (event: any, newInputValue: string, field: any) => {
    if (event?.target?.value) {
      setOpen(true);
    }

    setInputValue(newInputValue);
    // field.onChange(newInputValue);
    const formattedDate = formatInputDateProgressively(newInputValue);

    if (formattedDate) {
      setFormattedInput(formattedDate);
    } else {
      setFormattedInput(newInputValue);
    }

    // const selected = dayjs(formattedDate, 'DD-MM-YYYY', true);
    // const isValid = validateDate(selected);
    // setIsValidDate(isValid);
    // if (selected.isValid()) {
    //   field.onChange(formattedDate);
    // } else {
    //   field.onChange('');
    // }
  };

  const validateDate = (date: any) => {
    if (before && date.isAfter(dayjs())) {
      setError(name, { type: 'manual', message: 'Future dates are not allowed' });
      return false;
    } else if (after && date.isBefore(dayjs())) {
      setError(name, { type: 'manual', message: 'Past dates are not allowed' });
      return false;
    } else {
      clearErrors(name);
      setSelectedDate(date);
      return true;
    }
  };

  const handleDateSelect = (event: any, newValue: string | null, field: any) => {
    if (newValue) {
      setOpen(false);
      const selected = dayjs(newValue, 'DD-MM-YYYY', true);
      const isValid = validateDate(selected);

      if (isValid) {
        setInputValue(newValue);
        setSelectedDate(selected);
        setFormattedInput(newValue);
        field.onChange(newValue);
      }
    }
  };

  const handleCalendarIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date: Date, field: any) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');

    const isValid = validateDate(dayjs(date));

    if (isValid) {
      setInputValue(formattedDate);
      setFormattedInput(formattedDate);
      setSelectedDate(dayjs(date));
      field.onChange(formattedDate);
      handleCloseCalendar();
    }
  };

  return (
    <FormControl fullWidth error={!!props.errors?.[name]}>
      <FormLabel
        required={required}
        sx={{
          '& .MuiFormLabel-asterisk ': { color: 'red' },
          mb: 0.5,
          color: '#5A667B',
          fontWeight: props.fontWeight || 600,
          ...props.labelStyle
        }}
      >
        {props.label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Autocomplete
              freeSolo
              {...field}
              value={formattedInput}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue, field)}
              onChange={(event, newValue) => {
                handleDateSelect(event, newValue, field);
              }}
              open={open}
              onClose={() => setOpen(false)}
              sx={{ '& .MuiOutlinedInput-root': { height: 38 } }}
              options={formattedInput ? [formattedInput] : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="DD/MM/YYYY"
                  variant="outlined"
                  error={!!props.errors?.[name]}
                  helperText={props.errors?.[name]?.message}
                  onBlur={() => {
                    if (formattedInput && !dayjs(formattedInput, 'DD-MM-YYYY', true).isValid()) {
                      setError(name, { type: 'manual', message: 'Please provide a valid date' });
                    } else if (before && formattedInput.isAfter(dayjs())) {
                      setError(name, { type: 'manual', message: 'Future dates are not allowed' });
                      return false;
                    } else if (after && formattedInput.isBefore(dayjs())) {
                      setError(name, { type: 'manual', message: 'Past dates are not allowed' });
                      return false;
                    } else {
                      clearErrors(name);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="start">
                        <Stack onClick={handleCalendarIconClick} sx={{ cursor: 'pointer' }}>
                          <CalendarIcon size="22" color="#939AAD" />
                        </Stack>
                      </InputAdornment>
                    )
                  }}
                />
              )}
              disableClearable
            />

            {/* Calendar Popover */}
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseCalendar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Calendar
                showNavigation
                onChange={(date) => handleDateChange(date as Date, field)}
                value={selectedDate && dayjs(selectedDate).isValid() ? selectedDate.toDate() : new Date()}
                maxDate={before ? new Date() : undefined}
                minDate={after ? new Date() : undefined}
              />
            </Popover>
          </>
        )}
      />
    </FormControl>
  );
};

export default CustomDatePicker;
