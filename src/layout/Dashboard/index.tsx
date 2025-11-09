import { useEffect } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

// project-imports
import Drawer from "./Drawer";
import Header from "./Header";
import Footer from "./Footer";
import HorizontalBar from "./Drawer/HorizontalBar";
import Loader from "components/Loader";
import AuthGuard from "utils/route-guard/AuthGuard";

import { DRAWER_WIDTH, MenuOrientation } from "config";
import useConfig from "hooks/useConfig";
import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";
import RoleAccess2 from "routes/RoleAccess";

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout({ allowPermission }: any) {
  const theme = useTheme();

  const { menuMasterLoading } = useGetMenuMaster();
  const { menuMaster } = useGetMenuMaster();
  const isClickB = menuMaster?.isClickB;
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const downXL = useMediaQuery(theme.breakpoints.down("xl"));
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <AuthGuard>
      <RoleAccess2 viewPermission={allowPermission}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Header />
          {!isHorizontal ? <Drawer /> : <HorizontalBar />}

          <Box
            component="main"
            sx={{
              bgcolor: "#EFF0F6",
              width: `calc(100% - ${DRAWER_WIDTH}px)`,
              marginLeft: downLG ? 0 : 10,
              ...(!downLG &&
                drawerOpen &&
                isClickB === "not_hover" && {
                  marginLeft: 35,
                  width: `calc(100% - ${DRAWER_WIDTH}px)`,
                  transition: theme?.transitions?.create(["width", "margin"], {
                    easing: theme?.transitions?.easing?.sharp,
                    duration: theme?.transitions?.duration?.enteringScreen,
                  }),
                }),
              flexGrow: 1,
              py: 2,
              // p: { xs: 2, md: },
            }}
          >
            <Toolbar
              sx={{
                mt: isHorizontal ? 8 : "inherit",
                mb: isHorizontal ? 2 : "inherit",
              }}
            />
            <Container
              maxWidth={container ? "xl" : false}
              sx={{
                xs: 0,
                ...(container && { px: { xs: 0, md: 2 } }),
                px: { xs: 0, md: 2 },
                minHeight: "calc(100vh - 110px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Outlet />
              {/* <Footer /> */}
            </Container>
          </Box>
        </Box>
      </RoleAccess2>
    </AuthGuard>
  );
}
