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
  Alert,
  Chip,
  Divider,
} from "@mui/material";

import {
  Add,
  Remove,
  Print as PrintIcon,
  CloudOff as CloudOffIcon,
  ReceiptLong,
} from "@mui/icons-material";

import ThemeButton from "components/ui/Button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { openSnackbar } from "api/snackbar";
import useAuth from "hooks/useAuth";
import { useGetAirportProduct } from "hooks/product/query";
import { useCreateInvoice } from "hooks/Invoice/mutation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FormLabels from "components/ui/FormLabel";
import Input from "components/ui/Input";
import dayjs from "dayjs";
import useNetworkStatus from "hooks/useNetwork";
import { addPendingInvoice } from "utils/offlineInvoiceStorage";
import { useGetCategory } from "hooks/category/query";

// ---------------- VALIDATION ----------------
const InvoiceSchema = z.object({
  date: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      perUnitPrice: z.number(),
      totalPrice: z.number(),
    }),
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
    ]),
  ),

  totalAmount: z.number(),
  payments: z
    .array(
      z.object({
        method: z.enum(["cash", "card", "online"]),
        amount: z.preprocess((v) => {
          if (v === "" || v === null || v === undefined) return 0;
          return Number(v);
        }, z.number().min(0)),
      }),
    )
    .min(1, "At least one payment method is required"),
});

type InvoiceFormType = z.infer<typeof InvoiceSchema>;

