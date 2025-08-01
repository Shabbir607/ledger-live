import React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}) => {
  const isSend = type === "send";

  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/20" },
    confirmed: {
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-400/20",
    },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/20" },
  };

  const StatusIcon = statusConfig[status]?.icon;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start justify-between p-4 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-200 group",
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
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
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
            <h4 className="font-medium text-white">
              {isSend ? "Sent" : "Received"} {asset}
            </h4>
            <div
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
                statusConfig[status]?.bg,
                statusConfig[status]?.color
              )}
            >
              <StatusIcon className="w-3 h-3" />
              <span className="capitalize">{status}</span>
            </div>
          </div>

          {/* Date & Address */}
          <div className="text-sm text-gray-400 space-y-1">
            <div>{new Date(date).toLocaleDateString()}</div>
            <div className="break-all whitespace-pre-wrap">
              <span className="font-semibold text-white">
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
                isSend ? "text-red-400" : "text-green-400"
              )}
            >
              {isSend ? "-" : "+"}
              {amount} {asset}
            </p>
            <p className="text-sm text-gray-400">
              ${fiatValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Action Button */}
      <div className="self-end sm:self-center sm:ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          title="View transaction details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
