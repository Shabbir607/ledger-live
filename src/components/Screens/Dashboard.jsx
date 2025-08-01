import React from "react";
import {
  ShoppingCart,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  MoreVertical,
  Bell,
  Lock,
  ShieldCheck,
  Settings,
  Plus,
} from "lucide-react";
import PortfolioChart from "../ui/PortfolioChart";
import AccountCard from "../ui/AccountCard";
import TransactionItem from "../ui/TransactionItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dashboardPortfolioData = [
  { date: "Jul 1", value: 24000 },
  { date: "Jul 7", value: 25500 },
  { date: "Jul 14", value: 24800 },
  { date: "Jul 21", value: 26200 },
  { date: "Jul 28", value: 25000 },
  { date: "Jul 30", value: 26479.6 },
];

const fullPortfolioData = [
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

const marketTrends = [
  { name: "Ethereum", symbol: "ETH", price: "US$ 3,148.01", change: "+3.14%", isPositive: true },
  { name: "Hedera", symbol: "HBAR", price: "US$ 0.08689", change: "+1.28%", isPositive: true },
  { name: "Stellar", symbol: "XLM", price: "US$ 0.2456", change: "-0.66%", isPositive: false },
  { name: "Cronos", symbol: "CRO", price: "US$ 0.124", change: "+2.34%", isPositive: true },
  { name: "Wrapped Beacon ETH", symbol: "WBETH", price: "US$ 4,000.42", change: "+5.23%", isPositive: true },
];

const accounts = [
  { coinName: "Bitcoin", coinSymbol: "BTC", balance: 1.2345, fiatValue: 52340, change24h: 2.45, coinIcon: "₿" },
  { coinName: "Ethereum", coinSymbol: "ETH", balance: 15.678, fiatValue: 28450, change24h: -1.23, coinIcon: "Ξ" },
  { coinName: "Cardano", coinSymbol: "ADA", balance: 2500.0, fiatValue: 1250, change24h: 5.67, coinIcon: "₳" },
  { coinName: "Solana", coinSymbol: "SOL", balance: 45.2, fiatValue: 3180, change24h: -2.1, coinIcon: "◎" },
];

const recentTransactions = [
  { type: "receive", asset: "BTC", amount: 0.0234, fiatValue: 1250, status: "confirmed", date: "2024-03-15T10:30:00Z", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", hash: "abc123..." },
  { type: "send", asset: "ETH", amount: 2.5, fiatValue: 4500, status: "pending", date: "2024-03-14T15:45:00Z", address: "0x742d35Cc6634C0532925a3b8D4C9db5C9b8D4C9d", hash: "def456..." }
];

const Dashboard = () => {
  const totalPortfolioValue = 85220;
  const portfolioChange24h = 3.2;
  const dashboardChangeValue = 2259.89;

  return (
    <div className="flex-1 p-6 bg-gray-950 text-white min-h-screen space-y-8">
      {/* Top header */}
      <div className="flex justify-end space-x-4">
        <div className="flex items-center text-green-400 space-x-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-sm">Sincronizado</span>
        </div>
        <Bell className="w-5 h-5 text-gray-400" />
        <Lock className="w-5 h-5 text-gray-400" />
        <Settings className="w-5 h-5 text-gray-400" />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{
          icon: ShoppingCart,
          title: "Comprar / Vender",
          desc: "Compra y vende con nuestros proveedores verificados"
        }, {
          icon: RefreshCw,
          title: "Permutar",
          desc: "Convierte una cripto en otra"
        }, {
          icon: TrendingUp,
          title: "Earn",
          desc: "Obtén recompensas por tus cripto"
        }].map(({ icon: Icon, title, desc }, i) => (
          <Card key={i} className="bg-gray-900 border border-gray-800">
            <CardContent className="flex items-start p-4 space-x-3">
              <Icon className="w-6 h-6 text-white mt-1" />
              <div>
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3">
              <CardTitle className="text-sm text-gray-400">Saldo del portfolio</CardTitle>
              <div className="flex space-x-2 mt-2 md:mt-0">
                {["1D", "1S", "1M", "3M", "TODO"].map((label, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 rounded ${label === "1M" ? "bg-gray-700 text-white" : "text-gray-500"}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <div className="text-3xl font-bold">${dashboardPortfolioData[5].value.toLocaleString("es-ES")}</div>
                <div className="text-green-400 text-sm mt-1 flex items-center space-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>9%</span>
                  <span>(${dashboardChangeValue.toLocaleString("es-ES")})</span>
                </div>
              </div>
              <div className="h-48">
                <PortfolioChart data={dashboardPortfolioData} totalValue={dashboardPortfolioData[5].value} change24h={9} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Trends */}
        <div>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="px-4 py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-400">Tendencia de 1M</CardTitle>
                <div className="flex space-x-1">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-2 space-y-3">
              {marketTrends.map((trend, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-white font-medium">{trend.name}</div>
                      <div className="text-gray-400 text-xs">{trend.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">{trend.price}</div>
                    <div className={`text-xs ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>{trend.change}</div>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">Permutar</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Comprar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Extended Portfolio Section */}
      <div className="space-y-6">
      


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Your Accounts</h2>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accounts.map((account, index) => <AccountCard key={index} {...account} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Activity</h2>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-sm">View All</Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 overflow-hidden">
                  <TransactionItem {...tx} />
                </div>
              ))}
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default Dashboard;