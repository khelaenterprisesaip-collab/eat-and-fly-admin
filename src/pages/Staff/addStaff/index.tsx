import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainCard from "components/MainCard";
import { Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import CapitalizeInput from "components/ui/CaptializeInput";
import EmailInput from "components/ui/emailInput";
import Dropdown from "components/ui/Dropdown";
import ThemeButton from "components/ui/Button";
import { getSingleFetch, inviteStaff, updateStaff } from "services/staff";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { InfoCircle } from "iconsax-react";
import { airportCities } from "./constant";
import Input from "components/ui/Input";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email address."),

  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
  airport: z
    .string()
    .or(z.number())
    .refine((value) => value !== undefined && value !== 0 && value !== "", {
      message: "Role selection is required.",
    }),
});

const AddStaff: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { staffId } = useParams();
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      airport: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  console.log("staffId", staffId);

  useEffect(() => {
    getSingleFetch({
      pathParams: {
        id: staffId,
      },
    })?.then((res) => {
      reset(res?.data);
    });
  }, [staffId]);

  const onSubmit = (data: any) => {
    setLoading(true);
    if (staffId) {
      updateStaff({
        pathParams: { id: staffId },
        body: { ...data, email: data?.email?.toLowerCase(), role: "staff" },
      })
        ?.then((res) => {
          setLoading(false);
          navigate("/staff");
          openSnackbar({
            open: true,
            message: "Staff Update successfully.",
            variant: "alert",
            alert: {
              color: "success",
            },
          } as SnackbarProps);
        })
        .catch((err) => {
          setLoading(false);
          openSnackbar({
            open: true,
            message: err?.data?.error?.message || "Something went wrong",
            variant: "alert",
            alert: {
              color: "error",
              icon: <InfoCircle />,
            },
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          } as SnackbarProps);
        });
    } else {
      inviteStaff({
        body: { ...data, email: data?.email?.toLowerCase(), role: "staff" },
      })
        ?.then((res) => {
          setLoading(false);
          navigate("/staff");
          openSnackbar({
            open: true,
            message: "Staff add  successfully.",
            variant: "alert",
            alert: {
              color: "success",
            },
          } as SnackbarProps);
        })
        .catch((err) => {
          setLoading(false);
          openSnackbar({
            open: true,
            message: err?.data?.message || "Something went wrong",
            variant: "alert",
            alert: {
              color: "error",
              icon: <InfoCircle />,
            },
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          } as SnackbarProps);
        });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack direction="column" spacing={2}>
          <Typography variant={isMd ? "h3" : "h4"} color="#394663">
            {staffId ? "Update Staff" : "Add Staff"}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <MainCard title="Staff Information">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={"row"} xs={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <CapitalizeInput
                  required
                  wordLimit={15}
                  control={control}
                  label={"First Name"}
                  name={"firstName"}
                  placeholder="Enter first name"
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CapitalizeInput
                  required
                  wordLimit={15}
                  control={control}
                  label={"Last Name"}
                  name={"lastName"}
                  placeholder="Enter last name"
                  error={errors}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <EmailInput
                  required
                  control={control}
                  label={"Email"}
                  name={"email"}
                  disabled={staffId}
                  placeholder="Enter email"
                  error={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Dropdown
                  required
                  control={control}
                  PlaceholderValue="Select airport"
                  label="Airport"
                  name="airport"
                  options={airportCities}
                  error={errors}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  required
                  disabled={staffId}
                  control={control}
                  label={"Password"}
                  name={"password"}
                  placeholder="Enter password"
                  error={errors}
                />
              </Grid>

              <Stack
                direction="row"
                justifyContent="flex-end"
                width="100%"
                mt={3}
                gap={2}
              >
                <ThemeButton
                  size="small"
                  onClick={() => {
                    navigate("/staff");
                  }}
                  variant="outlined"
                >
                  Cancel
                </ThemeButton>
                <ThemeButton
                  size="small"
                  loading={loading}
                  type="submit"
                  variant="contained"
                >
                  {staffId ? "Update Staff" : "Add Staff"}
                </ThemeButton>
              </Stack>
            </Grid>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddStaff;
