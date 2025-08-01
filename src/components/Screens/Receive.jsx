import React, { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Share,
  ChevronDown,
  Check,
  QrCode,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const availableAssets = [
  {
    id: 1,
    coinName: "Bitcoin",
    coinSymbol: "BTC",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    coinIcon: "₿",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: 2,
    coinName: "Ethereum",
    coinSymbol: "ETH",
    address: "0x742d35Cc6634C0532925a3b8D4C9db5C9b8D4C9d",
    coinIcon: "Ξ",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    coinName: "Cardano",
    coinSymbol: "ADA",
    address:
      "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a6gtmvnsc74s5s",
    coinIcon: "₳",
    color: "from-blue-500 to-cyan-500",
  },
];

const Receive = () => {
  const [selectedAsset, setSelectedAsset] = useState(availableAssets[0]);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(selectedAsset.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const handleGenerateNewAddress = () => {
    // In a real app, this would generate a new address
    console.log("Generating new address for", selectedAsset.coinSymbol);
  };

  const handleShareAddress = () => {
    // In a real app, this would open share dialog
    console.log("Sharing address:", selectedAsset.address);
  };

  // Mock QR code placeholder (in real app, would generate actual QR code)
  const QRCodePlaceholder = () => (
    <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mx-auto">
      <div className="text-center">
        <QrCode className="w-16 h-16 text-gray-800 mx-auto mb-2" />
        <p className="text-gray-600 text-sm">QR Code</p>
        <p className="text-gray-500 text-xs">{selectedAsset.coinSymbol}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl w-full mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white p-2 w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Receive Crypto
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Share your address to receive cryptocurrency
          </p>
        </div>
      </div>

      {/* Asset Selection */}
      <div className="p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Asset
        </label>
        <div className="relative">
          <button
            onClick={() => setShowAssetDropdown(!showAssetDropdown)}
            className="w-full flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm",
                  selectedAsset.color
                )}
              >
                {selectedAsset.coinIcon}
              </div>
              <div className="text-left">
                <p className="font-medium text-white">
                  {selectedAsset.coinName}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedAsset.coinSymbol}
                </p>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          {showAssetDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {availableAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => {
                    setSelectedAsset(asset);
                    setShowAssetDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-xs",
                      asset.color
                    )}
                  >
                    {asset.coinIcon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">{asset.coinName}</p>
                    <p className="text-sm text-gray-400">{asset.coinSymbol}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Code and Address */}
      <div className="p-4 sm:p-8 rounded-xl border border-gray-800 bg-gray-900/50 text-center">
        <QRCodePlaceholder />

        <div className="mt-6 space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your {selectedAsset.coinSymbol} Address
            </label>
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <p className="text-white font-mono text-sm break-words">
                {selectedAsset.address}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCopyAddress}
              className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Address
                </>
              )}
            </Button>
            <Button
              onClick={handleShareAddress}
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Request Specific Amount */}
      <div className="p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Request Specific Amount{" "}
          <span className="text-gray-500">(Optional)</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
            placeholder="0.00"
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <div className="flex items-center justify-center px-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 min-w-[80px]">
            {selectedAsset.coinSymbol}
          </div>
        </div>
        {requestAmount && (
          <p className="text-sm text-gray-400 mt-2">
            This will generate a payment request QR code with the specified
            amount
          </p>
        )}
      </div>

      {/* Address Management */}
      <div className="p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold text-white">
            Address Management
          </h3>
          <Button
            onClick={handleGenerateNewAddress}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm text-gray-400">Current Address</p>
              <p className="text-white font-mono text-sm break-all">
                {selectedAsset.address}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-green-400">Active</p>
              <p className="text-xs text-gray-400">0 transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="p-4 sm:p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
        <h3 className="text-yellow-400 font-semibold mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-yellow-300">
          <li>• Only send {selectedAsset.coinSymbol} to this address</li>
          <li>• Sending other cryptocurrencies may result in permanent loss</li>
          <li>• Always verify the address before sharing</li>
          <li>
            • Consider generating a new address for each transaction for privacy
          </li>
        </ul>
      </div>

      {/* Final Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Save QR Code
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Address
        </Button>
      </div>
    </div>
  );
};

export default Receive;
