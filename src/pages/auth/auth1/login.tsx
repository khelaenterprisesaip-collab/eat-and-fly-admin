import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NewLogo from "components/newLogo";
import AuthWrapper2 from "sections/auth/AuthWrapper2";
import AuthLogin from "sections/auth/auth-forms/AuthLogin";

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper2>
      <Grid container spacing={3}>
        <Grid
          item
          ml={14}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ textAlign: "center" }}
        >
          <NewLogo />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin forgot="/auth/forgot-password2" />
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
}
