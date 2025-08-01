// Mock data for Ledger Live Desktop Application

// Portfolio chart data
export const portfolioChartData = [
  { date: 'Jan 1', value: 45000 },
  { date: 'Jan 7', value: 47500 },
  { date: 'Jan 14', value: 46800 },
  { date: 'Jan 21', value: 49200 },
  { date: 'Jan 28', value: 51000 },
  { date: 'Feb 4', value: 48500 },
  { date: 'Feb 11', value: 52300 },
  { date: 'Feb 18', value: 54100 },
  { date: 'Feb 25', value: 53800 },
  { date: 'Mar 4', value: 56200 },
  { date: 'Mar 11', value: 58100 },
  { date: 'Mar 18', value: 59800 },
  { date: 'Mar 25', value: 61200 },
  { date: 'Apr 1', value: 63500 },
  { date: 'Apr 8', value: 65800 },
  { date: 'Apr 15', value: 67200 },
  { date: 'Apr 22', value: 69500 },
  { date: 'Apr 29', value: 71800 },
  { date: 'May 6', value: 74100 },
  { date: 'May 13', value: 76400 },
  { date: 'May 20', value: 78700 },
  { date: 'May 27', value: 81000 },
  { date: 'Jun 3', value: 83300 },
  { date: 'Jun 10', value: 85600 }
];

// Cryptocurrency accounts
export const cryptoAccounts = [
  {
    id: 1,
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    balance: 1.2345,
    fiatValue: 52340,
    change24h: 2.45,
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    coinIcon: '₿',
    color: 'from-orange-400 to-yellow-500',
    marketCap: 1200000000000,
    volume24h: 25000000000,
    rank: 1
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
    color: 'from-blue-400 to-purple-500',
    marketCap: 400000000000,
    volume24h: 15000000000,
    rank: 2
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
    color: 'from-blue-500 to-cyan-500',
    marketCap: 18000000000,
    volume24h: 800000000,
    rank: 8
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
    color: 'from-purple-400 to-pink-500',
    marketCap: 35000000000,
    volume24h: 2500000000,
    rank: 5
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
    color: 'from-purple-500 to-indigo-500',
    marketCap: 8000000000,
    volume24h: 400000000,
    rank: 15
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
    color: 'from-blue-600 to-blue-400',
    marketCap: 12000000000,
    volume24h: 600000000,
    rank: 12
  }
];

// Transaction history
export const transactionHistory = [
  {
    id: 1,
    type: 'receive',
    asset: 'BTC',
    amount: 0.0234,
    fiatValue: 1250,
    status: 'confirmed',
    date: '2024-03-15T10:30:00Z',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    hash: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    confirmations: 6,
    fee: 0.00001,
    blockHeight: 840000
  },
  {
    id: 2,
    type: 'send',
    asset: 'ETH',
    amount: 2.5,
    fiatValue: 4500,
    status: 'pending',
    date: '2024-03-14T15:45:00Z',
    address: '0x742d35Cc6634C0532925a3b8D4C9db5C9b8D4C9d',
    hash: 'def456ghi789jkl012mno345pqr678stu901vwx234yz567abc123',
    confirmations: 0,
    fee: 0.002,
    blockHeight: null
  },
  {
    id: 3,
    type: 'receive',
    asset: 'ADA',
    amount: 500,
    fiatValue: 250,
    status: 'confirmed',
    date: '2024-03-13T09:15:00Z',
    address: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a6gtmvnsc74s5s',
    hash: 'ghi789jkl012mno345pqr678stu901vwx234yz567abc123def456',
    confirmations: 25,
    fee: 0.17,
    blockHeight: 9850000
  },
  {
    id: 4,
    type: 'send',
    asset: 'SOL',
    amount: 10.5,
    fiatValue: 735,
    status: 'failed',
    date: '2024-03-12T14:20:00Z',
    address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    hash: 'jkl012mno345pqr678stu901vwx234yz567abc123def456ghi789',
    confirmations: 0,
    fee: 0.00025,
    blockHeight: null,
    error: 'Insufficient balance for transaction fee'
  },
  {
    id: 5,
    type: 'receive',
    asset: 'MATIC',
    amount: 250.75,
    fiatValue: 178,
    status: 'confirmed',
    date: '2024-03-11T11:30:00Z',
    address: '0x8ba1f109551bD432803012645Hac136c22C501e',
    hash: 'mno345pqr678stu901vwx234yz567abc123def456ghi789jkl012',
    confirmations: 45,
    fee: 0.001,
    blockHeight: 54200000
  },
  {
    id: 6,
    type: 'send',
    asset: 'LINK',
    amount: 25.0,
    fiatValue: 362,
    status: 'confirmed',
    date: '2024-03-10T16:45:00Z',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    hash: 'pqr678stu901vwx234yz567abc123def456ghi789jkl012mno345',
    confirmations: 78,
    fee: 0.003,
    blockHeight: 19500000
  }
];

