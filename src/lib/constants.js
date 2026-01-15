export const availableAssets = [
    {
        id: 1,
        coinName: "Bitcoin",
        coinSymbol: "BTC",
        walletType: "BTC",
        coinIcon: "₿",
        color: "from-orange-400 to-yellow-500",
    },
    {
        id: 2,
        coinName: "Ethereum",
        coinSymbol: "ETH",
        walletType: "ETH",
        coinIcon: "Ξ",
        color: "from-blue-400 to-purple-500",
    },
    {
        id: 3,
        coinName: "Tether",
        coinSymbol: "USDT",
        walletType: "USDT",
        coinIcon: "₮",
        color: "from-green-400 to-emerald-500",
    },
    {
        id: 4,
        coinName: "Binance Coin",
        coinSymbol: "BNB",
        walletType: "BNB",
        coinIcon: "ZE",
        color: "from-yellow-400 to-orange-500",
    },
    {
        id: 5,
        coinName: "Solana",
        coinSymbol: "SOL",
        walletType: "SOL",
        coinIcon: "◎",
        color: "from-purple-400 to-pink-500",
    },
    {
        id: 6,
        coinName: "Cardano",
        coinSymbol: "ADA",
        walletType: "ADA",
        coinIcon: "₳",
        color: "from-blue-500 to-cyan-500",
    },
];

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/api";
