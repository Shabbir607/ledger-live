import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Repeat,
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import PortfolioChart from "../ui/PortfolioChart";
import AccountCard from "../ui/AccountCard";
import TransactionItem from "../ui/TransactionItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from '../DarkModeContext';

const BASE_URL = "https://ledger.laptopindubai.com/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode(); // 🔥 Use shared dark mode

  // ────── STATE & HOOKS (must be at the top) ──────
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    filter: null,
  });

  // ────── HELPERS ──────
  const parseBalance = (str) => parseFloat(str.replace(/,/g, "")) || 0;

  // ────── PORTFOLIO HISTORY (transaction-based points) ──────
  const portfolioData = useMemo(() => {
    if (!walletData?.wallets) return [];

    const allTxs = [];
    const balances = {};

    // Init balances to 0
    walletData.wallets.forEach((w) => {
      balances[w.wallet_type] = 0;
    });

    // Collect every transaction with proper timestamp
    walletData.wallets.forEach((w) => {
      w.transactions?.forEach((tx) => {
        allTxs.push({
          ...tx,
          wallet_type: w.wallet_type,
          timestamp: new Date(tx.created_at).getTime(),
          amount: parseFloat(tx.amount.replace(/,/g, "")),
          type: tx.type,
        });
      });
    });

    // No transactions → show current total balance as single point
    if (allTxs.length === 0) {
      const today = new Date().toISOString();
      const total = parseBalance(walletData?.total_balance || "0");
      return total > 0 ? [{ date: today, value: total }] : [];
    }

    // Sort by time (oldest first)
    allTxs.sort((a, b) => a.timestamp - b.timestamp);

    // Build data points - one for each transaction
    const points = [];
    const cur = { ...balances };

    // Add starting point (balance = 0 before first transaction)
    const firstTx = allTxs[0];
    points.push({
      date: new Date(firstTx.timestamp - 1000).toISOString(),
      value: 0,
      transaction: null
    });

    // Process each transaction
    allTxs.forEach((tx) => {
      // Update balance for this wallet type
      if (tx.type === "credit") {
        cur[tx.wallet_type] += tx.amount;
      } else {
        cur[tx.wallet_type] -= tx.amount;
      }
      
      // Calculate total across all wallets
      const total = Object.values(cur).reduce((s, v) => s + v, 0);
      
      // Add point at this transaction time
      points.push({
        date: new Date(tx.timestamp).toISOString(),
        value: Math.max(0, total),
        transaction: {
          type: tx.type,
          amount: tx.amount,
          wallet: tx.wallet_type,
          description: tx.description
        }
      });
    });

    // Add current point if needed
    const currentTotal = parseBalance(walletData?.total_balance || "0");
    const lastPoint = points[points.length - 1];
    
    if (Math.abs(currentTotal - lastPoint.value) > 0.01) {
      points.push({
        date: new Date().toISOString(),
        value: currentTotal,
        transaction: null
      });
    }

    return points;
  }, [walletData]);

  const change24h = useMemo(() => {
    if (!walletData?.wallets) return 0;
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    let change = 0;

    walletData.wallets.forEach((w) => {
      w.transactions?.forEach((tx) => {
        if (new Date(tx.created_at).getTime() > oneDayAgo) {
          const amt = parseFloat(tx.amount);
          change += tx.type === "credit" ? amt : -amt;
        }
      });
    });
    return change;
  }, [walletData]);

  // ────── RECENT TRANSACTIONS ──────
  const recentTransactions = useMemo(() => {
    if (!walletData?.wallets) return [];

    const list = [];
    walletData.wallets.forEach((w) => {
      w.transactions?.slice(0, 4).forEach((tx) => {
        list.push({
          type: tx.type === "credit" ? "receive" : "send",
          asset: w.wallet_type,
          amount: parseFloat(tx.amount),
          fiatValue: parseFloat(tx.amount),
          status: "confirmed",
          date: tx.created_at,
          address: w.wallet_address,
          hash: tx.transaction_hash,
          description: tx.description,
        });
      });
    });

    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [walletData]);

  // ────── DERIVED VALUES ──────
  const totalBalance = parseBalance(walletData?.total_balance || "0");

  const accounts = useMemo(
    () =>
      walletData?.wallets?.map((w) => ({
        coinName: `${w.wallet_type} Wallet`,
        coinSymbol: w.wallet_type,
        balance: parseBalance(w.balance),
        fiatValue: parseBalance(w.balance),
        change24h: 0,
        coinIcon:
          { BTC: "₿", ETH: "Ξ", USDT: "₮" }[w.wallet_type] || "●",
      })) ?? [],
    [walletData]
  );

  // ────── FETCH DATA ──────
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token not found. Please log in.");

      // Build query params
      let url = `${BASE_URL}/wallet`;
      if (activeFilters.filter) {
        url += `?filter=${activeFilters.filter}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401)
          throw new Error("Authentication failed. Please log in again.");
        throw new Error(`API error: ${res.status}`);
      }

      const json = await res.json();
      if (json.success && json.wallets) setWalletData(json);
      else throw new Error(json.message || "Failed to load wallet data");
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeFilters]);

  // ────── EARLY RETURNS (AFTER ALL HOOKS) ──────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className={`text-center max-w-md mx-auto p-6 rounded-lg border ${darkMode ? 'border-red-500/50 bg-red-500/10' : 'border-red-500/20 bg-red-50 shadow-sm'}`}>
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Error</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>{error}</p>
          <Button
            onClick={fetchData}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // ────── MAIN RENDER ──────
  return (
    <div className={`space-y-6 w-full py-6 max-w-screen-2xl mx-auto px-4 transition-colors ${darkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'}`}>
      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Buy / Sell */}
        <button
          onClick={() =>
            setActiveFilters({
              filter: activeFilters.filter === "swing" ? null : "swing",
            })
          }
          className={`p-6 rounded-xl border transition-all text-left w-full ${
            activeFilters.filter === "swing"
              ? darkMode 
                ? "border-cyan-500 bg-gray-800/50" 
                : "border-cyan-500 bg-white shadow-md"
              : darkMode 
                ? "border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/40" 
                : "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
              <DollarSign className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>

            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Buy / Sell</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                Buy and sell with trusted providers
              </p>

              {/* Buy / Sell buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/receive");
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Buy
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/send");
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </button>

        {/* Swap */}
        <button
          onClick={() => setActiveFilters({ filter: activeFilters.filter === '3year' ? null : '3year' })}
          className={`p-6 rounded-xl border transition-all text-left ${
            activeFilters.filter === '3year'
              ? darkMode 
                ? 'border-purple-500 bg-gray-800/50' 
                : 'border-purple-500 bg-white shadow-md'
              : darkMode 
                ? 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/40' 
                : 'border-gray-200 bg-white hover:bg-gray-50 shadow-sm'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
              <Repeat className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Swap</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-500/10 text-purple-700'}`}>
                  Popular
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Convert crypto to crypto securely</p>
            </div>
          </div>
        </button>

        {/* Stake */}
        <button
          onClick={() => setActiveFilters({ filter: activeFilters.filter === 'beginner' ? null : 'beginner' })}
          className={`p-6 rounded-xl border transition-all text-left ${
            activeFilters.filter === 'beginner'
              ? darkMode 
                ? 'border-green-500 bg-gray-800/50' 
                : 'border-green-500 bg-white shadow-md'
              : darkMode 
                ? 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/40' 
                : 'border-gray-200 bg-white hover:bg-gray-50 shadow-sm'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
              <Layers className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Stake</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Grow your crypto Live</p>
            </div>
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
            Portfolio
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm sm:text-base`}>
            Welcome back, {walletData?.user?.name || "User"}!
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={fetchData}
            className={`${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'} flex-1 sm:flex-none`}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
          <Button
            variant="outline"
            className=" hover:bg-cyan-500/10 flex-1 sm:flex-none"
            onClick={() => navigate("/receive")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
          {/* <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button> */}
          {/* <Button
            variant="outline"
            className={`${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'} flex-1 sm:flex-none`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            Toggle Theme
          </Button> */}
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="overflow-x-auto rounded-lg">
        <PortfolioChart
          data={portfolioData}
          totalValue={totalBalance}
          change24h={change24h}
          changePercent={(change24h / totalBalance) * 100}
          darkMode={darkMode}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Wallets
            </h2>
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accounts.map((a, i) => (
              <AccountCard key={i} {...a} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 overflow-hidden ${darkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white shadow-sm'}`}
                >
                  <TransactionItem {...tx} darkMode={darkMode} />
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white shadow-sm'}`}>
          <div className="flex items-center space-x-2 mb-2">
            {change24h >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>24h Change</span>
          </div>
          <p className={`text-xl font-bold ${change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
            {change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}
          </p>
        </div>

        <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white shadow-sm'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Balance</span>
          </div>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ${totalBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white shadow-sm'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-purple-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Transactions</span>
          </div>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {walletData.wallets.reduce(
              (s, w) => s + (w.transactions?.length || 0),
              0
            )}
          </p>
        </div>

        <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white shadow-sm'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Wallets</span>
          </div>
          <p className="text-xl font-bold text-cyan-400">
            {walletData.wallets.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;