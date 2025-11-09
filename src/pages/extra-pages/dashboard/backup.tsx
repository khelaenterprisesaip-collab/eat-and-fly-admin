import { Avatar, Box, Card, CircularProgress, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import useAuth from "hooks/useAuth";
import { Add, CallCalling, DirectboxNotif } from "iconsax-react";
import ThemeButton from "components/ui/Button";

import {
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardHeader,
  IconButton,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  Refresh,
  ArrowForward,
} from "@mui/icons-material";
import { Package } from "lucide-react";
// import { getAllYard } from "services/yard";
import { useEffect, useState } from "react";
import { GetAllStaff } from "services/staff";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { user } = useAuth();
  const [yardsCount, setYardsCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { label: "DRAFT", value: "12", progress: 12 },
    { label: "OPEN", value: "30", progress: 30 },
    { label: "COMPLETED", value: "40", progress: 40 },
  ];

  const fetchStaff = () => {
    GetAllStaff({ query: { start: 0, limit: 2 } })?.then((res) => {
      setStaffCount(res?.count);
    });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const tasks = [
    {
      title: "Create an order",
      description:
        "Let's create your first order, don't worry we'll walk you through it your task.",
      completed: yardsCount > 0,
      action: "Create order",
      route: "/dispatch",
    },
    {
      title: "Upload a profile picture",
      description: "Update your profile picture.",
      completed: user?.avatar_url ? true : false,
      action: "Upload",
      route: "/profile/detail",
    },
    {
      title: "Invite your team",
      description:
        "There's no \"I\" in team for a reason, but there's one in Invite, let's invite some team members.",
      completed: staffCount > 0,
      action: "Invite member(s)",
      route: "/staff",
    },
    {
      title: "Add customer",
      description:
        "Make sure everything about you looks good, your colleagues will be able to use that information to contact you.",
      completed: false,
      action: "Review",
      route: "/customers",
    },
  ];
  let progress = 0;
  tasks?.map((val) => {
    val?.completed ? (progress += 25) : null;
  });

  return (
    <div>
      <Stack>
        <Stack
          mt={1}
          mb={4}
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.4rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {`Welcome, ${user?.firstName || ""} ${user?.lastName || ""}`}
          </Typography>
        </Stack>
        <Stack direction={"column"} gap={2}></Stack>
        <Stack
          style={{
            padding: "24px",
            paddingTop: "32px",
            backgroundColor: "white",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
          borderRadius={1}
          ml={0.5}
          mb={2}
          mt={3}
        >
          <Grid
            container
            alignItems="center"
            justifyContent={"center"}
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "center", sm: "start" }}
              >
                <Avatar
                  src={user?.avatar_url || ""}
                  variant="square"
                  sx={{
                    width: 50,
                    height: 50,
                    marginRight: "16px",
                    borderRadius: 0.5,
                  }}
                >
                  {user?.firstName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color={"#394663"}>
                    {user?.firstName || ""} {user?.lastName || ""}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={"#394663"}
                    fontWeight="600"
                    mt={0.5}
                  >
                    {user?.organizationName || ""}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ borderLeft: { sm: "1.2px solid #C0D0DD" } }}
              style={{
                // borderLeft: '1.2px solid #C0D0DD',
                marginTop: 18,
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "start" }}
                mb={1}
              >
                <DirectboxNotif size={16} style={{ marginRight: "8px" }} />
                <Typography variant="body2" color="#5F6678" fontWeight="600">
                  {user?.email || ""}
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "start" }}
              >
                <CallCalling size={16} style={{ marginRight: "8px" }} />
                <Typography variant="body2" color="#5F6678" fontWeight="600">
                  {user?.phone?.countryCode} {user?.phone?.number || ""}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Stack bgcolor={"white"} p={2} borderRadius={1} py={2} mb={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Get started with Port Flow
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Let's get these tasks out of the way so you can start tackling
              your day.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {(progress * 4) / 100} of 4 Completed
            </Typography>

            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#334735e6",
                }}
              >
                {`${progress}%`}
              </span>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={45}
                thickness={4}
                sx={{
                  color: "#334735e6",
                  "& .MuiCircularProgress-circle": {
                    stroke: "#334735e6",
                  },
                }}
              />
            </div>
          </Box>
        </Box>

        <List>
          {tasks?.map((task, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "background.paper",
                mb: 1,
                alignItems: "center",
                border: "1px solid #dbe0e5a6",
                borderRadius: 1,
                "&:last-child": { mb: 0 },
                py: 2,
              }}
            >
              <ListItemIcon sx={{ mr: 2 }}>
                {task.completed ? (
                  <CheckCircle sx={{ color: "#334735" }} />
                ) : (
                  <RadioButtonUnchecked sx={{ color: "#334735" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {task.title}
                  </Typography>
                }
                secondary={task.description}
              />
              <ThemeButton
                variant="text"
                endIcon={<ArrowForward />}
                onClick={() => {
                  navigate(task.route);
                }}
              >
                {task.action}
              </ThemeButton>
            </ListItem>
          ))}
        </List>
      </Stack>

      <Card sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}>
        <CardHeader
          avatar={
            <Box sx={{ color: "#F97316" }}>
              <Package size={24} />
            </Box>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Order Stats
            </Typography>
          }
          subheader="Your orders at a glance"
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <ThemeButton variant="contained" size="small" startIcon={<Add />}>
                New Order
              </ThemeButton>
              <ThemeButton variant="outlined" size="small">
                Last six months
              </ThemeButton>
              <IconButton sx={{ color: "#6B7280" }}>
                <Refresh />
              </IconButton>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            {stats?.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 2,
                      color:
                        stat?.label === "OPEN"
                          ? ""
                          : stat?.label === "COMPLETED"
                            ? ""
                            : "",
                    }}
                  >
                    {stat?.label}
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    {stat?.value ? (
                      <Typography variant="h6" sx={{ color: "#111827" }}>
                        {stat?.value}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No records
                      </Typography>
                    )}
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={stat.progress}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: "#E5E7EB",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#2563EB",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {stat.progress}%
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#6B7280", mb: 1 }}>
              TOTAL
            </Typography>
            <Typography variant="h6" sx={{ color: "#111827", mb: 0.5 }}>
              ${(0).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              0 Orders
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
