// "use client";

// import {
//   Container,
//   Paper,
//   Grid,
//   TextField,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   IconButton,
//   FormControlLabel,
//   RadioGroup,
//   Radio,
//   Autocomplete,
//   Stack,
//   useMediaQuery,
// } from "@mui/material";

// import {
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";

// import ThemeButton from "components/ui/Button";
// import NewLogo from "components/newLogo";

// // RHF + Zod
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useGetProduct } from "hooks/product/query";
// import { useCreateInvoice } from "hooks/Invoice/mutation";
// import { openSnackbar } from "api/snackbar";
// import { SnackbarProps } from "types/snackbar";
// import { InfoCircle } from "iconsax-react";
// import { useNavigate } from "react-router";
// import useAuth from "hooks/useAuth";

// const MENU_ITEMS = [
//   {
//     id: 1,
//     name: "Burger",
//     description: "Delicious grilled burger",
//     price: 250,
//   },
//   { id: 2, name: "Pizza", description: "Cheese pizza", price: 350 },
//   { id: 3, name: "Biryani", description: "Fragrant rice", price: 300 },
//   { id: 4, name: "Samosa", description: "Crispy pastry", price: 50 },
//   { id: 5, name: "Paneer Tikka", description: "Grilled paneer", price: 200 },
//   { id: 6, name: "Coke", description: "Cold drink", price: 60 },
//   { id: 7, name: "Lassi", description: "Yogurt drink", price: 80 },
//   { id: 8, name: "Ice Cream", description: "Vanilla scoop", price: 100 },
// ];

// // ---------- FIXED ZOD SCHEMA ----------
// const InvoiceSchema = z.object({
//   invoiceNumber: z.string(),
//   billDate: z.string(),
//   billTime: z.string(),

//   customerName: z.string(),
//   customerEmail: z.string().optional(),
//   customerPhone: z.string().optional(),

//   taxMode: z.string(),
//   taxPercent: z.string(),
//   paymentMethod: z.string(),

//   items: z.array(
//     z.object({
//       name: z.string(),
//       price: z.number(),
//       quantity: z.number(),
//       description: z.string().optional(),
//     })
//   ),
// });

// export type InvoiceFormType = z.infer<typeof InvoiceSchema>;
// export default function CreateInvoice() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   console.log("sasdasnm");
//   const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
//   const createInvoice = useCreateInvoice();

//   const {
//     data: productData,
//     refetch: refetchStaff,
//     isFetching,
//   }: any = useGetProduct({ query: { airport: user?.airport } });

//   console.log("productData", productData);

//   const { register, handleSubmit, control, setValue, watch } =
//     useForm<InvoiceFormType>({
//       resolver: zodResolver(InvoiceSchema),
//       defaultValues: {
//         invoiceNumber: "74260",
//         billDate: new Date().toISOString().split("T")[0],
//         billTime: new Date().toTimeString().slice(0, 5),
//         customerName: "",
//         customerEmail: "",
//         customerPhone: "",
//         taxMode: "Tax",
//         taxPercent: "5",
//         paymentMethod: "cash",
//         items: [],
//       },
//     });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "items",
//   });

//   // CALCULATIONS
//   const items = watch("items");
//   const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

//   const tax = subtotal * (Number(watch("taxPercent")) / 100);
//   const total = subtotal + tax;

//   // ----------- FIXED PAYLOAD TRANSFORM ----------
//   const onSubmit = (data: any) => {
//     const payload = {
//       invoiceNumber: data.invoiceNumber,
//       airport: "amritsar",
//       dateTime: Date.now(),
//       customer: {
//         name: data.customerName,
//         email: data.customerEmail,
//         phoneNumber: Number(data.customerPhone || 0),
//       },
//       subTotal: subtotal,
//       taxPercentage: Number(data.taxPercent),
//       totalAmount: total,
//       status: "paid",
//       paymentMethod: data.paymentMethod.toLowerCase(),
//       items: data.items.map((it: any) => ({
//         name: it.name,
//         quantity: it.quantity,
//         perUnitPrice: it.price,
//         totalPrice: it.price * it.quantity,
//       })),
//       comment: "",
//     };

