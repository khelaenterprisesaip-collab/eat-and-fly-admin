import Modal from "components/ui/Modal";
import { Grid, Stack, Switch } from "@mui/material";
import Input from "components/ui/Input";
import {
  ArrowRight,
  DiscountShape,
  InfoCircle,
  Profile2User,
} from "iconsax-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addRole,
  fetchSingleRole,
  updateRole,
} from "services/roleAndPermission";
import { LoadingButton } from "@mui/lab";
import { SnackbarProps } from "types/snackbar";
import { openSnackbar } from "api/snackbar";
import { useRole } from "hooks/useAuth";
import {
  RoleApplication,
  RoleInstitute,
  RolePayment,
  RoleStaff,
  RoleStudent,
} from "assets/svg/Role";
import ThemeButton from "components/ui/Button";
import { defaultSx } from "components/ui/Button/styles";
import { Section } from "pages/userProfile/roleManager";
import {
  Anchor,
  BoxIcon,
  CircleDollarSignIcon,
  DollarSign,
  Ship,
  TicketPercent,
  Truck,
  User,
  User2,
  UserCircle,
  UsersRound,
} from "lucide-react";
import { MdManageAccounts } from "react-icons/md";
import { ToolIcon } from "assets/svg/tool";

const CreateRolePermission = ({
  isVisible,
  setIsVisible,
  role_id,
  setRole_id,
  getAllRoles,
}: any) => {
  const values = {
    add_truck: false,
    edit_truck: false,
    delete_truck: false,
    view_truck: false,
    add_chassis: false,
    edit_chassis: false,
    delete_chassis: false,
    view_chassis: false,
    add_yard: false,
    edit_yard: false,
    delete_yard: false,
    view_yard: false,
    invite_staff: false,
    delete_staff: false,
    add_edit_role: false,

    add_customer: false,
    edit_customer: false,
    delete_customer: false,
    view_customer: false,

    add_consignors: false,
    edit_consignors: false,
    delete_consignors: false,
    view_consignors: false,

    add_order: false,
    edit_order: false,
    delete_order: false,
    view_order: false,

    add_port: false,
    edit_port: false,
    delete_port: false,
    view_port: false,

    add_driver: false,
    edit_driver: false,
    delete_driver: false,
    view_driver: false,
    edit_billing: false,
    view_billing: false,
  };

  const [permissions, setPermissions] = useState<any>(values);
  const [loading, setLoading] = useState(false);
  const { FetchRoles }: any = useRole();
  const formSchema = z.object({
    name: z.string().min(1, "Please enter title"),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    reset,
  }: any = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (role_id)
      fetchSingleRole({
        query: {
          id: role_id,
        },
      })?.then((response) => {
        const res = response?.data;
        setValue("name", res?.name);
        setPermissions({
          add_truck: res?.add_truck,
          edit_truck: res?.edit_truck,
          delete_truck: res?.delete_truck,
          view_truck: res?.view_truck,
          add_chassis: res?.add_chassis,
          edit_chassis: res?.edit_chassis,
          delete_chassis: res?.delete_chassis,
          view_chassis: res?.view_chassis,
          add_yard: res?.add_yard,
          edit_yard: res?.edit_yard,
          delete_yard: res?.delete_yard,
          view_yard: res?.view_yard,
          invite_staff: res?.invite_staff,
          delete_staff: res?.delete_staff,
          add_edit_role: res?.add_edit_role,

          add_customer: res?.add_customer,
          edit_customer: res?.edit_customer,
          delete_customer: res?.delete_customer,
          view_customer: res?.view_customer,

          add_consignors: res?.add_consignors,
          edit_consignors: res?.edit_consignors,
          delete_consignors: res?.delete_consignors,
          view_consignors: res?.view_consignors,

          add_order: res?.add_order,
          edit_order: res?.edit_order,
          delete_order: res?.delete_order,
          view_order: res?.view_order,

          add_port: res?.add_port,
          edit_port: res?.edit_port,
          delete_port: res?.delete_port,
          view_port: res?.view_port,

          add_driver: res?.add_driver,
          edit_driver: res?.edit_driver,
          delete_driver: res?.delete_driver,
          view_driver: res?.view_driver,
          edit_billing: res?.edit_billing,
          view_billing: res?.view_billing,
        });
      });
  }, [role_id]);

  const onSubmit = (data: any) => {
    setLoading(true);
    if (role_id) {
      updateRole({
        body: { ...data, ...permissions },
        pathParams: { id: role_id },
      })
        ?.then((res) => {
          openSnackbar({
            open: true,
            message: "Role Updated ",
            variant: "alert",
            alert: {
              color: "success",
            },
          } as SnackbarProps);
          reset({ name: "" });
          getAllRoles();
          FetchRoles();
          setLoading(false);
          setIsVisible(false);
          setRole_id("");
          setPermissions(values);
        })
        .catch((err) => {
          setLoading(false);
          setIsVisible(false);
          openSnackbar({
            open: true,
            message: err?.data?.message,
            variant: "alert",
            alert: {
              color: "error",
              icon: <InfoCircle />,
            },

            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          } as SnackbarProps);
        });
    } else {
      addRole({
        body: { ...data, ...permissions },
      })
        ?.then((res: any) => {
          openSnackbar({
            open: true,
            message: "Role Created",
            variant: "alert",
            alert: {
              color: "success",
            },
          } as SnackbarProps);

          reset({ name: "" });
          getAllRoles();
          FetchRoles();
          setLoading(false);
          setIsVisible(false);
          setPermissions(values);
        })
        .catch((err) => {
          setLoading(false);
          openSnackbar({
            open: true,
            message: err?.data?.message || "Something went wrong",
            variant: "alert",
            alert: {
              color: "error",
              icon: <InfoCircle />,
            },

            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          } as SnackbarProps);
        });
    }
  };

  const CheckBox = ({
    title,
    description,
    name,
    isSelectAll = false,
  }: {
    title: string;
    description: string;
    name: string;
    isSelectAll?: boolean;
  }) => (
    <Box
      sx={{
        borderBottom: !isSelectAll ? "2px solid #C8D7F7" : "",
        padding: 1,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: !isSelectAll ? 10 : 1,
      }}
    >
      <Stack>
        <Typography
          sx={{ color: "#292929", fontWeight: 400, fontSize: "16px" }}
        >
          {title}
        </Typography>
        {!isSelectAll && (
          <Typography
            variant="caption"
            fontSize={"12px"}
            fontWeight={400}
            color={"#5A667B"}
          >
            {description}
          </Typography>
        )}
      </Stack>

      <Stack direction={"row"} gap={4}>
        <Switch
          name={name}
          checked={
            isSelectAll
              ? Object.values(permissions).every(Boolean)
              : permissions[name]
          }
          size="small"
          onChange={(e) => {
            if (isSelectAll) {
              const allChecked = e.target.checked;
              const updatedPermissions: any = {};
              Object.keys(permissions).forEach((key) => {
                updatedPermissions[key] = allChecked;
              });
              setPermissions(updatedPermissions);
            } else {
              setPermissions((prevPermissions: any) => ({
                ...prevPermissions,
                [name]: e.target.checked,
              }));
            }
          }}
        />
      </Stack>
    </Box>
  );

  return (
    <Modal
      open={isVisible}
      handleClose={() => {
        setIsVisible(false);
        reset({ name: "" });
        setRole_id("");
        setPermissions(values);
      }}
      handleSubmit={() => {}}
      maxWidth="md"
      closeIcon
      title={role_id ? "Update Role" : "Create New Role"}
      sx={{
        "& .MuiDialog-paper": {
          p: 0,
          minWidth: { xl: 1100, sm: "calc(100% - 20%)" },
        },
        "& .MuiBackdrop-root": { opacity: "0.5 !important" },
      }}
      footerActions={
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <ThemeButton
              size="medium"
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                setIsVisible(false);
                reset({ name: "" });
                setRole_id("");
                setPermissions(values);
              }}
            >
              Cancel
            </ThemeButton>
            <LoadingButton
              loading={loading}
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              onClick={handleSubmit(onSubmit)}
              sx={defaultSx}
            >
              {role_id ? "Update" : "Add"}
            </LoadingButton>
          </Stack>
        </Grid>
      }
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography color={"#394663"} fontSize={"15px"} fontWeight={600}>
          BASIC DETAILS
        </Typography>
        <Typography color={"#737D98"} fontSize={"12px"}>
          Add basic details about this role you’re creating
        </Typography>

        <form noValidate>
          <Grid container spacing={3} paddingTop={1}>
            <Grid item xs={12}>
              <Input
                label="Title"
                error={errors}
                name={"name"}
                control={control}
                placeholder="Enter title"
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography fontSize={"16px"} fontWeight={600} color={"#394663"}>
            Set Permission
          </Typography>
          <Typography variant="caption" color={"#737D98"} fontSize={"12px"}>
            Modify what individuals on this role can do
          </Typography>
        </Stack>
        <CheckBox
          name="select_all"
          title="Select All"
          description="Enable or disable all permissions at once."
          isSelectAll
        />
      </Stack>
      <Box sx={{ border: "1px solid #C8D7F7", borderRadius: 1, marginTop: 2 }}>
        <Section
          title="Order Management"
          icon={<BoxIcon color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_order"
          title="Add Order"
          description="Access to add new orders."
        />
        <CheckBox
          name="edit_order"
          title="Edit Order"
          description="Access to modify order details."
        />
        <CheckBox
          name="delete_order"
          title="Delete Order"
          description="Access to remove orders."
        />
        <CheckBox
          name="view_order"
          title="View Order"
          description="Access to see order details."
        />

        <Section
          title="Billing Management"
          icon={<CircleDollarSignIcon color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="view_billing"
          title="View Billing"
          description="Access to see billing details."
        />
        <CheckBox
          name="edit_billing"
          title="Edit billing"
          description="Access to modify billing details."
        />

        <Section
          title="Port Management"
          icon={<Anchor color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_port"
          title="Add Port"
          description="Access to add new ports."
        />
        <CheckBox
          name="edit_port"
          title="Edit Port"
          description="Access to modify port details."
        />
        <CheckBox
          name="delete_port"
          title="Delete Port"
          description="Access to remove ports."
        />
        <CheckBox
          name="view_port"
          title="View Port"
          description="Access to see port details."
        />

        <Section
          title="Driver Management"
          icon={<UserCircle color="#334735" fontSize={25} />} // use suitable icon
        />
        <CheckBox
          name="add_driver"
          title="Add Driver"
          description="Access to add new drivers."
        />
        <CheckBox
          name="edit_driver"
          title="Edit Driver"
          description="Access to modify driver details."
        />
        <CheckBox
          name="delete_driver"
          title="Delete Driver"
          description="Access to remove drivers."
        />
        <CheckBox
          name="view_driver"
          title="View Driver"
          description="Access to see driver details."
        />

        {/* <Section
          title="Dispatch Management"
          icon={<Ship color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_dispatch"
          title="Add Dispatch"
          description="Access to add new dispatch records."
        />
        <CheckBox
          name="edit_dispatch"
          title="Edit Dispatch"
          description="Access to modify dispatch records."
        />
        <CheckBox
          name="delete_dispatch"
          title="Delete Dispatch"
          description="Access to remove dispatch records."
        />
        <CheckBox
          name="view_dispatch"
          title="View Dispatch"
          description="Access to see dispatch records."
        /> */}

        <Section
          title="Customer Management"
          icon={<UsersRound color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_customer"
          title="Add Customer"
          description="Access to add new customers."
        />
        <CheckBox
          name="edit_customer"
          title="Edit Customer"
          description="Access to modify customer details."
        />
        <CheckBox
          name="delete_customer"
          title="Delete Customer"
          description="Access to remove customers."
        />
        <CheckBox
          name="view_customer"
          title="View Customer"
          description="Access to see customer details."
        />

        <Section
          title="Consignors Management"
          icon={<User2 color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_consignors"
          title="Add Consignor"
          description="Access to add new consignors."
        />
        <CheckBox
          name="edit_consignors"
          title="Edit Consignor"
          description="Access to modify consignor details."
        />
        <CheckBox
          name="delete_consignors"
          title="Delete Consignor"
          description="Access to remove consignors."
        />
        <CheckBox
          name="view_consignors"
          title="View Consignor"
          description="Access to see consignor details."
        />

        <Section
          title="Truck Management"
          icon={<Truck color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_truck"
          title="Add Truck"
          description="Access to add new trucks."
        />
        <CheckBox
          name="edit_truck"
          title="Edit Truck"
          description="Access to modify truck details."
        />
        <CheckBox
          name="delete_truck"
          title="Delete Truck"
          description="Access to remove trucks."
        />
        <CheckBox
          name="view_truck"
          title="View Truck"
          description="Access to see truck details."
        />

        <Section
          title="Chassis Management"
          icon={<ToolIcon color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_chassis"
          title="Add Chassis"
          description="Access to add chassis."
        />
        <CheckBox
          name="edit_chassis"
          title="Edit Chassis"
          description="Access to modify chassis details."
        />
        <CheckBox
          name="delete_chassis"
          title="Delete Chassis"
          description="Access to remove chassis."
        />
        <CheckBox
          name="view_chassis"
          title="View Chassis"
          description="Access to see chassis details."
        />

        <Section
          title="Yard Management"
          icon={<User color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_yard"
          title="Add Yard"
          description="Access to add new yards."
        />
        <CheckBox
          name="edit_yard"
          title="Edit Yard"
          description="Access to modify yard details."
        />
        <CheckBox
          name="delete_yard"
          title="Delete Yard"
          description="Access to remove yards."
        />
        <CheckBox
          name="view_yard"
          title="View Yard"
          description="Access to see yard details."
        />

        <Section
          title="Staff Management"
          icon={<Profile2User color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="invite_staff"
          title="Invite Staff"
          description="Access to invite staff,"
        />
        <CheckBox
          name="delete_staff"
          title="Delete Staff"
          description="Access to delete staff details,"
        />

        <Section
          title="Others Management"
          icon={<MdManageAccounts color="#334735" fontSize={25} />}
        />
        <CheckBox
          name="add_edit_role"
          title="Add Edit Role"
          description="Access to add and edit role  details,"
        />
      </Box>
    </Modal>
  );
};

export default CreateRolePermission;
