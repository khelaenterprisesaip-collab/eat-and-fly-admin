import { FormattedMessage } from "react-intl";
import {
  Box,
  BoxTime,
  DiscountShape,
  DollarCircle,
  I24Support,
  People,
  Profile2User,
  Receipt,
  ReceiptText,
  SearchNormal1,
  Truck,
  User,
} from "iconsax-react";
import Recruiter from "../../public/svg/recruiter";
import HomeIcon from "assets/svg/HomeIcon";
import { ToolIcon } from "assets/svg/tool";
import { ScrollText, ShoppingCart } from "lucide-react";

const icons = {
  maintenance: "",
  contactus: I24Support,
  applications: Receipt,
  college: ReceiptText,
  student: Profile2User,
  recruiter: Recruiter,
  dashboard: HomeIcon,
  search: SearchNormal1,
  payment: DollarCircle,
  coupon: DiscountShape,
  inquires: User,
  invoice: ScrollText,
  user: User,
  truck: Truck,
  chassis: ToolIcon,
  order: BoxTime,
  dispatch: Box,
  Consignees: Box,
  customer: People,
  staff: ShoppingCart,
};

// ==============================|| xMENU ITEMS - PAGES ||============================== //

const pages: any = {
  id: "group-pages",
  title: <FormattedMessage id="pages" />,
  type: "group",
  children: [
    {
      id: "Dashboard",
      title: <FormattedMessage id="Dashboard" />,
      type: "item",
      url: "/dashboard",
      icon: icons?.dashboard,
    },
    {
      id: "STAFF",
      title: <FormattedMessage id="Staff" />,
      type: "item",
      url: "/staff",
      icon: icons.student,
      activeIcon: icons.student,
    },
    {
      id: "PRODUCT",
      title: <FormattedMessage id="Product" />,
      type: "item",
      url: "/products",
      icon: icons.staff,
      activeIcon: icons.staff,
    },
    {
      id: "CUSTOMERS",
      title: <FormattedMessage id="Customers" />,
      type: "item",
      url: "/customers",
      icon: icons.customer,
      activeIcon: icons.customer,
    },
    {
      id: "INVOICES",
      title: <FormattedMessage id="Invoices" />,
      type: "item",
      url: "/invoices",
      icon: icons.invoice,
      activeIcon: icons.invoice,
    },
    {
      id: "CHASSIS",
      title: <FormattedMessage id="Chassis" />,
      type: "item",
      url: "/chassis",
      icon: icons.chassis,
      activeIcon: icons.chassis,
    },
  ],
};

export default pages;
