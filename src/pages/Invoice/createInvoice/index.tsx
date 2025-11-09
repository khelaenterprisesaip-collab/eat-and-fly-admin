"use client";
import { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  RadioGroup,
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
import { width } from "@mui/system";
import NewLogo from "components/newLogo";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Burger",
    description: "Delicious grilled burger",
    price: 250,
  },
  {
    id: 2,
    name: "Pizza",
    description: "Cheese pizza with fresh toppings",
    price: 350,
  },
  {
    id: 3,
    name: "Biryani",
    description: "Fragrant basmati rice dish",
    price: 300,
  },
  { id: 4, name: "Samosa", description: "Crispy fried pastry", price: 50 },
  {
    id: 5,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese",
    price: 200,
  },
  { id: 6, name: "Coke", description: "Cold carbonated beverage", price: 60 },
  { id: 7, name: "Lassi", description: "Traditional yogurt drink", price: 80 },
  { id: 8, name: "Ice Cream", description: "Vanilla ice cream", price: 100 },
];

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const COMPANY_NAME = "eat and fly";
const COMPANY_TAGLINE = "bawaasawdjen";

export default function CreateInvoice() {
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  const [tableNo, setTableNo] = useState("622");
  const [invoiceNumber, setInvoiceNumber] = useState("74260");
  const [billDate, setBillDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [billTime, setBillTime] = useState(
    new Date().toTimeString().slice(0, 5)
  );

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [taxMode, setTaxMode] = useState("Tax");
  const [taxPercent, setTaxPercent] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [comment, setComment] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        price: 0,
        quantity: 1,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleItemSelect = (itemId: string, menuItem: any) => {
    if (menuItem) {
      updateItem(itemId, "name", menuItem.name);
      updateItem(itemId, "description", menuItem.description);
      updateItem(itemId, "price", menuItem.price);
    }
  };

  const calculateTotal = (price: number, quantity: number) => price * quantity;

  const subtotal = items.reduce(
    (sum, item) => sum + calculateTotal(item.price, item.quantity),
    0
  );
  const tax = (subtotal * Number.parseFloat(taxPercent)) / 100;
  const total = subtotal + tax;

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2}>
        <Typography variant={isMd ? "h3" : "h4"} color="#394663" pb={2}>
          {`Create Invoice`}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", mb: 1, fontWeight: 600 }}
                >
                  Invoice Number
                </Typography>
                <TextField
                  fullWidth
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { background: "#f5f5f5" },
                    "& .MuiOutlinedInput-input": { padding: "10px" },
                  }}
                />
              </Grid>
            </Grid>

            {/* Date and Time */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", mb: 1, fontWeight: 600 }}
                >
                  Bill Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": { background: "#f5f5f5" },
                    "& .MuiOutlinedInput-input": { padding: "10px" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", mb: 1, fontWeight: 600 }}
                >
                  Bill Time
                </Typography>
                <TextField
                  fullWidth
                  type="time"
                  value={billTime}
                  onChange={(e) => setBillTime(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": { background: "#f5f5f5" },
                    "& .MuiOutlinedInput-input": { padding: "10px" },
                  }}
                />
              </Grid>
            </Grid>

            {/* Customer Details Section */}
            <Box sx={{ background: "#f0f4f8", p: 3, borderRadius: 1.5, mb: 4 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#1a5490", mb: 2, fontWeight: 700 }}
              >
                Customer Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", mb: 0.5, fontWeight: 600 }}
                  >
                    Customer Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter name"
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { background: "white" },
                      "& .MuiOutlinedInput-input": { padding: "10px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", mb: 0.5, fontWeight: 600 }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@example.com"
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { background: "white" },
                      "& .MuiOutlinedInput-input": { padding: "10px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", mb: 0.5, fontWeight: 600 }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { background: "white" },
                      "& .MuiOutlinedInput-input": { padding: "10px" },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Items Table */}
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 700, color: "#333" }}
            >
              Bill Items
            </Typography>
            <TableContainer
              sx={{ mb: 3, border: "1px solid #ddd", borderRadius: 1 }}
            >
              <Table size="small">
                <TableHead sx={{ background: "#e8eef7" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        padding: "12px",
                        color: "#1a5490",
                      }}
                    >
                      Item Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        padding: "12px",
                        color: "#1a5490",
                        width: "100px",
                      }}
                    >
                      Price (₹)
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        padding: "12px",
                        color: "#1a5490",
                        width: "80px",
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        padding: "12px",
                        color: "#1a5490",
                        width: "100px",
                      }}
                    >
                      Total (₹)
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        padding: "12px",
                        color: "#1a5490",
                        width: "60px",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:hover": { background: "#fafbfc" } }}
                    >
                      <TableCell sx={{ padding: "8px" }}>
                        <Autocomplete
                          options={MENU_ITEMS}
                          getOptionLabel={(option) => option.name}
                          value={
                            MENU_ITEMS.find((m) => m.name === item.name) || null
                          }
                          onChange={(e, value) =>
                            handleItemSelect(item.id, value)
                          }
                          inputValue={item.name}
                          onInputChange={(e, value) =>
                            updateItem(item.id, "name", value)
                          }
                          size="small"
                          noOptionsText="No items found"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Search item..."
                              variant="outlined"
                              size="small"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  background: "#fff",
                                },
                                "& .MuiOutlinedInput-input": {
                                  padding: "6px",
                                  fontSize: "13px",
                                },
                              }}
                            />
                          )}
                          renderOption={(props, option) => (
                            <Box component="li" {...props} key={option.id}>
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 600, fontSize: "12px" }}
                                >
                                  {option.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#666", fontSize: "11px" }}
                                >
                                  ₹{option.price}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "8px" }}>
                        <TextField
                          fullWidth
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(item.id, "price", Number(e.target.value))
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              background: "#fff",
                            },
                            "& .MuiOutlinedInput-input": {
                              padding: "6px",
                              textAlign: "center",
                              fontSize: "13px",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "8px" }}>
                        <TextField
                          fullWidth
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "quantity",
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              background: "#fff",
                            },
                            "& .MuiOutlinedInput-input": {
                              padding: "6px",
                              textAlign: "center",
                              fontSize: "13px",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "8px",
                          fontWeight: 600,
                          color: "#1a5490",
                        }}
                      >
                        ₹{calculateTotal(item.price, item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeItem(item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <ThemeButton
              buttonStyle={{ py: 1, mb: 4, width: "100%" }}
              startIcon={<AddIcon />}
              variant="contained"
              onClick={addItem}
            >
              Add Item
            </ThemeButton>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", mb: 1, fontWeight: 600 }}
                >
                  Payment Method
                </Typography>
                <Select
                  fullWidth
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  size="small"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": { background: "#f5f5f5" },
                    "& .MuiOutlinedInput-input": { padding: "10px" },
                  }}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Online">Online Transfer</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", mb: 1, fontWeight: 600 }}
                >
                  Tax Mode
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <RadioGroup
                    row
                    value={taxMode}
                    onChange={(e) => setTaxMode(e.target.value)}
                  >
                    <FormControlLabel
                      value="Tax"
                      control={<Radio size="small" />}
                      label="Tax"
                    />
                    <FormControlLabel
                      value="VAT"
                      control={<Radio size="small" />}
                      label="VAT"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>

            {/* Tax Percent */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "#555", mb: 1, fontWeight: 600 }}
              >
                Tax %
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": { background: "#f5f5f5" },
                  "& .MuiOutlinedInput-input": { padding: "10px" },
                }}
              />
            </Box>

            {/* Comment */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "#555", mb: 1, fontWeight: 600 }}
              >
                Comment
              </Typography>
              <TextField
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add notes..."
                variant="outlined"
                size="small"
                multiline
                rows={2}
                sx={{
                  "& .MuiOutlinedInput-root": { background: "#f5f5f5" },
                  "& .MuiOutlinedInput-input": { padding: "10px" },
                }}
              />
            </Box>

            <ThemeButton
              buttonStyle={{ width: "100%", height: "44px" }}
              startIcon={<PrintIcon />}
              variant="contained"
            >
              Print Invoice
            </ThemeButton>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Box
            sx={{
              background: "white",
              borderRadius: 2,
              p: 3,
              position: "sticky",
              top: "20px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <NewLogo />
            </Box>

            {/* Company Info */}
            {/* <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                mb: 0.3,
                fontSize: "18px",
              }}
            >
              {COMPANY_NAME}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#777",
                mb: 2.5,
                fontSize: "12px",
              }}
            >
              {COMPANY_TAGLINE}
            </Typography> */}

            <Box
              sx={{
                borderTop: "2px dashed #999",
                borderBottom: "2px dashed #999",
                py: 1.5,
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, fontSize: "12px" }}
              >
                RECEIPT
              </Typography>
            </Box>

            <Box
              sx={{ fontSize: "11px", mb: 2, lineHeight: 1.8, color: "#333" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <span>Name:</span>
                <span
                  style={{
                    wordBreak: "break-word",
                    textAlign: "right",
                    maxWidth: "50%",
                  }}
                >
                  {customerName || "—"}
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <span>Email:</span>
                <span
                  style={{
                    wordBreak: "break-all",
                    textAlign: "right",
                    maxWidth: "50%",
                    fontSize: "10px",
                  }}
                >
                  {customerEmail || "—"}
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <span>Phone:</span>
                <span style={{ wordBreak: "break-word", textAlign: "right" }}>
                  {customerPhone || "—"}
                </span>
              </Box>
            </Box>

            <Box
              sx={{
                borderTop: "2px dashed #999",
                py: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  mb: 0.8,
                }}
              >
                <span style={{ textAlign: "center" }}>
                  Invoice: {invoiceNumber}
                </span>
                <span style={{ textAlign: "right" }}>Date: {billDate}</span>
              </Box>
            </Box>

            {/* Items Header */}
            <Box
              sx={{
                borderTop: "2px dashed #999",
                borderBottom: "2px dashed #999",
                py: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 0.6fr 0.5fr 0.8fr",
                  gap: "4px",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                <span>Item</span>
                <span style={{ textAlign: "right" }}>Price</span>
                <span style={{ textAlign: "center" }}>Qty</span>
                <span style={{ textAlign: "right" }}>Total</span>
              </Box>
            </Box>

            {/* Items */}
            <Box
              sx={{
                mb: 2,
                fontSize: "10px",
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              {items.length === 0 ? (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#999",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  No items added
                </Typography>
              ) : (
                items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 0.6fr 0.5fr 0.8fr",
                      gap: "4px",
                      mb: 0.8,
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ wordBreak: "break-word" }}>
                      {item.name || "—"}
                    </span>
                    <span style={{ textAlign: "right" }}>₹{item.price}</span>
                    <span style={{ textAlign: "center" }}>{item.quantity}</span>
                    <span style={{ textAlign: "right", fontWeight: 600 }}>
                      ₹{calculateTotal(item.price, item.quantity).toFixed(2)}
                    </span>
                  </Box>
                ))
              )}
            </Box>

            <Box
              sx={{
                borderTop: "2px dashed #999",
                py: 1.5,
                mb: 2,
                fontSize: "11px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "30px",
                }}
              >
                <span>Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{subtotal.toFixed(2)}</span>
              </Box>
            </Box>

            {/* Tax and Total */}
            <Box sx={{ mb: 2, fontSize: "11px" }}>
              {tax > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "30px",
                    mb: 0.5,
                  }}
                >
                  <span>{taxMode}:</span>
                  <span>₹{tax.toFixed(2)}</span>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "30px",
                  fontWeight: 700,
                }}
              >
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </Box>
            </Box>

            <Box
              sx={{
                borderTop: "2px dashed #999",
                py: 1.5,
                mb: 2,
                fontSize: "10px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>Mode: {paymentMethod}</span>
                <span>Time: {billTime}</span>
              </Box>
            </Box>

            {/* Footer Message */}
            <Box
              sx={{
                borderTop: "2px dashed #999",
                py: 1.5,
                textAlign: "center",
                fontSize: "9px",
                color: "#999",
                lineHeight: 1.4,
              }}
            >
              <Typography variant="caption">
                ** SAVE PAPER SAVE NATURE ** {"\n"} Call: 1800 226344
                (TOLL-FREE)
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
