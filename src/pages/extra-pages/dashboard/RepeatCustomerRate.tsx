import { useState, MouseEvent } from "react";

// material-ui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import RepeatCustomerChart from "./RepeatCustomerChart";

// ==============================|| CHART - REPEAT CUSTOMER RATE ||============================== //

const RepeatCustomerRate = ({ studentStats }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard
      style={{
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Stack>
          <Typography variant="h5" color={"#535E6F"}>
            Performance
          </Typography>
          <Typography variant="caption" color={"#7A839D"}>
            Number of order over time
          </Typography>
        </Stack>
      </Stack>

      <RepeatCustomerChart studentStats={studentStats} />
    </MainCard>
  );
};
export default RepeatCustomerRate;
