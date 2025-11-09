import { useState } from "react";
import RevenueDashboard from "./analytics/revenue-summary";
import MainDashboard from "./main";
import { Button, Card, Tab, Tabs } from "@mui/material";
import OrderVolumeDashboard from "./analytics/order-volume";
const tabs = [
  {
    label: "Main",
    content: <MainDashboard />,
  },
  {
    label: "Analytics",
  },
];

const tabLabels = [
  {
    label: "Revenue Scorecard",
    content: <RevenueDashboard />,
  },
  {
    label: "Order Volume",
    content: <OrderVolumeDashboard />,
  },
  {
    label: "Volume Summary",
  },
  {
    label: "Customer Scorecard",
  },
  {
    label: "Customer KPI/AR",
  },
  {
    label: "Customer Volume",
  },
  {
    label: "Cust SC Rolling",
  },
  {
    label: "Top 10/20",
  },
  {
    label: "Lane Macro View",
  },
  {
    label: "Lane Pricing",
  },
  {
    label: "Non Invoiced",
  },
  {
    label: "Invoice and Billing Cycle",
  },
  {
    label: "Invoice Summary",
  },
];

export default function Dashboard() {
  const [tab, setTab] = useState(tabs[0]);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      {/* <div className="!mb-2">
        {tabs?.map((item, index) => (
          <Button
            key={index}
            variant={tab.label === item.label ? "contained" : "outlined"}
            color="primary"
            onClick={() => {
              setTab(item);
              if (item.label === "Analytics") {
                setSelectedTab(0);
                setTab({
                  label: "Analytics",
                  content: <RevenueDashboard />,
                });
              }
            }}
            className="!text-sm !px-4 !py-2 !mr-2  !rounded-md"
          >
            {item.label}
          </Button>
        ))}
      </div>
      {tab.label === "Analytics" ? (
        <div className="py-2">
          <Card
            elevation={2}
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              className="px-4"
              sx={{
                "& .MuiTab-root": {
                  minWidth: "auto",
                  fontSize: "0.75rem",
                  textTransform: "none",
                  color: "#64748b",
                  "&.Mui-selected": {
                    color: "#1e40af",
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#1e40af",
                },
              }}
            >
              {tabLabels.map((label, index) => (
                <Tab
                  key={index}
                  label={label.label}
                  onClick={() => {
                    setTab({
                      label: "Analytics",
                      content: label?.content || <>Working...</>,
                    });
                    setSelectedTab(index);
                  }}
                />
              ))}
            </Tabs>
          </Card>
        </div>
      ) : (
        <></>
      )}
      {tab.content} */}
    </>
  );
}
