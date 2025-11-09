import React from "react";
import NavLink from "@mui/material/Link";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { MdOutlineChevronRight } from "react-icons/md";
import { useLocation, Link, matchPath } from "react-router-dom";

interface BreadcrumbConfig {
  name: string;
  path: string;
  disabled?: boolean;
}

type BreadcrumbMap = Record<string, BreadcrumbConfig[]>;

const breadcrumbConfig: BreadcrumbMap = {
  "/dashboard": [{ name: "Dashboard", path: "/dashboard" }],
  "/profile/detail": [{ name: "Profile", path: "/profile/detail" }],
  "/profile/changePassword": [
    { name: "Change Password", path: "/profile/changePassword" },
  ],
  "/profile/schoolCommission": [
    { name: "School Commissions", path: "/profile/schoolCommission" },
  ],
  "/profile/manageStaff": [
    { name: "Manage Staff", path: "/profile/manageStaff" },
  ],
  "/profile/notification": [
    { name: "Notification Settings", path: "/profile/notification" },
  ],
  "/profile/roleManager": [
    { name: "User Role Manager", path: "/profile/roleManager" },
  ],

  // trucks start

  "/trucks": [{ name: "Trucks", path: "/trucks" }],
  "/trucks/all": [{ name: "All Trucks", path: "/trucks/all" }],
  "/trucks/laval": [{ name: "Laval Trucks", path: "/trucks/laval" }],
  "/trucks/dorval": [{ name: "Dorval Trucks", path: "/trucks/dorval" }],
  "/trucks/add": [
    { name: "All Trucks", path: "/trucks/all" },
    { name: "Add Truck", path: "/trucks/add" },
  ],

  "/trucks/:truck_id": [
    { name: "All Trucks", path: "/trucks/all" },
    { name: "Update Truck", path: "/trucks/truck_id" },
  ],

  "/trucks/uploadCsv": [
    { name: "All Trucks", path: "/trucks/all" },
    { name: "Upload csv", path: "trucks/uploadCsv" },
  ],

  // trucks end

  // port start

  "/port": [{ name: "Ports", path: "/port" }],
  "/port/:id": [{ name: "Update port / depots", path: "/port/:id" }],
  "/port/add": [{ name: "Add port / depots", path: "/port/add" }],
  depots: [{ name: "Depots", path: "/depots" }],

  // port end

  // driver start

  "/driver": [{ name: "Driver", path: "/driver" }],

  // driver end

  // chassis end

  "/chassis": [{ name: "Chassis", path: "/chassis" }],
  "/chassis/all": [{ name: "All Chassis", path: "/chassis/all" }],
  "/chassis/laval": [{ name: "Laval Chassis", path: "/chassis/laval" }],
  "/chassis/dorval": [{ name: "Dorval Chassis", path: "/chassis/dorval" }],
  "/chassis/add": [
    { name: "All Chassis", path: "/chassis/all" },
    { name: "Add Chassis", path: "/chassis/add" },
  ],

  "/chassis/:chassis_id": [
    { name: "All Chassis", path: "/chassis/all" },
    { name: "Update Chassis", path: "/chassis/chassis_id" },
  ],

  "chassis/uploadCsv": [
    { name: "All Chassis", path: "/chassis/all" },
    { name: "Upload csv", path: "chassis/uploadCsv" },
  ],

  // chassis end
  "/invoice": [{ name: "Invoice", path: "/invoice" }],
  "/invoice/all": [{ name: "All Invoices", path: "/invoice/all" }],
  "/invoice/paid": [{ name: "Paid Invoices", path: "/invoice/paid" }],
  "/invoice/pending": [{ name: "Pending Invoices", path: "/invoice/pending" }],
  "/staff": [{ name: "Staff", path: "/staff" }],
  "/staff/all": [{ name: "All Staff", path: "/staff/all" }],
  "/staff/active": [{ name: "Active Staff", path: "/staff/active" }],
  "/staff/awaiting": [{ name: "Awaiting Staff", path: "/staff/awaiting" }],
  "/staff/inactive": [{ name: "Inactive Staff", path: "/staff/inactive" }],
  "/staff/add": [
    { name: "Staffs", path: "/staff" },
    { name: "Add Staff", path: "/staff/add" },
  ],

  // consigonrs start here

  "/consignors": [{ name: "All Consignors", path: "/consignors" }],
  "/consignors/consignee": [
    { name: "Consignee", path: "/consignors/consignee" },
  ],
  "/consignors/shipper": [{ name: "Shipper", path: "/consignors/shipper" }],
  "/consignors/add": [
    { name: "All Consignors", path: "/consignors" },
    { name: "Add consignors", path: "/consignors/add" },
  ],

  "/consignors/:consignorId": [
    { name: "All Consignors", path: "/consignors" },
    { name: "Update consignors", path: "/consignors/:consignorId" },
  ],
  // consigonrs end here

  // yard start
  "/yards": [{ name: "Yards", path: "/yards" }],
  "/yards/add": [
    { name: "Yards", path: "/yards" },
    { name: "Add Yard", path: "/yards/add" },
  ],

  "/yards/:yard_id": [
    { name: "Yards", path: "/yards" },
    { name: "Update Yard", path: "/yards/:yard_id" },
  ],

  "yards/uploadCsv": [
    { name: "Yards", path: "/yards" },
    { name: "Upload csv", path: "yards/uploadCsv" },
  ],

  // yard end

  // customer start

  "/customers": [{ name: "Customers", path: "/customers" }],
  "/customer/add": [
    { name: "Customers", path: "/customers" },
    { name: "Add Customer", path: "/customer/add" },
  ],

  "/customer/:customerId": [
    { name: "Customers", path: "/customers" },
    { name: "Update Customer", path: "/customer/:customerId" },
  ],

  "/customers/uploadCsv": [
    { name: "Customers", path: "/customers" },
    { name: "Upload csv", path: "/customers/uploadCsv" },
  ],

  // customer end

  "/order": [{ name: "Orders", path: "/order" }],
  "/dispatch/all": [{ name: "All Orders", path: "/dispatch/all" }],
  "/dispatch/upcoming": [
    { name: "Upcoming Orders", path: "/dispatch/upcoming" },
  ],
  "/dispatch/progress": [
    { name: "Orders in Progress", path: "/dispatch/progress" },
  ],
  "/dispatch/completed": [
    { name: "Completed Orders", path: "/dispatch/completed" },
  ],
  "/dispatch/yard": [{ name: "Yard Orders", path: "/dispatch/yard" }],
  "/dispatch/arrived-at-customer": [
    { name: "Arrived at Customer", path: "/dispatch/arrived-at-customer" },
  ],

  "/dispatch/on_hold": [{ name: "On Hold Orders", path: "/dispatch/on_hold" }],
  "/dispatch/custom-location": [
    { name: "Custom Location Orders", path: "/dispatch/custom-location" },
  ],
  "/dispatch/pre-pull": [
    { name: "Pre-Pull Orders", path: "/dispatch/pre-pull" },
  ],
  "/dispatch/lfd": [{ name: "LFD Orders", path: "/dispatch/lfd" }],
  "/dispatch/cut-off": [{ name: "Cut-Off Orders", path: "/dispatch/cut-off" }],
  "/dispatch": [{ name: "Dispatch", path: "/dispatch" }],

  "/dispatch/:dispatchId/loadInfo": [
    { name: "Load Info", path: "/dispatch/:dispatchId/loadInfo" },
  ],
  "/dispatch/:dispatchId/billing": [
    { name: "Billing", path: "/dispatch/:dispatchId/billing" },
  ],
  "/dispatch/:dispatchId/documents": [
    { name: "Documents", path: "/dispatch/:dispatchId/documents" },
  ],
  "/dispatch/:dispatchId/payments": [
    { name: "Payments & Credits", path: "/dispatch/:dispatchId/payments" },
  ],
  "/dispatch/:dispatchId/routing": [
    { name: "Routing", path: "/dispatch/:dispatchId/routing" },
  ],
  "/dispatch/:dispatchId/driverPay": [
    { name: "Driver Pay & Expenses", path: "/dispatch/:dispatchId/driverPay" },
  ],
  "/dispatch/:dispatchId/tracking": [
    { name: "Tracking", path: "/dispatch/:dispatchId/tracking" },
  ],
  "/dispatch/:dispatchId/communication": [
    { name: "Communication", path: "/dispatch/:dispatchId/communication" },
  ],
  "/dispatch/:dispatchId/audit": [
    { name: "Audit", path: "/dispatch/:dispatchId/audit" },
  ],
  "/dispatch/:dispatchId/notes": [
    { name: "Notes", path: "/dispatch/:dispatchId/notes" },
  ],
};

