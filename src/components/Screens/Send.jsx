import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  QrCode, 
  AlertTriangle, 
  Info, 
  ChevronDown,
  Send as SendIcon,
  Zap,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BASE_URL = "https://ledger.laptopindubai.com/api";

const Send = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [feeLevel, setFeeLevel] = useState('standard');
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const feeOptions = [
    { id: 'slow', label: 'Slow', time: '~30 min', fee: '0.00001', fiat: '$0.42' },
    { id: 'standard', label: 'Standard', time: '~10 min', fee: '0.00005', fiat: '$2.10' },
    { id: 'fast', label: 'Fast', time: '~5 min', fee: '0.0001', fiat: '$4.20' }
  ];

 // Inside useEffect — DO NOT filter
useEffect(() => {
  const fetchWallets = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token not found. Please log in.");

      setLoading(true);
      setError('');
      const response = await fetch(`${BASE_URL}/wallet`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.wallets) {
        setWallets(data.wallets); // ← Show ALL wallets
        const firstWithBalance = data.wallets.find(w => parseFloat(w.balance) > 0);
        setSelectedWallet(firstWithBalance || data.wallets[0]); // fallback to first
      } else {
        setError(data.message || 'Failed to load wallets');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  fetchWallets();
}, []);

  const handleSend = async () => {
    if (!selectedWallet || !recipientAddress || !amount || parseFloat(amount) <= 0) return;

    setSending(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        wallet_type: selectedWallet.wallet_type,
        amount: parseFloat(amount),
        to_address: recipientAddress,
        memo: memo || undefined,
      };

         const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token not found. Please log in.");
      const response = await fetch(`${BASE_URL}/wallet/withdraw`, {
        method: 'POST',

 headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(`Successfully sent ${amount} ${selectedWallet.wallet_type}!`);
        setAmount('');
        setRecipientAddress('');
        setMemo('');
        // Optionally refetch wallets
        // refetchWallets();
      } else {
        setError(result.message || 'Transaction failed');
      }
    } catch (err) {
      setError('Failed to send transaction. Please try again.');
    } finally {
      setSending(false);
    }
  };
const balance = selectedWallet ? parseFloat(selectedWallet.balance) : 0;
const amountValue = parseFloat(amount) || 0;

const isFormValid = selectedWallet && 
                    recipientAddress && 
                    amountValue > 0 && 
                    amountValue <= balance && 
                    balance > 0; // ← Critical: block if balance is 0
  const getCoinIcon = (type) => {
    const icons = { BTC: '₿', ETH: 'Ξ', USDT: '₮', ADA: '₳' };
    return icons[type] || type[0];
  };

  const getGradient = (type) => {
    const gradients = {
      BTC: 'from-orange-400 to-yellow-500',
      ETH: 'from-blue-400 to-purple-500',
      USDT: 'from-green-400 to-emerald-500',
      ADA: 'from-blue-500 to-cyan-500',
    };
    return gradients[type] || 'from-gray-400 to-gray-600';
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        <p className="mt-4 text-gray-400">Loading wallets...</p>
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-gray-800 rounded-xl p-8">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Funds Available</h3>
          <p className="text-gray-400">You don't have any balance to send.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-gray-400 hover:text-white p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Send Crypto</h1>
          <p className="text-gray-400">Send cryptocurrency to another address</p>
        </div>
      </div>

      {/* Error / Success */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          {success}
        </div>
      )}

      {/* Main Form */}
      <div className="space-y-6">
        {/* Asset Selection */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-3">From Wallet</label>
          <div className="relative">
            <button
              onClick={() => setShowAssetDropdown(!showAssetDropdown)}
              className="w-full flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
              disabled={wallets.length <= 1}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm",
                  getGradient(selectedWallet?.wallet_type)
                )}>
                  {getCoinIcon(selectedWallet?.wallet_type)}
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">{selectedWallet?.wallet_type}</p>
                  <p className="text-sm text-gray-400">
                    {parseFloat(selectedWallet?.balance).toFixed(4)} {selectedWallet?.wallet_type}
                  </p>
                </div>
              </div>
              {wallets.length > 1 && <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            {showAssetDropdown && wallets.length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
            {/* In dropdown list */}
{wallets.map((wallet) => {
  const walletBalance = parseFloat(wallet.balance);
  const isDisabled = walletBalance === 0;

  return (
    <button
      key={wallet.wallet_address}
      onClick={() => {
        setSelectedWallet(wallet);
        setShowAssetDropdown(false);
      }}
      disabled={isDisabled}
      className={cn(
        "w-full flex items-center space-x-3 p-4 transition-colors first:rounded-t-lg last:rounded-b-lg",
        isDisabled 
          ? "opacity-50 cursor-not-allowed bg-gray-800" 
          : "hover:bg-gray-700"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-xs",
        getGradient(wallet.wallet_type)
      )}>
        {getCoinIcon(wallet.wallet_type)}
      </div>
      <div className="text-left flex-1">
        <p className={cn("font-medium", isDisabled ? "text-gray-500" : "text-white")}>
          {wallet.wallet_type}
        </p>
        <p className="text-sm text-gray-400">
          {walletBalance.toFixed(4)} {wallet.wallet_type}
        </p>
      </div>
      {isDisabled && <span className="text-xs text-orange-400">No funds</span>}
    </button>
  );
})}
              </div>
            )}
          </div>
        </div>

        {/* Recipient Address */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-3">Recipient Address</label>
          <div className="relative">
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient address or scan QR code"
              className="w-full p-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors">
              <QrCode className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Amount */}
    {/* Amount */}
