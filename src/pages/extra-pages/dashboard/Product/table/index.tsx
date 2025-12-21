import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import { useGetInvoices } from "hooks/Invoice/query";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "unpaid" | "overdue";
  date: string;
}

const getStatusColor = (status: Invoice["status"]) => {
  switch (status) {
    case "paid":
      return { bg: "#e8f5e9", color: "#2e7d32" };
    case "unpaid":
      return { bg: "#fff3e0", color: "#ef6c00" };
    case "overdue":
      return { bg: "#ffebee", color: "#c62828" };
  }
};

const RecentInvoices = () => {
  const {
    data: invoiceData,
    refetch: refetchInvoice,
    isFetching,
  }: any = useGetInvoices({ query: { page: 1, limit: 10 } });
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        "&:hover": {
          boxShadow: "0px 12px 24px rgba(51, 71, 53, 0.20)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Recent Invoices
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Latest billing transactions
            </Typography>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    borderBottom: "2px solid #e8ebe8",
                  }}
                >
                  Invoice ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    borderBottom: "2px solid #e8ebe8",
                  }}
                >
                  Airport
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    borderBottom: "2px solid #e8ebe8",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    borderBottom: "2px solid #e8ebe8",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    borderBottom: "2px solid #e8ebe8",
                  }}
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData?.invoices?.map((invoice: any) => {
                const statusStyle = getStatusColor(invoice.status);
                return (
                  <TableRow
                    key={invoice.id}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f7f5" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#334735" }}
                      >
                        {invoice.invoiceNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: "0.75rem",
                            background:
                              "linear-gradient(135deg, #334735 0%, #4a6a4d 100%)",
                          }}
                        >
                          {invoice?.airport?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Typography variant="body2">
                          {invoice?.airport?.charAt(0)?.toUpperCase() +
                            invoice?.airport?.slice(1)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${invoice.totalAmount?.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          invoice.status?.charAt(0)?.toUpperCase() +
                          invoice.status?.slice(1)
                        }
                        size="small"
                        sx={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {invoice.dateTime
                          ? dayjs
                              .unix(invoice?.dateTime)
                              .format("DD/MM/YYYY HH:mm")
                          : "-"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentInvoices;
