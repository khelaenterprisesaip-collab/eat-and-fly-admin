import React, { useState, useEffect } from "react";
import { CalendarClock, Check, CreditCard, Receipt } from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Chip,
  Skeleton,
} from "@mui/material";
import MainCard from "components/MainCard";
import ThemeButton from "components/ui/Button";
import { formatDollar } from "utils/trimFc";
import { CancelRequestModal } from "./cancel-subscription";
import useAuth from "hooks/useAuth";
import dayjs from "dayjs";

interface Subscription {
  plan: string;
  period: string;
  price: string;
  renewalDate: string;
  features: string[];
}

const availablePlans = [
  { name: "Monthly", price: "50.00", type: "monthly" },
  { name: "Yearly", price: "100.00", type: "yearly" },
];

function SubscriptionPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { user, fetchFutureInvoice, cancelSubscription, setUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(user?.stripe?.plan);
  const [cancelModal, setCancelModal] = useState(false);
  const [futureInvoiceLoading, setFutureInvoiceLoading] =
    useState<boolean>(false);
  const [futureInvoice, setFutureInvoice] = useState<any>({});
  const updateSubscription = ({ id, priceId, accountList }: any) => {
    setLoading(id);
    // updateSubscriptionService({
    //   body: {
    //     priceId,
    //     customerId: user?.stripe?.customerId,
    //     subscriptionId: user?.stripe?.subscriptionId,
    //     ...(accountList?.length && {
    //       accountList,
    //     }),
    //   },
    // })
    //   .then((res) => {
    //     router.push(res.url);
    //   })
    //   .catch((err) => {
    //     toast.error(err?.message);
    //   })
    //   .finally(() => {
    //     setLoading("");
    //     setModalBtnLoading(false);
    //   });
  };

  useEffect(() => {
    // if subscription is active then fetch future invoice
    // else if subscription is cancelled then do not fetch future invoice
    // cancelAt is the timestamp when subscription will be cancelled
    setFutureInvoiceLoading(true);
    fetchFutureInvoice(
      (res: any) => {
        setFutureInvoice(res);
        setFutureInvoiceLoading(false);
      },
      () => {
        setFutureInvoice({});
        setFutureInvoiceLoading(false);
      }
    );
  }, [user?.stripe?.cancel_at, fetchFutureInvoice]);

  const handleOpenUpgradeModal = () => {
    setOpenModal(true);
  };

  const handleCloseUpgradeModal = () => {
    setOpenModal(false);
  };

  const handleUpdatePlan = async () => {
    if (!selectedPlan) {
      alert("Please select a plan before upgrading.");
      return;
    }

    try {
    } catch (error) {
      console.error("Error updating subscription:", error);
      alert("Failed to update subscription. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const features = [
    "Quote management tool",
    "50GB Storage Limit",
    "Basic analytics & reporting",
    "Invoicing & payment processing",
    "Integrations",
  ];

  return (
    <>
      <MainCard
        title={
          <Stack>
            <Typography variant="h5">Manage Subscription</Typography>
            <Typography
              variant="caption"
              color={"#778194"}
              fontWeight={400}
              fontSize={"14px"}
            >
              Here you can manage your subscription
            </Typography>
          </Stack>
        }
      >
        <div className="flex gap-x-4">
          <div className="w-1/2">
            <Card className="bg-white overflow-hidden">
              <CardContent>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  {/* Header */}
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      Your Current Plan
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                    >
                      <Typography variant="h2" fontWeight="bold">
                        {formatDollar(user?.stripe?.price || 0)}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /{user?.stripe?.plan}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {!user?.stripe?.cancel_at ? (
                      <Chip
                        label={`Valid upto ${dayjs.unix(user?.stripe?.subscriptionValidUntil).format("DD MMM YYYY")}`}
                        color="warning"
                        variant="combined"
                      />
                    ) : (
                      <Chip
                        label={"Cancelled"}
                        color="error"
                        variant="filled"
                        className="rounded-lg text-base p-5"
                      />
                    )}
                  </Box>

                  {/* Features */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Your subscription includes:
                    </Typography>
                    <List disablePadding>
                      {features.map((feature, index) => (
                        <ListItem key={index} disablePadding sx={{ mt: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check
                              size={20}
                              color={theme.palette.success.main}
                            />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Divider />

                  {/* Actions */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <ThemeButton
                      variant="outlined"
                      color={user?.stripe?.cancel_at ? "success" : "error"}
                      onClick={() => setCancelModal(true)}
                      size="large"
                    >
                      <div className="text-base">
                        {user?.stripe?.cancel_at
                          ? "Renew Subscription"
                          : "Cancel Subscription"}
                      </div>
                    </ThemeButton>

                    <Button
                      onClick={handleOpenUpgradeModal}
                      className="bg-primary hover:bg-black rounded-md py-2"
                    >
                      <div className="text-white text-base font-sans ">
                        Upgrade Plan
                      </div>
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </div>

          {futureInvoiceLoading ? (
            <>
              <div className="w-full">
                <Card className="overflow-hidden border-0 shadow-xl bg-white/50 backdrop-blur-sm animate-pulse">
                  <div className="p-8 space-y-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center justify-between border-b border-[#e5e9ef] pb-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-xl bg-[#334735]/5" />
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>

                    {/* Summary Skeleton */}
                    <div className="space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                    </div>

                    {/* Total Skeleton */}
                    <div className="border-t border-[#e5e9ef] pt-6">
                      <div className="flex items-center justify-between bg-gradient-to-r from-[#334735]/5 to-[#334735]/10 p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-lg" />
                          <div className="space-y-1">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-8 w-32" />
                          <Skeleton className="h-4 w-16 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                {futureInvoice.next_payment_attempt ? (
                  <div className="w-full">
                    <Card className="overflow-hidden border-0 shadow-xl bg-white/50 backdrop-blur-sm">
                      <div className="p-8 space-y-8">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#e5e9ef] pb-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-[#334735]/10 flex items-center justify-center">
                              <CalendarClock className="h-6 w-6 text-[#334735]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-[#334735]">
                                Next Payment
                              </h3>
                              {user?.stripe?.subscriptionStatus ===
                                "active" && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {dayjs
                                    .unix(futureInvoice.next_payment_attempt)
                                    .format("MMMM DD, YYYY, HH:mm A")}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="h-10 w-10 rounded-xl bg-[#334735]/5 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-[#334735]" />
                          </div>
                        </div>

                        {user?.stripe?.subscriptionStatus === "active" && (
                          <>
                            {/* Summary */}
                            <div className="space-y-4 px-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">
                                    Subtotal
                                  </span>
                                  <div className="px-1.5 py-0.5 rounded-full bg-[#334735]/5 text-[10px] font-medium text-[#334735]">
                                    Monthly
                                  </div>
                                </div>
                                <span className="font-medium text-gray-900">
                                  {formatDollar(
                                    (futureInvoice?.subtotal || 0) / 100
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  Tax
                                </span>
                                <span className="font-medium text-gray-900">
                                  {formatDollar(
                                    (futureInvoice?.tax || 0) / 100
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-[#e5e9ef] pt-6">
                              <div className="flex items-center justify-between bg-gradient-to-r from-[#334735]/5 to-[#334735]/10 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                    <Receipt className="h-5 w-5 text-[#334735]" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="font-semibold text-base text-gray-900">
                                      Total Amount
                                    </span>
                                    <p className="text-xs text-gray-600">
                                      Due on next billing cycle
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-xl font-bold text-[#334735]">
                                    {formatDollar(
                                      (futureInvoice?.total || 0) / 100
                                    )}
                                  </span>
                                  <p className="text-xs text-gray-600 mt-0.5">
                                    USD
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Card>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
        {/* Upgrade Plan Modal */}
        <Dialog open={openModal} onClose={handleCloseUpgradeModal}>
          <DialogTitle>Select a New Plan</DialogTitle>
          <DialogContent>
            <RadioGroup
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              {availablePlans.map((plan) => (
                <FormControlLabel
                  key={plan?.name}
                  value={plan?.type}
                  control={<Radio />}
                  label={`${plan?.name} - $${plan.price}`}
                />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpgradeModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdatePlan} variant="contained">
              Upgrade
            </Button>
          </DialogActions>
        </Dialog>
        <CancelRequestModal
          user={user}
          modal={cancelModal}
          setModal={setCancelModal}
          cancelSubscription={cancelSubscription}
          fetchFutureInvoice={fetchFutureInvoice}
          setUser={setUser}
        />
      </MainCard>
    </>
  );
}

export default SubscriptionPage;
