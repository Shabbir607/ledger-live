import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDarkMode } from "../DarkModeContext";

const BASE_URL =
  (import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const TransactionItem = ({
  type, // 'send' | 'receive'
  asset,
  amount,
  fiatValue,
  status, // 'pending' | 'confirmed' | 'failed'
  date,
  address,
  hash,
  className,
  hideBalances,
  onStatusChange,
}) => {
  const { darkMode } = useDarkMode();
  const [confirming, setConfirming] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const isSend = type === "send";

  const statusConfig = {
    pending: {
      icon: Clock,
      color: "text-yellow-400",
      bg: darkMode ? "bg-yellow-400/20" : "bg-yellow-100",
      darkText: "text-yellow-400",
      lightText: "text-yellow-600",
    },
    confirmed: {
      icon: CheckCircle,
      color: "text-green-400",
      bg: darkMode ? "bg-green-400/20" : "bg-green-100",
      darkText: "text-green-400",
      lightText: "text-green-600",
    },
    failed: {
      icon: XCircle,
      color: "text-red-400",
      bg: darkMode ? "bg-red-400/20" : "bg-red-100",
      darkText: "text-red-400",
      lightText: "text-red-600",
    },
  };

  const StatusIcon = statusConfig[status]?.icon || Clock;
  const currentStatus = statusConfig[status] || statusConfig.pending;

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${BASE_URL}/api/wallet/transaction/${hash}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success && onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      console.error("Failed to confirm transaction:", err);
    } finally {
      setConfirming(false);
    }
  };

  const handleCancel = async () => {
    setCanceling(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${BASE_URL}/api/wallet/transaction/${hash}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success && onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      console.error("Failed to cancel transaction:", err);
    } finally {
      setCanceling(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start justify-between p-4 rounded-lg border transition-all duration-200 group",
        darkMode
          ? "border-gray-800 bg-gray-900/30 hover:bg-gray-800/50"
          : "border-gray-200 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md",
        className
      )}
    >
      {/* Left Section - Icon & Details */}
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Transaction Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            isSend
              ? darkMode
                ? "bg-red-500/20 text-red-400"
                : "bg-red-100 text-red-600"
              : darkMode
                ? "bg-green-500/20 text-green-400"
                : "bg-green-100 text-green-600"
          )}
        >
          {isSend ? (
            <ArrowUpRight className="w-5 h-5" />
          ) : (
            <ArrowDownLeft className="w-5 h-5" />
          )}
        </div>

        {/* Transaction Info */}
        <div className="flex-1 min-w-0 ">
          {/* Asset and Status */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4
              className={cn(
                "font-medium",
                darkMode ? "text-white" : "text-gray-900"
              )}
            >
              {isSend ? "Sent" : "Received"} {asset}
            </h4>
            <div
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
                currentStatus.bg,
                darkMode ? currentStatus.darkText : currentStatus.lightText
              )}
            >
              <StatusIcon className="w-3 h-3" />
              <span className="capitalize">{status}</span>
            </div>
          </div>

          {/* Date & Address */}
          <div
            className={cn(
              "text-sm space-y-1",
              darkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            <div>{new Date(date).toLocaleDateString()}</div>
            <div className="break-all whitespace-pre-wrap">
              <span
                className={cn(
                  "font-semibold",
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {isSend ? "To: " : "From: "}
              </span>
              {address}
            </div>
          </div>

          {/* Amount under status for better layout */}
          <div className="mt-2">
            <p
              className={cn(
                "font-semibold text-sm",
                isSend
                  ? darkMode
                    ? "text-red-400"
                    : "text-red-600"
                  : darkMode
                    ? "text-green-400"
                    : "text-green-600"
              )}
            >
              {isSend ? "-" : "+"}
              {amount} {asset}
            </p>
            <p
              className={cn(
                "text-sm",
                darkMode ? "text-gray-400" : "text-gray-600"
              )}
            >
              ${fiatValue.toLocaleString()}
            </p>
          </div>

          {/* Pending Transaction Actions */}
          {status === "pending" && (
            <div className="flex gap-2 mt-3">
              {/* Only Recipient can confirm */}
              {!isSend && (
                <button
                  onClick={handleConfirm}
                  disabled={confirming || canceling}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    darkMode
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  )}
                >
                  {confirming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Confirm
                </button>
              )}

              {/* Sender or Recipient can Cancel? Usually sender cancels unconfirmed tx. */}
              <button
                onClick={handleCancel}
                disabled={confirming || canceling}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  darkMode
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                )}
              >
                {canceling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hover Action Button */}
      <div className="self-end sm:self-center sm:ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className={cn(
            "p-2 rounded-lg transition-colors",
            darkMode
              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          )}
          title="View transaction details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
