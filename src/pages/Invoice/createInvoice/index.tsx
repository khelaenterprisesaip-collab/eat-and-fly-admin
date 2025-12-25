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
  Stack,
  useMediaQuery,
  Box,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";

import { Add, Remove, Print as PrintIcon } from "@mui/icons-material";

import ThemeButton from "components/ui/Button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { openSnackbar } from "api/snackbar";
import useAuth from "hooks/useAuth";
import { useGetAirportProduct } from "hooks/product/query";
import { useCreateInvoice } from "hooks/Invoice/mutation";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import FormLabels from "components/ui/FormLabel";
import Input from "components/ui/Input";

// ---------------- VALIDATION ----------------
const InvoiceSchema = z.object({
  date: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      perUnitPrice: z.number(),
      totalPrice: z.number(),
    })
  ),
  subTotal: z.number(),
  cgst: z.preprocess((v) => {
    if (v === "" || v === null || v === undefined) return 0;
    return Number(v);
  }, z.number()),

  igst: z.preprocess((v) => {
    if (v === "" || v === null || v === undefined) return 0;
    return Number(v);
  }, z.number()),

  discount: z.preprocess(
    (v) => {
      if (v === "" || v === null || v === undefined) return "";
      return Number(v);
    },
    z.union([
      z.literal(""),
      z
        .number()
        .min(0, "Discount must be at least 1%")
        .max(100, "Discount cannot exceed 100%"),
    ])
  ),

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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormType>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      items: [],
      subTotal: 0,
      cgst: 2.5,
      igst: 2.5,
      discount: "0" as any,
      totalAmount: 0,
      paymentMethod: "cash",
    },
  });

  console.log("errors", errors);

  const { fields, replace } = useFieldArray({
    control,
    name: "items",
  });

  // load product list
  useEffect(() => {
    if (productData?.data?.length) {
      replace(
        productData.data.map((p: any) => ({
          name: p?.name || "",
          quantity: 0,
          perUnitPrice: p?.pricing?.[0]?.price || 0,
          totalPrice: 1200,
        }))
      );
    }
  }, [productData, replace]);

  const items = watch("items");

  const rawDiscount = watch("discount");
  const discount = rawDiscount === "" ? 0 : Number(rawDiscount || 0);

  const cgst = Number(watch("cgst") || 0);
  const igst = Number(watch("igst") || 0);

  const subTotal = items.reduce(
    (sum, it) => sum + it.quantity * it.perUnitPrice,
    0
  );

  // percentage discount
  const discountAmount = (subTotal * discount) / 100;

  const taxableAmount = Math.max(subTotal - discountAmount, 0);

  const gstAmount = (taxableAmount * (cgst + igst)) / 100;

  const totalAmount = taxableAmount + gstAmount;

  useEffect(() => {
    setValue("subTotal", subTotal);
    setValue("totalAmount", totalAmount);
  }, [subTotal, totalAmount, setValue]);

  const onSubmit = (data: InvoiceFormType) => {
    const hasItems = data.items.some((x) => x.quantity > 0);

    if (!hasItems) {
      openSnackbar({
        open: true,
        message: "Add item to create invoice",
        variant: "alert",
        alert: { color: "error" },
      } as any);
      return;
    }

    const payload = {
      airport: user?.airport,
      dateTime: Date.now(),
      subTotal: data.subTotal,
      cgstPercentage: cgst,
      igstPercentage: igst,
      discountPercentage: discount,
      discountAmount,
      totalAmount: data.totalAmount,
      status: "paid",
      items: data.items.filter((x) => x.quantity > 0),
      paymentMethod: data?.paymentMethod,
    };

    console.log("payload", payload);

    createInvoice
      .mutateAsync({ body: payload })
      .then(() => {
        navigate("/invoices");
        openSnackbar({
          open: true,
          message: "Invoice Created",
          variant: "alert",
          alert: { color: "success" },
        } as any);
      })
      .catch(() => {
        openSnackbar({
          open: true,
          message: "Something went wrong",
          variant: "alert",
          alert: { color: "error" },
        } as any);
      });
  };

  if (!productData?.data) return null;

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
                <Grid item xs={12}>
                  <FormLabels>Date</FormLabels>
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    {...register("date")}
                  />
                </Grid>
              </Grid>

              <Typography fontWeight={700}>Products</Typography>

              <TableContainer sx={{ border: "1px solid #ddd", mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {fields.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>

                        <TableCell>
                          {watch(`items.${index}.perUnitPrice`)?.toFixed(2)}
                        </TableCell>

                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <IconButton
                              size="small"
                              onClick={() => {
                                const currentQty = Number(
                                  watch(`items.${index}.quantity`) || 0
                                );
                                const price = Number(
                                  watch(`items.${index}.perUnitPrice`) || 0
                                );

                                const qty = Math.max(currentQty - 1, 0);

                                setValue(`items.${index}.quantity`, qty, {
                                  shouldDirty: true,
                                });
                                setValue(
                                  `items.${index}.totalPrice`,
                                  Number((qty * price).toFixed(2)),
                                  { shouldDirty: true }
                                );
                              }}
                            >
                              <Remove />
                            </IconButton>

                            <Typography>
                              {watch(`items.${index}.quantity`) || 0}
                            </Typography>

                            <IconButton
                              size="small"
                              onClick={() => {
                                const currentQty = Number(
                                  watch(`items.${index}.quantity`) || 0
                                );
                                const price = Number(
                                  watch(`items.${index}.perUnitPrice`) || 0
                                );

                                const qty = currentQty + 1;

                                setValue(`items.${index}.quantity`, qty, {
                                  shouldDirty: true,
                                });
                                setValue(
                                  `items.${index}.totalPrice`,
                                  Number((qty * price).toFixed(2)),
                                  { shouldDirty: true }
                                );
                              }}
                            >
                              <Add />
                            </IconButton>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          {(
                            (watch(`items.${index}.quantity`) || 0) *
                            watch(`items.${index}.perUnitPrice`)
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormLabels>Discount</FormLabels>

                  <Controller
                    control={control}
                    name="discount"
                    render={({ field }) => (
                      <Input
                        control={control}
                        {...field}
                        inputProps={{ inputMode: "numeric" }}
                        onChange={(e: any) => {
                          let value = e.target.value;

                          if (value === "") {
                            field.onChange("");
                            return;
                          }

                          value = value.replace(/[^0-9]/g, "");

                          let num = Number(value);

                          if (num > 100) num = 100;
                          if (num < 0) num = 0;

                          field.onChange(num);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormLabels>CGST</FormLabels>

                  <Input disabled control={control} name="cgst" />
                </Grid>

                <Grid item xs={4}>
                  <FormLabels>IGST</FormLabels>
                  <Input disabled control={control} name="igst" />
                </Grid>

                <Grid item xs={12}>
                  <FormLabels>Cash Mode</FormLabels>
                  <Select
                    fullWidth
                    size="small"
                    defaultValue="cash"
                    {...register("paymentMethod")}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="card">Card</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <ThemeButton
                variant="contained"
                type="submit"
                loading={createInvoice?.isPending}
                startIcon={<PrintIcon />}
                buttonStyle={{ width: "100%", mt: 3 }}
              >
                Create Invoice
              </ThemeButton>
            </Paper>
          </Grid>

          {/* RIGHT PREVIEW */}
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

              <Box fontSize="11px" mt={2}>
                <Box display="flex" justifyContent="space-between">
                  <span>Date:</span>
                  <span>{watch("date")}</span>
                </Box>
              </Box>

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
                ITEMS
              </Box>

              <Box fontSize="11px">
                {items.map(
                  (it: any, i: number) =>
                    it.quantity > 0 && (
                      <Box
                        key={i}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 40px 70px 70px",
                          columnGap: 8,
                          mb: 1,
                        }}
                      >
                        <span>{it.name}</span>
                        <span style={{ textAlign: "center" }}>
                          {it.quantity}
                        </span>
                        <span style={{ textAlign: "right" }}>
                          {it.perUnitPrice?.toFixed(2)}
                        </span>
                        <span style={{ textAlign: "right" }}>
                          {(it.quantity * it.perUnitPrice).toFixed(2)}
                        </span>
                      </Box>
                    )
                )}
              </Box>

              <Box borderTop="1px solid #ddd" mt={2} pt={1} fontSize="11px">
                <Box display="flex" justifyContent="space-between">
                  <span>Sub Total</span>
                  <span>{subTotal.toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>Discount ({discount}%)</span>
                  <span>{((subTotal * discount) / 100).toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>CGST + IGST</span>
                  <span>{gstAmount.toFixed(2)}</span>
                </Box>
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
