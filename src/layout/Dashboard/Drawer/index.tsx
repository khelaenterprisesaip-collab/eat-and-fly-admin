import { useEffect, useMemo, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

// project-imports
import DrawerHeader from "./DrawerHeader";
import DrawerContent from "./DrawerContent";
import MiniDrawerStyled from "./MiniDrawerStyled";

import { DRAWER_WIDTH } from "config";
import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";

interface Props {
  window?: () => Window;
}

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

export default function MainDrawer({ window }: Props) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isClickB = menuMaster?.isClickB;
  // responsive drawer container
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [isHovered, setIsHovered] = useState(false);
  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(
    () => <DrawerHeader open={drawerOpen} />,
    [drawerOpen]
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { md: 0 },
        zIndex: 1200,

        "& > .MuiDrawer-docked .MuiDrawer-paper": {
          background: "white",
          borderRight: `1px solid ${theme.palette.divider}`,
        },
        "& > .MuiDrawer-root .MuiPaper-root": {
          borderRadius: "0px",
        },
      }}
      aria-label="mailbox folders"
    >
      {!downLG ? (
        <MiniDrawerStyled
          variant="permanent"
          open={drawerOpen}
          onMouseEnter={() => {
            isClickB === "hover" && handlerDrawerOpen(true, "hover");
          }}
          onMouseLeave={() => {
            isClickB === "hover" && handlerDrawerOpen(false, "hover");
          }}
        >
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen, "hover")}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiPaper-root": {
              backgroundColor: "red",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: "none",
              boxShadow: "inherit",
              borderRadius: 0,
              backgroundColor: theme.palette.common.white,
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
