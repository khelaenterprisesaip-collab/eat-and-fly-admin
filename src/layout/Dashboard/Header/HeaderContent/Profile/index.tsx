import { useRef, useState, ReactNode, SyntheticEvent } from "react";
import { useNavigate } from "react-router";

// material-ui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import CardContent from "@mui/material/CardContent";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// project-imports
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";
import Avatar from "components/@extended/Avatar";
import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";
import IconButton from "components/@extended/IconButton";

import { ThemeMode } from "config";
import useAuth from "hooks/useAuth";

// assets
// import avatar1 from "assets/images/users/avatar-6.png";
import { Setting2, Profile, Logout } from "iconsax-react";
import ArrowDown from "assets/svg/ArrowDown";
import useNetworkStatus from "hooks/useNetwork";

// types
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// tab panel wrapper
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      sx={{ p: 1 }}
    >
      {value === index && children}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function ProfilePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: "",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const { isOnline } = useNetworkStatus();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 0.75,
      }}
    >
      <Stack direction={"row"} gap={4} alignItems={"center"}>
        <Typography
          variant="h6"
          color={isOnline ? "green" : "red"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 0.25,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: isOnline ? "green" : "red",
            }}
          />
          {isOnline ? "Online" : "Offline"}
        </Typography>
        <ButtonBase
          sx={{
            p: 0.25,

            borderRadius: 1,
            "&:hover": {
              bgcolor:
                theme.palette.mode === ThemeMode.DARK
                  ? "secondary.light"
                  : "secondary.lighter",
            },
            "&:focus-visible": {
              outline: `2px solid ${theme.palette.secondary.dark}`,
              outlineOffset: 2,
            },
          }}
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? "profile-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Stack direction="row" spacing={1.25} alignItems={"center"}>
            <Avatar
              alt={user?.firstName}
              src={user?.avatar_url || ""}
              sx={{ borderRadius: 1 }}
            />
            <Stack direction={"column"} textAlign={"start"}>
              <Typography variant="subtitle1" color={"#394663"}>
                {`${user?.firstName || ""} ${user?.lastName || ""}`}{" "}
              </Typography>
              <Typography variant="body2" color="secondary">
                {user?.email || "info@codekraftsolutions.com"}
              </Typography>
            </Stack>
            <ArrowDown />
          </Stack>
        </ButtonBase>
      </Stack>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [{ name: "offset", options: { offset: [0, 9] } }],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position="top-right"
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 220,
                minWidth: 200,
                maxWidth: 240,
                [theme.breakpoints.down("md")]: { maxWidth: 230 },
                borderRadius: 1.5,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
                  <ProfileTab handleLogout={handleLogout} />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
