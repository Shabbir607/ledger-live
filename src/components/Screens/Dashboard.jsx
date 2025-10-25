import React, { useState, useEffect } from "react";
import { Plus, RefreshCw, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import PortfolioChart from "../ui/PortfolioChart";
import AccountCard from "../ui/AccountCard";
import TransactionItem from "../ui/TransactionItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://ledger.laptopindubai.com/api";
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

// Add your CoinGecko API key here
const COINGECKO_API_KEY = "CG-4NEe6FZ5QZSL8F88RjZQENGW";

const Dashboard = () => {
    const navigate = useNavigate(); 
  const [walletData, setWalletData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch CoinGecko crypto data
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h&x_cg_demo_api_key=${COINGECKO_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      // Continue with empty crypto data if CoinGecko fails
      setCryptoData([]);
    }
  };

  // Fetch wallet and transaction data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in.');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };

      // Fetch wallet details
      const walletResponse = await fetch(`${BASE_URL}/wallet`, {
        method: 'GET',
        headers
      });

      if (!walletResponse.ok) {
        if (walletResponse.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Wallet API error: ${walletResponse.status}`);
      }

      const walletResult = await walletResponse.json();

      // Fetch transaction history
      const transactionsResponse = await fetch(`${BASE_URL}/wallet/transactions`, {
        method: 'GET',
        headers
      });

      if (!transactionsResponse.ok) {
        throw new Error(`Transactions API error: ${transactionsResponse.status}`);
      }

      const transactionsResult = await transactionsResponse.json();

      setWalletData(walletResult.data);
      setTransactions(transactionsResult.transactions);

      // Fetch crypto data from CoinGecko
      await fetchCryptoData();

    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Parse balance string to number
  const parseBalance = (balanceStr) => {
    return parseFloat(balanceStr.replace(/,/g, '')) || 0;
  };

  // Generate mock portfolio data based on current balance
  const generatePortfolioData = (currentBalance) => {
    const balance = parseBalance(currentBalance);
    const data = [];
    const dataPoints = 10;
    
    for (let i = 0; i < dataPoints; i++) {
      const variance = (Math.random() - 0.5) * balance * 0.1;
      data.push({
        date: new Date(Date.now() - (dataPoints - i - 1) * 7 * 24 * 60 * 60 * 1000)
          .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: balance + variance
      });
    }
    
    return data;
  };

  // Calculate 24h change (mock calculation based on transaction history)
  const calculate24hChange = (txs) => {
    if (!txs || !txs.data || txs.data.length === 0) return 0;
    
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentTxs = txs.data.filter(tx => 
      new Date(tx.created_at) > oneDayAgo
    );
    
    const totalChange = recentTxs.reduce((sum, tx) => {
      const amount = parseFloat(tx.amount);
      return sum + (tx.type === 'credit' ? amount : -amount);
    }, 0);
    
    return totalChange;
  };

  // Transform API transactions to component format
  const transformTransactions = (apiTransactions) => {
    if (!apiTransactions || !apiTransactions.data) return [];
    
    return apiTransactions.data.slice(0, 4).map(tx => ({
      type: tx.type === 'credit' ? 'receive' : 'send',
      asset: 'USD',
      amount: parseFloat(tx.amount),
      fiatValue: parseFloat(tx.amount),
      status: 'confirmed',
      date: tx.created_at,
      address: walletData?.wallet_address || 'N/A',
      hash: tx.transaction_hash,
      description: tx.description
    }));
  };

  // Get crypto icon from CoinGecko data
  const getCryptoIcon = (symbol) => {
    const icons = {
      'btc': '₿',
      'eth': 'Ξ',
      'ada': '₳',
      'sol': '◎',
      'bnb': 'Ƀ',
      'xrp': '✕',
      'doge': 'Ð',
      'dot': '●'
    };
    return icons[symbol.toLowerCase()] || '◯';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md mx-auto p-6 rounded-lg border border-red-500/50 bg-red-500/10">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
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

  const totalPortfolioValue = parseBalance(walletData?.balance || "0");
  const portfolioChange24h = calculate24hChange(transactions);
  const portfolioData = generatePortfolioData(walletData?.balance || "0");
  const recentTransactions = transformTransactions(transactions);

  // Create accounts from CoinGecko data + USD wallet
  const accounts = [
    // USD Wallet
    {
      coinName: "USD Wallet",
      coinSymbol: "USD",
      balance: totalPortfolioValue,
      fiatValue: totalPortfolioValue,
      change24h: portfolioChange24h > 0 ? ((portfolioChange24h / totalPortfolioValue) * 100) : 0,
      coinIcon: "$",
    },
    // Crypto accounts from CoinGecko
    ...cryptoData.map(crypto => ({
      coinName: crypto.name,
      coinSymbol: crypto.symbol.toUpperCase(),
      balance: 0, // You can customize this to show owned amount
      fiatValue: crypto.current_price,
      change24h: crypto.price_change_percentage_24h || 0,
      coinIcon: getCryptoIcon(crypto.symbol),
      image: crypto.image, // Optional: use actual coin image
    }))
  ];

  return (
    <div className="space-y-6 w-full py-6 max-w-screen-2xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            Portfolio
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Welcome back! Here's your portfolio overview.
          </p>
          <p className="text-cyan-400 text-xs mt-1">
            Wallet: {walletData?.wallet_address}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={fetchData}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white flex-1 sm:flex-none"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
          <Button
      variant="outline"
      className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex-1 sm:flex-none"
      onClick={() => navigate("/receive")}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Add Funds
    </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="overflow-x-auto rounded-lg">
        <PortfolioChart
          data={portfolioData}
          totalValue={totalPortfolioValue}
          change24h={(portfolioChange24h / totalPortfolioValue) * 100}
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
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 overflow-hidden"
                >
                  <TransactionItem {...transaction} />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className={`w-5 h-5 ${portfolioChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-sm text-gray-400">24h Change</span>
          </div>
          <p className={`text-xl font-bold ${portfolioChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolioChange24h >= 0 ? '+' : ''}${portfolioChange24h.toFixed(2)}
          </p>
        </div>

        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">Total Balance</span>
          </div>
          <p className="text-xl font-bold text-white">
            ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-400">Transactions</span>
          </div>
          <p className="text-xl font-bold text-white">{transactions?.total || 0}</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500" />
            <span className="text-sm text-gray-400">Crypto Assets</span>
          </div>
          <p className="text-xl font-bold text-cyan-400">
            {cryptoData.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;