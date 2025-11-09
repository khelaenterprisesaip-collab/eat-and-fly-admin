import { matchPath, useLocation, Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// project-imports
import Dot from "components/@extended/Dot";
import IconButton from "components/@extended/IconButton";

import useConfig from "hooks/useConfig";
import { MenuOrientation, ThemeMode } from "config";
import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";

// types
import { LinkTarget, NavItemType } from "types/menu";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import useAuth from "hooks/useAuth";

interface Props {
  item: NavItemType;
  level: number;
  isParents?: boolean;
}

// ==============================|| NAVIGATION - ITEM ||============================== //

export default function NavItem({ item, level, isParents = false }: Props) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { mode, menuOrientation } = useConfig();

  let itemTarget: LinkTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const Icon = item.icon!;
  const itemIcon = item.icon ? (
    <Stack>
      <Icon
        style={{
          ...(menuOrientation === MenuOrientation.HORIZONTAL &&
            isParents && { fontSize: 20, stroke: "1.5" }),
        }}
      />
    </Stack>
  ) : (
    false
  );

  const { pathname } = useLocation();
  const isSelected = !!matchPath(
    { path: item?.link ? item.link : item.url!, end: false },
    pathname
  );

  const textColor =
    mode === ThemeMode.DARK ? "secondary.400" : "secondary.main";
  const iconSelectedColor = "primary.main";
  const { isSubscriptionActive } = useAuth();
  // const subProps = {
  //   ...(   isSubscriptionActive && {
  //     component: Link,
  //     to: item.url!,
  //   }),
  // };
  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <Box sx={{ position: "relative" }}>
          <ListItemButton
            component={Link}
            to={item.url!}
            target={itemTarget}
            disabled={item.disabled}
            selected={isSelected}
            sx={{
              zIndex: 1201,
              display: "flex",
              py: 0.5,
              alignItems: "center",
              justifyContent: "flex-start",
              ...(drawerOpen && {
                "&:hover": { bgcolor: "transparent" },
                "&.Mui-selected": {
                  "&:hover": { bgcolor: "transparent" },
                  bgcolor: "transparent",
                },
              }),
              ...(!drawerOpen && {
                "&:hover": { bgcolor: "transparent" },
                "&.Mui-selected": {
                  "&:hover": { bgcolor: "transparent" },
                  bgcolor: "transparent",
                },
              }),
              ...(drawerOpen && {
                "&:hover": { bgcolor: "transparent" },
                "&.Mui-selected": {
                  "&:hover": { bgcolor: "transparent" },
                  bgcolor: "transparent",
                },
              }),
            }}
            {...(downLG && { onClick: () => handlerDrawerOpen(false) })}
          >
            {/* Icon */}
            <ListItemIcon
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: drawerOpen ? "flex-start" : "center",
                px: drawerOpen ? 1 : 0,
                borderRadius: 1,
                width: drawerOpen ? "100%" : 40,
                height: 42,
                "&:hover": {
                  bgcolor:
                    mode === ThemeMode.DARK
                      ? "secondary.light"
                      : "secondary.200",
                },

                ...(isSelected && {
                  bgcolor:
                    mode === ThemeMode.DARK ? "secondary.100" : "primary.main",
                  "&:hover": {
                    bgcolor:
                      mode === ThemeMode.DARK
                        ? "secondary.200"
                        : "primary.main",
                  },
                }),
              }}
            >
              <Typography color={isSelected ? "white" : textColor}>
                {itemIcon}
              </Typography>
              {drawerOpen && (
                <Typography
                  className="flex-1"
                  variant="h6"
                  sx={{
                    color: isSelected ? "white" : textColor,
                    fontWeight: 400,
                    ml: 1,
                  }}
                >
                  {item.title}
                </Typography>
              )}
              {/* {drawerOpen && !isSubscriptionActive ? (
                <Typography color={isSelected ? "white" : textColor}>
                  <LockIcon className="opacity-30" />
                </Typography>
              ) : (
                <></>
              )} */}
            </ListItemIcon>

            {/* {drawerOpen && (
              <Typography variant="h6" sx={{ color: textColor, fontWeight: 400, ml: 0.5 }}>
                {item.title}
              </Typography>
            )} */}
          </ListItemButton>
        </Box>
      ) : (
        <ListItemButton
          component={Link}
          to={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            "&:hover": { bgcolor: "transparent" },
            // ...(isParents && { color: textColor, p: 1, mr: 1 }),÷
            "&.Mui-selected": {
              bgcolor: "transparent",
              color: iconSelectedColor,
              "&:hover": { color: iconSelectedColor, bgcolor: "transparent" },
            },
          }}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 36,
                ...(!drawerOpen && {
                  borderRadius: 1,
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { bgcolor: "transparent" },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "transparent" },
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}

          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{
                  color: isSelected ? iconSelectedColor : textColor,
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {item.title}
              </Typography>
            }
          />
          {/* {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              sx={{ ml: 1 }}
            />
          )} */}
        </ListItemButton>
      )}
    </>
  );
}
