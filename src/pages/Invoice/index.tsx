import { useState } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import Page from "components/ui/PageLayout";
import MainCard from "components/MainCard";
import { Link, useNavigate } from "react-router-dom";
import ThemeButton from "components/ui/Button";
import { Filter } from "iconsax-react";
import { debounce } from "lodash";
import { PlusIcon } from "assets/svg/upload/PlusIcon";
import InvoiceTable from "./table";

const InvoiceMainPage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [drawer, setDrawer] = useState(false);
  const debouncedSearch = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Page
        title="Invoices"
        primaryAction={
          <Stack direction="row" spacing={1}>
            <Link to="/invoice/create">
              <ThemeButton
                variant="contained"
                size="small"
                startIcon={!isMobile && <PlusIcon />}
              >
                {isMobile ? <PlusIcon /> : "Create Invoice"}
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
        <MainCard content={false} headerSX={{ p: 0 }}>
          <InvoiceTable
            searchText={searchText}
            drawer={drawer}
            setDrawer={setDrawer}
          />
        </MainCard>
      </Page>
    </div>
  );
};

export default InvoiceMainPage;
