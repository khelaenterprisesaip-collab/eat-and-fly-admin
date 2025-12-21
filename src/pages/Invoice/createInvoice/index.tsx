"use client";

import {
  Container,
  Paper,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Autocomplete,
  Stack,
  useMediaQuery,
  Box,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Print as PrintIcon,
} from "@mui/icons-material";

import ThemeButton from "components/ui/Button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { openSnackbar } from "api/snackbar";
import useAuth from "hooks/useAuth";
import { useGetAirportProduct, useGetProduct } from "hooks/product/query";
import { useCreateInvoice } from "hooks/Invoice/mutation";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const InvoiceSchema = z.object({
  date: z.string(),
  shift: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      perUnitPrice: z.number(),
      totalPrice: z.number(),
    })
  ),
  subTotal: z.number(),
  taxPercentage: z.number(),
  totalAmount: z.number(),
  paymentMethod: z.enum(["cash", "card", "online"]),
});

type InvoiceFormType = z.infer<typeof InvoiceSchema>;

export default function CreateInvoice() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createInvoice = useCreateInvoice();

  const { data: productData }: any = useGetAirportProduct({
    query: { airport: user?.airport },
  });

  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const { register, handleSubmit, control, setValue, watch } =
    useForm<InvoiceFormType>({
      resolver: zodResolver(InvoiceSchema),
      defaultValues: {
        date: new Date().toISOString().split("T")[0],
        shift: "SHIFT-1",
        items: [],
        subTotal: 0,
        taxPercentage: 5,
        totalAmount: 0,
        paymentMethod: "cash",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");

  const subTotal = items.reduce(
    (sum, it) => sum + it.perUnitPrice * it.quantity,
    0
  );

  const taxPercentage = watch("taxPercentage");
  const taxAmount = (subTotal * taxPercentage) / 100;
  const totalAmount = subTotal + taxAmount;

  useEffect(() => {
    setValue("subTotal", subTotal);
    setValue("totalAmount", totalAmount);
  }, [subTotal, totalAmount, setValue]);

  const onSubmit = (data: InvoiceFormType) => {
    const payload = {
      airport: user?.airport,
      dateTime: Date.now(),
      subTotal: data.subTotal,
      taxPercentage: data.taxPercentage,
      totalAmount: data.totalAmount,
      status: "paid",
      items: data.items.map((it) => ({
        name: it?.name,
        quantity: it?.quantity,
        perUnitPrice: it?.perUnitPrice,
        totalPrice: it?.totalPrice,
      })),
      paymentMethod: data?.paymentMethod,
    };
    createInvoice
      .mutateAsync({ body: payload })
      ?.then((res) => {
        navigate("/invoices");
        openSnackbar({
          open: true,
          message: "Invoice Created",
          variant: "alert",
          alert: { color: "success" },
        } as any);
      })
      .catch((err) => {
        openSnackbar({
          open: true,
          message: "something went wrong",
          variant: "alert",
          alert: { color: "error" },
        } as any);
      });
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mb={2}>
          <Typography variant={isMd ? "h3" : "h4"}>Create Invoice</Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Paper sx={{ p: 4 }}>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    label="Date"
                    {...register("date")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Shift"
                    {...register("shift")}
                  />
                </Grid>
              </Grid>

              <Typography fontWeight={700}>Items</Typography>

              <TableContainer sx={{ border: "1px solid #ddd", mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {fields?.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Controller
                            control={control}
                            name={`items.${index}.name`}
                            render={({ field }) => (
                              <Autocomplete
                                options={productData?.data || []}
                                getOptionLabel={(o: any) => o?.name || ""}
                                onChange={(_, val: any) => {
                                  if (!val) return;
                                  setValue(`items.${index}.name`, val?.name);
                                  setValue(
                                    `items.${index}.perUnitPrice`,
                                    val?.pricing?.[0]?.price || 0
                                  );
                                  setValue(`items.${index}.quantity`, 1);
                                  setValue(
                                    `items.${index}.totalPrice`,
                                    val?.pricing?.[0]?.price || 0
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} size="small" />
                                )}
                              />
                            )}
                          />
                        </TableCell>

                        <TableCell>
                          <Controller
                            name={`items.${index}.perUnitPrice`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                type="number"
                                size="small"
                                onChange={(e) => {
                                  const price = +e.target.value;
                                  field.onChange(price);
                                  const qty = watch(`items.${index}.quantity`);
                                  setValue(
                                    `items.${index}.totalPrice`,
                                    price * qty
                                  );
                                }}
                              />
                            )}
                          />
                        </TableCell>

                        <TableCell>
                          <Controller
                            name={`items.${index}.quantity`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                type="number"
                                size="small"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === "") {
                                    field.onChange("");
                                    setValue(`items.${index}.totalPrice`, 0);
                                    return;
                                  }
                                  const qty = Number(value);
                                  field.onChange(qty);
                                  const price =
                                    watch(`items.${index}.perUnitPrice`) || 0;
                                  setValue(
                                    `items.${index}.totalPrice`,
                                    price * qty
                                  );
                                }}
                              />
                            )}
                          />
                        </TableCell>

                        <TableCell>
                          {watch(`items.${index}.totalPrice`)?.toFixed(2)}
                        </TableCell>

                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <ThemeButton
                startIcon={<AddIcon />}
                buttonStyle={{ width: "100%", mb: 3 }}
                onClick={() =>
                  append({
                    name: "",
                    quantity: 1,
                    perUnitPrice: 0,
                    totalPrice: 0,
                  })
                }
              >
                Add Item
              </ThemeButton>

              <Select fullWidth size="small" {...register("paymentMethod")}>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </Select>

              <ThemeButton
                variant={"contained"}
                type="submit"
                loading={createInvoice?.isPending}
                startIcon={<PrintIcon />}
                buttonStyle={{ width: "100%", mt: 3 }}
              >
                Create Invoice
              </ThemeButton>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                background: "white",
                border: "1px solid #ccc",
                p: 3,
                borderRadius: 2,
                fontFamily: "monospace",
              }}
            >
              <Typography textAlign="center" fontWeight={700}>
                EA8 AND FLY
              </Typography>

              <Typography
                textAlign="center"
                fontSize="10px"
                whiteSpace="pre-line"
                mt={1}
              >
                1st floor international SHA, SGRDJ International Airport,
                Amritsar - 143001
              </Typography>

              <Typography textAlign="center" fontSize="10px" mt={1}>
                GSTIN: 03NTHPS8695L1ZG
              </Typography>

              {/* Bill Info */}
              <Box mt={2} fontSize="11px">
                <Box display="flex" justifyContent="space-between">
                  <span>Date:</span>
                  <span>{watch("date")}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>Shift:</span>
                  <span>{watch("shift")}</span>
                </Box>
              </Box>

              {/* ITEMS */}
              <Box
                sx={{
                  borderTop: "2px dashed #999",
                  borderBottom: "2px dashed #999",
                  py: 1,
                  my: 2,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "11px",
                }}
              >
                ITEMS @ GST 5%
              </Box>

              <Box fontSize="11px">
                {items.map((it: any, i: number) => (
                  <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <span>{it["name"]}</span>
                    <span>{it.quantity}</span>
                    <span>{it.perUnitPrice?.toFixed(2)}</span>
                    <span>{(it.quantity * it.perUnitPrice)?.toFixed(2)}</span>
                  </Box>
                ))}
              </Box>

              <Box borderTop="1px solid #ddd" mt={2} pt={1} fontSize="11px">
                <Box display="flex" justifyContent="space-between">
                  <span>Sub Total</span>
                  <span>{subTotal?.toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>GST</span>
                  <span>{taxAmount?.toFixed(2)}</span>
                </Box>

                {/* <Box display="flex" justifyContent="space-between">
                  <span>SGST</span>
                  <span>{sgst.toFixed(2)}</span>
                </Box> */}

                {/* <Box display="flex" justifyContent="space-between">
                  <span>Round-off Amount</span>
                  <span>0.00</span>
                </Box> */}
              </Box>

              <Box
                sx={{
                  borderTop: "2px dashed #999",
                  mt: 2,
                  pt: 1,
                  fontWeight: 700,
                  fontSize: "13px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Grand Total:</span>
                <span>{totalAmount.toFixed(2)}</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
