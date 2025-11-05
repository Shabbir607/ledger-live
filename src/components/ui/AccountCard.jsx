import React from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDarkMode } from '../DarkModeContext';
import { Link } from 'react-router-dom';

const AccountCard = ({ 
  coinName, 
  coinSymbol, 
  balance, 
  fiatValue, 
  change24h,
  change7d,
  currentPrice,
  marketCapRank,
  coinIcon,
  className,
  hideBalances 
}) => {
  const { darkMode } = useDarkMode();
  const isPositive = change24h >= 0;
  const is7dPositive = change7d >= 0;
  
  return (
    <div className={cn(
      "relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 group",
      darkMode 
        ? "border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:border-gray-700" 
        : "border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md",
      className
    )}>
      {/* Background Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        darkMode 
          ? "from-cyan-500/5 to-blue-500/5" 
          : "from-cyan-500/10 to-blue-500/10"
      )} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {coinIcon || coinSymbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className={cn(
                  "font-semibold",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {coinName}
                </h3>
                {marketCapRank > 0 && marketCapRank <= 10 && (
                  <span className={cn(
                    "px-1.5 py-0.5 text-xs font-medium rounded flex items-center space-x-1",
                    darkMode 
                      ? "bg-yellow-500/20 text-yellow-300" 
                      : "bg-yellow-100 text-yellow-700"
                  )}>
                    <Award className="w-3 h-3" />
                    <span>#{marketCapRank}</span>
                  </span>
                )}
              </div>
              <p className={cn(
                "text-sm",
                darkMode ? "text-gray-400" : "text-gray-600"
              )}>
                {coinSymbol}
              </p>
            </div>
          </div>
          <button className={cn(
            "p-2 rounded-lg transition-colors",
            darkMode 
              ? "hover:bg-gray-800" 
              : "hover:bg-gray-100"
          )}>
            <MoreHorizontal className={cn(
              "w-4 h-4",
              darkMode ? "text-gray-400" : "text-gray-600"
            )} />
          </button>
        </div>

        {/* Balance */}
        <div className="mb-3">
          <p className={cn(
            "text-2xl font-bold mb-1",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            {hideBalances ? '••••••' : balance.toLocaleString()} {coinSymbol}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className={cn(
              "text-lg font-semibold",
              darkMode ? "text-gray-300" : "text-gray-700"
            )}>
              ${hideBalances ? '••••••' :fiatValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {currentPrice > 0 && (
              <p className={cn(
                "text-xs",
                darkMode ? "text-gray-500" : "text-gray-400"
              )}>
                @ ${currentPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Price Changes */}
        <div className="flex items-center space-x-4 mb-3">
          {/* 24h Change */}
          <div className="flex items-center space-x-1.5">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <div>
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-green-400" : "text-red-400"
              )}>
                {isPositive ? '+' : ''}{change24h.toFixed(2)}%
              </span>
              <span className={cn(
                "text-xs ml-1",
                darkMode ? "text-gray-500" : "text-gray-400"
              )}>
                24h
              </span>
            </div>
          </div>

          {/* 7d Change */}
          {change7d !== undefined && (
            <div className="flex items-center space-x-1.5">
              {is7dPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-400 opacity-70" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-400 opacity-70" />
              )}
              <div>
                <span className={cn(
                  "text-xs font-medium",
                  is7dPositive ? "text-green-400" : "text-red-400"
                )}>
                  {is7dPositive ? '+' : ''}{change7d.toFixed(2)}%
                </span>
                <span className={cn(
                  "text-xs ml-1",
                  darkMode ? "text-gray-500" : "text-gray-400"
                )}>
                  7d
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
       
<div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <Link
    to="/send"
    className={cn(
      "flex-1 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors",
      darkMode
        ? "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
        : "bg-cyan-100 hover:bg-cyan-200 text-cyan-600"
    )}
  >
    Send
  </Link>

  <Link
    to="/receive"
    className={cn(
      "flex-1 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors",
      darkMode
        ? "bg-green-500/20 hover:bg-green-500/30 text-green-400"
        : "bg-green-100 hover:bg-green-200 text-green-600"
    )}
  >
    Receive
  </Link>
</div>
      </div>
    </div>
  );
};

export default AccountCard;