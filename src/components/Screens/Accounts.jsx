// src/components/Accounts.jsx
import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Send,
  Download,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext';
import { useHideBalances } from './useHideBalances';  
// -------------------------------------------------------------------
// CONFIG
// -------------------------------------------------------------------
const BASE_URL = "https://ledger.laptopindubai.com/api";

// Simple icon / colour map – you can extend it
const ICONS = {
  BTC: '₿',
  ETH: 'Ξ',
  USDT: '₮',
};
const COLORS = {
  BTC: 'from-orange-400 to-yellow-500',
  ETH: 'from-blue-400 to-purple-500',
  USDT: 'from-green-400 to-teal-500',
};

const getIcon = (type) => ICONS[type] || type[0];
const getColor = (type) => COLORS[type] || 'from-gray-400 to-gray-600';

// -------------------------------------------------------------------
// COMPONENT
// -------------------------------------------------------------------
const Accounts = () => {
  const { darkMode } = useDarkMode();
  const [wallets, setWallets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hideSmall, setHideSmall] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
 const [hideBalances, setHideBalances] = useHideBalances(); 
  // -----------------------------------------------------------------
  // FETCH DATA FROM YOUR /wallet ENDPOINT
  // -----------------------------------------------------------------
  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const token = localStorage.getItem("authToken");
      console.log("Using auth token:", token);
      
      const res = await fetch(`${BASE_URL}/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.message || "Unknown error");

      const parsedTotal = parseFloat(json.total_balance.replace(/,/g, "")) || 0;
      const parsedWallets = (json.wallets || []).map((w, i) => ({
        id: i + 1,
        type: w.wallet_type,
        address: w.wallet_address,
        balance: parseFloat(w.balance.replace(/,/g, "")) || 0,
        icon: getIcon(w.wallet_type),
        color: getColor(w.wallet_type),
      }));

      setWallets(parsedWallets);
      setTotalBalance(parsedTotal);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load wallets");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
const formatBalance = (value, suffix = '') => {
  if (hideBalances) return '••••••';
  return `${value.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })} ${suffix}`;
};

const formatCurrency = (value) => {
  if (hideBalances) return '••••••';
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => fetchData(true);

  // -----------------------------------------------------------------
  // FILTERING
  // -----------------------------------------------------------------
  const filtered = wallets.filter((w) => {
    const matches = w.type.toLowerCase().includes(searchTerm.toLowerCase());
    const bigEnough = !hideSmall || w.balance > 0.01;
    return matches && bigEnough;
  });

  // -----------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <div className={cn(
        "flex items-center justify-center min-h-screen",
        darkMode ? "bg-gray-900" : "bg-gray-50"
      )}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Loading wallets...
          </p>
        </div>
      </div>
    );
  }

  if (error && wallets.length === 0) {
    return (
      <div className={cn(
        "flex items-center justify-center min-h-screen",
        darkMode ? "bg-gray-900" : "bg-gray-50"
      )}>
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button
            onClick={() => fetchData()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-6 p-6 min-h-screen",
      darkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Header */}
    <div className="flex items-center justify-between">
  <div>
    <h1 className={cn(
      "text-3xl font-bold mb-2",
      darkMode ? "text-white" : "text-gray-900"
    )}>
      My Wallets
    </h1>
    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
      All your crypto in one place
    </p>
    {lastUpdated && (
      <p className={cn(
        "text-sm mt-1",
        darkMode ? "text-gray-500" : "text-gray-500"
      )}>
        Updated: {lastUpdated.toLocaleTimeString()}
      </p>
    )}
  </div>

  <div className="flex items-center space-x-3">
    {/* Hide Balance Toggle Button */}
    <button
      onClick={() => setHideBalances(!hideBalances)}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors",
        darkMode 
          ? "border-gray-700 text-gray-300 hover:bg-gray-800" 
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      )}
    >
      {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      <span>{hideBalances ? 'Show' : 'Hide'}</span>
    </button>

    <button
      onClick={handleRefresh}
      disabled={refreshing}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        darkMode 
          ? "border-gray-700 text-gray-300 hover:bg-gray-800" 
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      )}
    >
      <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
      <span>Refresh</span>
    </button>

    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
      <Plus className="w-4 h-4 mr-2" />
      Add Wallet
    </Button>
  </div>
</div>

      {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className={cn(
    "p-6 rounded-xl border",
    darkMode 
      ? "border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30" 
      : "border-gray-200 bg-white shadow-sm"
  )}>
    <h3 className={cn(
      "text-sm mb-2",
      darkMode ? "text-gray-400" : "text-gray-600"
    )}>
      Total Portfolio Value
    </h3>
    <p className={cn(
      "text-2xl font-bold",
      darkMode ? "text-white" : "text-gray-900"
    )}>
      {formatCurrency(totalBalance)}
    </p>
  </div>

  <div className={cn(
    "p-6 rounded-xl border",
    darkMode 
      ? "border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30" 
      : "border-gray-200 bg-white shadow-sm"
  )}>
    <h3 className={cn(
      "text-sm mb-2",
      darkMode ? "text-gray-400" : "text-gray-600"
    )}>
      Wallets
    </h3>
    <p className={cn(
      "text-2xl font-bold",
      darkMode ? "text-white" : "text-gray-900"
    )}>
      {wallets.length}
    </p>
  </div>

  <div className={cn(
    "p-6 rounded-xl border",
    darkMode 
      ? "border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30" 
      : "border-gray-200 bg-white shadow-sm"
  )}>
    <h3 className={cn(
      "text-sm mb-2",
      darkMode ? "text-gray-400" : "text-gray-600"
    )}>
      24h Change
    </h3>
    <p className={cn(
      "text-2xl font-bold",
      darkMode ? "text-gray-300" : "text-gray-500"
    )}>
      —
    </p>
  </div>
</div>

      {/* Search & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
              darkMode ? "text-gray-400" : "text-gray-500"
            )} />
            <input
              type="text"
              placeholder="Search wallets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500",
                darkMode 
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              )}
            />
          </div>

          
        </div>

        <button
          onClick={() => setHideSmall(!hideSmall)}
          className={cn(
            "flex items-center space-x-2 text-sm transition-colors",
            darkMode 
              ? "text-gray-400 hover:text-white" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {hideSmall ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>Hide small balances</span>
        </button>
      </div>

      {/* Table */}
      <div className={cn(
        "rounded-xl border overflow-hidden",
        darkMode 
          ? "border-gray-800 bg-gray-900/30" 
          : "border-gray-200 bg-white shadow-sm"
      )}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? "bg-gray-800/50" : "bg-gray-50"}>
              <tr>
                <th className={cn(
                  "text-left p-4 text-sm font-medium",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Asset
                </th>
                <th className={cn(
                  "text-left p-4 text-sm font-medium",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Balance
                </th>
                <th className={cn(
                  "text-left p-4 text-sm font-medium",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Address
                </th>
                <th className={cn(
                  "text-right p-4 text-sm font-medium",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr 
                  key={w.id} 
                  className={cn(
                    "border-t transition-colors",
                    darkMode 
                      ? "border-gray-800 hover:bg-gray-800/30" 
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                >
                 <td className="p-4">
  <p className={cn(
    "font-medium",
    darkMode ? "text-white" : "text-gray-900"
  )}>
    {formatBalance(w.balance, w.type)}
  </p>
</td>

                  <td className="p-4">
                    <p className={cn(
                      "font-medium",
                      darkMode ? "text-white" : "text-gray-900"
                    )}>
                      {w.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      })}{' '}
                      {w.type}
                    </p>
                  </td>

                  <td className="p-4">
                    <p className={cn(
                      "text-sm font-mono truncate max-w-xs",
                      darkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {w.address}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to="/send">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </Button>
                      </Link>

                      <Link to="/receive">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Receive
                        </Button>
                      </Link>

                      {/* <Button 
                        size="sm" 
                        variant="ghost" 
                        className={cn(
                          darkMode 
                            ? "text-gray-400 hover:text-white" 
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            No wallets match your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Accounts;