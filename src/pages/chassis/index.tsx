import React, { useState } from "react";
import { Box, Stack, Tab, useMediaQuery } from "@mui/material";
import Page from "components/ui/PageLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MainCard from "components/MainCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeButton from "components/ui/Button";
import { Filter } from "iconsax-react";
import { debounce } from "lodash";
import TruckTable from "./table";
import { PlusIcon } from "assets/svg/upload/PlusIcon";
import ChassisTable from "./table";
import { Import } from "lucide-react";
import { useRole } from "hooks/useAuth";

const ChassisMainPage = () => {
  const {
    permission: { add_chassis },
  }: any = useRole();
  function getPathIndex(pathname: string) {
    let selectedTab = "";
    switch (pathname) {
      case "/chassis/all":
        selectedTab = "all";
        break;

      case "/chassis/laval":
        selectedTab = "laval";
        break;

      case "/chassis/dorval":
        selectedTab = "dorval";
        break;
      case "":
      default:
        selectedTab = "all";
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

  console.log("helo");

  const tabs = [
    {
      label: "All",
      value: "all",
      content: (
        <ChassisTable
          value={value}
          searchText={searchText}
          drawer={drawer}
          setDrawer={setDrawer}
        />
      ),
      route: "/chassis/all",
    },
    {
      label: "Laval",
      value: "laval",
      content: (
        <ChassisTable
          value={value}
          searchText={searchText}
          drawer={drawer}
          setDrawer={setDrawer}
        />
      ),
      route: "/chassis/laval",
    },
    {
      label: "Dorval",
      value: "dorval",
      content: (
        <ChassisTable
          value={value}
          searchText={searchText}
          drawer={drawer}
          setDrawer={setDrawer}
        />
      ),
      route: "/chassis/dorval",
    },
  ];

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Page
        title="All chassis"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/chassis/uploadCsv">
              <ThemeButton
                variant="contained"
                size="small"
                startIcon={<Import />}
              >
                Bulk Import
              </ThemeButton>
            </Link>
            {add_chassis && (
              <Link to="/chassis/add">
                <ThemeButton
                  variant="contained"
                  size="small"
                  startIcon={!isMobile && <PlusIcon />}
                >
                  {isMobile ? <PlusIcon /> : "Add  Chassis"}
                </ThemeButton>
              </Link>
            )}
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
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                  <TabList
                    onChange={(e, value) => {
                      const route = tabs.find(
                        (tab) => tab?.value === value
                      )?.route;
                      handleChange(e, value, route);
                    }}
                    aria-label="lab API tabs example"
                  >
                    {tabs?.map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    ))}
                  </TabList>
                </Box>
              </Stack>
            }
          >
            {tabs?.map((tab) => (
              <TabPanel key={tab?.value} value={tab?.value} sx={{ p: 0 }}>
                {tab?.content}
              </TabPanel>
            ))}
          </MainCard>
        </TabContext>
      </Page>
    </div>
  );
};

export default ChassisMainPage;