// Ledger device apps
export const installedApps = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    version: '2.1.0',
    size: 32,
    status: 'installed',
    icon: '₿',
    color: 'from-orange-400 to-yellow-500',
    lastUpdated: '2024-02-15',
    developer: 'Ledger'
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    version: '1.10.4',
    size: 64,
    status: 'installed',
    icon: 'Ξ',
    color: 'from-blue-400 to-purple-500',
    lastUpdated: '2024-03-01',
    developer: 'Ledger'
  },
  {
    id: 3,
    name: 'Cardano',
    symbol: 'ADA',
    version: '4.1.0',
    size: 48,
    status: 'updating',
    icon: '₳',
    color: 'from-blue-500 to-cyan-500',
    lastUpdated: '2024-03-10',
    developer: 'Ledger'
  }
];

export const availableApps = [
  {
    id: 4,
    name: 'Solana',
    symbol: 'SOL',
    version: '1.3.1',
    size: 56,
    status: 'available',
    icon: '◎',
    color: 'from-purple-400 to-pink-500',
    lastUpdated: '2024-03-05',
    developer: 'Ledger',
    description: 'Manage your Solana (SOL) and SPL tokens'
  },
  {
    id: 5,
    name: 'Polygon',
    symbol: 'MATIC',
    version: '1.9.2',
    size: 40,
    status: 'available',
    icon: '⬟',
    color: 'from-purple-500 to-indigo-500',
    lastUpdated: '2024-02-28',
    developer: 'Ledger',
    description: 'Manage your Polygon (MATIC) tokens'
  },
  {
    id: 6,
    name: 'Chainlink',
    symbol: 'LINK',
    version: '1.0.3',
    size: 36,
    status: 'available',
    icon: '🔗',
    color: 'from-blue-600 to-blue-400',
    lastUpdated: '2024-01-20',
    developer: 'Ledger',
    description: 'Manage your Chainlink (LINK) tokens'
  },
  {
    id: 7,
    name: 'Polkadot',
    symbol: 'DOT',
    version: '99.9.9',
    size: 52,
    status: 'available',
    icon: '●',
    color: 'from-pink-500 to-rose-500',
    lastUpdated: '2024-03-12',
    developer: 'Ledger',
    description: 'Manage your Polkadot (DOT) and parachain tokens'
  },
  {
    id: 8,
    name: 'Avalanche',
    symbol: 'AVAX',
    version: '0.7.3',
    size: 44,
    status: 'available',
    icon: '▲',
    color: 'from-red-500 to-orange-500',
    lastUpdated: '2024-02-10',
    developer: 'Ledger',
    description: 'Manage your Avalanche (AVAX) tokens'
  },
  {
    id: 9,
    name: 'Cosmos',
    symbol: 'ATOM',
    version: '2.34.7',
    size: 38,
    status: 'available',
    icon: '⚛',
    color: 'from-indigo-500 to-purple-500',
    lastUpdated: '2024-03-08',
    developer: 'Ledger',
    description: 'Manage your Cosmos (ATOM) and IBC tokens'
  },
  {
    id: 10,
    name: 'Tezos',
    symbol: 'XTZ',
    version: '2.2.17',
    size: 42,
    status: 'available',
    icon: 'ꜩ',
    color: 'from-blue-500 to-teal-500',
    lastUpdated: '2024-02-25',
    developer: 'Ledger',
    description: 'Manage your Tezos (XTZ) tokens and participate in baking'
  }
];