<div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
  <label className="block text-sm font-medium text-gray-300 mb-3">Amount</label>
  <div className="space-y-4">
    <div className="relative">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        max={selectedWallet?.balance}
        step="any"
        disabled={!selectedWallet || balance === 0}
        className={cn(
          "w-full p-4 bg-gray-800 border rounded-lg text-white text-xl placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500",
          balance === 0 ? "opacity-50 cursor-not-allowed border-gray-700" : "border-gray-700"
        )}
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        {selectedWallet?.wallet_type}
      </div>
    </div>

    {/* Balance Info */}
    <p className="text-sm">
      <span className="text-gray-400">Available: </span>
      <span className={balance > 0 ? "text-white" : "text-red-400"}>
        {balance.toFixed(8)} {selectedWallet?.wallet_type}
      </span>
    </p>

    {/* Zero Balance Warning */}
    {balance === 0 && (
      <div className="flex items-center space-x-2 text-sm text-orange-400">
        <AlertTriangle className="w-4 h-4" />
        <span>Insufficient balance. Deposit funds to send.</span>
      </div>
    )}

    {/* % Buttons - Disabled if balance = 0 */}
    <div className="flex space-x-2">
      {[25, 50, 75, 100].map((pct) => (
        <Button
          key={pct}
          variant="outline"
          size="sm"
          disabled={!selectedWallet || balance === 0}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          onClick={() => {
            const val = (balance * (pct / 100)).toString();
            setAmount(val);
          }}
        >
          {pct === 100 ? 'Max' : `${pct}%`}
        </Button>
      ))}
    </div>
  </div>
</div>

        {/* Network Fee */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-3">Network Fee</label>
          <div className="space-y-3">
            {feeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFeeLevel(option.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-lg border transition-all",
                  feeLevel === option.id
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    feeLevel === option.id ? "bg-cyan-500" : "bg-gray-600"
                  )} />
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{option.label}</span>
                      {option.id === 'fast' && <Zap className="w-4 h-4 text-yellow-400" />}
                    </div>
<p className="text-sm text-gray-400">
  {parseFloat(selectedWallet?.balance).toFixed(4)} {selectedWallet?.wallet_type}
  {balance === 0 && " (No funds)"}
</p>                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{option.fee} {selectedWallet?.wallet_type}</p>
                  <p className="text-sm text-gray-400">{option.fiat}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Memo (Optional) */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Memo <span className="text-gray-500">(Optional)</span>
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Add a note for this transaction"
            rows={3}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
          />
        </div>

        {/* High Amount Warning */}
        {amount && selectedWallet && parseFloat(amount) > parseFloat(selectedWallet.balance) * 0.9 && (
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium">High Amount Warning</p>
              <p className="text-yellow-300 text-sm">
                You're sending a large portion of your balance. Please double-check the recipient address.
              </p>
            </div>
          </div>
        )}

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!isFormValid || sending}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400"
        >
          {sending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="w-5 h-5 mr-2" />
              Review Transaction
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Send;