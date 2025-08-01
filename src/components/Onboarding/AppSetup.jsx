import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  CheckCircle,
  Clock,
  Settings,
  Bell,
  Shield,
  Moon,
  Sun,
  Globe,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AppSetup = () => {
  const navigate = useNavigate();
  const [selectedApps, setSelectedApps] = useState(new Set([1, 2, 3])); // Pre-select common apps
  const [installationStatus, setInstallationStatus] = useState("pending"); // pending, installing, completed
  const [preferences, setPreferences] = useState({
    theme: "dark",
    notifications: true,
    autoSync: true,
    language: "en",
    currency: "USD",
  });

  const handleBack = () => {
    navigate("/onboarding/account-import");
  };

  const handleComplete = () => {
    navigate("/dashboard");
  };

  const handleInstallApps = () => {
    setInstallationStatus("installing");
    // Simulate installation process
    setTimeout(() => {
      setInstallationStatus("completed");
    }, 5000);
  };

  const toggleAppSelection = (appId) => {
    const newSelection = new Set(selectedApps);
    if (newSelection.has(appId)) {
      newSelection.delete(appId);
    } else {
      newSelection.add(appId);
    }
    setSelectedApps(newSelection);
  };

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const availableApps = [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      size: "32 KB",
      description: "Manage Bitcoin transactions",
      color: "from-orange-400 to-yellow-500",
      required: true,
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      size: "64 KB",
      description: "Manage Ethereum and ERC-20 tokens",
      color: "from-blue-400 to-purple-500",
      required: true,
    },
    {
      id: 3,
      name: "Cardano",
      symbol: "ADA",
      icon: "₳",
      size: "48 KB",
      description: "Manage Cardano transactions",
      color: "from-blue-500 to-cyan-500",
      required: false,
    },
    {
      id: 4,
      name: "Solana",
      symbol: "SOL",
      icon: "◎",
      size: "56 KB",
      description: "Manage Solana transactions",
      color: "from-purple-400 to-pink-500",
      required: false,
    },
    {
      id: 5,
      name: "Polygon",
      symbol: "MATIC",
      icon: "⬟",
      size: "42 KB",
      description: "Manage Polygon transactions",
      color: "from-purple-500 to-indigo-500",
      required: false,
    },
    {
      id: 6,
      name: "Chainlink",
      symbol: "LINK",
      icon: "🔗",
      size: "38 KB",
      description: "Manage Chainlink tokens",
      color: "from-blue-600 to-cyan-600",
      required: false,
    },
  ];

  const preferenceOptions = [
    {
      key: "theme",
      label: "Theme",
      icon: preferences.theme === "dark" ? Moon : Sun,
      options: [
        { value: "dark", label: "Dark" },
        { value: "light", label: "Light" },
      ],
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: Bell,
      type: "toggle",
    },
    {
      key: "autoSync",
      label: "Auto Sync",
      icon: Settings,
      type: "toggle",
    },
    {
      key: "language",
      label: "Language",
      icon: Globe,
      options: [
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
        { value: "fr", label: "Français" },
        { value: "de", label: "Deutsch" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Set up your Ledger Live
          </h1>
          <p className="text-xl text-gray-300">
            Install apps and configure your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - App Installation */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Install Apps
                </h3>
                <div className="text-sm text-gray-400">
                  {selectedApps.size} selected
                </div>
              </div>

              <p className="text-gray-400">
                Select the cryptocurrency apps you want to install on your
                Ledger device
              </p>
            </div>

            {/* App List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableApps.map((app) => (
                <div
                  key={app.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    selectedApps.has(app.id)
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-gray-700 bg-gray-800/50"
                  } ${
                    app.required
                      ? "opacity-100"
                      : "cursor-pointer hover:border-gray-600"
                  }`}
                  onClick={() => !app.required && toggleAppSelection(app.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${app.color} flex items-center justify-center text-white font-bold`}
                    >
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{app.name}</h4>
                        <span className="text-sm text-gray-400">
                          ({app.symbol})
                        </span>
                        {app.required && (
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{app.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {app.size}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedApps.has(app.id)
                          ? "border-cyan-500 bg-cyan-500"
                          : "border-gray-600"
                      }`}
                    >
                      {selectedApps.has(app.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Installation Status */}
            {installationStatus !== "pending" && (
              <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                {installationStatus === "installing" && (
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-cyan-400 animate-spin" />
                    <div>
                      <p className="text-white font-medium">
                        Installing apps...
                      </p>
                      <p className="text-sm text-gray-400">
                        This may take a few minutes
                      </p>
                    </div>
                  </div>
                )}

                {installationStatus === "completed" && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">
                        Apps installed successfully!
                      </p>
                      <p className="text-sm text-gray-400">
                        Your Ledger device is ready to use
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Install Button */}
            {installationStatus === "pending" && (
              <Button
                onClick={handleInstallApps}
                disabled={selectedApps.size === 0}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Install {selectedApps.size} App
                {selectedApps.size !== 1 ? "s" : ""}
              </Button>
            )}
          </div>

          {/* Right Side - Preferences */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Preferences</h3>
              <p className="text-gray-400">
                Customize your Ledger Live experience
              </p>
            </div>

            {/* Preference Options */}
            <div className="space-y-4">
              {preferenceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.key}
                    className="p-4 rounded-lg border border-gray-700 bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-white font-medium">
                          {option.label}
                        </span>
                      </div>

                      {option.type === "toggle" ? (
                        <button
                          onClick={() =>
                            updatePreference(
                              option.key,
                              !preferences[option.key]
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-colors ${
                            preferences[option.key]
                              ? "bg-cyan-500"
                              : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              preferences[option.key]
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      ) : (
                        <select
                          value={preferences[option.key]}
                          onChange={(e) =>
                            updatePreference(option.key, e.target.value)
                          }
                          className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          {option.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-green-400 font-medium">Security First</p>
                  <p className="text-green-300 text-sm mt-1">
                    Your preferences are stored locally and encrypted for your
                    privacy and security.
                  </p>
                </div>
              </div>
            </div>

            {/* Device Info */}
            <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/50">
              <div className="flex items-center space-x-3 mb-3">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Connected Device</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Device</span>
                  <span className="text-white">Ledger Nano X</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage Used</span>
                  <span className="text-white">
                    {Math.round(selectedApps.size * 45)} KB / 2 MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Battery</span>
                  <span className="text-white">85%</span>
                </div>
              </div>
            </div>

            {/* Complete Setup Button */}
            {installationStatus === "completed" && (
              <Button
                onClick={handleComplete}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Complete Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSetup;
