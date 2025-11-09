// material-ui
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project-imports
import MainCard from "components/MainCard";
import { GenericCardProps } from "types/root";

// ==============================|| STATISTICS - REPORT CARD ||============================== //

export default function ReportCard({
  primary,
  secondary,
  iconPrimary,
  color,
}: any) {
  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center">
        <Avatar
          style={{
            backgroundColor: "#EBF2FF",
            marginRight: 16,
            color: "#334735",
          }}
          sx={{ borderRadius: 2 }}
          variant="square"
        >
          {iconPrimary}
        </Avatar>

        <Grid item>
          <Stack spacing={0.25}>
            <Typography variant="h3">{primary}</Typography>
            <Typography variant="body1" color="text.secondary">
              {secondary}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