export default function CreateInvoice() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createInvoice = useCreateInvoice();
  const { isOnline } = useNetworkStatus();
  const [isSavingOffline, setIsSavingOffline] = useState(false);
  const [cachedProducts, setCachedProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data: categoryData } = useGetCategory({
    query: { viewSize: 1000 },
  });
  const categories = categoryData?.data || [];

  const productQuery: any = { airport: user?.airport, limit: 1000 };
  if (selectedCategory !== "All") {
    productQuery.categoryId = selectedCategory;
  }

  const { data: productData, loading: isLoadingProducts }: any =
    useGetAirportProduct({
      query: productQuery,
    });

  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm<InvoiceFormType>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      date: dayjs().format("YYYY-MM-DDTHH:mm"),
      items: [],
      subTotal: 0,
      cgst: 2.5,
      igst: 2.5,
      discount: "0" as any,
      totalAmount: 0,
      payments: [{ method: "cash", amount: 0 }],
    },
  });

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const {
    fields: paymentFields,
    append: appendPayment,
    remove: removePayment,
  } = useFieldArray({
    control,
    name: "payments",
  });

  // Cache products in localStorage for offline use
  useEffect(() => {
    if (productData?.data?.length) {
      localStorage.setItem("cachedProducts", JSON.stringify(productData.data));
    }
  }, [productData]);

  // Load cached products when offline
  useEffect(() => {
    if (!isOnline && !productData?.data?.length) {
      const cached = localStorage.getItem("cachedProducts");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCachedProducts(parsed);
          // Note: We do NOT replace the form items here anymore.
          // The form items are the user's "Cart".
          // The cachedProducts are for the "Product List View".
        } catch (e) {
          console.error("Error loading cached products:", e);
        }
      }
    }
  }, [isOnline, productData?.data?.length]);

  const items = watch("items");

  const rawDiscount = watch("discount");
  const discount = rawDiscount === "" ? 0 : Number(rawDiscount || 0);

  const cgst = Number(watch("cgst") || 0);
  const igst = Number(watch("igst") || 0);

  const subTotal = items.reduce(
    (sum, it) => sum + it.quantity * it.perUnitPrice,
    0,
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

    const totalPayments = data.payments.reduce((sum, p) => sum + p.amount, 0);
    if (Math.abs(totalPayments - data.totalAmount) > 0.01) {
      openSnackbar({
        open: true,
        message: "Total payment splits must exactly match the grand total.",
        variant: "alert",
        alert: { color: "error" },
      } as any);
      return;
    }

    const payload = {
      airport: user?.airport,
      dateTime: dayjs(data?.date).unix(),
      subTotal: data.subTotal,
      cgstPercentage: cgst,
      igstPercentage: igst,
      discountPercentage: discount,
      discountAmount,
      totalAmount: data.totalAmount,
      status: "paid",
      items: data.items.filter((x) => x.quantity > 0),
      payments: data.payments,
    };

    // Handle offline case - save to localStorage
    if (!isOnline) {
      setIsSavingOffline(true);
      try {
        addPendingInvoice(payload as any);
        openSnackbar({
          open: true,
          message:
            "You're offline. Invoice saved locally and will sync when you're back online.",
          variant: "alert",
          alert: { color: "info" },
        } as any);
        navigate("/invoices");
      } finally {
        setIsSavingOffline(false);
      }
      return;
    }

    // Online - proceed with API call
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

  const hasProducts = productData?.data?.length || cachedProducts.length;
  // Determine which list to show in the table
  const productsToList = productData?.data || cachedProducts || [];

  if (isLoadingProducts && isOnline) {
    return (
      <Container maxWidth="xl" sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Loading products...
        </Typography>
      </Container>
    );
  }

  if (!hasProducts && !isOnline) {
    return (
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Alert severity="error" icon={<CloudOffIcon />}>
          You're offline and no cached products are available.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      {/* Offline Banner */}
      {!isOnline && (
        <Alert severity="warning" icon={<CloudOffIcon />} sx={{ mb: 2 }}>
          You're offline. Invoices created now will be saved locally.
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mb={3} mt={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ReceiptLong color="primary" fontSize="large" />
            <Box>
              <Typography variant={isMd ? "h4" : "h5"} fontWeight={700}>
                Create Invoice
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the details below to generate a new invoice.
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* LEFT COLUMN: Form Inputs */}
          <Grid item xs={12} lg={7}>
            <Paper
              elevation={0}
              variant="outlined"
              sx={{ p: 3, borderRadius: 2 }}
            >
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6}>
                  <FormLabels>Invoice Date</FormLabels>
                  <TextField
                    type="datetime-local"
                    fullWidth
                    size="small"
                    {...register("date")}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Categories */}
              <Box mb={3}>
                <Typography
                  fontWeight={700}
                  mb={1.5}
                  variant="subtitle2"
                  color="text.primary"
                >
                  Categories
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  overflow="auto"
                  pb={1}
                  sx={{ "::-webkit-scrollbar": { height: 6 } }}
                >
                  <Chip
                    label="All"
                    onClick={() => setSelectedCategory("All")}
                    color={selectedCategory === "All" ? "primary" : "default"}
                    variant={selectedCategory === "All" ? "filled" : "outlined"}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                  {categories.map((cat: any) => (
                    <Chip
                      key={cat.uuid || cat._id}
                      label={cat.name}
                      onClick={() => setSelectedCategory(cat.uuid || cat._id)}
                      color={
                        selectedCategory === (cat.uuid || cat._id)
                          ? "primary"
                          : "default"
                      }
                      variant={
                        selectedCategory === (cat.uuid || cat._id)
                          ? "filled"
                          : "outlined"
                      }
                      sx={{ fontWeight: 600, borderRadius: 2 }}
                    />
                  ))}
                </Stack>
              </Box>

              <Typography fontWeight={700} mb={2} variant="subtitle2">
                Select Products
              </Typography>

              {hasProducts ? (
                <TableContainer
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 3,
                    borderRadius: 2,
                    maxHeight: 500,
                  }}
                >
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.50" }}>
                          Item
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "grey.50",
                            width: 100,
                          }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "grey.50",
                            textAlign: "center",
                            width: 140,
                          }}
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "grey.50",
                            textAlign: "right",
                            width: 100,
                          }}
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {productsToList.map((product: any) => {
                        // Find if this product is already in the invoice cart
                        const formItemIndex = items.findIndex(
                          (item) => item.name === product.name,
                        );
                        const isSelected = formItemIndex !== -1;
                        const qty = isSelected
                          ? items[formItemIndex].quantity
                          : 0;
                        const price = product?.pricing?.[0]?.price || 0;

                        const totalPrice = qty * price;

                        return (
                          <TableRow
                            key={product.uuid || product._id || product.name}
                            hover
                            sx={{
                              bgcolor: isSelected
                                ? "primary.lighter"
                                : "inherit",
                              "& td": { borderColor: "divider" },
                            }}
                          >
                            <TableCell>
                              <Typography
                                variant="body2"
                                fontWeight={isSelected ? 600 : 400}
                              >
                                {product.name}
                              </Typography>
                            </TableCell>

                            <TableCell>{price?.toFixed(2)}</TableCell>

                            <TableCell align="center">
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent="center"
                              >
                                <IconButton
                                  size="small"
                                  color={isSelected ? "primary" : "default"}
                                  disabled={qty === 0}
                                  onClick={() => {
                                    if (isSelected) {
                                      const newQty = Math.max(qty - 1, 0);
                                      if (newQty === 0) {
                                        remove(formItemIndex);
                                      } else {
                                        setValue(
                                          `items.${formItemIndex}.quantity`,
                                          newQty,
                                          { shouldDirty: true },
                                        );
                                        setValue(
                                          `items.${formItemIndex}.totalPrice`,
                                          Number((newQty * price).toFixed(2)),
                                          { shouldDirty: true },
                                        );
                                      }
                                    }
                                  }}
                                  sx={{
                                    border: "1px solid",
                                    borderColor: "divider",
                                    p: 0.5,
                                  }}
                                >
                                  <Remove fontSize="small" />
                                </IconButton>

                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  width={20}
                                  textAlign="center"
                                >
                                  {qty}
                                </Typography>

                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    if (isSelected) {
                                      const newQty = qty + 1;
                                      setValue(
                                        `items.${formItemIndex}.quantity`,
                                        newQty,
                                        { shouldDirty: true },
                                      );
                                      setValue(
                                        `items.${formItemIndex}.totalPrice`,
                                        Number((newQty * price).toFixed(2)),
                                        { shouldDirty: true },
                                      );
                                    } else {
                                      // Add new item to cart
                                      append({
                                        name: product.name,
                                        quantity: 1,
                                        perUnitPrice: price,
                                        totalPrice: price,
                                      });
                                    }
                                  }}
                                  sx={{
                                    border: "1px solid",
                                    borderColor: "divider",
                                    p: 0.5,
                                  }}
                                >
                                  <Add fontSize="small" />
                                </IconButton>
                              </Stack>
                            </TableCell>

                            <TableCell align="right">
                              <Typography
                                variant="body2"
                                fontWeight={isSelected ? 700 : 400}
                              >
                                {totalPrice.toFixed(2)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box
                  bgcolor="grey.50"
                  p={3}
                  borderRadius={2}
                  textAlign="center"
                  mb={3}
                >
                  <Typography fontWeight={600} color="text.secondary">
                    No items found in this category.
                  </Typography>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormLabels>Discount (%)</FormLabels>
                  <Controller
                    control={control}
                    name="discount"
                    render={({ field }) => (
                      <Input
                        control={control}
                        {...field}
                        error={errors}
                        size="small"
                        placeholder="0"
                        inputProps={{ inputMode: "numeric" }}
                        onChange={(e: any) => {
                          let value = e.target.value.replace(/[^0-9]/g, "");
                          let num = Number(value);
                          if (num > 100) num = 100;
                          if (num < 0) num = 0;
                          field.onChange(value === "" ? "" : num);
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormLabels>CGST (%)</FormLabels>
                  <Input disabled control={control} name="cgst" size="small" />
                </Grid>

                <Grid item xs={4}>
                  <FormLabels>IGST (%)</FormLabels>
                  <Input disabled control={control} name="igst" size="small" />
                </Grid>

                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <FormLabels>Payment Methods & Splits</FormLabels>
                    <ThemeButton
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        appendPayment({ method: "cash", amount: 0 })
                      }
                      startIcon={<Add />}
                      buttonStyle={{ borderRadius: 2, padding: "4px 8px" }}
                    >
                      Add Split
                    </ThemeButton>
                  </Stack>

                  {paymentFields.map((field, index) => (
                    <Stack
                      direction="row"
                      spacing={2}
                      key={field.id}
                      alignItems="flex-start"
                      mb={2}
                    >
                      <Box flex={1}>
                        <Controller
                          control={control}
                          name={`payments.${index}.method`}
                          render={({ field: selectField }) => (
                            <Select
                              {...selectField}
                              fullWidth
                              size="small"
                              sx={{ borderRadius: 1.5 }}
                            >
                              <MenuItem value="cash">Cash</MenuItem>
                              <MenuItem value="online">Online</MenuItem>
                              <MenuItem value="card">Card</MenuItem>
                            </Select>
                          )}
                        />
                      </Box>
                      <Box flex={1}>
                        <Controller
                          control={control}
                          name={`payments.${index}.amount`}
                          render={({
                            field: inputField,
                            fieldState: { error },
                          }) => (
                            <TextField
                              {...inputField}
                              size="small"
                              fullWidth
                              placeholder="Amount"
                              error={!!error}
                              helperText={error?.message}
                              inputProps={{ inputMode: "decimal" }}
                              onChange={(e) => {
                                let value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  "",
                                );
                                inputField.onChange(value);
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 1.5,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                      {paymentFields.length > 1 && (
                        <IconButton
                          color="error"
                          onClick={() => removePayment(index)}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1.5,
                            height: 40,
                          }}
                        >
                          <Remove />
                        </IconButton>
                      )}
                    </Stack>
                  ))}

                  {(() => {
                    const currentPayments = watch("payments") || [];
                    const sum = currentPayments.reduce(
                      (acc, p) => acc + (Number(p.amount) || 0),
                      0,
                    );
                    const diff = totalAmount - sum;
                    if (Math.abs(diff) > 0.01) {
                      return (
                        <Typography
                          variant="caption"
                          color="error"
                          fontWeight={600}
                        >
                          Remaining to pay:{" "}
                          {diff > 0
                            ? diff.toFixed(2)
                            : `Overpaid by ${(-diff).toFixed(2)}`}
                        </Typography>
                      );
                    }
                    if (totalAmount > 0) {
                      return (
                        <Typography
                          variant="caption"
                          color="success.main"
                          fontWeight={600}
                        >
                          Payment fully assigned.
                        </Typography>
                      );
                    }
                    return null;
                  })()}
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <ThemeButton
                variant="contained"
                type="submit"
                size="large"
                loading={createInvoice?.isPending || isSavingOffline}
                startIcon={<PrintIcon />}
                buttonStyle={{
                  width: "100%",
                  borderRadius: 2,
                  height: 48,
                  fontWeight: 700,
                }}
              >
                Generate Invoice
              </ThemeButton>
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: Receipt Preview (As it was, but polished) */}
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                fontFamily: "monospace",
                position: { lg: "sticky" },
                top: 24,
                borderTop: "8px solid",
                borderTopColor: "primary.main",
              }}
            >
              <Typography
                textAlign="center"
                fontWeight={900}
                variant="h5"
                letterSpacing={2}
              >
                EA8 AND FLY
              </Typography>
              <Typography
                textAlign="center"
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                OFFICIAL RECEIPT
              </Typography>

              <Box fontSize="12px" mt={3} pb={1} borderBottom="1px dashed #ccc">
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <span style={{ color: "#666" }}>Date:</span>
                  <span style={{ fontWeight: 600 }}>
                    {dayjs(watch("date")).format("DD MMM YYYY, hh:mm A")}
                  </span>
                </Box>
              </Box>

              <Box
                sx={{
                  borderBottom: "1px dashed #ccc",
                  py: 1,
                  mb: 2,
                  mt: 1,
                  display: "grid",
                  gridTemplateColumns: "1fr 40px 70px 70px",
                  columnGap: 1,
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#444",
                }}
              >
                <span>ITEM</span>
                <span style={{ textAlign: "center" }}>QTY</span>
                <span style={{ textAlign: "right" }}>RATE</span>
                <span style={{ textAlign: "right" }}>AMT</span>
              </Box>

              <Box fontSize="11px" sx={{ minHeight: 100 }}>
                {items.filter((i) => i.quantity > 0).length === 0 && (
                  <Typography textAlign="center" color="text.disabled" py={4}>
                    No items selected
                  </Typography>
                )}

                {items.map(
                  (it: any, i: number) =>
                    it.quantity > 0 && (
                      <Box
                        key={i}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 40px 70px 70px",
                          columnGap: 1,
                          mb: 1,
                          alignItems: "start",
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{it.name}</span>
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
                    ),
                )}
              </Box>

              <Box
                borderTop="1px solid #1c1b1bff"
                mt={3}
                pt={2}
                fontSize="12px"
              >
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ color: "#666" }}>Sub Total</span>
                  <span style={{ fontWeight: 600 }}>{subTotal.toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ color: "#666" }}>Discount ({discount}%)</span>
                  <span>-{((subTotal * discount) / 100).toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ color: "#666" }}>Tax (CGST+IGST)</span>
                  <span>+{gstAmount.toFixed(2)}</span>
                </Box>
              </Box>

              <Box
                bgcolor="primary.main"
                sx={{
                  mt: 2,
                  p: 2,
                  color: "white",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 600 }}>GRAND TOTAL</span>
                <span style={{ fontWeight: 700, fontSize: "18px" }}>
                  ₹{totalAmount.toFixed(2)}
                </span>
              </Box>

              <Typography
                textAlign="center"
                fontSize="10px"
                color="text.secondary"
                mt={3}
              >
                Thank you for your business!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