const getBreadcrumbConfig = (
  path: string,
  config: BreadcrumbMap
): BreadcrumbConfig[] => {
  const cleanPath = path.split("?")[0];
  const matchedRoute = Object.keys(config).find((route) =>
    matchPath(route, cleanPath)
  );
  return matchedRoute ? config[matchedRoute] : [];
};

const CustomBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const routeConfig = getBreadcrumbConfig(currentPath, breadcrumbConfig);
  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="home"
      color="inherit"
      component={Link}
      to="/"
    >
      Home
    </NavLink>,
    ...routeConfig?.map((crumb, index) => {
      const isLast = index === routeConfig.length - 1;
      const disabled = crumb.disabled ?? isLast;

      return disabled ? (
        <Typography
          key={crumb.path}
          sx={{
            fontSize: "14px",
            color: "rgb(65, 80, 93)",
            fontWeight: 600,
          }}
        >
          {crumb.name}
        </Typography>
      ) : (
        <NavLink
          underline="hover"
          key={crumb.path}
          color="inherit"
          component={Link}
          to={crumb.path}
          sx={{
            fontSize: "14px",
            color: "rgb(91, 107, 121)",
            fontWeight: 600,
          }}
        >
          {crumb?.name}
        </NavLink>
      );
    }),
  ];

  return (
    <MuiBreadcrumbs
      separator={<MdOutlineChevronRight />}
      aria-label="breadcrumb"
      sx={{
        fontSize: "14px",
        color: "rgb(91, 107, 121)",
        fontWeight: 600,
      }}
      style={{
        paddingTop: 0,
      }}
    >
      {breadcrumbs}
    </MuiBreadcrumbs>
  );
};

export default CustomBreadcrumbs;
