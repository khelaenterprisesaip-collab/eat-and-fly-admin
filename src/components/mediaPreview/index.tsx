import React, { useEffect, useState } from "react";
import { Eye, Download, X } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import ThemeButton from "components/ui/Button";
import axios from "axios";
// import { Document, Page } from 'react-pdf';

interface FilePreviewProps {
  fileUrl: string;
  width?: string;
  height?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileUrl,
  width = "300px",
  height = "300px",
}) => {
  const [open, setOpen] = useState(false);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [base64Data, setBase64Data] = useState("");

  console.log("base64Data", base64Data);
  useEffect(() => {
    const fetchFileType = async () => {
      if (!fileUrl) return;
      setLoading(true);
      try {
        const fileExtension = fileUrl.split(".").pop()?.toLowerCase() || "";

        console.log("fileExtension", fileExtension);
        if (["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension)) {
          setFileType("image");
        } else if (fileExtension === "pdf") {
          setFileType("pdf");
        } else {
          setFileType("unknown");
        }
      } catch (error) {
        console.error("Error fetching file: ", error);
        setFileType("unknown");
      } finally {
        setLoading(false);
      }
    };

    fetchFileType();
  }, [fileUrl]);

  // useEffect(() => {
  //   if (fileUrl) {
  //     setLoading(true);
  //     axios({
  //       url: fileUrl,
  //       method: "GET",
  //       responseType: "arraybuffer",
  //     })
  //       .then((response) => {
  //         const data = Buffer.from(response.data, "binary").toString("base64");
  //         setBase64Data(data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         {
  //           setLoading(false);
  //         }
  //       });
  //   }
  // }, [fileUrl]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div
        className="animate-pulse bg-gray-200 rounded"
        style={{ width, height }}
      />
    );
  }

  const imageUrl = `https://pdf2png.com/api/convert?file=${encodeURIComponent(fileUrl)}&page=1`;
  return (
    <div className="relative inline-block" style={{ width, height }}>
      {fileType === "image" && (
        <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={fileUrl}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {fileType === "pdf" && (
        <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            style={{
              width: "100%", // Make it full width of the viewport
              height: "100%", // Large enough for better viewing
              border: "none",
            }}
            title="PDF Preview"
          />
          {/* <Document file={fileUrl}>
            <Page pageNumber={1} />
          </Document> */}
        </div>
      )}

      <IconButton
        onClick={handleOpen}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <Eye className="w-5 h-5" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          File Preview
          <IconButton
            onClick={handleClose}
            sx={{
              color: "grey.500",
              "&:hover": {
                color: "grey.700",
              },
            }}
          >
            <X className="w-5 h-5" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            position: "relative",
            minHeight: "70vh",
            p: 0,
            backgroundColor: "grey.100",
          }}
        >
          {fileType === "image" ? (
            <div className="bg-gray-100 flex items-center justify-center p-4 min-h-[70vh]">
              <img
                src={fileUrl}
                alt="Preview"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          ) : fileType === "pdf" ? (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
              style={{
                width: "100vw", // Make it full width of the viewport
                height: "70vh", // Large enough for better viewing
                border: "none",
              }}
              title="PDF Preview"
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              File cannot be previewed. Please download.
            </div>
          )}
        </DialogContent>

        <Stack mt={10}>
          <ThemeButton
            variant={"contained"}
            onClick={handleDownload}
            startIcon={<Download />}
            buttonStyle={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
          >
            Download
          </ThemeButton>
        </Stack>
      </Dialog>
    </div>
  );
};

export default FilePreview;
