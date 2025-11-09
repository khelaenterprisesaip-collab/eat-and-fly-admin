import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { FormProvider, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { daysOfWeek } from "./schema";
import MainCard from "components/MainCard";
import { Stack } from "@mui/system";

const TimeField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5),
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: "0.7rem",
  },
}));

export interface DaySchedule {
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
}

export interface BusinessHoursFormData {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export type DayOfWeek = keyof BusinessHoursFormData;

const DayScheduleRow: React.FC<any> = ({ day, methods, watch, setValue }) => {
  const isOpen = !watch(`businessHours.${day}.isOpen`);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ borderRadius: 1, px: 0, mb: 2, transition: "all 0.3s ease" }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={2}>
          <Controller
            name={`businessHours.${day}.isOpen`}
            control={methods}
            render={({ field }) => (
              <Stack direction="column" alignItems="flex-start">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: isOpen ? 600 : 400,
                    color: isOpen ? "primary.main" : "text.primary",
                    transition: "all 0.2s ease",
                  }}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      sx={{ transform: "scale(0.8)" }}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        if (e?.target?.checked) {
                          setValue(`businessHours.${day}.openTime`, "");
                          setValue(`businessHours.${day}.closeTime`, "");
                        }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" color="text.secondary">
                      Closed
                    </Typography>
                  }
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </Stack>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={3.5}>
          {isOpen && (
            <Box sx={{ mb: isMobile ? 2 : 0 }} mt={1} mb={1}>
              <Controller
                name={`businessHours.${day}.openTime`}
                control={methods}
                render={({ field, fieldState }) => (
                  <TimeField
                    {...field}
                    type="time"
                    label="Opens at"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                  />
                )}
              />
            </Box>
          )}
        </Grid>

        {isOpen && (
          <Grid item xs={12} sm={3.5} mt={1}>
            <Controller
              name={`businessHours.${day}.closeTime`}
              control={methods}
              render={({ field, fieldState }) => (
                <TimeField
                  {...field}
                  type="time"
                  variant="outlined"
                  label="Closes at"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  error={!!fieldState.error}
                  helperText={fieldState?.error?.message || ""}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const BusinessHours: React.FC<any> = ({ methods, watch, setValue }: any) => {
  const businessHours = watch("businessHours");

  // Find a day with valid time set (and isOpen = false → open day)
  const referenceEntry = Object.entries(businessHours || {}).find(
    ([, data]: [string, any]) =>
      data?.isOpen === false && data?.openTime && data?.closeTime
  );

  const handleApplyToAll = () => {
    if (!referenceEntry) return;
    const [refDay, refData]: any = referenceEntry;

    daysOfWeek.forEach((day: string) => {
      if (day !== refDay) {
        setValue(`businessHours.${day}.isOpen`, false);
        setValue(`businessHours.${day}.openTime`, refData.openTime);
        setValue(`businessHours.${day}.closeTime`, refData.closeTime);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <MainCard
        title="Business Hours"
        secondary={
          referenceEntry && (
            <Button variant="outlined" size="small" onClick={handleApplyToAll}>
              Apply hours to all days
            </Button>
          )
        }
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Stack sx={{ mb: 3 }}>
            {daysOfWeek?.map((day: any) => (
              <DayScheduleRow
                key={day}
                day={day}
                methods={methods}
                watch={watch}
                setValue={setValue}
              />
            ))}
          </Stack>
        </Box>
      </MainCard>
    </FormProvider>
  );
};

export default BusinessHours;