//     createInvoice
//       .mutateAsync({ body: payload })
//       .then((res) => {
//         navigate("/invoices");
//         openSnackbar({
//           open: true,
//           message: res?.message,
//           variant: "alert",
//           alert: { color: "success" },
//         } as any);
//       })
//       .catch((err) => {
//         openSnackbar({
//           open: true,
//           message: err?.data?.error ?? "Something went wrong",
//           variant: "alert",
//           alert: { color: "error", icon: <InfoCircle /> },
//         } as any);
//       });
//   };

//   const customerName = watch("customerName");
//   const customerEmail = watch("customerEmail");
//   const customerPhone = watch("customerPhone");
//   const invoiceNumber = watch("invoiceNumber");
//   const billDate = watch("billDate");
//   const billTime = watch("billTime");
//   const paymentMethod = watch("paymentMethod");
//   const taxMode = watch("taxMode");
//   return (
//     <Container maxWidth="xl">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack direction="column" spacing={2}>
//           <Typography variant={isMd ? "h3" : "h4"} color="#394663" pb={2}>
//             Create Invoice
//           </Typography>
//         </Stack>

//         <Grid container spacing={3}>
//           {/* LEFT SECTION */}
//           <Grid item xs={12} lg={7}>
//             <Paper
//               sx={{
//                 p: 4,
//                 borderRadius: 2,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               {/* Invoice Number */}
//               <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12}>
//                   <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
//                     Invoice Number
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     {...register("invoiceNumber")}
//                   />
//                 </Grid>
//               </Grid>

//               {/* DATE + TIME */}
//               <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
//                     Bill Date
//                   </Typography>
//                   <TextField
//                     type="date"
//                     fullWidth
//                     size="small"
//                     {...register("billDate")}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
//                     Bill Time
//                   </Typography>
//                   <TextField
//                     type="time"
//                     fullWidth
//                     size="small"
//                     {...register("billTime")}
//                   />
//                 </Grid>
//               </Grid>

//               {/* Customer Details */}
//               <Box sx={{ p: 3, background: "#f0f4f8", borderRadius: 2, mb: 4 }}>
//                 <Typography sx={{ mb: 2, fontWeight: 700, color: "#1a5490" }}>
//                   Customer Details
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Typography
//                       variant="body2"
//                       sx={{ mb: 0.5, fontWeight: 600 }}
//                     >
//                       Customer Name
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       {...register("customerName")}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <Typography
//                       variant="body2"
//                       sx={{ mb: 0.5, fontWeight: 600 }}
//                     >
//                       Email
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       {...register("customerEmail")}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <Typography
//                       variant="body2"
//                       sx={{ mb: 0.5, fontWeight: 600 }}
//                     >
//                       Phone Number
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       {...register("customerPhone")}
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>

//               {/* ITEMS TABLE */}
//               <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//                 Bill Items
//               </Typography>

//               <TableContainer
//                 sx={{ mb: 3, borderRadius: 1, border: "1px solid #ddd" }}
//               >
//                 <Table size="small">
//                   <TableHead sx={{ background: "#e8eef7" }}>
//                     <TableRow>
//                       <TableCell>Item Name</TableCell>
//                       <TableCell>Price</TableCell>
//                       <TableCell>Qty</TableCell>
//                       <TableCell>Total</TableCell>
//                       <TableCell>Action</TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {fields.map((field, index) => (
//                       <TableRow key={field.id}>
//                         {/* AUTOCOMPLETE FIXED ✔ */}
//                         <TableCell>
//                           <Controller
//                             name={`items.${index}.name`}
//                             control={control}
//                             render={({ field }) => (
//                               <Autocomplete
//                                 options={MENU_ITEMS}
//                                 getOptionLabel={(o) => o.name}
//                                 value={
//                                   MENU_ITEMS.find(
//                                     (m) => m.name === field.value
//                                   ) || null
//                                 }
//                                 onChange={(e, selected) => {
//                                   if (selected) {
//                                     setValue(
//                                       `items.${index}.name`,
//                                       selected.name
//                                     );
//                                     setValue(
//                                       `items.${index}.price`,
//                                       selected.price
//                                     );
//                                     setValue(
//                                       `items.${index}.description`,
//                                       selected.description
//                                     );
//                                   }
//                                 }}
//                                 renderInput={(params) => (
//                                   <TextField
//                                     {...params}
//                                     size="small"
//                                     placeholder="Search..."
//                                   />
//                                 )}
//                               />
//                             )}
//                           />
//                         </TableCell>

