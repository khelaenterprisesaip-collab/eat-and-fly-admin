"use client";

import { Button, Modal } from "@mui/material";
import { useState } from "react";

export const CancelRequestModal = ({
  modal,
  setModal,
  cancelSubscription,
  fetchFutureInvoice,
  user,
  setUser,
}: any) => {
  const [cancelReason, setCancelReason] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      sx={{
        "&:focus:not(:focus-visible)": {
          outline: 0,
          border: "none",
        },

        "&:focus-visible": {
          outline: 0,
          border: "none",
        },
      }}
      open={modal}
      onClose={() => setModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="transparent rounded-xl w-full lg:w-1/2 px-2 lg:m-auto lg:flex lg:justify-center lg:items-center overflow-y-auto lg:overflow-hidden"
    >
      <div className="bg-white rounded-lg p-10 shadow-lg">
        <h2 className="text-lg font-sans">
          {user?.stripe?.cancel_at
            ? "Reactivate Subscription?"
            : "Cancel Subscription?"}
        </h2>
        <p className="my-1 text-base ">
          {user?.stripe?.cancel_at
            ? "Your subscription is currently paused. Would you like to reactivate it?"
            : "What is the reason for cancellation of your subscription?"}
        </p>
        <br />
        {!user?.stripe?.cancel_at ? (
          <textarea
            maxLength={250}
            placeholder="(Optional)"
            value={cancelReason}
            className="mb-4 min-h-[100px] w-full rounded-md border-[0.5px] border-gray-400 bg-transparent p-2"
            onChange={(e) => {
              setCancelReason(e.target.value);
            }}
          />
        ) : (
          <></>
        )}
        <div className="flex items-center justify-end gap-4">
          <Button variant="outlined" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            className={user?.stripe?.cancel_at ? "bg-blue-500" : "bg-red-500"}
            disabled={loading}
            onClick={() => {
              setLoading(true);
              cancelSubscription(
                cancelReason,
                !user?.stripe?.cancel_at,
                (res: any) => {
                  console.log(res, "res");
                  setUser(res);
                  setCancelReason("");
                  setModal(false);
                  fetchFutureInvoice();
                  setLoading(false);
                },
                () => {
                  setLoading(false);
                }
              );
            }}
          >
            {loading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
