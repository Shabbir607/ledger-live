import React, { useState, useEffect } from "react";
import { TrendingUp, Loader2, AlertCircle, X } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import { cn } from "@/lib/utils";

const BASE_URL = (import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const Stake = () => {
    const { darkMode } = useDarkMode();
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [staking, setStaking] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [selectedWallet, setSelectedWallet] = useState("");
    const [stakeAmount, setStakeAmount] = useState("");
    const [stakeDuration, setStakeDuration] = useState("30");

    // APY rates based on duration
    const apyRates = {
        "30": 5,    // 30 days = 5% APY
        "90": 8,    // 90 days = 8% APY
        "180": 12,  // 180 days = 12% APY
        "365": 18,  // 365 days = 18% APY
    };

    useEffect(() => {
        fetchWallets();
    }, []);

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

    const calculateRewards = () => {
        if (!stakeAmount || !stakeDuration) return 0;
        const amount = parseFloat(stakeAmount);
        const apy = apyRates[stakeDuration];
        const days = parseInt(stakeDuration);
        return (amount * apy / 100 * days / 365).toFixed(6);
    };

    const handleStake = async () => {
        setError("");
        setSuccess("");

        if (!selectedWallet) {
            setError("Please select a wallet");
            return;
        }

        if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        const wallet = wallets.find(w => w.wallet_type === selectedWallet);
        if (!wallet || parseFloat(wallet.balance) < parseFloat(stakeAmount)) {
            setError("Insufficient balance");
            return;
        }

        setStaking(true);
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${BASE_URL}/api/wallet/stake`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    wallet_type: selectedWallet,
                    amount: parseFloat(stakeAmount),
                    duration: parseInt(stakeDuration),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(`Successfully staked ${stakeAmount} ${selectedWallet}! Expected rewards: ${calculateRewards()} ${selectedWallet}`);
                setStakeAmount("");
                fetchWallets();
            } else {
                setError(data.message || "Staking failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setStaking(false);
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

    if (loading) {
        return (
            <div className={cn("flex items-center justify-center h-96", darkMode ? "bg-gray-900" : "bg-gray-50")}>
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className={cn("min-h-screen p-6", darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Stake</h1>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        Grow your crypto Live
                    </p>
                </div>

                {/* Staking Card */}
                <div className={cn("p-6 rounded-xl border", darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm")}>
                    {/* Wallet Selection */}
                    <div className="space-y-2 mb-4">
                        <label className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
                            Select Asset to Stake
                        </label>
                        <select
                            value={selectedWallet}
                            onChange={(e) => setSelectedWallet(e.target.value)}
                            className={cn(
                                "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500",
                                darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                            )}
                        >
                            <option value="">Choose wallet</option>
                            {wallets.filter(w => parseFloat(w.balance) > 0).map((wallet) => (
                                <option key={wallet.id} value={wallet.wallet_type}>
                                    {getCoinIcon(wallet.wallet_type)} {wallet.wallet_type} - {parseFloat(wallet.balance).toFixed(6)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount Input */}
                    {selectedWallet && (
                        <div className="space-y-2 mb-4">
                            <label className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
                                Amount to Stake
                            </label>
                            <input
                                type="number"
                                step="0.000001"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                placeholder="0.00"
                                className={cn(
                                    "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500",
                                    darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                                )}
                            />
                        </div>
                    )}

                    {/* Duration Selection */}
                    {selectedWallet && stakeAmount && (
                        <div className="space-y-2 mb-4">
                            <label className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
                                Staking Duration
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(apyRates).map(([days, apy]) => (
                                    <button
                                        key={days}
                                        onClick={() => setStakeDuration(days)}
                                        className={cn(
                                            "p-3 rounded-lg border transition-all",
                                            stakeDuration === days
                                                ? "border-cyan-500 bg-cyan-500/10"
                                                : darkMode
                                                    ? "border-gray-700 hover:border-gray-600"
                                                    : "border-gray-300 hover:border-gray-400"
                                        )}
                                    >
                                        <div className="text-sm font-medium">{days} Days</div>
                                        <div className="text-xs text-cyan-500">{apy}% APY</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rewards Estimate */}
                    {stakeAmount && stakeDuration && (
                        <div className={cn("p-4 rounded-lg mb-4", darkMode ? "bg-gray-800/50" : "bg-gray-50")}>
                            <div className="flex items-center justify-between mb-2">
                                <span className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>
                                    Estimated Rewards
                                </span>
                                <span className={cn("text-lg font-bold text-green-500")}>
                                    +{calculateRewards()} {selectedWallet}
                                </span>
                            </div>
                            <div className={cn("text-xs", darkMode ? "text-gray-500" : "text-gray-500")}>
                                After {stakeDuration} days at {apyRates[stakeDuration]}% APY
                            </div>
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

                    {/* Stake Button */}
                    <button
                        onClick={handleStake}
                        disabled={staking || !selectedWallet || !stakeAmount || parseFloat(stakeAmount) <= 0}
                        className={cn(
                            "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                            staking || !selectedWallet || !stakeAmount || parseFloat(stakeAmount) <= 0
                                ? "bg-gray-600 cursor-not-allowed opacity-50"
                                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        )}
                    >
                        {staking ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Staking...
                            </>
                        ) : (
                            <>
                                <TrendingUp className="w-5 h-5" />
                                Stake Now
                            </>
                        )}
                    </button>
                </div>

                {/* Info Card */}
                <div className={cn("p-4 rounded-lg border", darkMode ? "bg-gray-900/50 border-gray-800" : "bg-blue-50 border-blue-200")}>
                    <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-blue-800")}>
                        💡 <strong>How it works:</strong> Lock your crypto for a fixed period and earn rewards. Longer durations offer higher APY rates. Funds are locked until the staking period ends.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stake;
