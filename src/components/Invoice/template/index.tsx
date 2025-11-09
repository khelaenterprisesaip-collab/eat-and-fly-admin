import { CircularProgress } from "@mui/material";
import { DownloadIcon } from "assets/svg/DownloadIcon";
import NewLogo from "components/newLogo";
import ThemeButton from "components/ui/Button";
import Modal from "components/ui/Modal";
import dayjs from "dayjs";
import React from "react";
import { downloadInvoice } from "services/invoice";
import { formatDollar } from "utils/trimFc";

const Invoice = ({ open, setOpen, orderBilling, setMailOpen }: any) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  let customerAddress = orderBilling?.customerAddress?.[0];

  const calculateOrderTotal: any = () => {
    const totalPrice = (orderBilling?.charges || []).reduce(
      (chargeAcc: any, charge: any) => {
        const chargeTotal = (charge?.rows || []).reduce(
          (rowAcc: any, row: any) => {
            return rowAcc + (row?.totalPrice || 0);
          },
          0
        );
        return chargeAcc + chargeTotal;
      },
      0
    );
    return orderBilling?.basePayPerUnitPrice + totalPrice;
  };

  return (
    <Modal
      open={open}
      handleClose={() => {
        setOpen(false);
      }}
      title={`Invoice - ${orderBilling?.customerName}`}
      closeIcon
      titleAction={
        <div className="flex gap-4 items-center">
          <ThemeButton
            buttonStyle={{ py: 0.5 }}
            variant={"contained"}
            onClick={() => {
              setMailOpen(true);
              setOpen(false);
            }}
          >
            Send Mail
          </ThemeButton>
          <div
            className={`mr-4 cursor-pointer ${isDownloading ? "pointer-events-none opacity-60" : ""}`}
            onClick={async () => {
              try {
                setIsDownloading(true);
                const res = await downloadInvoice({
                  body: { id: orderBilling?.orderId },
                });
                const url = res?.data;
                if (url) {
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `Invoice-${orderBilling?.orderId || "invoice"}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } else {
                  console.log("Invalid PDF URL");
                }
              } catch (err) {
                console.log("Download error", err);
              } finally {
                setIsDownloading(false);
              }
            }}
          >
            {isDownloading ? (
              <CircularProgress size={20} thickness={5} />
            ) : (
              <DownloadIcon color="black" />
            )}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-4xl mx-auto border border-gray-300 text-black font-sans text-sm bg-white">
        {/* Header */}
        <div className="bg-blue-700 text-white p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">INVOICE</h1>

          <NewLogo />
          {/* <div className="text-right text-lg font-semibold">Smart Global</div> */}
        </div>

        {/* Date and Invoice No */}
        <div className="flex justify-between p-6">
          <div>
            <p>
              <strong>Date:</strong>{" "}
              {orderBilling?.created_at
                ? dayjs(orderBilling?.created_at).format("DD/MM/YYYY")
                : "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Invoice No.</strong> OT000001
            </p>
          </div>
        </div>

        {/* Bill To / From */}
        <div className="flex flex-col md:flex-row justify-between px-6 gap-8 md:gap-16 w-full">
          {/* BILL TO Section */}
          <div className="flex-1 min-w-0 break-words text-sm">
            <h2 className="font-bold mb-1">BILL TO:</h2>
            <p>{orderBilling?.customerName}</p>
            <p className="break-words">
              {orderBilling?.customerEmail?.toLowerCase()}
            </p>
            <p className="break-words">
              {`${customerAddress?.addressLine1}, ${customerAddress?.city || ""} ${customerAddress?.state || ""} ${customerAddress?.country || ""}, ${customerAddress?.postalCode || ""}`}
            </p>
          </div>

          {/* FROM Section */}
          <div className="flex-1 min-w-0 break-words text-sm text-left">
            <h2 className="font-bold mb-1">FROM:</h2>
            <p>Smart Global</p>
            <p className="break-words">billing@Smart Global.com</p>
            <p className="break-words">123 Anywhere St., Any City</p>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <table className="w-full border-collapse mt-2">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="border border-gray-300 p-2 text-sm w-[60%]">
                  ITEMS
                </th>
                <th className="border border-gray-300 p-2 w-[16%] text-sm text-center">
                  UNIT COUNT
                </th>
                <th className="border border-gray-300 p-2 w-[13%] text-sm text-center">
                  PRICE/UNIT
                </th>
                <th className="border border-gray-300 p-2 w-[14%] text-sm text-center">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1.5">Drayage</td>
                <td className="border border-gray-300 p-1.5 text-center">1</td>
                <td className="border border-gray-300 p-1.5 text-right">
                  {formatDollar(orderBilling?.basePayPerUnitPrice)}
                </td>
                <td className="border border-gray-300 p-1.5 text-right">
                  {formatDollar(orderBilling?.basePayTotalPrice)}
                </td>
              </tr>
              {orderBilling?.charges
                .flatMap((charge: any) => charge?.rows)
                .map((item: any, idx: any) => (
                  <tr key={idx}>
                    <td className="border border-gray-300  p-1.5">
                      {item.title}
                      <span className="italic text-[11px] font-light block">
                        {item?.description}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-1.5 text-center">
                      {item?.unitCount}
                    </td>
                    <td className="border border-gray-300 p-1.5 text-right">
                      {formatDollar(item?.perUnitPrice)}
                    </td>
                    <td className="border border-gray-300 p-1.5 text-right">
                      {formatDollar(item?.totalPrice)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {orderBilling?.discountPerUnitPrice ? (
          <div className="px-6 text-right font-[500] flex justify-end">
            SubTotal:{" "}
            <div className="font-semibold w-20">
              {formatDollar(calculateOrderTotal())}
            </div>
          </div>
        ) : (
          ""
        )}
        {orderBilling?.discountPerUnitPrice ? (
          <div className="px-6 text-right font-[500] flex justify-end">
            Discount:{" "}
            <span className="font-semibold w-20">
              -{formatDollar(orderBilling?.discountPerUnitPrice)}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="px-6 text-right font-[500] flex justify-end">
          Grand Total :{" "}
          <span className="font-semibold w-20">
            {formatDollar(
              calculateOrderTotal() - orderBilling?.discountPerUnitPrice
            )}
          </span>
        </div>

        <div className="px-6 py-8 grid grid-cols-2 gap-4">
          {/* <div>
            <h3 className="font-bold mb-1">PAYMENT METHOD</h3>
            <p>Bank name: Global Bank</p>
            <p>Account No: 987-654-3210</p>
          </div> */}
          <div>
            <h3 className="font-bold mb-1">NOTES</h3>
            <p>Thank you for your business! Payment is due within 30 days.</p>
          </div>
        </div>

        <div className="bg-blue-700 py-6 px-6 flex flex-col">
          <div className=" text-white flex justify-between text-center text-sm">
            <div className="w-1/2 border-t border-white pt-2 text-center">
              Date
            </div>
            <div className="w-1/2 border-t border-white pt-2 text-center">
              Signature
            </div>
          </div>
          <div className="text-center text-xs  p-2 text-white">
            www.smart-global-frontend.pages.dev
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Invoice;
