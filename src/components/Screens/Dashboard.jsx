import { Button } from "@/components/ui/button";
import {
    AlertCircle,
    DollarSign,
    Layers,
    RefreshCw,
    Repeat,
    ShoppingCart,
    TrendingDown,
    TrendingUp
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import AccountCard from "../ui/AccountCard";
import PortfolioChart from "../ui/PortfolioChart";
import TransactionItem from "../ui/TransactionItem";
import { useHideBalances } from "./useHideBalances";
const BASE_URL = "https://server.srv957506.hstgr.cloud/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [hideBalances] = useHideBalances();
  // ────── STATE & HOOKS ──────
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    filter: null,
  });

  // ────── HELPERS ──────
  const parseBalance = (str) => parseFloat(String(str || "0").replace(/,/g, "")) || 0;

  // ────── PORTFOLIO HISTORY ──────
  const portfolioData = useMemo(() => {
    if (!walletData?.wallets) return [];

    const allTxs = [];
    const balances = {};

    let walletsToProcess = walletData.wallets;

    // If a filter is active, we might want to filter wallets. 
    // However, the current filters ('swing', '3year', 'beginner') don't map clearly to wallet types.
    // Assuming the user wants to see specific asset details when they "select" something.
    // If the user means clicking on an AccountCard should filter the chart, we need that state.
    // For now, I will fix the crash risk here too.

    walletsToProcess.forEach((w) => {
      balances[w.wallet_type] = 0;
    });

    walletsToProcess.forEach((w) => {
      const txArray = Array.isArray(w.transactions)
        ? w.transactions
        : w.transactions
          ? Object.values(w.transactions)
          : [];

      txArray.forEach((tx) => {
        // Handle various date formats: ISO string, spacing, etc.
        const dateStr = tx.date || tx.created_at;
        const ts = new Date(dateStr).getTime();

        if (isNaN(ts)) {
          // console.warn("Invalid date found in transaction:", tx);
          return;
        }

        const amt = parseFloat(String(tx.amount || "0").replace(/,/g, ""));
        allTxs.push({
          ...tx,
          wallet_type: w.wallet_type,
          timestamp: ts,
          amount: isNaN(amt) ? 0 : amt,
          type: tx.type,
        });
      });
    });

    if (allTxs.length === 0) {
      const today = new Date().toISOString();
      const total = parseBalance(walletData?.total_balance || "0");
      return total > 0 ? [{ date: today, value: total }] : [];
    }

    allTxs.sort((a, b) => a.timestamp - b.timestamp);

    const points = [];
    const cur = { ...balances };

    const firstTx = allTxs[0];
    const firstDate = new Date(firstTx.timestamp - 1000);
    points.push({
      date: isNaN(firstDate.getTime())
        ? new Date().toISOString()
        : firstDate.toISOString(),
      value: 0,
      transaction: null,
    });

    allTxs.forEach((tx) => {
      if (tx.type === "credit") {
        cur[tx.wallet_type] += tx.amount;
      } else {
        cur[tx.wallet_type] -= tx.amount;
      }

      const total = Object.values(cur).reduce((s, v) => s + v, 0);

      const txDate = new Date(tx.timestamp);
      points.push({
        date: isNaN(txDate.getTime())
          ? new Date().toISOString()
          : txDate.toISOString(),
        value: Math.max(0, total),
        transaction: {
          type: tx.type,
          amount: tx.amount,
          wallet: tx.wallet_type,
          description: tx.description,
        },
      });
    });

    const currentTotal = parseBalance(walletData?.total_balance || "0");
    const lastPoint = points[points.length - 1];

    if (Math.abs(currentTotal - lastPoint.value) > 0.01) {
      points.push({
        date: new Date().toISOString(),
        value: currentTotal,
        transaction: null,
      });
    }

    return points;
  }, [walletData]);
  const formatBalance = (value, prefix = "$") => {
    if (hideBalances) return "••••••";
    return `${prefix}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  const change24h = useMemo(() => {
    if (!walletData?.wallets) return 0;
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    let change = 0;

    walletData.wallets.forEach((w) => {
      const txArray = Array.isArray(w.transactions)
        ? w.transactions
        : w.transactions
          ? Object.values(w.transactions)
          : [];

      txArray.forEach((tx) => {
        if (new Date(tx.date || tx.created_at).getTime() > oneDayAgo) {
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
      const txArray = Array.isArray(w.transactions)
        ? w.transactions
        : w.transactions
          ? Object.values(w.transactions)
          : [];

      txArray.slice(0, 4).forEach((tx) => {
        list.push({
          type: tx.type === "credit" ? "receive" : "send",
          asset: w.wallet_type,
          amount: parseFloat(tx.amount),
          fiatValue: parseFloat(tx.amount),
          status: tx.status || "confirmed",
          date: tx.date || tx.created_at,
          address: w.wallet_address,
          hash: tx.hash || tx.transaction_hash,
          description: tx.description,
        });
      });
    });

    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [walletData]);

  // ────── DERIVED VALUES WITH MARKET DATA ──────
  const totalBalance = parseBalance(walletData?.total_balance || "0");

  // Calculate total USD value from API balance_usd
  const totalUsdValue = useMemo(() => {
    if (!walletData?.wallets) return 0;

    return walletData.wallets.reduce((total, wallet) => {
      const usdValue = parseBalance(wallet.balance_usd || "0");
      return total + usdValue;
    }, 0);
  }, [walletData]);

  // Calculate portfolio 24h change based on transactions
  const portfolio24hChange = useMemo(() => {
    if (!walletData?.wallets) return 0;
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    let change = 0;

    walletData.wallets.forEach((w) => {
      const txArray = Array.isArray(w.transactions)
        ? w.transactions
        : w.transactions
          ? Object.values(w.transactions)
          : [];

      txArray.forEach((tx) => {
        const txDate = new Date(tx.date || tx.created_at).getTime();
        if (txDate > oneDayAgo) {
          const amt =
            parseBalance(w.balance_usd || "0") *
            (parseFloat(tx.amount) / parseBalance(w.balance || "1"));
          change += tx.type === "credit" ? amt : -amt;
        }
      });
    });
    return change;
  }, [walletData]);

  const accounts = useMemo(
    () =>
      walletData?.wallets?.map((w) => {
        const balance = parseBalance(w.balance);
        const usdValue = parseBalance(w.balance_usd || "0");

        return {
          coinName: `${w.wallet_type} Wallet`,
          coinSymbol: w.wallet_type,
          balance: balance,
          fiatValue: usdValue,
          change24h: w.market_data?.price_change_24h || 0,
          change7d: w.market_data?.price_change_7d || 0,
          currentPrice: w.market_data?.current_price || 0,
          marketCapRank: w.market_data?.market_cap_rank || 0,
          coinIcon:
            { BTC: "₿", ETH: "Ξ", USDT: "₮", SOL: "◎", BNB: "⬡" }[
            w.wallet_type
            ] || "●",
        };
      }) ?? [],
    [walletData]
  );

  // ────── FETCH DATA ──────
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        throw new Error("Authentication token not found. Please log in.");

      let url = `${BASE_URL}/wallet/balance`;
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

  // ────── EARLY RETURNS ──────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Loading wallet data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={`text-center max-w-md mx-auto p-6 rounded-lg border ${darkMode
            ? "border-red-500/50 bg-red-500/10"
            : "border-red-500/20 bg-red-50 shadow-sm"
            }`}
        >
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2
            className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
          >
            Error
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-4`}>
            {error}
          </p>
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
    <div
      className={`space-y-6 w-full py-6 max-w-screen-2xl mx-auto px-4 transition-colors ${darkMode
        ? "bg-gradient-to-b from-gray-900 to-black text-white"
        : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
        }`}
    >
      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() =>
            setActiveFilters({
              filter: activeFilters.filter === "swing" ? null : "swing",
            })
          }
          className={`p-6 rounded-xl border transition-all text-left w-full ${activeFilters.filter === "swing"
            ? darkMode
              ? "border-cyan-500 bg-gray-800/50"
              : "border-cyan-500 bg-white shadow-md"
            : darkMode
              ? "border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/40"
              : "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
            }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-700/50" : "bg-gray-200/50"
                }`}
            >
              <DollarSign
                className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              />
            </div>

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"
                  } mb-1`}
              >
                Buy / Sell
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                  } mb-3`}
              >
                Buy and sell with trusted providers
              </p>

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
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                    }`}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() =>
            setActiveFilters({
              filter: activeFilters.filter === "3year" ? null : "3year",
            })
          }
          className={`p-6 rounded-xl border transition-all text-left ${activeFilters.filter === "3year"
            ? darkMode
              ? "border-purple-500 bg-gray-800/50"
              : "border-purple-500 bg-white shadow-md"
            : darkMode
              ? "border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/40"
              : "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
            }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-700/50" : "bg-gray-200/50"
                }`}
            >
              <Repeat
                className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  Swap
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${darkMode
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-purple-500/10 text-purple-700"
                    }`}
                >
                  Popular
                </span>
              </div>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Convert crypto to crypto securely
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() =>
            setActiveFilters({
              filter: activeFilters.filter === "beginner" ? null : "beginner",
            })
          }
          className={`p-6 rounded-xl border transition-all text-left ${activeFilters.filter === "beginner"
            ? darkMode
              ? "border-green-500 bg-gray-800/50"
              : "border-green-500 bg-white shadow-md"
            : darkMode
              ? "border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/40"
              : "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
            }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-700/50" : "bg-gray-200/50"
                }`}
            >
              <Layers
                className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              />
            </div>
            <div>
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"
                  } mb-1`}
              >
                Stake
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Grow your crypto Live
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"
              } mb-1`}
          >
            Portfolio
          </h1>
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"
              } text-sm sm:text-base`}
          >
            Welcome back, {walletData?.user?.name || "User"}!
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={fetchData}
            className={`${darkMode
              ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              } flex-1 sm:flex-none`}
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
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="overflow-x-auto rounded-lg">
        <PortfolioChart
          data={portfolioData}
          totalValue={hideBalances ? 0 : totalUsdValue}
          change24h={hideBalances ? 0 : portfolio24hChange}
          changePercent={
            hideBalances ? 0 : (portfolio24hChange / totalUsdValue) * 100
          }
          apiTotalValue={hideBalances ? 0 : totalBalance}
          darkMode={darkMode}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-lg border ${darkMode
            ? "border-gray-800 bg-gray-900/30"
            : "border-gray-200 bg-white shadow-sm"
            }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {portfolio24hChange >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              24h Change
            </span>
          </div>
          <p
            className={`text-xl font-bold ${portfolio24hChange >= 0 ? "text-green-400" : "text-red-400"
              }`}
          >
            {hideBalances
              ? "••••••"
              : `${portfolio24hChange >= 0 ? "+" : ""
              }$${portfolio24hChange.toFixed(2)}`}
          </p>
          <p
            className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"
              }`}
          >
            {hideBalances
              ? "••••"
              : `${portfolio24hChange >= 0 ? "+" : ""}${(
                (portfolio24hChange / totalUsdValue) *
                100
              ).toFixed(2)}%`}
          </p>
        </div>

        <div
          className={`p-4 rounded-lg border ${darkMode
            ? "border-gray-800 bg-gray-900/30"
            : "border-gray-200 bg-white shadow-sm"
            }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-500" />
            <span
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Total USD Value
            </span>
          </div>
          <p
            className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {formatBalance(totalUsdValue)}
          </p>
          <p
            className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"
              }`}
          >
            {hideBalances ? "•••• coins" : `${totalBalance.toFixed(2)} coins`}
          </p>
        </div>

        <div
          className={`p-4 rounded-lg border ${darkMode
            ? "border-gray-800 bg-gray-900/30"
            : "border-gray-200 bg-white shadow-sm"
            }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-purple-500" />
            <span
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Transactions
            </span>
          </div>
          <p
            className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {walletData.wallets.reduce(
              (s, w) => s + (w.transactions?.length || 0),
              0
            )}
          </p>
        </div>

        <div
          className={`p-4 rounded-lg border ${darkMode
            ? "border-gray-800 bg-gray-900/30"
            : "border-gray-200 bg-white shadow-sm"
            }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500" />
            <span
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Active Wallets
            </span>
          </div>
          <p className="text-xl font-bold text-cyan-400">
            {walletData.wallets.length}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Your Wallets
            </h2>
            <Button
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accounts.map((a, i) => (
              <AccountCard
                key={i}
                {...a}
                darkMode={darkMode}
                hideBalances={hideBalances}
              />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Recent Activity
            </h2>
            <Button
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3 overflow-x-auto max-h-200">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx, i) => (
                <TransactionItem
                  key={i}
                  {...tx}
                  darkMode={darkMode}
                  hideBalances={hideBalances}
                  onStatusChange={fetchData}
                />
              ))
            ) : (
              <div
                className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
