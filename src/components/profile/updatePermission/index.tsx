import Modal from "components/ui/Modal";
import { Button, Checkbox, Grid, Stack, Switch } from "@mui/material";
import Input from "components/ui/Input";
import { ArrowRight } from "iconsax-react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

const UpdatePermission = ({ isVisible, setIsVisible }: any) => {
  const [permissions, setPermissions] = useState<any>({
    view_student: false,
    edit_student: false,
    create_student: false,
    delete_student: false,
    view_application: false,
    edit_application: false,
    create_application: false,
    delete_application: false,
    view_college: false,
    edit_college: false,
    create_college: false,
    delete_college: false,
    view_payment: false,
    view_commission: false,
    request_withdraw: false,
    invite_staff: false,
    delete_staff: false,
    add_edit_role: false,
    edit_billing: false,
    view_billing: false,
  });

  const [loading, setLoading] = useState(false);

  const roles = ["Add", "Create", "Edit", "Delete"];

  const CheckBoxGroup = ({ title }: { title: string }) => (
    <Box
      sx={{
        backgroundColor: "#F9F9F9",
        borderBottom: "2px solid #C8D7F7",
        padding: 1.3,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        gap: 10,
      }}
    >
      <Typography>{title}</Typography>

      <Stack direction={"row"} gap={4}>
        {roles.map((role) => (
          <Checkbox key={role} />
        ))}
      </Stack>
    </Box>
  );

  return (
    <Modal
      title="Update Permission"
      open={isVisible}
      handleClose={() => {
        setIsVisible(false);
        setPermissions({});
      }}
      handleSubmit={() => {}}
      maxWidth="md"
      closeIcon
      //   title={role_id ? 'Update Role' : 'Create New Role'}
      sx={{
        "& .MuiDialog-paper": {
          p: 0,
          minWidth: { xl: 800, sm: "calc(100% - 20%)" },
        },
        "& .MuiBackdrop-root": { opacity: "0.5 !important" },
      }}
      footerActions={
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            alignItems="center"
            gap={1}
          >
            <Button
              size="medium"
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                setIsVisible(false);
                setPermissions({});
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              //   onClick={handleSubmit(onSubmit)}
            >
              Update
            </LoadingButton>
          </Stack>
        </Grid>
      }
    >
      <Typography variant="h5">Set Permission</Typography>
      <Typography variant="caption">
        Modify what individuals on this role can do
      </Typography>

      <Box sx={{ border: "1px solid #C8D7F7", borderRadius: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: " #C8D7F7",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
        >
          <Stack>
            <Typography>Action</Typography>
          </Stack>

          <Stack direction={"row"} gap={5.6}>
            {roles.map((role) => (
              <Typography key={role} variant="caption">
                {role}
              </Typography>
            ))}
          </Stack>
        </Box>

        <CheckBoxGroup title="Student Management" />
        <CheckBoxGroup title="Application Management" />
        <CheckBoxGroup title="Institute Management" />
        <CheckBoxGroup title="Payment Management" />
        <CheckBoxGroup title="Staff Management" />
      </Box>
    </Modal>
  );
};

export default UpdatePermission;
