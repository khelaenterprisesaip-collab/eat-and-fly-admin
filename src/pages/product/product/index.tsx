import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import MainCard from "components/MainCard";
import Input from "components/ui/Input";
import CapitalizeInput from "components/ui/CaptializeInput";
import ThemeButton from "components/ui/Button";
import { airportCities } from "./constant";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { InfoCircle } from "iconsax-react";
import FormLabels from "components/ui/FormLabel";
import { createProduct, getSingleFetch, updateProduct } from "services/product";
import { IndianRupee } from "lucide-react";

// -------------------- SCHEMA -------------------- //
const pricingSchema = z.object({
  airport: z.string().min(1, { message: "Airport is required." }),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Enter valid price." }),
});

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  availableAtAirports: z.array(z.string()).min(1, {
    message: "Select at least one airport.",
  }),
  pricing: z
    .array(pricingSchema)
    .min(1, { message: "Add at least one pricing entry." }),
  isAvailable: z.boolean().default(true),
  itemCode: z.string().min(1, { message: "Item code is required." }),
});

type FormValues = z.infer<typeof formSchema>;

// -------------------- COMPONENT -------------------- //
const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      availableAtAirports: [],
      pricing: [],
      isAvailable: true,
      itemCode: "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "pricing",
  });

  const selectedAirports = watch("availableAtAirports");

  // Auto-sync pricing entries when available airports change
  useEffect(() => {
    if (!selectedAirports) return;
    setValue(
      "pricing",
      selectedAirports.map((airport) => {
        const existing = fields.find((f) => f.airport === airport);
        return existing || { airport, price: 0 };
      })
    );
  }, [selectedAirports]);

  useEffect(() => {
    if (productId) {
      getSingleFetch({ pathParams: { id: productId } })?.then((res: any) => {
        reset(res?.data);
      });
    }
  }, [productId]);

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    const action = productId ? updateProduct : createProduct;

    const payload = {
      ...data,
      isAvailable: true, // always send true in payload
      pricing: data.pricing.map((p) => ({
        airport: p.airport,
        price: Number(p.price),
      })),
    };

    action({
      pathParams: productId ? { id: productId } : undefined,
      body: payload,
    })
      ?.then(() => {
        setLoading(false);
        navigate("/products");
        openSnackbar({
          open: true,
          message: `Product ${productId ? "updated" : "added"} successfully.`,
          variant: "alert",
          alert: { color: "success" },
        } as SnackbarProps);
      })
      .catch((err: any) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: err?.data?.message || "Something went wrong",
          variant: "alert",
          alert: { color: "error", icon: <InfoCircle /> },
        } as SnackbarProps);
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant={isMd ? "h3" : "h4"} color="#394663">
          {productId ? "Update Product" : "Add Product"}
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <MainCard title="Product Information">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CapitalizeInput
                  required
                  control={control}
                  label="Product Name"
                  name="name"
                  placeholder="Enter product name"
                  error={errors}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  required
                  control={control}
                  label="Item Code"
                  name="itemCode"
                  placeholder="Enter item code"
                  error={errors}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  required
                  control={control}
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                  error={errors}
                />
              </Grid>

              {/* -------------------- Autocomplete for airports -------------------- */}
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="availableAtAirports"
                  render={({ field }) => (
                    <>
                      <FormLabels required>Airports</FormLabels>
                      <Autocomplete
                        multiple
                        options={airportCities.map((a) => a.value)}
                        value={field.value || []}
                        onChange={(_, value) => field.onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: false }}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline legend": {
                                display: "none",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                top: 0,
                              },
                            }}
                            placeholder="Select airports"
                            error={!!errors.availableAtAirports}
                            helperText={errors.availableAtAirports?.message}
                          />
                        )}
                      />
                    </>
                  )}
                />
              </Grid>

              {fields?.map((field: any, index) => (
                <Grid key={field.id} item xs={12} sm={6}>
                  <Input
                    control={control}
                    label={`Price (${field.airport.charAt(0).toUpperCase() + field.airport.slice(1)})`}
                    name={`pricing.${index}.price`}
                    placeholder="Enter price"
                    startAdornment={<IndianRupee />}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                    }}
                    error={errors}
                  />
                </Grid>
              ))}

              <Stack
                direction="row"
                justifyContent="flex-end"
                width="100%"
                mt={3}
                gap={2}
              >
                <ThemeButton
                  variant="outlined"
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </ThemeButton>
                <ThemeButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                >
                  {productId ? "Update Product" : "Add Product"}
                </ThemeButton>
              </Stack>
            </Grid>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddProduct;