//                         <TableCell>
//                           <Controller
//                             name={`items.${index}.price`}
//                             control={control}
//                             render={({ field }) => (
//                               <TextField
//                                 {...field}
//                                 type="number"
//                                 size="small"
//                                 onChange={(e) => {
//                                   const val = Number(e.target.value);
//                                   field.onChange(val);
//                                   const qty = watch(`items.${index}.quantity`);
//                                   setValue(`items.${index}.price`, val);
//                                 }}
//                               />
//                             )}
//                           />
//                         </TableCell>

//                         <TableCell>
//                           <Controller
//                             name={`items.${index}.quantity`}
//                             control={control}
//                             render={({ field }) => (
//                               <TextField
//                                 {...field}
//                                 type="number"
//                                 size="small"
//                                 onChange={(e) => {
//                                   const qty = Number(e.target.value);
//                                   field.onChange(qty);
//                                 }}
//                               />
//                             )}
//                           />
//                         </TableCell>

//                         <TableCell>
//                           ₹
//                           {(
//                             watch(`items.${index}.price`) *
//                             watch(`items.${index}.quantity`)
//                           ).toFixed(2)}
//                         </TableCell>

//                         {/* REMOVE */}
//                         <TableCell>
//                           <IconButton
//                             color="error"
//                             onClick={() => remove(index)}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <ThemeButton
//                 buttonStyle={{ width: "100%", py: 1, mb: 4 }}
//                 startIcon={<AddIcon />}
//                 onClick={() =>
//                   append({ name: "", price: 0, quantity: 1, description: "" })
//                 }
//               >
//                 Add Item
//               </ThemeButton>

//               {/* Payment + Tax */}
//               <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography sx={{ mb: 1, fontWeight: 600 }}>
//                     Payment Method
//                   </Typography>
//                   <Select
//                     fullWidth
//                     size="small"
//                     value={watch("paymentMethod")}
//                     {...register("paymentMethod")}
//                   >
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Card">Card</MenuItem>
//                     <MenuItem value="UPI">UPI</MenuItem>
//                   </Select>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Typography sx={{ mb: 1, fontWeight: 600 }}>
//                     Tax Mode
//                   </Typography>
//                   <RadioGroup
//                     value={watch("taxMode")}
//                     row
//                     {...register("taxMode")}
//                   >
//                     <FormControlLabel
//                       value="Tax"
//                       control={<Radio />}
//                       label="Tax"
//                     />
//                     <FormControlLabel
//                       value="VAT"
//                       control={<Radio />}
//                       label="VAT"
//                     />
//                   </RadioGroup>
//                 </Grid>
//               </Grid>

//               <Box sx={{ mb: 4 }}>
//                 <Typography sx={{ mb: 1, fontWeight: 600 }}>Tax %</Typography>
//                 <TextField
//                   fullWidth
//                   value={watch("taxPercent")}
//                   size="small"
//                   {...register("taxPercent")}
//                 />
//               </Box>

//               <ThemeButton
//                 type="submit"
//                 buttonStyle={{ width: "100%", height: "44px" }}
//                 startIcon={<PrintIcon />}
//                 variant="contained"
//               >
//                 Print Invoice
//               </ThemeButton>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} lg={5}>
//             <Box
//               sx={{
//                 background: "white",
//                 borderRadius: 2,
//                 p: 3,
//                 position: "sticky",
//                 top: "20px",
//                 border: "1px solid #ddd",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   mb: 3,
//                 }}
//               >
//                 <NewLogo />
//               </Box>

