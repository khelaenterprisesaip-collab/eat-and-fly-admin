import { useState, cloneElement, ReactElement } from "react";
import { useLocation } from "react-router-dom";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";

// project-imports
import IconButton from "components/@extended/IconButton";
import Logo from "components/logo";
import { handlerComponentDrawer, useGetMenuMaster } from "api/menu";

// assets
import { HambergerMenu, Minus } from "iconsax-react";
import { PUBLIC_ROUTES } from "routes/PublicRoutes";

interface ElevationScrollProps {
  layout: string;
  children: ReactElement;
  window?: Window | Node;
}

// elevation scroll
function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined,
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? "0 8px 6px -10px rgba(0, 0, 0, 0.5)" : "none",
      backgroundColor: trigger
        ? alpha(theme.palette.background.default, 0.8)
        : alpha(theme.palette.background.default, 0.1),
    },
  });
}

interface Props {
  layout?: string;
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = "landing", ...others }: Props) {
  const theme = useTheme();
  const location = useLocation();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  const { menuMaster } = useGetMenuMaster();

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event.type! === "keydown" &&
      (event.key! === "Tab" || event.key! === "Shift")
    ) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.1),
          backdropFilter: "blur(8px)",
          color: theme.palette.text.primary,
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl" disableGutters={matchDownMd}>
          <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
            <Stack
              direction="row"
              sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
              alignItems="center"
            >
              <Typography sx={{ textAlign: "left", display: "inline-block" }}>
                <Logo to="/" />
              </Typography>
              <Chip
                label={
                  PUBLIC_ROUTES.includes(location.pathname)
                    ? "Enrolhere"
                    : import.meta.env.VITE_APP_VERSION
                }
                variant="outlined"
                size="small"
                color="secondary"
                sx={{
                  mt: 0.5,
                  ml: 1,
                  fontSize: "0.725rem",
                  height: 20,
                  "& .MuiChip-label": { px: 0.5 },
                }}
              />
            </Stack>
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                display: { xs: "flex", md: "none" },
              }}
            >
              <Typography sx={{ textAlign: "left", display: "inline-block" }}>
                <Logo to="/" />
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  size="large"
                  color="secondary"
                  {...(layout === "component"
                    ? {
                        onClick: () =>
                          handlerComponentDrawer(
                            !menuMaster.isComponentDrawerOpened
                          ),
                      }
                    : { onClick: drawerToggler(true) })}
                  sx={{ p: 1 }}
                >
                  <HambergerMenu />
                </IconButton>
              </Stack>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{ "& .MuiDrawer-paper": { backgroundImage: "none" } }}
              >
                <Box
                  sx={{
                    width: "auto",
                    "& .MuiListItemIcon-root": {
                      fontSize: "1rem",
                      minWidth: 32,
                    },
                  }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/login"
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Dashboard"
                          primaryTypographyProps={{
                            variant: "h6",
                            color: "secondary.main",
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
