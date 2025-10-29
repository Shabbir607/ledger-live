import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Copy,
  Share,
  ChevronDown,
  Check,
  QrCode,
  Download,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://ledger.laptopindubai.com/api";
// MOVE THIS BEFORE THE COMPONENT
const availableAssets = [
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
    coinIcon: "Ƀ",
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
];

// NOW START THE COMPONENT
const Receive = () => {
  const [selectedAsset, setSelectedAsset] = useState(availableAssets[0]);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [walletExists, setWalletExists] = useState(false);
const [creatingWallet, setCreatingWallet] = useState(false);
const [allWallets, setAllWallets] = useState([]); // Store all wallets from API
const [fetchingWallets, setFetchingWallets] = useState(true); // Initial load state
useEffect(() => {
  fetchAllWallets();
}, []);

useEffect(() => {
  if (selectedAsset && allWallets.length > 0) {
    const wallet = allWallets.find(
      w => w.wallet_type === selectedAsset.walletType
    );
    
    if (wallet) {
      setWalletAddress(wallet.wallet_address);
      setWalletExists(true);
    } else {
      // Wallet doesn't exist, create it
      setWalletAddress('');
      setWalletExists(false);
      createWallet(selectedAsset.walletType);
    }
  }
}, [selectedAsset, allWallets]);

const createWallet = async (walletType) => {
  setCreatingWallet(true);
  setError(null);

  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication token not found. Please log in.');
    }

    const response = await fetch(`${BASE_URL}/wallet/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        wallet_type: walletType,
        amount: 0.005
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create wallet');
    }

    const result = await response.json();
    
    if (result.success && result.wallets) {
      // Update all wallets
      setAllWallets(result.wallets);
      
      // Find the newly created wallet
      const newWallet = result.wallets.find(w => w.wallet_type === walletType);
      if (newWallet) {
        setWalletAddress(newWallet.wallet_address);
        setWalletExists(true);
        setSuccess(`${walletType} wallet created successfully!`);
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  } catch (err) {
    console.error('Error creating wallet:', err);
    setError(err.message);
  } finally {
    setCreatingWallet(false);
  }
};
const fetchAllWallets = async () => {
  setFetchingWallets(true);
  setError(null);
  
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('Authentication token not found. Please log in.');
      setFetchingWallets(false);
      return;
    }

    const response = await fetch(`${BASE_URL}/wallet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wallets');
    }

    const result = await response.json();
    
    if (result.success && result.wallets) {
      // Store all wallets
      setAllWallets(result.wallets);
      
      // Check if selected asset wallet exists
      const selectedWallet = result.wallets.find(
        wallet => wallet.wallet_type === selectedAsset.walletType
      );
      
      if (selectedWallet) {
        setWalletAddress(selectedWallet.wallet_address);
        setWalletExists(true);
      } else {
        // Wallet doesn't exist, create it
        setWalletAddress('');
        setWalletExists(false);
        await createWallet(selectedAsset.walletType);
      }
    }
  } catch (err) {
    console.error('Error fetching wallets:', err);
    setError(err.message);
  } finally {
    setFetchingWallets(false);
  }
};
const handleAddFunds = async () => {
  if (!requestAmount || parseFloat(requestAmount) <= 0) {
    setError('Please enter a valid amount');
    return;
  }

  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authentication token not found. Please log in.');
    }

    const response = await fetch(`${BASE_URL}/wallet/add-funds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        wallet_type: selectedAsset.walletType, // Send wallet type, not address
        amount: parseFloat(requestAmount)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add funds');
    }

    const result = await response.json();
    
    if (result.success) {
      setSuccess(`Successfully added ${requestAmount} ${selectedAsset.coinSymbol} to your wallet!`);
      setRequestAmount('');
      
      // Refresh wallets after 2 seconds
      setTimeout(() => {
        fetchAllWallets();
        setSuccess(null);
      }, 2000);
    }
  } catch (err) {
    console.error('Error adding funds:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const handleCopyAddress = async () => {
  const addressToCopy = walletAddress; // Simplified
  try {
    await navigator.clipboard.writeText(addressToCopy);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  } catch (err) {
    console.error("Failed to copy address:", err);
  }
};

const handleShareAddress = () => {
  const addressToShare = walletAddress; // Simplified
  if (navigator.share) {
    navigator.share({
      title: `${selectedAsset.coinName} Address`,
      text: `Send ${selectedAsset.coinSymbol} to: ${addressToShare}`
    }).catch(err => console.log('Error sharing:', err));
  } else {
    console.log("Sharing address:", addressToShare);
  }
};

  const handleGenerateNewAddress = () => {
    console.log("Generating new address for", selectedAsset.coinSymbol);
  };

const QRCodePlaceholder = () => {
  if (fetchingWallets) {
    return (
      <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mx-auto">
        <div className="text-center p-4">
          <Loader2 className="w-16 h-16 text-gray-800 mx-auto mb-2 animate-spin" />
          <p className="text-gray-600 text-sm font-semibold">Loading Wallets...</p>
        </div>
      </div>
    );
  }
  
  if (creatingWallet) {
    return (
      <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mx-auto">
        <div className="text-center p-4">
          <Loader2 className="w-16 h-16 text-gray-800 mx-auto mb-2 animate-spin" />
          <p className="text-gray-600 text-sm font-semibold">Creating Wallet...</p>
          <p className="text-gray-500 text-xs mt-1">{selectedAsset.coinSymbol}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mx-auto">
      <div className="text-center p-4">
        <QrCode className="w-16 h-16 text-gray-800 mx-auto mb-2" />
        <p className="text-gray-600 text-sm font-semibold">{selectedAsset.coinSymbol}</p>
        <p className="text-gray-500 text-xs mt-1 break-all">
          {walletAddress || 'No address available'}
        </p>
      </div>
    </div>
  );
};
const displayAddress = walletAddress || 'Loading...';

  return (
    <div className="max-w-2xl w-full mx-auto space-y-6 px-4 sm:px-6">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center animate-pulse">
                  <Download className="w-10 h-10 text-white animate-bounce" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Processing Transaction</h3>
              <p className="text-gray-400 mb-4">Adding {requestAmount} {selectedAsset.coinSymbol} to your wallet...</p>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-20 h-20 flex items-center justify-center">
                  <Check className="w-10 h-10 text-white animate-scale" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Success! 🎉</h3>
              <p className="text-gray-300 mb-6">{success}</p>
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">Transaction completed successfully</p>
                </div>
                <Button
                  onClick={() => setSuccess(null)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            Receive Funds
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Add funds to your wallet or share your address
          </p>
        </div>
      </div>

   
{creatingWallet && (
  <div className="p-4 rounded-lg border border-cyan-500/50 bg-cyan-500/10">
    <div className="flex items-center gap-2">
      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
      <p className="text-cyan-400">Creating {selectedAsset.coinSymbol} wallet...</p>
    </div>
  </div>
)}
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
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedAsset.color} flex items-center justify-center text-white font-bold text-sm`}>
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
                    setError(null);
                  }}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${asset.color} flex items-center justify-center text-white font-bold text-xs`}>
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
                {displayAddress || 'Loading...'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCopyAddress}
  disabled={!walletAddress || creatingWallet || fetchingWallets}
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
  disabled={!displayAddress || creatingWallet}
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Add Funds Section (All Assets) */}
      <div className="p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Amount{" "}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
            placeholder="0.00"
            disabled={loading}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
          />
          <div className="flex items-center justify-center px-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 min-w-[80px]">
            {selectedAsset.coinSymbol}
          </div>
        </div>
        {requestAmount && (
          <p className="text-sm text-gray-400 mt-2">
            This amount will be added to your wallet when you confirm
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
                {displayAddress || 'Loading...'}
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
          <li>• Enter an amount and click "Add Funds" to deposit to your wallet</li>
          <li>• All transactions are recorded and can be viewed in your history</li>
          <li>• Your wallet address is unique to your account</li>
          <li>• Always verify the address before sharing</li>
        </ul>
      </div>

      {/* Final Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleAddFunds}
disabled={
    loading || 
    !requestAmount || 
    parseFloat(requestAmount) <= 0 || 
    creatingWallet || 
    !walletExists ||
    fetchingWallets
  }          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Add Funds
            </>
          )}
        </Button>
        <Button
          onClick={handleShareAddress}
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