//               <Box
//                 sx={{
//                   borderTop: "2px dashed #999",
//                   borderBottom: "2px dashed #999",
//                   py: 1.5,
//                   mb: 2,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   sx={{ fontWeight: 700, fontSize: "12px" }}
//                 >
//                   RECEIPT
//                 </Typography>
//               </Box>

//               {/* Customer Info */}
//               <Box
//                 sx={{ fontSize: "11px", mb: 2, lineHeight: 1.8, color: "#333" }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 0.5,
//                   }}
//                 >
//                   <span>Name:</span>
//                   <span
//                     style={{
//                       wordBreak: "break-word",
//                       textAlign: "right",
//                       maxWidth: "50%",
//                     }}
//                   >
//                     {customerName || "—"}
//                   </span>
//                 </Box>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 0.5,
//                   }}
//                 >
//                   <span>Email:</span>
//                   <span
//                     style={{
//                       wordBreak: "break-all",
//                       textAlign: "right",
//                       maxWidth: "50%",
//                       fontSize: "10px",
//                     }}
//                   >
//                     {customerEmail || "—"}
//                   </span>
//                 </Box>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 0.5,
//                   }}
//                 >
//                   <span>Phone:</span>
//                   <span style={{ wordBreak: "break-word", textAlign: "right" }}>
//                     {customerPhone || "—"}
//                   </span>
//                 </Box>
//               </Box>

//               {/* Invoice + Date */}
//               <Box sx={{ borderTop: "2px dashed #999", py: 1.5, mb: 2 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     fontSize: "10px",
//                     fontWeight: 700,
//                     mb: 0.8,
//                   }}
//                 >
//                   <span>Invoice: {invoiceNumber}</span>
//                   <span>Date: {billDate}</span>
//                 </Box>
//               </Box>

//               {/* Header row */}
//               <Box
//                 sx={{
//                   borderTop: "2px dashed #999",
//                   borderBottom: "2px dashed #999",
//                   py: 1.5,
//                   mb: 2,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 0.6fr 0.5fr 0.8fr",
//                     gap: "4px",
//                     fontSize: "10px",
//                     fontWeight: 700,
//                   }}
//                 >
//                   <span>Item</span>
//                   <span style={{ textAlign: "right" }}>Price</span>
//                   <span style={{ textAlign: "center" }}>Qty</span>
//                   <span style={{ textAlign: "right" }}>Total</span>
//                 </Box>
//               </Box>

//               {/* Item rows */}
//               <Box
//                 sx={{
//                   mb: 2,
//                   fontSize: "10px",
//                   maxHeight: "150px",
//                   overflowY: "auto",
//                 }}
//               >
//                 {items.length === 0 ? (
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: "#999",
//                       textAlign: "center",
//                       display: "block",
//                     }}
//                   >
//                     No items added
//                   </Typography>
//                 ) : (
//                   items.map((item, i) => (
//                     <Box
//                       key={i}
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "1fr 0.6fr 0.5fr 0.8fr",
//                         gap: "4px",
//                         mb: 0.8,
//                         lineHeight: 1.4,
//                       }}
//                     >
//                       <span style={{ wordBreak: "break-word" }}>
//                         {item.name || "—"}
//                       </span>
//                       <span style={{ textAlign: "right" }}>₹{item.price}</span>
//                       <span style={{ textAlign: "center" }}>
//                         {item.quantity}
//                       </span>
//                       <span style={{ textAlign: "right", fontWeight: 600 }}>
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </span>
//                     </Box>
//                   ))
//                 )}
//               </Box>

//               {/* Subtotal */}
//               <Box
//                 sx={{
//                   borderTop: "2px dashed #999",
//                   py: 1.5,
//                   mb: 2,
//                   fontSize: "11px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: "30px",
//                   }}
//                 >
//                   <span>Subtotal:</span>
//                   <span style={{ fontWeight: 700 }}>
//                     ₹{subtotal.toFixed(2)}
//                   </span>
//                 </Box>
//               </Box>