// Device information
export const deviceInfo = {
  name: 'Ledger Nano X',
  model: 'Nano X',
  firmwareVersion: '2.2.1',
  mcuVersion: '2.12',
  seVersion: '1.2.4-5',
  batteryLevel: 85,
  isConnected: true,
  connectionType: 'USB',
  serialNumber: 'NX-1234567890',
  totalStorage: 2048, // KB
  usedStorage: 144, // KB
  lastSync: '2024-03-15T10:30:00Z'
};

// Price alerts
export const priceAlerts = [
  {
    id: 1,
    asset: 'BTC',
    type: 'above',
    targetPrice: 70000,
    currentPrice: 65432,
    isActive: true,
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 2,
    asset: 'ETH',
    type: 'below',
    targetPrice: 3000,
    currentPrice: 3456,
    isActive: true,
    createdAt: '2024-03-05T14:30:00Z'
  },
  {
    id: 3,
    asset: 'ADA',
    type: 'above',
    targetPrice: 1.0,
    currentPrice: 0.52,
    isActive: false,
    createdAt: '2024-02-20T09:15:00Z'
  }
];

// Market data
export const marketData = {
  totalMarketCap: 2400000000000,
  totalVolume24h: 85000000000,
  btcDominance: 52.3,
  ethDominance: 17.8,
  defiTvl: 180000000000,
  fearGreedIndex: 65,
  activeCoins: 13500,
  markets: 45000
};

// News and updates
export const newsUpdates = [
  {
    id: 1,
    title: 'Bitcoin Reaches New All-Time High',
    summary: 'Bitcoin surpasses $70,000 for the first time in history amid institutional adoption.',
    source: 'CoinDesk',
    publishedAt: '2024-03-15T08:00:00Z',
    category: 'market',
    imageUrl: '/news/bitcoin-ath.jpg'
  },
  {
    id: 2,
    title: 'Ethereum 2.0 Staking Rewards Increase',
    summary: 'Ethereum staking rewards see significant increase following network upgrade.',
    source: 'The Block',
    publishedAt: '2024-03-14T12:30:00Z',
    category: 'technology',
    imageUrl: '/news/ethereum-staking.jpg'
  },
  {
    id: 3,
    title: 'New DeFi Protocol Launches on Polygon',
    summary: 'Revolutionary DeFi protocol promises higher yields and lower fees on Polygon network.',
    source: 'DeFi Pulse',
    publishedAt: '2024-03-13T16:45:00Z',
    category: 'defi',
    imageUrl: '/news/polygon-defi.jpg'
  }
];

// User preferences
export const userPreferences = {
  theme: 'dark',
  currency: 'USD',
  language: 'en',
  notifications: {
    transactions: true,
    priceAlerts: true,
    news: false,
    updates: true
  },
  privacy: {
    hideBalances: false,
    analytics: false,
    crashReports: true
  },
  security: {
    autoLock: 300, // seconds
    biometrics: false,
    twoFactor: false
  }
};

// Export all data as a single object for easy importing
export const mockData = {
  portfolioChartData,
  cryptoAccounts,
  transactionHistory,
  installedApps,
  availableApps,
  deviceInfo,
  priceAlerts,
  marketData,
  newsUpdates,
  userPreferences
};

