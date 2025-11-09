import React from "react";
import {
  Drawer,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Download } from "lucide-react";
import dayjs from "dayjs";

const DocDrawer = ({ isOpen, setIsOpen, moves }: any) => {
  const pod = moves?.[isOpen]?.pod;
  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen("");
    };

  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "document";
    link.target = "_blank";
    link.click();
  };

  // format unix timestamp safely
  const formatTime = (ts?: number) =>
    ts ? dayjs.unix(ts).format("DD/MM/YYYY HH:mm") : "-";

  return (
    <Drawer
      open={isOpen !== ""}
      onClose={toggleDrawer()}
      anchor="right"
      PaperProps={{
        sx: { width: 450, borderRadius: "12px 0 0 12px" },
      }}
    >
      <div className="p-4 flex flex-col gap-4 h-[100%] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Typography variant="h6" fontWeight={600}>
            Move Documents
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen("");
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Pod info (on top) */}
        {pod && (
          <Card
            variant="outlined"
            sx={{
              backgroundColor: "#f9fafb",
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              minHeight: "130px",
            }}
          >
            <CardContent>
              {/* Date */}
              <div className="flex justify-between items-center py-1 border-b border-gray-200">
                <Typography variant="subtitle2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {formatTime(pod.date)}
                </Typography>
              </div>

              {/* In/Out Times */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="flex flex-col items-center p-1 rounded-lg bg-white border border-gray-200">
                  <Typography variant="caption" color="text.secondary">
                    In Time
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {formatTime(pod.inTime)}
                  </Typography>
                </div>
                <div className="flex flex-col items-center p-1 rounded-lg bg-white border border-gray-200">
                  <Typography variant="caption" color="text.secondary">
                    Out Time
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {formatTime(pod.outTime)}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Divider />

        {/* Signature */}
        {pod?.signature?.url && (
          <Card variant="outlined">
            <CardContent>
              <div className="flex items-center gap-2">
                <ImageIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={500}>
                  Signature
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Signed by: <strong>{pod?.name}</strong>
              </Typography>
              {isImage(pod?.signature?.url) ? (
                <div className="relative mt-3">
                  <img
                    src={pod?.signature?.url}
                    alt="Signature"
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                    }}
                  />
                  <IconButton
                    onClick={() =>
                      handleDownload(pod?.signature?.url, pod?.signature?.name)
                    }
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "white",
                      boxShadow: 1,
                    }}
                  >
                    <Download size={18} />
                  </IconButton>
                </div>
              ) : (
                <Typography variant="body2" color="error">
                  Unsupported file format
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href={pod?.signature?.url}
                target="_blank"
                startIcon={<OpenInNewIcon />}
              >
                View Full
              </Button>
            </CardActions>
          </Card>
        )}

        {/* POD Document */}
        {pod?.doc?.url && (
          <Card variant="outlined">
            <CardContent>
              <div className="flex items-center gap-2">
                <DescriptionIcon color="secondary" />
                <Typography variant="subtitle1" fontWeight={500}>
                  {pod?.doc?.name || "POD Document"}
                </Typography>
              </div>
              {isImage(pod?.doc?.url) ? (
                <div className="relative mt-3">
                  <img
                    src={pod?.doc?.url}
                    alt="POD Document"
                    style={{
                      height: "200px",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                    }}
                  />
                  <IconButton
                    onClick={() =>
                      handleDownload(pod?.doc?.url, pod?.doc?.name)
                    }
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "white",
                      boxShadow: 1,
                    }}
                  >
                    <Download size={18} />
                  </IconButton>
                </div>
              ) : (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  File preview not available (not an image).
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href={pod?.doc?.url}
                target="_blank"
                startIcon={<OpenInNewIcon />}
              >
                Open Document
              </Button>
              <Button
                size="small"
                onClick={() => handleDownload(pod?.doc?.url, pod?.doc?.name)}
                startIcon={<Download size={16} />}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        )}

        {!pod?.signature?.url && !pod?.doc?.url && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            No documents available for this move.
          </Typography>
        )}
      </div>
    </Drawer>
  );
};

export default DocDrawer;