//               {/* Tax + Total */}
//               <Box sx={{ mb: 2, fontSize: "11px" }}>
//                 {tax > 0 && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       gap: "30px",
//                       mb: 0.5,
//                     }}
//                   >
//                     <span>{taxMode}:</span>
//                     <span>₹{tax.toFixed(2)}</span>
//                   </Box>
//                 )}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: "30px",
//                     fontWeight: 700,
//                   }}
//                 >
//                   <span>Total:</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   borderTop: "2px dashed #999",
//                   py: 1.5,
//                   mb: 2,
//                   fontSize: "10px",
//                 }}
//               >
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <span>Mode: {paymentMethod}</span>
//                   <span>Time: {billTime}</span>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// }

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
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Stack,
  useMediaQuery,
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
import { useNavigate } from "react-router";
import { InfoCircle } from "iconsax-react";
import { openSnackbar } from "api/snackbar";
import useAuth from "hooks/useAuth";
import { useGetProduct } from "hooks/product/query";

// MENU ITEMS SAMPLE
const MENU_ITEMS = [
  { name: "WATER", rate: 66.67 },
  { name: "COKE", rate: 60 },
];

// ------------------- OPTION A — EXACT IMAGE KEYS -------------------
const InvoiceSchema = z.object({
  "Bill No": z.string(),
  Date: z.string(),
  Shift: z.string(),

  Items: z.array(
    z.object({
      "Item Name": z.string(),
      Qty: z.number(),
      Rate: z.number(),
      Amount: z.number(),
    })
  ),

  "Sub Total": z.number(),
  CGST: z.number(),
  SGST: z.number(),
  "Round-off Amount": z.number(),
  "Grand Total": z.number(),

  Payment: z.string(),
});

