import { lazy } from "react";
// project-imports
import Loadable from "components/Loadable";
import PagesLayout from "layout/Pages";
import DashboardLayout from "layout/Dashboard";
import BulkImport from "components/csvupload/bulkImport";

import {
  CustomerCsvTable,
  ToolCsvTable,
} from "components/csvupload/previewData/columns";
import { UploadCustomerCsv, ValidateCustomerCsv } from "services/customer";
import { UploadToolCsv, ValidateToolCsv } from "services/chassis";

import StaffMainPage from "pages/Staff";
import ProductMainPage from "pages/product";
import AddProduct from "pages/product/product";
import CreateInvoice from "pages/Invoice/createInvoice";
import InvoiceMainPage from "pages/Invoice";

const MaintenanceError = Loadable(
  lazy(() => import("pages/maintenance/error/404"))
);
const MaintenanceError500 = Loadable(
  lazy(() => import("pages/maintenance/error/500"))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import("pages/maintenance/under-construction/under-construction"))
);
const MaintenanceComingSoon = Loadable(
  lazy(() => import("pages/maintenance/coming-soon/coming-soon"))
);
const SamplePage = Loadable(
  lazy(() => import("pages/extra-pages/sample-page"))
);

const CustomerMainPage = Loadable(lazy(() => import("pages/Customer")));
const AddCustomer = Loadable(lazy(() => import("pages/Customer/addCustomer")));

const ChassisMainPage = Loadable(lazy(() => import("pages/chassis")));
const AddChassis = Loadable(lazy(() => import("pages/chassis/addchassis")));
const AddStaff = Loadable(lazy(() => import("pages/Staff/addStaff")));

const Profile = Loadable(lazy(() => import("pages/userProfile")));

const ProfileInformation = Loadable(
  lazy(() => import("pages/userProfile/profileDetail"))
);
const ChangePassword = Loadable(
  lazy(() => import("pages/userProfile/changePassword"))
);
const ManageStaff = Loadable(
  lazy(() => import("pages/userProfile/manageStaff"))
);
const RoleManager = Loadable(
  lazy(() => import("pages/userProfile/roleManager"))
);

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes: any = {
  path: "/",
  children: [
    {
      path: "/",
      element: <DashboardLayout allowPermission={"allow_both"} />,
      children: [
        {
          path: "/dashboard",
          element: <SamplePage />,
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout allowPermission={"view_chassis"} />,

      children: [
        {
          path: "chassis",
          element: <ChassisMainPage />,
        },
        {
          path: "/chassis/all",
          element: <ChassisMainPage />,
        },
        {
          path: "/chassis/laval",
          element: <ChassisMainPage />,
        },
        {
          path: "/chassis/dorval",
          element: <ChassisMainPage />,
        },

        {
          path: "chassis/add",
          element: <AddChassis />,
        },

        {
          path: "chassis/:chassis_id",
          element: <AddChassis />,
        },
        {
          path: "chassis/uploadCsv",
          element: (
            <BulkImport
              title="Upload chassis csv"
              subtitle={"chassis"}
              validateService={ValidateToolCsv}
              uploadCsv={UploadToolCsv}
              redirectPath="/chassis"
              csvTable={ToolCsvTable}
              csvFile="chassis.csv"
            />
          ),
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout allowPermission={"allow_both"} />,

      children: [
        {
          path: "staff",
          element: <StaffMainPage />,
        },
        {
          path: "/staff/active",
          element: <StaffMainPage />,
        },

        {
          path: "/staff/inactive",
          element: <StaffMainPage />,
        },
        {
          path: "/staff/awaiting",
          element: <StaffMainPage />,
        },

        {
          path: "/staff/add",
          element: <AddStaff />,
        },
        {
          path: "/staff/update/:staffId",
          element: <AddStaff />,
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout allowPermission={"allow_both"} />,

      children: [
        {
          path: "products",
          element: <ProductMainPage />,
        },
        // {
        //   path: "/staff/active",
        //   element: <ProductMainPage />,
        // },

        // {
        //   path: "/staff/inactive",
        //   element: <ProductMainPage />,
        // },
        // {
        //   path: "/staff/awaiting",
        //   element: <StaffMainPage />,
        // },

        {
          path: "/product/add",
          element: <AddProduct />,
        },
        {
          path: "/product/update/:productId",
          element: <AddProduct />,
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout allowPermission={"allow_both"} />,

      children: [
        {
          path: "invoices",
          element: <InvoiceMainPage />,
        },
        {
          path: "/invoice/create",
          element: <CreateInvoice />,
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout allowPermission={"view_customer"} />,

      children: [
        {
          path: "customers",
          element: <CustomerMainPage />,
        },

        {
          path: "customer/add",
          element: <AddCustomer />,
        },
        {
          path: "customer/:customerId",
          element: <AddCustomer />,
        },
        {
          path: "customers/uploadCsv",
          element: (
            <BulkImport
              title="Upload csv"
              subtitle={"Customer"}
              validateService={ValidateCustomerCsv}
              uploadCsv={UploadCustomerCsv}
              redirectPath="/customers"
              csvTable={CustomerCsvTable}
              csvFile="customer.csv"
            />
          ),
        },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout allowPermission={"allow_both"} />,
      children: [
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "detail",
              element: <ProfileInformation />,
            },
            {
              path: "changePassword",
              element: <ChangePassword />,
            },
            {
              path: "manageStaff",
              element: <ManageStaff />,
            },
            {
              path: "roleManager",
              element: <RoleManager />,
            },
          ],
        },
      ],
    },
    {
      path: "/maintenance",
      element: <PagesLayout />,
      children: [
        {
          path: "404",
          element: <MaintenanceError />,
        },
        {
          path: "500",
          element: <MaintenanceError500 />,
        },
        {
          path: "under-construction",
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: "coming-soon",
          element: <MaintenanceComingSoon />,
        },
      ],
    },

    { path: "*", element: <MaintenanceError /> },
  ],
};

export default MainRoutes;
