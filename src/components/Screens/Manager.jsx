// src/components/Manager.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Trash2,
  HardDrive,
  Smartphone,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Plus,
  X,
} from "lucide-react";

const Manager = ({ baseUrl = "https://ledger.laptopindubai.com/api" }) => {
  // ──────────────────────────────────────────────────────────────────────
  // STATE
  // ──────────────────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("installed");
  const [installingApps, setInstallingApps] = useState(new Set());
  const [uninstallingApps, setUninstallingApps] = useState(new Set());

  const [installedWallets, setInstalledWallets] = useState([]);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // All possible wallet types (from your enum)
  const ALL_WALLET_TYPES = ["BTC", "ETH", "USDT", "BNB", "SOL"];

  const totalStorage = 2048;
  const usedStorage = installedWallets.reduce((s, w) => s + 32, 0); // 32KB per wallet
  const storagePercentage = (usedStorage / totalStorage) * 100;

  // ──────────────────────────────────────────────────────────────────────
  // HELPERS
  // ──────────────────────────────────────────────────────────────────────
  const mapWalletToApp = (wallet, status = "available") => {
    const colorMap = {
      BTC: "from-orange-400 to-yellow-500",
      ETH: "from-blue-400 to-purple-500",
      USDT: "from-green-400 to-teal-500",
      BNB: "from-yellow-400 to-orange-500",
      SOL: "from-purple-400 to-pink-500",
    };
    const iconMap = {
      BTC: "₿",
      ETH: "Ξ",
      USDT: "₮",
      BNB: "₿",
      SOL: "◎",
    };

    return {
      id: wallet.wallet_type || status === "available" ? status : wallet.wallet_type,
      name: wallet.wallet_type || status,
      symbol: wallet.wallet_type || status,
      version: "1.0.0",
      size: "32 KB",
      status,
      icon: iconMap[wallet.wallet_type || status] || status[0],
      color: colorMap[wallet.wallet_type || status] || "from-gray-400 to-gray-500",
      walletAddress: wallet.wallet_address || null,
      balance: wallet.balance || "0.0000",
    };
  };

  // ──────────────────────────────────────────────────────────────────────
  // FETCH EXISTING WALLETS
  // ──────────────────────────────────────────────────────────────────────
  const fetchWallets = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Please log in.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      if (!result.success) throw new Error(result.message || "Failed");

      // Map existing wallets to installed
      const installed = (result.wallets || []).map((w) => mapWalletToApp(w, "installed"));
      
      // Find which wallet types are missing (available)
      const existingTypes = new Set(result.wallets.map((w) => w.wallet_type));
      const available = ALL_WALLET_TYPES
        .filter((type) => !existingTypes.has(type))
        .map((type) => mapWalletToApp({ wallet_type: type }, type));

      setInstalledWallets(installed);
      setAvailableWallets(available);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [baseUrl]);

  // ──────────────────────────────────────────────────────────────────────
  // DEVICE INFO
  // ──────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const device = localStorage.getItem("selectedDevice");
    if (device) {
      try {
        setSelectedDevice(JSON.parse(device));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // CREATE WALLET (Install)
  // ──────────────────────────────────────────────────────────────────────
  const createWallet = async (walletType) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Authentication required.");
      return false;
    }

    setInstallingApps((s) => new Set([...s, walletType]));

    try {
      const res = await fetch(`${baseUrl}/wallet/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ wallet_type: walletType }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      // Refresh the wallet list
      await fetchWallets();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setInstallingApps((s) => {
        const ns = new Set(s);
        ns.delete(walletType);
        return ns;
      });
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // DELETE WALLET (Uninstall)
  // ──────────────────────────────────────────────────────────────────────
  // const deleteWallet = async (walletType) => {
  //   if (!confirm(`Are you sure you want to delete ${walletType} wallet?`)) {
  //     return false;
  //   }

  //   const authToken = localStorage.getItem("authToken");
  //   if (!authToken) {
  //     setError("Authentication required.");
  //     return false;
  //   }

  //   setUninstallingApps((s) => new Set([...s, walletType]));

  //   try {
  //     const res = await fetch(`${baseUrl}/wallet/${walletType}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.message || `HTTP ${res.status}`);
  //     }

  //     // Refresh the wallet list
  //     await fetchWallets();
  //     return true;
  //   } catch (err) {
  //     setError(err.message);
  //     return false;
  //   } finally {
  //     setUninstallingApps((s) => {
  //       const ns = new Set(s);
  //       ns.delete(walletType);
  //       return ns;
  //     });
  //   }
  // };

  // ──────────────────────────────────────────────────────────────────────
  // HANDLE INSTALL / UNINSTALL
  // ──────────────────────────────────────────────────────────────────────
  const handleInstallWallet = async (walletType) => {
    const success = await createWallet(walletType);
    if (!success) {
      alert("Failed to create wallet. Please try again.");
    }
  };

  // const handleUninstallWallet = async (walletType) => {
  //   const success = await deleteWallet(walletType);
  //   if (!success) {
  //     alert("Failed to delete wallet. Please try again.");
  //   }
  // };

  // ──────────────────────────────────────────────────────────────────────
  // FILTERING
  // ──────────────────────────────────────────────────────────────────────
  const filteredInstalled = installedWallets.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailable = availableWallets.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ──────────────────────────────────────────────────────────────────────
  // APP CARD
  // ──────────────────────────────────────────────────────────────────────
  const AppCard = ({ app, isInstalled = false }) => {
    const installing = installingApps.has(app.id);
    const uninstalling = uninstallingApps.has(app.id);

    return (
      <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 transition-all w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${app.color} flex items-center justify-center text-white font-bold`}
            >
              {app.icon}
            </div>

            <div>
              <h3 className="font-semibold text-white text-base sm:text-lg">
                {app.name} Wallet
              </h3>
              <div className="flex flex-wrap items-center text-sm text-gray-400 gap-x-2 gap-y-1">
                <span>{app.symbol}</span>
                <span className="hidden sm:inline">•</span>
                <span>v{app.version}</span>
                <span className="hidden sm:inline">•</span>
                <span>{app.size}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end w-full sm:w-auto">
            {isInstalled && (
              <div className="flex items-center space-x-1 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Active</span>
              </div>
            )}

            {installing && (
              <div className="flex items-center space-x-1 text-blue-400 text-sm">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Creating</span>
              </div>
            )}

            {uninstalling && (
              <div className="flex items-center space-x-1 text-red-400 text-sm">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Deleting</span>
              </div>
            )}

          
          </div>
        </div>
      </div>
    );
  };

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen py-8">
      <div className="space-y-6 px-4 sm:px-6 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Wallet Manager
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Create and manage your cryptocurrency wallets
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 text-center">
            <Clock className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-400">Loading wallets…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-300 text-sm">{error}</p>
              <button
                onClick={fetchWallets}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Device Status */}
        <div className="p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {selectedDevice?.image ? (
                <img
                  src={selectedDevice.image}
                  alt={selectedDevice.name}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-white">
                  {selectedDevice?.name || "Ledger Device"}
                </h3>
                <p className="text-sm text-gray-400">
                  Firmware v2.2.1 • Connected via USB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Storage Usage</span>
              <span className="text-white">
                {usedStorage} KB / {totalStorage} KB
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <HardDrive className="w-3 h-3" />
              <span>{(100 - storagePercentage).toFixed(1)}% available</span>
            </div>
          </div>
        </div>

        {/* Search + Tabs */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search wallets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            {/* <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <Filter className="w-4 h-4" />
              Filter
            </button> */}
          </div>

          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTab("installed")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all w-full sm:w-auto ${
                selectedTab === "installed"
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Active ({installedWallets.length})
            </button>
            <button
              onClick={() => setSelectedTab("available")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all w-full sm:w-auto ${
                selectedTab === "available"
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Create New ({availableWallets.length})
            </button>
          </div>
        </div>

        {/* Wallets List */}
        <div className="space-y-4">
          {selectedTab === "installed" && (
            <>
              <h2 className="text-xl font-semibold text-white">Active Wallets</h2>
              {filteredInstalled.length ? (
                <div className="space-y-3">
                  {filteredInstalled.map((w) => (
                    <AppCard key={w.id} app={w} isInstalled />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No active wallets. Create one to get started.
                </div>
              )}
            </>
          )}

          {selectedTab === "available" && (
            <>
              <h2 className="text-xl font-semibold text-white">Create New Wallet</h2>
              <p className="text-gray-400 text-sm">
                Select a wallet type to create a new wallet address
              </p>
              {filteredAvailable.length ? (
                <div className="space-y-3">
                  {filteredAvailable.map((w) => (
                    <AppCard key={w.id} app={w} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  All available wallet types are already created.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;