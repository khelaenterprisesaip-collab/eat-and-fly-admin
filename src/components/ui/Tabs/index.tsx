import { Box, styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as TabPanel } from "@mui/base/TabPanel";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { Typography } from "@mui/material";

interface TabProps {
  count: any;
  value: string | number;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CustomTabs({ tabs, value, onChange }: any) {
  return (
    <Tabs value={value} onChange={onChange}>
      <TabsList>
        {tabs.map((tab: TabProps) => (
          <Tab
            value={tab.value}
            sx={{
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              minWidth: { xs: "auto", sm: "140px" },
            }}
          >
            <Box
              component="span"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {tab.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "11px", sm: "13px" },
              }}
            >
              {tab.label}
            </Typography>

            <Typography
              ml={0.4}
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "11px", sm: "13px" },
                bgcolor: "#F9FAFB",
                borderRadius: 4,
                border: "1px solid #EAECF0",
                px: 1,
              }}
            >
              {`+ ${tab?.count}`}
            </Typography>
          </Tab>
        ))}
      </TabsList>
      {tabs.map((tab: TabProps) => (
        <TabPanel value={tab.value}>{tab.content}</TabPanel>
      ))}
    </Tabs>
  );
}

const Tab = styled(BaseTab)`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  color: #525e71 !important;
  background-color: transparent;
  min-width: 140px;
  padding: 4px 12px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none; /* Remove border */

  &:hover {
    color: #525e71 !important;
  }

  &:focus {
    color: #525e71 !important;
  }

  &.${tabClasses.selected} {
    color: #334735 !important;
    font-weight: 600;
    border-bottom: 2px solid #334735; /* Show bottom border for selected tab */
  }
`;

const TabsList = styled(BaseTabsList)`
  min-width: 400px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  align-content: space-between;
  border-bottom: 1px solid #c8d7f7; /* Add bottom border to TabsList */

  @media (max-width: 600px) {
    min-width: 100%; /* Make tabs container full width on small screens */
  }
`;
