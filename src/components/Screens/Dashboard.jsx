import React from "react";
import { Plus, RefreshCw, ShoppingCart, TrendingUp } from "lucide-react";
import PortfolioChart from "../ui/PortfolioChart";
import AccountCard from "../ui/AccountCard";
import TransactionItem from "../ui/TransactionItem";
import { Button } from "@/components/ui/button";

// Mock data for the dashboard
const portfolioData = [
  { date: "Jan 1", value: 45000 },
  { date: "Jan 7", value: 47500 },
  { date: "Jan 14", value: 46800 },
  { date: "Jan 21", value: 49200 },
  { date: "Jan 28", value: 51000 },
  { date: "Feb 4", value: 48500 },
  { date: "Feb 11", value: 52300 },
  { date: "Feb 18", value: 54100 },
  { date: "Feb 25", value: 53800 },
  { date: "Mar 4", value: 56200 },
];

const accounts = [
  {
    coinName: "Bitcoin",
    coinSymbol: "BTC",
    balance: 1.2345,
    fiatValue: 52340,
    change24h: 2.45,
    coinIcon: "₿",
  },
  {
    coinName: "Ethereum",
    coinSymbol: "ETH",
    balance: 15.678,
    fiatValue: 28450,
    change24h: -1.23,
    coinIcon: "Ξ",
  },
  {
    coinName: "Cardano",
    coinSymbol: "ADA",
    balance: 2500.0,
    fiatValue: 1250,
    change24h: 5.67,
    coinIcon: "₳",
  },
  {
    coinName: "Solana",
    coinSymbol: "SOL",
    balance: 45.2,
    fiatValue: 3180,
    change24h: -2.1,
    coinIcon: "◎",
  },
];

const recentTransactions = [
  {
    type: "receive",
    asset: "BTC",
    amount: 0.0234,
    fiatValue: 1250,
    status: "confirmed",
    date: "2024-03-15T10:30:00Z",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    hash: "abc123...",
  },
  {
    type: "send",
    asset: "ETH",
    amount: 2.5,
    fiatValue: 4500,
    status: "pending",
    date: "2024-03-14T15:45:00Z",
    address: "0x742d35Cc6634C0532925a3b8D4C9db5C9b8D4C9d",
    hash: "def456...",
  },
  {
    type: "receive",
    asset: "ADA",
    amount: 500,
    fiatValue: 250,
    status: "confirmed",
    date: "2024-03-13T09:15:00Z",
    address:
      "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a6gtmvnsc74s5s",
    hash: "ghi789...",
  },
  {
    type: "send",
    asset: "SOL",
    amount: 10.5,
    fiatValue: 735,
    status: "failed",
    date: "2024-03-12T14:20:00Z",
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    hash: "jkl012...",
  },
];

const Dashboard = () => {
  const totalPortfolioValue = 85220;
  const portfolioChange24h = 3.2;

  return (
    <div className="space-y-6 w-full py-6  max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            Portfolio
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Welcome back! Here's your portfolio overview.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white flex-1 sm:flex-none"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
          <Button
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex-1 sm:flex-none"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Crypto
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="overflow-x-auto rounded-lg">
        <PortfolioChart
          data={portfolioData}
          totalValue={totalPortfolioValue}
          change24h={portfolioChange24h}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Cards */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Your Accounts
            </h2>
            <Button
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accounts.map((account, index) => (
              <AccountCard key={index} {...account} />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Recent Activity
            </h2>
            <Button
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 overflow-hidden"
              >
                <TransactionItem {...transaction} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">24h Change</span>
          </div>
          <p className="text-xl font-bold text-green-400">+$2,740</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">Total Assets</span>
          </div>
          <p className="text-xl font-bold text-white">4</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-400">Transactions</span>
          </div>
          <p className="text-xl font-bold text-white">127</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500" />
            <span className="text-sm text-gray-400">Avg. Return</span>
          </div>
          <p className="text-xl font-bold text-cyan-400">+12.5%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
