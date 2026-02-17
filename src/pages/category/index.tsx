import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import Page from "components/ui/PageLayout";
import MainCard from "components/MainCard";
import { Link } from "react-router-dom";
import ThemeButton from "components/ui/Button";
import { PlusIcon } from "assets/svg/upload/PlusIcon";
import CategoryTable from "./table";

const CategoryMainPage = () => {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

    return (
        <div>
            <Page
                title="Categories"
                primaryAction={
                    <Stack direction="row" spacing={1}>
                        <Link to="/category/add">
                            <ThemeButton
                                variant="contained"
                                size="small"
                                startIcon={!isMobile && <PlusIcon />}
                            >
                                {isMobile ? <PlusIcon /> : "Add Category"}
                            </ThemeButton>
                        </Link>
                    </Stack>
                }
            >
                <MainCard content={false} headerSX={{ p: 0 }}>
                    <CategoryTable />
                </MainCard>
            </Page>
        </div>
    );
};

export default CategoryMainPage;
