import Table from "components/ui/Table";
import { Box, Chip, Grid, Stack, Tab, Badge, Typography } from "@mui/material";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MainCard from "components/MainCard";
// import { bulkUpdate } from "services/institute";
import { openSnackbar } from "api/snackbar";
import { useLocation } from "react-router";
import ThemeButton from "components/ui/Button";
import * as XLSX from "xlsx";

const PreviewData = ({
  handleNext,
  handleBack,
  setBulkData,
  bulkData,
  csvTable,
  redirectPath,
  allTable,
  successTable,
  errorTable,
  fileType,
}: any) => {
  console.log("fileType", fileType);
  const [value, setValue] = useState("all");
  const { pathname } = useLocation();
  const isUpdate = [`/institutes/bulkUpdate`]?.includes(pathname);
  const isProgram = ["/institutes/bulkProgram"]?.includes(pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const importedData = [
    ...bulkData?.errors?.map((val: any) => ({
      ...(val?.value ?? {}),
      errors: val?.errors,
      error: true,
    })),
    ...(bulkData?.data?.map((val: any) => ({
      ...val,
      success: true,
    })) || []),
  ];
  const errorRecords = bulkData?.errors?.map((val: any) => val?.value);
  let errors: any = [];
  bulkData?.errors?.map((val: any, idx: any) => {
    errors?.push({
      index: idx?.toString(),
      error: val?.errors?.map((val: any) => val?.message),
    });
  });

  console.log("helloqwlsk", importedData, errorRecords);

  const getTotalRecords = () => {
    if (value === "all") {
      return importedData?.length;
    } else if (value === "error") {
      return errorRecords?.length;
    } else {
      return bulkData?.data?.length;
    }
  };

  console.log("allTable", allTable);

  const tabs = [
    {
      label: (
        <Stack direction="row" alignItems="center" gap={2}>
          <span>All</span>
          <Badge
            variant="light"
            color={value === "all" ? "primary" : "secondary"}
            badgeContent={importedData?.length ?? 0}
          />
        </Stack>
      ),
      value: "all",
      content: (
        <Box
          sx={{
            "& .MuiPaper-rounded": { borderRadius: 0 },
          }}
        >
          <Table data={importedData} columns={allTable} />
        </Box>
      ),
    },
    {
      label: (
        <Stack direction="row" alignItems="center" gap={2}>
          <span>Error</span>
          <Badge
            variant="light"
            color={value === "error" ? "error" : "secondary"}
            badgeContent={errorRecords?.length ?? 0}
          />
        </Stack>
      ),
      value: "error",
      content: (
        <Box
          sx={{
            "& .MuiPaper-rounded": { borderRadius: 0 },
          }}
        >
          <Table data={errorRecords} columns={errorTable} />
        </Box>
      ),
    },
    {
      label: (
        <Stack direction="row" alignItems="center" gap={2}>
          <span>Success</span>
          <Badge
            variant="light"
            color={value === "success" ? "success" : "secondary"}
            badgeContent={bulkData?.data?.length || 0}
          />
        </Stack>
      ),
      value: "success",
      content: (
        <Box
          sx={{
            "& .MuiPaper-rounded": { borderRadius: 0 },
          }}
        >
          <Table
            data={bulkData?.data?.map((val: any) => val) || []}
            columns={successTable}
          />
        </Box>
      ),
    },
  ];

  const uploadCorrectEntries = () => {
    // bulkUpdate({
    //   body: { records: bulkData?.data?.map((val: any) => val?.data) },
    // })?.then((res: any) => {
    //   if (res?.inserted == bulkData?.data?.length) {
    //     openSnackbar({
    //       open: true,
    //       message: `Imported ${res?.inserted} ${res?.inserted == 0 ? "record" : "records"} successfully!`,
    //       variant: "alert",
    //       alert: {
    //         color: "success",
    //       },
    //     } as any);
    //     handleNext();
    //   } else {
    //     setBulkData(res);
    //     openSnackbar({
    //       open: true,
    //       message: `Error in ${res?.errors?.length || 0} ${res?.errors?.length == 1 ? "record" : "records"}`,
    //       variant: "alert",
    //       alert: {
    //         color: "error",
    //       },
    //     } as any);
    //   }
    // });
  };

  const downloadWrongRecordsExcel = (fileType: "csv" | "xlsx" | "xls") => {
    const selectedHeaders = allTable
      ?.map((col: any) => col.accessorKey)
      .filter(Boolean);

    const data = errorRecords?.map((record: any) =>
      selectedHeaders.map((header: string) => record[header] || "")
    );

    const worksheet = XLSX.utils.aoa_to_sheet([selectedHeaders, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Wrong Records");

    let fileExtension: any = fileType === "csv" ? "csv" : "xlsx";
    let mimeType =
      fileType === "csv"
        ? "text/csv;charset=utf-8;"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    const blob = new Blob(
      [
        fileType === "csv"
          ? XLSX.utils.sheet_to_csv(worksheet)
          : XLSX.write(workbook, { bookType: fileExtension, type: "array" }),
      ],
      { type: mimeType }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `wrong_records.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Grid xs={12}>
      <Box px={4}>
        <TabContext value={value}>
          {bulkData?.errors?.length > 0 && (
            <Stack gap={1} direction={"row"}>
              <Chip
                color="error"
                variant="combined"
                size="small"
                sx={{ borderRadius: "4px", mb: 1 }}
                label={`${bulkData?.errors?.length} ${bulkData?.errors?.length == 1 ? "record is" : "records are"} invalid`}
              />
              <Chip
                color="error"
                variant="combined"
                size="small"
                sx={{ borderRadius: "4px", mb: 1 }}
                label={`Please fix the error(s)`}
              />
            </Stack>
          )}
          <MainCard
            content={false}
            headerSX={{ p: 0 }}
            title={
              <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabList>
              </Box>
            }
          >
            {tabs?.map((tab) => (
              <TabPanel key={tab?.value} value={tab?.value} sx={{ p: 0 }}>
                {tab?.content}
              </TabPanel>
            ))}
          </MainCard>
        </TabContext>
        {getTotalRecords() > 0 && (
          <Box mt={2}>
            <Typography sx={{ color: "#475467", fontSize: 12 }}>
              Showing 1 - {getTotalRecords()} of {getTotalRecords()} records
            </Typography>
          </Box>
        )}
      </Box>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={2}
        justifyContent="flex-end"
        width="100%"
        mt={2}
        pr={4}
      >
        <ThemeButton
          color="primary"
          variant="outlined"
          onClick={() => {
            downloadWrongRecordsExcel(fileType);
          }}
        >
          Download wrong records
        </ThemeButton>
        <ThemeButton
          variant="contained"
          onClick={uploadCorrectEntries}
          endIcon={<ArrowRight />}
          disabled={bulkData?.data?.length === 0}
        >
          Continue with correct entries
        </ThemeButton>
      </Stack>
    </Grid>
  );
};

export default PreviewData;
