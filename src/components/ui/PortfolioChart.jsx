import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* --------------------------------------------------------------- */
const rangeMs = {
  "1D": 24 * 60 * 60 * 1000,
  "1W": 7 * 24 * 60 * 60 * 1000,
  "1M": 30 * 24 * 60 * 60 * 1000,
  "3M": 90 * 24 * 60 * 60 * 1000,
  "1Y": 365 * 24 * 60 * 60 * 1000,
  ALL: Infinity,
};

const timeRanges = [
  { id: "1D", label: "1D" },
  { id: "1W", label: "1W" },
  { id: "1M", label: "1M" },
  { id: "3M", label: "3M" },
  { id: "1Y", label: "1Y" },
  { id: "ALL", label: "ALL" },
];
/* --------------------------------------------------------------- */

const PortfolioChart = ({
  data,
  totalValue,
  change24h,
  changePercent,
  className,
}) => {
const [selectedRange, setSelectedRange] = useState('ALL'); // Changed from '1M'
const filteredData = useMemo(() => {
  if (!data?.length) return [];

  const now = Date.now();
  let cutoff;
  
  // Special handling for 1D - show today's data
  if (selectedRange === '1D') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    cutoff = today.getTime();
  } else {
    cutoff = selectedRange === 'ALL' ? 0 : now - rangeMs[selectedRange];
  }

  // Filter by date range first
  const filtered = data.filter((p) => {
    const t = new Date(p.date).getTime();
    return !Number.isNaN(t) && t >= cutoff;
  });

  if (!filtered.length) return [];

  // For ALL view, show actual transaction points (no aggregation)
  if (selectedRange === 'ALL') {
    return filtered;
  }

  // For 1D - hourly aggregation
  if (selectedRange === '1D') {
    const hourlyData = new Map();
    filtered.forEach((point) => {
      const date = new Date(point.date);
      const hourKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;

      if (!hourlyData.has(hourKey)) {
        hourlyData.set(hourKey, {
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours()
          ).toISOString(),
          value: point.value,
        });
      } else {
        // Use latest value in the hour
        hourlyData.get(hourKey).value = point.value;
      }
    });
    return Array.from(hourlyData.values()).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  // For 1W - daily aggregation (take last value of each day)
  if (selectedRange === '1W') {
    const dailyData = new Map();
    filtered.forEach((point) => {
      const date = new Date(point.date);
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      if (!dailyData.has(dayKey)) {
        dailyData.set(dayKey, {
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ).toISOString(),
          value: point.value,
        });
      } else {
        // Use latest value in the day
        dailyData.get(dayKey).value = point.value;
      }
    });
    return Array.from(dailyData.values()).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  // For 1M - weekly aggregation
  if (selectedRange === '1M') {
    const weeklyData = new Map();
    filtered.forEach((point) => {
      const date = new Date(point.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay() + 1); // Monday
      weekStart.setHours(0, 0, 0, 0);
      const weekKey = weekStart.toISOString().split('T')[0];

      if (!weeklyData.has(weekKey)) {
        weeklyData.set(weekKey, {
          date: weekKey,
          value: point.value,
        });
      } else {
        // Use latest value in week
        weeklyData.get(weekKey).value = point.value;
      }
    });
    return Array.from(weeklyData.values()).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  // For 3M, 1Y - monthly aggregation
  if (selectedRange === '3M' || selectedRange === '1Y') {
    const monthlyData = new Map();
    filtered.forEach((point) => {
      const date = new Date(point.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, {
          date: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
          value: point.value,
        });
      } else {
        // Use latest value in month
        monthlyData.get(monthKey).value = point.value;
      }
    });
    return Array.from(monthlyData.values()).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  return filtered;
}, [data, selectedRange]);
  const isPositive = change24h >= 0;
  const displayPercent =
    changePercent ?? (totalValue ? (change24h / totalValue) * 100 : 0);

  /* --------------------------  X-AXIS FORMATTER  -------------------------- */
  const formatXAxis = (tickItem) => {
    const d = new Date(tickItem);

    if (selectedRange === "1D") {
      // Show hour for 1 day view
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });
    }

    if (selectedRange === "1W") {
      // Show weekday for 1 week view
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }

    if (selectedRange === "1M") {
      // Show week range for 1 month view
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay() + 1);
      return `${weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    }

    // For 3M, 1Y, ALL - show month
    return d.toLocaleDateString("en-US", {
      month: "short",
      year: selectedRange === "ALL" ? "2-digit" : undefined,
    });
  };
  /* ----------------------------------------------------------------------- */

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const d = new Date(label);
    const dataPoint = payload[0].payload;
    let dateLabel = "";

    if (selectedRange === "1D") {
      dateLabel = d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (selectedRange === "1W") {
      dateLabel = d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    } else if (selectedRange === "1M") {
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      dateLabel = `${weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${weekEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    } else {
      dateLabel = d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg min-w-[200px]">
        <p className="text-gray-300 text-xs mb-2">{dateLabel}</p>
        <p className="text-white font-bold text-lg mb-2">
          $
          {payload[0].value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        
        {/* Show transaction details if available */}
        {dataPoint.transaction && (
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className={`flex items-center gap-2 text-xs ${
              dataPoint.transaction.type === 'credit' 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              <span className="font-semibold">
                {dataPoint.transaction.type === 'credit' ? '+' : '-'}
                ${dataPoint.transaction.amount.toLocaleString()}
              </span>
              <span className="text-gray-400">
                {dataPoint.transaction.wallet}
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              {dataPoint.transaction.description}
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};
  // Handle empty data states
  if (!filteredData || filteredData.length === 0) {
    return (
      <div
        className={cn(
          "p-6 rounded-xl border border-gray-800 bg-gray-900/50",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Portfolio Value
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-3xl font-bold text-white">
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setSelectedRange(range.id)}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
                  selectedRange === range.id
                    ? "bg-cyan-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-80 bg-gray-800/30 rounded-lg">
          <p className="text-gray-400 text-lg">
            No transaction data available for this period
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try selecting a different time range
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-gray-800 bg-gray-900/50",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Portfolio Value
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-3xl font-bold text-white">
              $
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <span
                className={cn(
                  "font-semibold",
                  isPositive ? "text-green-400" : "text-red-400"
                )}
              >
                {isPositive ? "+" : ""}
                {displayPercent.toFixed(2)}%
              </span>
              <span className="text-gray-400 text-sm">24h</span>
            </div>
          </div>
        </div>

        {/* Time-range selector */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
                selectedRange === range.id
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="portfolioGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatXAxis}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#06b6d4",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;
