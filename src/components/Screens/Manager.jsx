import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const installedApps = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    version: "2.1.0",
    size: "32 KB",
    status: "installed",
    icon: "₿",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    version: "1.10.4",
    size: "64 KB",
    status: "installed",
    icon: "Ξ",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    name: "Cardano",
    symbol: "ADA",
    version: "4.1.0",
    size: "48 KB",
    status: "updating",
    icon: "₳",
    color: "from-blue-500 to-cyan-500",
  },
];

const availableApps = [
  {
    id: 4,
    name: "Solana",
    symbol: "SOL",
    version: "1.3.1",
    size: "56 KB",
    status: "available",
    icon: "◎",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 5,
    name: "Polygon",
    symbol: "MATIC",
    version: "1.9.2",
    size: "40 KB",
    status: "available",
    icon: "⬟",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 6,
    name: "Chainlink",
    symbol: "LINK",
    version: "1.0.3",
    size: "36 KB",
    status: "available",
    icon: "🔗",
    color: "from-blue-600 to-blue-400",
  },
  {
    id: 7,
    name: "Polkadot",
    symbol: "DOT",
    version: "99.9.9",
    size: "52 KB",
    status: "available",
    icon: "●",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 8,
    name: "Avalanche",
    symbol: "AVAX",
    version: "0.7.3",
    size: "44 KB",
    status: "available",
    icon: "▲",
    color: "from-red-500 to-orange-500",
  },
];

const Manager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("installed");
  const [installingApps, setInstallingApps] = useState(new Set());
  const [uninstallingApps, setUninstallingApps] = useState(new Set());

  const totalStorage = 2048; // KB
  const usedStorage = installedApps.reduce(
    (sum, app) => sum + parseInt(app.size),
    0
  );
  const storagePercentage = (usedStorage / totalStorage) * 100;

  const handleInstallApp = (appId) => {
    setInstallingApps((prev) => new Set([...prev, appId]));
    // Simulate installation
    setTimeout(() => {
      setInstallingApps((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appId);
        return newSet;
      });
    }, 3000);
  };

  const handleUninstallApp = (appId) => {
    setUninstallingApps((prev) => new Set([...prev, appId]));
    // Simulate uninstallation
    setTimeout(() => {
      setUninstallingApps((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appId);
        return newSet;
      });
    }, 2000);
  };

  const filteredInstalledApps = installedApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableApps = availableApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AppCard = ({ app, isInstalled = false }) => {
    const isInstalling = installingApps.has(app.id);
    const isUninstalling = uninstallingApps.has(app.id);
    const isUpdating = app.status === "updating";

    return (
      <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-200 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left Section: Icon + Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            {/* Icon */}
            <div
              className={cn(
                "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center text-white font-bold flex-shrink-0",
                app.color
              )}
            >
              {app.icon}
            </div>

            {/* Details */}
            <div>
              <h3 className="font-semibold text-white text-base sm:text-lg">
                {app.name}
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

          {/* Right Section: Status + Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:justify-end w-full sm:w-auto">
            {/* Status Messages */}
            {isInstalled && (
              <div className="flex items-center space-x-1 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Installed</span>
              </div>
            )}

            {isUpdating && (
              <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Updating</span>
              </div>
            )}

            {isInstalling && (
              <div className="flex items-center space-x-1 text-blue-400 text-sm">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Installing</span>
              </div>
            )}

            {isUninstalling && (
              <div className="flex items-center space-x-1 text-red-400 text-sm">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Removing</span>
              </div>
            )}

            {/* Action Buttons */}
            {!isInstalling && !isUninstalling && !isUpdating && (
              <>
                {isInstalled ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUninstallApp(app.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Uninstall
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleInstallApp(app.id)}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Install
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Manager
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Install and manage apps on your Ledger device
          </p>
        </div>
      </div>

      {/* Device Status */}
      <div className="p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Ledger Nano X</h3>
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

        {/* Storage Usage */}
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

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 w-full sm:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Tab Selector */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setSelectedTab("installed")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full sm:w-auto",
              selectedTab === "installed"
                ? "bg-cyan-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            )}
          >
            Installed ({installedApps.length})
          </button>
          <button
            onClick={() => setSelectedTab("available")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full sm:w-auto",
              selectedTab === "available"
                ? "bg-cyan-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            )}
          >
            Available ({availableApps.length})
          </button>
        </div>
      </div>

      {/* Apps List */}
      <div className="space-y-4">
        {selectedTab === "installed" && (
          <>
            <h2 className="text-xl font-semibold text-white">Installed Apps</h2>
            {filteredInstalledApps.length > 0 ? (
              <div className="space-y-3">
                {filteredInstalledApps.map((app) => (
                  <AppCard key={app.id} app={app} isInstalled={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No installed apps found.</p>
              </div>
            )}
          </>
        )}

        {selectedTab === "available" && (
          <>
            <h2 className="text-xl font-semibold text-white">Available Apps</h2>
            {filteredAvailableApps.length > 0 ? (
              <div className="space-y-3">
                {filteredAvailableApps.map((app) => (
                  <AppCard key={app.id} app={app} isInstalled={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No available apps found.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Storage Warning */}
      {storagePercentage > 80 && (
        <div className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-medium">Storage Almost Full</p>
            <p className="text-yellow-300 text-sm">
              Your device storage is {storagePercentage.toFixed(1)}% full.
              Consider uninstalling unused apps to free up space.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
