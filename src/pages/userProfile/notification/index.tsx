import { LoadingButton } from "@mui/lab";
import { Checkbox, Stack, Switch } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { openSnackbar } from "api/snackbar";
import { EmailIcon } from "assets/svg/email";
import MainCard from "components/MainCard";
import { defaultSx } from "components/ui/Button/styles";
import { InfoCircle } from "iconsax-react";
import { useEffect, useState } from "react";
// import { fetchNotification, updateNotification } from 'services/notification';
import { SnackbarProps } from "types/snackbar";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({
    always_notify_me: false,
    email_notification: false,
    notification1: false,
    notification2: false,
    notification3: false,
    notification4: false,
    notification5: false,
    notification6: false,
    notification7: false,
  });

  const CheckBoxGroup = ({ title, name }: { title: string; name: string }) => (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Checkbox
        name={name}
        checked={notification[name]}
        onChange={(e) => {
          setNotification((prev: any) => ({
            ...prev,
            [name]: e.target.checked,
          }));
        }}
      />
      <Typography
        variant="caption"
        color={"#4A5567"}
        fontWeight={500}
        fontSize={"15px"}
      >
        {title}
      </Typography>
    </Box>
  );

  const getNotification = () => {
    // fetchNotification()?.then((res: any) => {
    //   const data = res?.data;
    //   setNotification({
    //     always_notify_me: data?.always_notify_me,
    //     email_notification: data?.email_notification,
    //     notification1: data?.notification1,
    //     notification2: data?.notification2,
    //     notification3: data?.notification3,
    //     notification4: data?.notification4,
    //     notification5: data?.notification5,
    //     notification6: data?.notification6,
    //     notification7: data?.notification7
    //   });
    // });
  };

  useEffect(() => {
    getNotification();
  }, []);

  const submit = async () => {
    setLoading(true);
    // await updateNotification({
    //   body: {
    //     ...notification
    //   }
    // })
    //   ?.then((res) => {
    //     setLoading(false);
    //     getNotification();
    //     openSnackbar({
    //       open: true,
    //       message: 'Notification Updated',
    //       variant: 'alert',
    //       alert: {
    //         color: 'success'
    //       }
    //     } as SnackbarProps);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     openSnackbar({
    //       open: true,
    //       message: err?.data?.message || 'Something went wrong',
    //       variant: 'alert',
    //       alert: {
    //         color: 'error',
    //         icon: <InfoCircle />
    //       },

    //       anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'right'
    //       }
    //     } as SnackbarProps);
    //   });
  };

  return (
    <div>
      <MainCard>
        <Stack marginBottom={4}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{ fontSize: "19px", color: "#394663", fontWeight: "600" }}
            >
              Notification Settings
            </Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="caption">Always notify me</Typography>
              <Switch
                size="small"
                checked={notification["always_notify_me"]}
                onChange={(e) => {
                  setNotification((prev: any) => ({
                    ...prev,
                    always_notify_me: e?.target?.checked,
                  }));
                }}
              />
            </Stack>
          </Stack>
          <Typography
            variant="caption"
            color={"#778194"}
            fontWeight={400}
            fontSize={"14px"}
            width={{ xs: "100%", sm: 670 }}
          >
            Set your notification preferences for various features and
            activities. This setting will enable both the email notification and
            the updates for the respective users
          </Typography>
        </Stack>

        <Box sx={{ border: "1px solid #C8D7F7", borderRadius: 1, padding: 1 }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack width={450}>
              <Stack direction={"row"} justifyItems={"center"} gap={2}>
                <Stack sx={{ mt: 1 }}>
                  <EmailIcon />
                </Stack>
                <Stack>
                  <Typography
                    fontSize={"14px"}
                    color={"#394663"}
                    fontWeight={600}
                  >
                    Email Notifications
                  </Typography>
                  <Typography variant="caption">
                    Receive notifications via email
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="caption">On</Typography>
              <Switch
                checked={notification["email_notification"]}
                size="small"
                onChange={(e) => {
                  setNotification((prev: any) => ({
                    ...prev,
                    email_notification: e?.target?.checked,
                  }));
                }}
              />
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            border: "1px solid #C8D7F7",
            borderRadius: 1,
            padding: 2,
            marginTop: 6,
          }}
        >
          <Stack marginBottom={3}>
            <Typography
              fontSize={"20px"}
              sx={{ color: "#334735" }}
              fontWeight={600}
            >
              Student Platform
            </Typography>
            <Typography
              variant="caption"
              color={"#4A5567"}
              fontSize={"15px"}
              fontWeight={500}
            >
              Select the kind of notifications you get about various activities.
              Below notifications will be sent to your registered email address
              or student’s registered email address
            </Typography>
          </Stack>

          <CheckBoxGroup
            name="notification1"
            title="Notification to student when you complete (submit) the profile on student’s behalf. *"
          />
          <CheckBoxGroup
            name="notification2"
            title="Notification to student when you submit one or more applications for the student."
          />
          <CheckBoxGroup
            name="notification3"
            title="Notification to student when you edit the student profile after any application has been submitted for the student."
          />
          <CheckBoxGroup
            name="notification4"
            title="Notification to student when the edits he requested on their profile have been approved/rejected."
          />
          <CheckBoxGroup
            name="notification5"
            title="Weekly Notification to student if the student's profile is not completed after 7 days of registering the student."
          />
          <CheckBoxGroup
            name="notification6"
            title="Weekly Notification to student if the student's profile is not completed after 7 days of registering the student."
          />
          <CheckBoxGroup
            name="notification7"
            title="Send me my staff’s email communications for application notes."
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
          <LoadingButton
            sx={defaultSx}
            loading={loading}
            size="medium"
            type="submit"
            variant="contained"
            color="primary"
            onClick={submit}
          >
            Save
          </LoadingButton>
        </Box>
      </MainCard>
    </div>
  );
};

export default Notification;
