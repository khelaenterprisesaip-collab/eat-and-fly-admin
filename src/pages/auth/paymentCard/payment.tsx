import React from "react";
import { Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51PJeRVSDpXykAAqRHhPogog9HkCkSKMtfYRn2Lc7E52jOUDo0Wd273w49S1rwTOzk0PnXM6OF0YUZuX1wTZt7Orn00Tfg4bkOj"
);

const features = [
  "Quote management tool",
  "50GB Storage Limit",
  "Basic analytics & reporting",
  "Invoicing & payment processing",
  "Integrations",
];

const pricingPlans = [
  {
    name: "Smart Global",
    period: "monthly",
    price: "79",
    interval: "month",
    priceId: "price_monthly_id",
  },
  {
    name: "Smart Global",
    period: "yearly",
    price: "828",
    interval: "year",
    priceId: "price_yearly_id",
  },
];

function PricingCard({
  name,
  period,
  price,
  interval,
  priceId,
}: {
  name: string;
  period: string;
  price: string;
  interval: string;
  priceId: string;
}) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl: window.location.origin + "/subscription",
          cancelUrl: window.location.origin,
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box>
          <Typography variant="h6" component="h3" gutterBottom>
            {name} ({period})
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h3" component="span" fontWeight="bold">
              ${price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              per {interval}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          A powerful solution to boost sales and grow your business
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handlePayment}
          sx={{ my: 2 }}
        >
          Subscribe Now
        </Button>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            FEATURES
          </Typography>
          <List dense disablePadding>
            {features?.map((feature, index) => (
              <ListItem key={index} disablePadding sx={{ mt: 1 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Check size={18} color={theme.palette.primary.main} />
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

function PricingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Plans that fit your scale
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Simple, transparent pricing that grows with you.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {pricingPlans?.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PricingCard
                name={plan.name}
                period={plan.period}
                price={plan.price}
                interval={plan.interval}
                priceId={plan.priceId}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PricingPage;
