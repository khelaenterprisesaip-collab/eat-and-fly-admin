import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Page from "components/ui/PageLayout";
import useAuth from "hooks/useAuth";
import { LockKeyhole, UserRound, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

function getPathIndex(pathname: string) {
  let selectedTab = 0;
  switch (pathname) {
    case "/profile/changePassword":
      selectedTab = 1;
      break;

    case "/profile/roleManager":
      selectedTab = 4;
      break;
    case "/profile/manageStaff":
      selectedTab = 2;
      break;

    case "":
    default:
      selectedTab = 0;
  }
  return selectedTab;
}
const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<any>(
    getPathIndex(pathname)
  );

  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <Page title="My Profile">
      <Grid container xs={12} spacing={{ md: 4 }} gap={{ xs: 4, md: 0 }}>
        <Grid item xs={12} md={2.5}>
          <List
            component="nav"
            sx={{
              p: 1.8,
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiListItemIcon-root": {
                minWidth: 10,
                color: "secondary.main",
              },
            }}
          >
            {[
              {
                value: "Profile Information",
                route: "/profile/detail",
                icon: <UserRound size={16} />,
              },
              {
                value: "Change Password",
                route: "/profile/changePassword",
                icon: <LockKeyhole size={16} />,
              },

              {
                value: "Manage Staff",
                route: "/profile/manageStaff",
                icon: <UsersRound size={16} />,
                hidden: !user?.isTenant,
              },
            ]
              ?.filter((column: any) => !column?.hidden)
              ?.map((text, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index, text?.route)}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedIndex === index ? "#334735" : "gray",
                      mr: 1,
                    }}
                  >
                    {text?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={500}>
                        {text?.value}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
          </List>
        </Grid>
        <Grid item xs={12} md={9.5}>
          <Outlet />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Profile;
