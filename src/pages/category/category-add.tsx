import React, { useEffect, useState } from "react";
import {
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import MainCard from "components/MainCard";
import Input from "components/ui/Input";
import CapitalizeInput from "components/ui/CaptializeInput";
import ThemeButton from "components/ui/Button";
import { openSnackbar } from "api/snackbar";
import { SnackbarProps } from "types/snackbar";
import { InfoCircle } from "iconsax-react";
import { createCategory, getSingleCategory, updateCategory } from "services/category";

// -------------------- SCHEMA -------------------- //
const formSchema = z.object({
    name: z.string().min(1, { message: "Category name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
});

type FormValues = z.infer<typeof formSchema>;

// -------------------- COMPONENT -------------------- //
const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        if (id) {
            getSingleFetch(id);
        }
    }, [id]);

    const getSingleFetch = (id: string) => {
        getSingleCategory({ pathParams: { id } })?.then((res: any) => {
            reset(res?.data);
        });
    };

    const onSubmit = (data: FormValues) => {
        setLoading(true);
        const action = id ? updateCategory : createCategory;

        action({
            pathParams: id ? { id } : undefined,
            body: data,
        })
            ?.then(() => {
                setLoading(false);
                navigate("/categories");
                openSnackbar({
                    open: true,
                    message: `Category ${id ? "updated" : "added"} successfully.`,
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
                    {id ? "Update Category" : "Add Category"}
                </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <MainCard title="Category Information">
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CapitalizeInput
                                    required
                                    control={control}
                                    label="Category Name"
                                    name="name"
                                    placeholder="Enter category name"
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

                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                width="100%"
                                mt={3}
                                gap={2}
                            >
                                <ThemeButton
                                    variant="outlined"
                                    onClick={() => navigate("/categories")}
                                >
                                    Cancel
                                </ThemeButton>
                                <ThemeButton
                                    loading={loading}
                                    type="submit"
                                    variant="contained"
                                >
                                    {id ? "Update Category" : "Add Category"}
                                </ThemeButton>
                            </Stack>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AddCategory;
