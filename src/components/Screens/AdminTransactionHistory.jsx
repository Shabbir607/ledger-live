import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Wallet,
  Activity,
  X,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDarkMode } from "../DarkModeContext";
import PortfolioChart from "../ui/PortfolioChart";

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://ledger.arqehayat.com";

const AdminTransactionHistory = () => {
  const { darkMode } = useDarkMode();
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  // Fetch wallets and transactions
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication required");

      const [walletsRes, transactionsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/admin/wallets`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/api/admin/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!walletsRes.ok || !transactionsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const walletsData = await walletsRes.json();
      const transactionsData = await transactionsRes.json();

      setWallets(Array.isArray(walletsData) ? walletsData : []);
      setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletChart = async (walletId) => {
    setChartLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${BASE_URL}/api/admin/wallet/${walletId}/chart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch chart");

      const data = await res.json();
      const formatted = (Array.isArray(data) ? data : []).map((item) => ({
        date: item.created_at,
        value: parseFloat(item.balance_after),
      }));

      setChartData(formatted);
    } catch (err) {
      console.error("Chart error:", err);
      setChartData([]);
    } finally {
      setChartLoading(false);
    }
  };

  const handleTransactionClick = (transaction) => {
    setSelectedWallet(transaction.wallet);
    fetchWalletChart(transaction.wallet_id);
  };

  // Get unique users
  const uniqueUsers = Array.from(
    new Set(
      wallets
        .map((w) => w.user)
        .filter(Boolean)
        .map((u) => JSON.stringify(u))
    )
  ).map((u) => JSON.parse(u));

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.transaction_hash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.wallet?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.wallet?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || tx.type === filterType;

    const matchesUser =
      selectedUser === "all" || tx.wallet?.user_id === selectedUser;

    return matchesSearch && matchesType && matchesUser;
  });

  // Stats
  const totalWallets = wallets.length;
  const totalTransactions = transactions.length;
  const totalUsers = uniqueUsers.length;
  const totalBalance = wallets.reduce(
    (sum, w) => sum + parseFloat(w.balance || 0),
    0
  );

  const getCoinIcon = (type) => {
    const icons = {
      BTC: "₿",
      ETH: "Ξ",
      USDT: "₮",
      SOL: "◎",
      BNB: "⬡",
    };
    return icons[type] || type?.[0] || "?";
  };

  const getGradient = (type) => {
    const gradients = {
      BTC: "from-orange-400 to-yellow-500",
      ETH: "from-blue-400 to-purple-500",
      USDT: "from-green-400 to-emerald-500",
      SOL: "from-purple-400 to-pink-500",
      BNB: "from-yellow-400 to-orange-500",
    };
    return gradients[type] || "from-gray-400 to-gray-600";
  };

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-96",
          darkMode ? "bg-gray-900" : "bg-gray-50"
        )}
      >
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen p-6 space-y-6",
        darkMode ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      {/* Header */}
      <div>
        <h1
          className={cn(
            "text-3xl font-bold mb-2",
            darkMode ? "text-white" : "text-gray-900"
          )}
        >
          Teacher Transaction History
        </h1>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Monitor all platform transactions and wallets
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          className={cn(
            "p-4 rounded-lg border flex items-center gap-3",
            darkMode
              ? "bg-red-500/10 border-red-500/30"
              : "bg-red-50 border-red-200"
          )}
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className={darkMode ? "text-red-400" : "text-red-600"}>{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={cn(
            "p-6 rounded-xl border",
            darkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-200 bg-white"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                Total Wallets
              </p>
              <p
                className={cn(
                  "text-2xl font-bold mt-1",
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {totalWallets}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-cyan-500" />
          </div>
        </div>

        <div
          className={cn(
            "p-6 rounded-xl border",
            darkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-200 bg-white"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                Total Transactions
              </p>
              <p
                className={cn(
                  "text-2xl font-bold mt-1",
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {totalTransactions}
              </p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div
          className={cn(
            "p-6 rounded-xl border",
            darkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-200 bg-white"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                Total Users
              </p>
              <p
                className={cn(
                  "text-2xl font-bold mt-1",
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {totalUsers}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div
          className={cn(
            "p-6 rounded-xl border",
            darkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-200 bg-white"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                Total Balance
              </p>
              <p
                className={cn(
                  "text-2xl font-bold mt-1",
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {totalBalance.toFixed(4)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Chart */}
      {selectedWallet && (
        <div
          className={cn(
            "p-6 rounded-xl border",
            darkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-200 bg-white"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className={cn(
                  "text-lg font-semibold",
                  darkMode ? "text-white" : "text-gray-900"
                )}
              >
                {selectedWallet.wallet_type} Wallet Balance History
              </h3>
              <p
                className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                {selectedWallet.user?.name} ({selectedWallet.user?.email})
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedWallet(null);
                setChartData([]);
              }}
              className={cn(
                "p-2 rounded-lg",
                darkMode
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {chartLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
          ) : chartData.length > 0 ? (
            <PortfolioChart data={chartData} />
          ) : (
            <div
              className={cn(
                "flex items-center justify-center h-64",
                darkMode ? "text-gray-400" : "text-gray-600"
              )}
            >
              No chart data available
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500",
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            )}
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={cn(
            "px-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500",
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300"
          )}
        >
          <option value="all">All Types</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <select
          value={selectedUser}
          onChange={(e) =>
            setSelectedUser(
              e.target.value === "all" ? "all" : parseInt(e.target.value)
            )
          }
          className={cn(
            "px-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500",
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300"
          )}
        >
          <option value="all">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <div
        className={cn(
          "rounded-xl border overflow-hidden",
          darkMode
            ? "border-gray-800 bg-gray-900/50"
            : "border-gray-200 bg-white"
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={cn(
                "border-b",
                darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-gray-50"
              )}
            >
              <tr>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  User
                </th>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Wallet
                </th>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Type
                </th>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Amount
                </th>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Balance After
                </th>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Description
                </th>
                <th
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody
              className={cn(
                "divide-y",
                darkMode ? "divide-gray-800" : "divide-gray-200"
              )}
            >
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className={cn(
                      "px-6 py-8 text-center",
                      darkMode ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => handleTransactionClick(tx)}
                    className={cn(
                      "cursor-pointer transition-colors",
                      darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            darkMode ? "text-white" : "text-gray-900"
                          )}
                        >
                          {tx.wallet?.user?.name || "Unknown"}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            darkMode ? "text-gray-400" : "text-gray-600"
                          )}
                        >
                          {tx.wallet?.user?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-xs",
                            getGradient(tx.wallet?.wallet_type)
                          )}
                        >
                          {getCoinIcon(tx.wallet?.wallet_type)}
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            darkMode ? "text-white" : "text-gray-900"
                          )}
                        >
                          {tx.wallet?.wallet_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          tx.type === "credit"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        )}
                      >
                        {tx.type === "credit" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          darkMode ? "text-white" : "text-gray-900"
                        )}
                      >
                        {tx.amount} {tx.wallet?.wallet_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "text-sm",
                          darkMode ? "text-gray-300" : "text-gray-700"
                        )}
                      >
                        {tx.balance_after}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className={cn(
                          "text-sm",
                          darkMode ? "text-gray-400" : "text-gray-600"
                        )}
                      >
                        {tx.description}
                      </p>
                      <p
                        className={cn(
                          "text-xs mt-1 font-mono",
                          darkMode ? "text-gray-500" : "text-gray-500"
                        )}
                      >
                        {tx.transaction_hash?.slice(0, 20)}...
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "text-sm",
                          darkMode ? "text-gray-400" : "text-gray-600"
                        )}
                      >
                        {new Date(tx.created_at).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactionHistory;
