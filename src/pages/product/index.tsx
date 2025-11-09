import React, { useState } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import Page from "components/ui/PageLayout";
import { TabContext } from "@mui/lab";
import MainCard from "components/MainCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeButton from "components/ui/Button";
import { Filter } from "iconsax-react";
import { debounce } from "lodash";

import { PlusIcon } from "assets/svg/upload/PlusIcon";
import ProductTable from "./table";

const ProductMainPage = () => {
  function getPathIndex(pathname: string) {
    let selectedTab = "";
    switch (pathname) {
      case "/staff/active":
        selectedTab = "active";
        break;

      case "/staff/inactive":
        selectedTab = "inactive";
        break;

      case "/staff/awaiting":
        selectedTab = "awaiting";
        break;

      case "":
      default:
        selectedTab = "active";
    }
    return selectedTab;
  }
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(getPathIndex(pathname));
  const [searchText, setSearchText] = useState("");
  const [drawer, setDrawer] = useState(false);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string,
    route: any
  ) => {
    setValue(newValue);
    navigate(route);
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  // const tabs = [
  //   {
  //     label: "active",
  //     value: "active",
  //     content: (
  //       <ProductTable
  //         value={value}
  //         searchText={searchText}
  //         drawer={drawer}
  //         setDrawer={setDrawer}
  //       />
  //     ),
  //     route: "/staff/active",
  //   },

  //   {
  //     label: "Inactive",
  //     value: "inactive",
  //     content: (
  //       <ProductTable
  //         value={value}
  //         searchText={searchText}
  //         drawer={drawer}
  //         setDrawer={setDrawer}
  //       />
  //     ),
  //     route: "/staff/inactive",
  //   },
  // ];

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Page
        title="Products"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/product/add">
              <ThemeButton
                variant="contained"
                size="small"
                startIcon={!isMobile && <PlusIcon />}
              >
                {isMobile ? <PlusIcon /> : "Add  Product"}
              </ThemeButton>
            </Link>

            <ThemeButton
              variant="outlined"
              size="small"
              startIcon={<Filter size="32" variant="TwoTone" />}
              onClick={() => {
                setDrawer(true);
              }}
            >
              Filter
            </ThemeButton>
          </Stack>
        }
      >
        <TabContext value={value}>
          <MainCard
            content={false}
            headerSX={{ p: 0 }}
            title={
              <></>
              // <Stack
              //   direction={"row"}
              //   alignItems={"center"}
              //   justifyContent={"space-between"}
              // >
              //   <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              //     <TabList
              //       onChange={(e, value) => {
              //         const route = tabs.find(
              //           (tab) => tab?.value === value
              //         )?.route;
              //         handleChange(e, value, route);
              //       }}
              //       aria-label="lab API tabs example"
              //     >
              //       {tabs?.map((tab) => (
              //         <Tab
              //           key={tab.value}
              //           label={tab.label}
              //           value={tab.value}
              //         />
              //       ))}
              //     </TabList>
              //   </Box>
              // </Stack>
            }
          >
            <ProductTable
              value={value}
              searchText={searchText}
              drawer={drawer}
              setDrawer={setDrawer}
            />
          </MainCard>
        </TabContext>
      </Page>
    </div>
  );
};

export default ProductMainPage;
