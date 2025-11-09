import React from "react";
import {
  Drawer,
  Stack,
  Typography,
  SvgIcon,
  Divider,
  Box,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const FilterDrawer = ({
  drawer,
  setDrawer,
  tabs,
  filterValue,
  handleChange,
}: any) => {
  return (
    <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="right">
      <Stack sx={{ width: 300 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={2.4}
          px={2}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filter (Hide/Show Columns)
          </Typography>
          <div onClick={() => setDrawer(false)}>
            <SvgIcon sx={{ width: 20, cursor: "pointer" }}>
              <CloseIcon />
            </SvgIcon>
          </div>
        </Stack>
        <Divider />
        <TabContext value={filterValue}>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Filter Tabs">
              {tabs.map((tab: any) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Box>
          {tabs.map((tab: any) => (
            <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
              {tab.content}
            </TabPanel>
          ))}
        </TabContext>
      </Stack>
    </Drawer>
  );
};

export default FilterDrawer;
