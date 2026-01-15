import React, { useState, useEffect } from "react";
import { ArrowDownUp, RefreshCw, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import { cn } from "@/lib/utils";

const BASE_URL = (import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const Swap = () => {
    const { darkMode } = useDarkMode();
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swapping, setSwapping] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [fromWallet, setFromWallet] = useState("");
    const [toWallet, setToWallet] = useState("");
    const [amount, setAmount] = useState("");
    const [estimatedReceive, setEstimatedReceive] = useState(0);

    // Simulated prices (should match backend)
    const prices = {
        BTC: 42000.0,
        ETH: 2800.0,
        USDT: 1.0,
        BNB: 350.0,
        SOL: 95.0,
        ADA: 0.55,
    };

    useEffect(() => {
        fetchWallets();
    }, []);

    useEffect(() => {
        calculateEstimate();
    }, [fromWallet, toWallet, amount]);

    const fetchWallets = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${BASE_URL}/api/wallet/balance`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setWallets(data.wallets || []);
            }
        } catch (err) {
            setError("Failed to load wallets");
        } finally {
            setLoading(false);
        }
    };

    const calculateEstimate = () => {
        if (!fromWallet || !toWallet || !amount || parseFloat(amount) <= 0) {
            setEstimatedReceive(0);
            return;
        }

        const fromPrice = prices[fromWallet] || 0;
        const toPrice = prices[toWallet] || 0;

        if (fromPrice > 0 && toPrice > 0) {
            const usdValue = parseFloat(amount) * fromPrice;
            const receive = usdValue / toPrice;
            setEstimatedReceive(receive);
        }
    };

    const handleSwap = async () => {
        setError("");
        setSuccess("");

        if (!fromWallet || !toWallet) {
            setError("Please select both wallets");
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        const fromWalletData = wallets.find(w => w.wallet_type === fromWallet);
        if (!fromWalletData || parseFloat(fromWalletData.balance) < parseFloat(amount)) {
            setError("Insufficient balance");
            return;
        }

        setSwapping(true);
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${BASE_URL}/api/wallet/swap`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    from: fromWallet,
                    to: toWallet,
                    amount: parseFloat(amount),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(`Successfully swapped ${data.data.sent} ${data.data.from} to ${data.data.received.toFixed(6)} ${data.data.to}`);
                setAmount("");
                setEstimatedReceive(0);
                fetchWallets(); // Refresh balances
            } else {
                setError(data.message || "Swap failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setSwapping(false);
        }
    };

    const getCoinIcon = (type) => {
        const icons = {
            BTC: "₿",
            ETH: "Ξ",
            USDT: "₮",
            SOL: "◎",
            BNB: "⬡",
            ADA: "₳",
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
            ADA: "from-blue-400 to-cyan-500",
        };
        return gradients[type] || "from-gray-400 to-gray-600";
    };

    if (loading) {
        return (
            <div className={cn("flex items-center justify-center h-96", darkMode ? "bg-gray-900" : "bg-gray-50")}>
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className={cn("min-h-screen p-6 transition-colors", darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Swap</h1>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        Convert crypto to crypto securely
                    </p>
                </div>

                {/* Swap Card */}
                <div className={cn("p-6 rounded-xl border", darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm")}>
                    {/* From Wallet */}
                    <div className="space-y-2 mb-4">
                        <label className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
                            From
                        </label>
                        <select
                            value={fromWallet}
                            onChange={(e) => setFromWallet(e.target.value)}
                            className={cn(
                                "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500",
                                darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                            )}
                        >
                            <option value="">Select wallet</option>
                            {wallets.filter(w => parseFloat(w.balance) > 0).map((wallet) => (
                                <option key={wallet.id} value={wallet.wallet_type}>
                                    {getCoinIcon(wallet.wallet_type)} {wallet.wallet_type} - {parseFloat(wallet.balance).toFixed(6)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount Input */}
                    {fromWallet && (
                        <div className="space-y-2 mb-4">
                            <label className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
                                Amount
                            </label>
                            <input
                                type="number"
                                step="0.000001"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className={cn(
                                    "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500",
                                    darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                                )}
                            />
                        </div>
                    )}

                    {/* Swap Icon */}
                    <div className="flex justify-center my-4">
                        <div className={cn("p-2 rounded-full", darkMode ? "bg-gray-800" : "bg-gray-100")}>
                            <ArrowDownUp className="w-5 h-5 text-cyan-500" />
                        </div>
                    </div>

                    {/* To Wallet */}
                    <div className="space-y-2 mb-4">
                        <label className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
                            To
                        </label>
                        <select
                            value={toWallet}
                            onChange={(e) => setToWallet(e.target.value)}
                            className={cn(
                                "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500",
                                darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                            )}
                        >
                            <option value="">Select wallet</option>
                            {wallets.filter(w => w.wallet_type !== fromWallet).map((wallet) => (
                                <option key={wallet.id} value={wallet.wallet_type}>
                                    {getCoinIcon(wallet.wallet_type)} {wallet.wallet_type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Estimate Display */}
                    {estimatedReceive > 0 && (
                        <div className={cn("p-4 rounded-lg mb-4", darkMode ? "bg-gray-800/50" : "bg-gray-50")}>
                            <div className="flex items-center justify-between">
                                <span className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>
                                    You will receive
                                </span>
                                <span className={cn("text-lg font-bold", darkMode ? "text-white" : "text-gray-900")}>
                                    ≈ {estimatedReceive.toFixed(6)} {toWallet}
                                </span>
                            </div>
                            {fromWallet && toWallet && (
                                <div className={cn("text-xs mt-2", darkMode ? "text-gray-500" : "text-gray-500")}>
                                    Rate: 1 {fromWallet} = {((prices[fromWallet] || 0) / (prices[toWallet] || 1)).toFixed(6)} {toWallet}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error/Success Messages */}
                    {error && (
                        <div className={cn("p-3 rounded-lg mb-4 flex items-center gap-2", darkMode ? "bg-red-500/10 border border-red-500/30" : "bg-red-50 border border-red-200")}>
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <p className={cn("text-sm", darkMode ? "text-red-400" : "text-red-600")}>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className={cn("p-3 rounded-lg mb-4", darkMode ? "bg-green-500/10 border border-green-500/30" : "bg-green-50 border border-green-200")}>
                            <p className={cn("text-sm", darkMode ? "text-green-400" : "text-green-600")}>{success}</p>
                        </div>
                    )}

                    {/* Swap Button */}
                    <button
                        onClick={handleSwap}
                        disabled={swapping || !fromWallet || !toWallet || !amount || parseFloat(amount) <= 0}
                        className={cn(
                            "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                            swapping || !fromWallet || !toWallet || !amount || parseFloat(amount) <= 0
                                ? "bg-gray-600 cursor-not-allowed opacity-50"
                                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        )}
                    >
                        {swapping ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Swapping...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-5 h-5" />
                                Swap Now
                            </>
                        )}
                    </button>
                </div>

                {/* Info Card */}
                <div className={cn("p-4 rounded-lg border", darkMode ? "bg-gray-900/50 border-gray-800" : "bg-blue-50 border-blue-200")}>
                    <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-blue-800")}>
                        💡 <strong>Tip:</strong> Swap allows you to instantly convert between your own wallets using simulated market rates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Swap;
