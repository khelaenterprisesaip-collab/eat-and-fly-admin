import { useState } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import Page from "components/ui/PageLayout";
import MainCard from "components/MainCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeButton from "components/ui/Button";
import { Filter } from "iconsax-react";
import { debounce } from "lodash";
import { PlusIcon } from "assets/svg/upload/PlusIcon";
import CustomerTable from "./table";
import { Import } from "lucide-react";
import { useRole } from "hooks/useAuth";

const CustomerMainPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [drawer, setDrawer] = useState(false);
  const {
    permission: { add_customer },
  }: any = useRole();

  const debouncedSearch = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Page
        title="All Customers"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/customers/uploadCsv">
              <ThemeButton
                variant="contained"
                size="small"
                startIcon={<Import />}
              >
                Bulk Import
              </ThemeButton>
            </Link>
            {add_customer && (
              <Link to="/customer/add">
                <ThemeButton
                  variant="contained"
                  size="small"
                  startIcon={!isMobile && <PlusIcon />}
                >
                  {isMobile ? <PlusIcon /> : "Add  Customer"}
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
        <MainCard
          content={false}
          headerSX={{ p: 0 }}
          title={
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack
                direction={"row"}
                alignItems={"end"}
                justifyContent={"end"}
                gap={2}
                width={" 33%"}
              ></Stack>
            </Stack>
          }
        >
          <CustomerTable
            searchText={searchText}
            drawer={drawer}
            setDrawer={setDrawer}
          />
        </MainCard>
      </Page>
    </div>
  );
};

export default CustomerMainPage;
