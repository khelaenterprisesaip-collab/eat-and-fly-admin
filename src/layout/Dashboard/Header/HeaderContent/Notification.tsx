import { useEffect, useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project-imports
import MainCard from "components/MainCard";
import IconButton from "components/@extended/IconButton";
import Transitions from "components/@extended/Transitions";
import { ThemeMode } from "config";

// assets
import { Gift, MessageText1, Notification, Setting2 } from "iconsax-react";
import Avatar from "components/@extended/Avatar";
import BellIcon from "assets/svg/BellIcon";
import useAuth from "hooks/useAuth";
import dayjs from "dayjs";

import InfiniteScroll from "react-infinite-scroll-component";
import { set } from "lodash";

// types

const actionSX = {
  mt: "6px",
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

export default function NotificationPage() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const anchorRef = useRef<any>(null);
  const { user } = useAuth();
  const [notificationList, setNotificationList] = useState<any>({
    rows: [],
    count: 0,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(10);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setPage(10);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // const fetchNotifications = () => {
  //   setLoading(true);
  //   fetchAllNotification({
  //     query: {
  //       limit: page
  //     }
  //   }).then((res) => {
  //     setLoading(false);
  //     if (res) {
  //       setNotificationList({ rows: res?.rows, count: res.count });
  //     } else {
  //       setNotificationList({ rows: [], count: 0 });
  //       setLoading(false);
  //       setPage(10);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   fetchNotifications();
  // }, [page]);

  const extractNumber = (message: string) => {
    const match = message.match(/\d+/);
    return match ? match[0] : null;
  };

  const iconBackColorOpen =
    theme.palette.mode === "dark" ? "background.paper" : "secondary.200";
  const iconBackColor =
    theme.palette.mode === "dark" ? "background.default" : "secondary.100";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      {user?.id && (
        <IconButton
          color="secondary"
          variant="light"
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? "profile-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          size="large"
          sx={{
            color: "secondary.main",
            bgcolor: open ? iconBackColorOpen : iconBackColor,
            p: 1,
          }}
        >
          <Badge
            badgeContent={notificationList?.count || 0}
            color="success"
            sx={{ "& .MuiBadge-badge": { top: 2, right: 4 } }}
          >
            <BellIcon />
          </Badge>
        </IconButton>
      )}
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            { name: "offset", options: { offset: [matchesXs ? -5 : 0, 9] } },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position={matchesXs ? "top" : "top-right"}
            sx={{ overflow: "hidden" }}
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z2,
                borderRadius: 1.5,
                width: "100%",
                minWidth: 285,
                border: `1px solid ${theme.palette.primary[100]}`,
                maxWidth: 420,
                height: "auto",
                overflow: "hidden",
                [theme.breakpoints.down("md")]: { maxWidth: 285 },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">Notifications</Typography>
                  </Stack>
                  <InfiniteScroll
                    dataLength={notificationList?.rows.length || 0}
                    next={() => setPage((prevPage) => prevPage + 10)}
                    hasMore={
                      notificationList?.rows.length < notificationList?.count
                    }
                    loader={
                      loading && (
                        <Typography variant="body2" sx={{ padding: 2 }}>
                          Loading...
                        </Typography>
                      )
                    }
                    scrollableTarget="scrollable-list"
                  >
                    <List
                      id="scrollable-list"
                      component="nav"
                      sx={{
                        mt: 2,
                        maxHeight: 400,
                        overflowY: "auto",
                        paddingRight: "8px",
                        "&::-webkit-scrollbar": {
                          width: "2px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#888",
                          borderRadius: "3px",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "#f1f1f1",
                          mt: 2,
                        },
                        "& .MuiListItemButton-root": {
                          p: 1.5,
                          my: 1.5,
                          border: `1px solid ${theme.palette.divider}`,
                          "&:hover": {
                            bgcolor: "primary.lighter",
                            borderColor: theme.palette.primary.light,
                          },
                          "& .MuiListItemSecondaryAction-root": {
                            ...actionSX,
                            position: "relative",
                          },
                        },
                      }}
                    >
                      {notificationList?.rows?.length > 0 ? (
                        notificationList?.rows.map((ele: any) => {
                          const application_id = extractNumber(ele?.message);
                          const dateObj = dayjs(ele?.createdAt);
                          const formattedDate = dateObj.format("DD MMMM YYYY");
                          const formattedTime = dateObj.format("hh:mm A");
                          return (
                            <ListItemButton key={ele.id}>
                              <ListItemAvatar>
                                <Avatar type="outlined">
                                  <MessageText1 size={20} variant="Bold" />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="h6">
                                    {ele?.message}
                                  </Typography>
                                }
                                secondary={formattedDate}
                              />
                              <ListItemSecondaryAction>
                                <Typography variant="caption" noWrap>
                                  {formattedTime}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItemButton>
                          );
                        })
                      ) : (
                        <Typography variant="body2" sx={{ padding: 2 }}>
                          No notifications available.
                        </Typography>
                      )}
                    </List>
                  </InfiniteScroll>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

{
  /* <Avatar>
  <Setting2 size={20} variant="Bold" />
</Avatar>

<Avatar type="combined">C</Avatar>; */
}

{
  /* <Stack direction="row" justifyContent="center">
                    <Link href="#" variant="h6" color="primary">
                      View all
                    </Link>
                  </Stack> */
}
