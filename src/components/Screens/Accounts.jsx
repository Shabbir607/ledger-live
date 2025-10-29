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
  const [wallets, setWallets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hideSmall, setHideSmall] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // -----------------------------------------------------------------
  // FETCH DATA FROM YOUR /wallet ENDPOINT
  // -----------------------------------------------------------------
const fetchData = async (isRefresh = false) => {
  try {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    // ✅ Get token (from localStorage or state)
    const token = localStorage.getItem("authToken");
console.log("Using auth token:", token);
    const res = await fetch(`${BASE_URL}/wallet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ send token only if exists
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => fetchData(true);

  // -----------------------------------------------------------------
  // FILTERING
  // -----------------------------------------------------------------
  const filtered = wallets.filter((w) => {
    const matches = w.type.toLowerCase().includes(searchTerm.toLowerCase());
    const bigEnough = !hideSmall || w.balance > 0.01; // hide near-zero balances
    return matches && bigEnough;
  });

  // -----------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading wallets...</p>
        </div>
      </div>
    );
  }

  if (error && wallets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Wallets</h1>
          <p className="text-gray-400">All your crypto in one place</p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
            <span>Refresh</span>
          </button>

          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Wallet
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <h3 className="text-sm text-gray-400 mb-2">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-white">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <h3 className="text-sm text-gray-400 mb-2">Wallets</h3>
          <p className="text-2xl font-bold text-white">{wallets.length}</p>
        </div>

        {/* Placeholder – 24h change not available without price API */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <h3 className="text-sm text-gray-400 mb-2">24h Change</h3>
          <p className="text-2xl font-bold text-gray-300">—</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search wallets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <button
          onClick={() => setHideSmall(!hideSmall)}
          className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {hideSmall ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>Hide small balances</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Asset</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Balance</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Address</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm',
                          w.color
                        )}
                      >
                        {w.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{w.type}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-white">
                      {w.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      })}{' '}
                      {w.type}
                    </p>
                  </td>

                  <td className="p-4">
                    <p className="text-sm text-gray-400 font-mono truncate max-w-xs">{w.address}</p>
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

                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
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
          <p className="text-gray-400">No wallets match your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Accounts;