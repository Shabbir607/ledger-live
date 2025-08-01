import React from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const AccountCard = ({ 
  coinName, 
  coinSymbol, 
  balance, 
  fiatValue, 
  change24h, 
  coinIcon,
  className 
}) => {
  const isPositive = change24h >= 0;
  
  return (
    <div className={cn(
      "relative p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group",
      className
    )}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
              {coinIcon || coinSymbol.slice(0, 2)}
            </div>
            <div>
              <h3 className="font-semibold text-white">{coinName}</h3>
              <p className="text-sm text-gray-400">{coinSymbol}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Balance */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-white mb-1">{balance} {coinSymbol}</p>
          <p className="text-lg text-gray-300">${fiatValue.toLocaleString()}</p>
        </div>

        {/* 24h Change */}
        <div className="flex items-center space-x-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-400" : "text-red-400"
          )}>
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </span>
          <span className="text-sm text-gray-400">24h</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex-1 py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium transition-colors">
            Send
          </button>
          <button className="flex-1 py-2 px-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
            Receive
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;