export default function CreateInvoice() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: productData,
    refetch: refetchStaff,
    isFetching,
  }: any = useGetProduct({ query: { airport: "jalandhar" } });

  console.log("productData", productData);

  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  // ------------------- FORM SETUP -------------------
  const { register, handleSubmit, control, setValue, watch } = useForm<any>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      "Bill No": "041225D/46",
      Date: new Date().toISOString().split("T")[0],
      Shift: "SHIFT-1",

      Items: [],

      "Sub Total": 0,
      CGST: 0,
      SGST: 0,
      "Round-off Amount": 0,
      "Grand Total": 0,

      Payment: "CASH",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Items",
  });

  // ------------------- WATCH VALUES -------------------
  const items = watch("Items");

  const subtotal = items.reduce(
    (sum: any, it: any) => sum + it.Rate * it.Qty,
    0
  );

  const cgst = subtotal * 0.025;
  const sgst = subtotal * 0.025;

  const grandTotal = subtotal + cgst + sgst;

  // Auto-update totals
  setValue("Sub Total", subtotal);
  setValue("CGST", cgst);
  setValue("SGST", sgst);
  setValue("Grand Total", grandTotal);

  // ------------------- SUBMIT -------------------
  const onSubmit = (data: any) => {
    console.log("FINAL PAYLOAD EXACT KEYS:", data);

    openSnackbar({
      open: true,
      message: "Invoice Created",
      variant: "alert",
      alert: { color: "success" },
    } as any);
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} mb={2}>
          <Typography variant={isMd ? "h3" : "h4"}>Create Invoice</Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* ---------------- LEFT SIDE FORM ---------------- */}
          <Grid item xs={12} lg={7}>
            <Paper sx={{ p: 4 }}>
              {/* Bill No */}
              <Typography fontWeight={600}>Bill No</Typography>
              <TextField
                fullWidth
                size="small"
                {...register("Bill No")}
                sx={{ mb: 3 }}
              />

              {/* Date + Shift */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography fontWeight={600}>Date</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    {...register("Date")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight={600}>Shift</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value="SHIFT-1"
                    {...register("Shift")}
                  />
                </Grid>
              </Grid>

              {/* ITEMS TABLE */}
              <Typography variant="h6" fontWeight={700}>
                Items @ GST 5%
              </Typography>

              <TableContainer sx={{ border: "1px solid #ddd", mb: 3 }}>
                <Table size="small">
                  <TableHead sx={{ background: "#eee" }}>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {fields.map((row, index) => (
                      <TableRow key={row.id}>
                        {/* Item Name */}
                        <TableCell>
                          <Controller
                            control={control}
                            name={`Items.${index}.Item Name`}
                            render={({ field }) => (
                              <Autocomplete
                                options={MENU_ITEMS}
                                getOptionLabel={(o) => o.name}
                                value={
                                  MENU_ITEMS.find(
                                    (x) => x.name === field.value
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (!val) return;
                                  setValue(
                                    `Items.${index}.Item Name`,
                                    val.name
                                  );
                                  setValue(`Items.${index}.Rate`, val.rate);
                                  setValue(`Items.${index}.Qty`, 1);
                                  setValue(
                                    `Items.${index}.Amount`,
                                    val.rate * 1
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} size="small" />
                                )}
                              />
                            )}
                          />
                        </TableCell>

                        {/* Rate */}
                        <TableCell>
                          <Controller
                            name={`Items.${index}.Rate`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                type="number"
                                size="small"
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  field.onChange(val);
                                  const qty = watch(`Items.${index}.Qty`);
                                  setValue(`Items.${index}.Amount`, qty * val);
                                }}
                              />
                            )}
                          />
                        </TableCell>

                        {/* Qty */}
                        <TableCell>
                          <Controller
                            name={`Items.${index}.Qty`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                type="number"
                                size="small"
                                onChange={(e) => {
                                  const qty = Number(e.target.value);
                                  field.onChange(qty);
                                  const rate = watch(`Items.${index}.Rate`);
                                  setValue(`Items.${index}.Amount`, qty * rate);
                                }}
                              />
                            )}
                          />
                        </TableCell>

                        {/* Amount */}
                        <TableCell>
                          {watch(`Items.${index}.Amount`)?.toFixed(2)}
                        </TableCell>

                        {/* Delete */}
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

              {/* Add Item */}
              <ThemeButton
                startIcon={<AddIcon />}
                buttonStyle={{ width: "100%", mb: 3 }}
                onClick={() =>
                  append({
                    "Item Name": "",
                    Rate: 0,
                    Qty: 1,
                    Amount: 0,
                  })
                }
              >
                Add Item
              </ThemeButton>

              {/* Payment */}
              <Typography fontWeight={600}>Payment</Typography>
              <Select fullWidth size="small" {...register("Payment")}>
                <MenuItem value="CASH">CASH</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="CARD">CARD</MenuItem>
              </Select>

              <ThemeButton
                type="submit"
                startIcon={<PrintIcon />}
                buttonStyle={{ width: "100%", height: 44, mt: 3 }}
              >
                Print Invoice
              </ThemeButton>
            </Paper>
          </Grid>

          {/* ---------------- RIGHT SIDE RECEIPT ---------------- */}
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
              {/* Header */}
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
                  <span>Bill No:</span>
                  <span>{watch("Bill No")}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>Date:</span>
                  <span>{watch("Date")}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>Shift:</span>
                  <span>{watch("Shift")}</span>
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
                    <span>{it["Item Name"]}</span>
                    <span>{it.Qty}</span>
                    <span>{it.Rate.toFixed(2)}</span>
                    <span>{(it.Qty * it.Rate).toFixed(2)}</span>
                  </Box>
                ))}
              </Box>

              {/* SUMMARY */}
              <Box borderTop="1px solid #ddd" mt={2} pt={1} fontSize="11px">
                <Box display="flex" justifyContent="space-between">
                  <span>Sub Total</span>
                  <span>{subtotal.toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>CGST</span>
                  <span>{cgst.toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>SGST</span>
                  <span>{sgst.toFixed(2)}</span>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <span>Round-off Amount</span>
                  <span>0.00</span>
                </Box>
              </Box>

              {/* TOTAL */}
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
                <span>{grandTotal.toFixed(2)}</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
