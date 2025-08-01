import React, { useState } from 'react';
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
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const accounts = [
  {
    id: 1,
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    balance: 1.2345,
    fiatValue: 52340,
    change24h: 2.45,
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    coinIcon: '₿',
    color: 'from-orange-400 to-yellow-500'
  },
  {
    id: 2,
    coinName: 'Ethereum',
    coinSymbol: 'ETH',
    balance: 15.678,
    fiatValue: 28450,
    change24h: -1.23,
    address: '0x742d35Cc6634C0532925a3b8D4C9db5C9b8D4C9d',
    coinIcon: 'Ξ',
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 3,
    coinName: 'Cardano',
    coinSymbol: 'ADA',
    balance: 2500.0,
    fiatValue: 1250,
    change24h: 5.67,
    address: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a6gtmvnsc74s5s',
    coinIcon: '₳',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    coinName: 'Solana',
    coinSymbol: 'SOL',
    balance: 45.2,
    fiatValue: 3180,
    change24h: -2.1,
    address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    coinIcon: '◎',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 5,
    coinName: 'Polygon',
    coinSymbol: 'MATIC',
    balance: 1250.75,
    fiatValue: 890,
    change24h: 3.8,
    address: '0x8ba1f109551bD432803012645Hac136c22C501e',
    coinIcon: '⬟',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 6,
    coinName: 'Chainlink',
    coinSymbol: 'LINK',
    balance: 125.5,
    fiatValue: 1820,
    change24h: -0.5,
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    coinIcon: '🔗',
    color: 'from-blue-600 to-blue-400'
  }
];

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hideSmallBalances, setHideSmallBalances] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.coinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.coinSymbol.toLowerCase().includes(searchTerm.toLowerCase());
    const meetsBalanceFilter = !hideSmallBalances || account.fiatValue > 100;
    return matchesSearch && meetsBalanceFilter;
  });

  const totalValue = accounts.reduce((sum, account) => sum + account.fiatValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Accounts</h1>
          <p className="text-gray-400">Manage your cryptocurrency accounts</p>
        </div>
        
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <h3 className="text-sm text-gray-400 mb-2">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <h3 className="text-sm text-gray-400 mb-2">Total Accounts</h3>
          <p className="text-2xl font-bold text-white">{accounts.length}</p>
        </div>
        <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <h3 className="text-sm text-gray-400 mb-2">24h Change</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <p className="text-2xl font-bold text-green-400">+2.8%</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setHideSmallBalances(!hideSmallBalances)}
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {hideSmallBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>Hide small balances</span>
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Asset</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Balance</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Value</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">24h Change</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Address</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => {
                const isPositive = account.change24h >= 0;
                return (
                  <tr 
                    key={account.id}
                    className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm",
                          account.color
                        )}>
                          {account.coinIcon}
                        </div>
                        <div>
                          <p className="font-medium text-white">{account.coinName}</p>
                          <p className="text-sm text-gray-400">{account.coinSymbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{account.balance} {account.coinSymbol}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">${account.fiatValue.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span className={cn(
                          "font-medium",
                          isPositive ? "text-green-400" : "text-red-400"
                        )}>
                          {isPositive ? '+' : ''}{account.change24h.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-400 font-mono truncate max-w-32">
                        {account.address}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Receive
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No accounts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Accounts;

