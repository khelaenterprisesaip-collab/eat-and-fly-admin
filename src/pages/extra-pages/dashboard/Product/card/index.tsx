import { Card, CardContent, Box, Typography, Avatar } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  gradient?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  gradient = "linear-gradient(135deg, #334735 0%, #4a6a4d 100%)",
}: StatCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "#4caf50";
      case "negative":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: gradient,
        },
        "&:hover": {
          boxShadow: "0px 12px 24px rgba(51, 71, 53, 0.20)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "0.75rem",
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              {value}
            </Typography>
            {/* {change && (
              <Typography
                variant="body2"
                sx={{
                  color: getChangeColor(),
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {changeType === "positive" && "↑"}
                {changeType === "negative" && "↓"}
                {change}
              </Typography>
            )} */}
          </Box>
          <Avatar
            sx={{
              background: gradient,
              width: 56,
              height: 56,
              boxShadow: "0px 4px 12px rgba(51, 71, 53, 0.25)",
            }}
          >
            <Icon sx={{ fontSize: 28, color: "#fff" }} />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
