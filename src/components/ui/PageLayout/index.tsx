import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface PageProps {
  title: string;
  subtitle?: string;
  primaryAction?: React.ReactNode;
  children: React.ReactNode;
  sx?: any;
}

const Page = ({
  title,
  subtitle,
  primaryAction,
  children,
  sx = {},
}: PageProps) => {
  return (
    <Box component="body" sx={sx} style={{ backgroundColor: "#EFF0F6" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        {/* TITLE */}
        <Grid item>
          <Typography variant="h5" color={"#394663"}>
            {title}
          </Typography>
        </Grid>
        {/* PRIMARY ACTION */}
        <Grid sx={{ display: "flex", gap: 1 }}>{primaryAction}</Grid>
      </Grid>
      {/* SUBTITLE */}
      <Grid marginBottom={2}>
        <Typography variant="subtitle2" color={"GrayText"}>
          {subtitle}
        </Typography>
      </Grid>

      <Grid>{children}</Grid>
    </Box>
  );
};

export default Page;
