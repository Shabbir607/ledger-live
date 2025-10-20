import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeRanges = [
  { id: '1D', label: '1D' },
  { id: '1W', label: '1W' },
  { id: '1M', label: '1M' },
  { id: '3M', label: '3M' },
  { id: '1Y', label: '1Y' },
  { id: 'ALL', label: 'ALL' }
];

const PortfolioChart = ({ data, totalValue, change24h, className }) => {
  const [selectedRange, setSelectedRange] = useState('1M');
  const isPositive = change24h >= 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          <p className="text-white font-semibold">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("p-6 rounded-xl border border-gray-800 bg-gray-900/50", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Portfolio Value</h2>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-white">
              ${totalValue.toLocaleString()}
            </span>
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <span className={cn(
                "font-semibold",
                isPositive ? "text-green-400" : "text-red-400"
              )}>
                {isPositive ? '+' : ''}{change24h.toFixed(2)}%
              </span>
              <span className="text-gray-400 text-sm">24h</span>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
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
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
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
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
                strokeWidth: 2 
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;

