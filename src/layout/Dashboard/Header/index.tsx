import { ReactNode, useMemo } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// project-imports
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";
import IconButton from "components/@extended/IconButton";

import useConfig from "hooks/useConfig";
import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";
import {
  DRAWER_WIDTH,
  MINI_DRAWER_WIDTH,
  MenuOrientation,
  ThemeMode,
} from "config";

// assets
import MenuAltIcon from "assets/svg/MenuAltIcon";

import { Stack } from "@mui/system";
import { useLocation } from "react-router";
import CustomBreadcrumbs from "components/@extended/CustomBreadcrumbs";
import useAuth from "hooks/useAuth";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const { user } = useAuth();
  const downLG = useMediaQuery(theme?.breakpoints?.down("lg"));
  const { pathname } = useLocation();

  const { mode, menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const isClickB = menuMaster?.isClickB;
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  const iconBackColorOpen =
    mode === ThemeMode.DARK ? "background.paper" : "secondary.200";
  const iconBackColor =
    mode === ThemeMode.DARK ? "background.default" : "secondary.100";

  // common header
  const mainHeader: ReactNode = (
    <>
      <Toolbar
        sx={{
          px: { xs: 2, sm: 4.5 },
          "background-color": theme.palette.common.white,
          "& .MuiToolbar-root": {
            borderRadius: "0px",
          },
        }}
      >
        {!isHorizontal ? (
          <Stack direction={"row"} gap={0} alignItems={"center"}>
            {downLG && (
              <IconButton
                aria-label="open drawer"
                onClick={() =>
                  handlerDrawerOpen(
                    !drawerOpen,
                    !drawerOpen ? "not_hover" : "hover"
                  )
                }
                edge="start"
                color="default"
                variant="light"
                size="large"
                sx={{
                  color: "secondary.main",
                  bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor,
                  ml: { xs: -1, lg: -2 },
                  p: 0,
                  backgroundColor: theme.palette.background.paper,
                  ":hover": {
                    background: theme.palette.secondary[100],
                  },
                }}
              >
                <MenuAltIcon />
              </IconButton>
            )}
            {/* {user && ( */}
            <Stack
              width={{ xs: 0, sm: 400 }}
              sx={{ visibility: { xs: "hidden", sm: "visible" } }}
            >
              <CustomBreadcrumbs />
            </Stack>
            {/* // )} */}
          </Stack>
        ) : null}

        {headerContent}
      </Toolbar>
    </>
  );

  // app-bar params
  const appBar: AppBarProps = {
    position: "fixed",
    elevation: 0,
    sx: {
      bgcolor: theme.palette.common.white,
      backdropFilter: "blur(8px)",
      zIndex: 1200,
      padding: 0,
      maxHeight: 70,
      width: isHorizontal
        ? "100%"
        : {
            xs: "100%",
            lg:
              !downLG && drawerOpen && isClickB === "not_hover"
                ? `calc(100% - ${DRAWER_WIDTH}px)`
                : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
          },
    },
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
}
