import React, { useState } from 'react';
import { 
  ArrowLeft, 
  QrCode, 
  AlertTriangle, 
  Info, 
  ChevronDown,
  Send as SendIcon,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const availableAssets = [
  {
    id: 1,
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    balance: 1.2345,
    fiatValue: 52340,
    coinIcon: '₿',
    color: 'from-orange-400 to-yellow-500'
  },
  {
    id: 2,
    coinName: 'Ethereum',
    coinSymbol: 'ETH',
    balance: 15.678,
    fiatValue: 28450,
    coinIcon: 'Ξ',
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 3,
    coinName: 'Cardano',
    coinSymbol: 'ADA',
    balance: 2500.0,
    fiatValue: 1250,
    coinIcon: '₳',
    color: 'from-blue-500 to-cyan-500'
  }
];

const Send = () => {
  const [selectedAsset, setSelectedAsset] = useState(availableAssets[0]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [feeLevel, setFeeLevel] = useState('standard');
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);

  const feeOptions = [
    { id: 'slow', label: 'Slow', time: '~30 min', fee: '0.00001 BTC', fiat: '$0.42' },
    { id: 'standard', label: 'Standard', time: '~10 min', fee: '0.00005 BTC', fiat: '$2.10' },
    { id: 'fast', label: 'Fast', time: '~5 min', fee: '0.0001 BTC', fiat: '$4.20' }
  ];

  const handleSend = () => {
    // Handle send transaction
    console.log('Sending transaction:', {
      asset: selectedAsset,
      recipient: recipientAddress,
      amount,
      memo,
      feeLevel
    });
  };

  const isFormValid = recipientAddress && amount && parseFloat(amount) > 0;

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

      {/* Main Form */}
      <div className="space-y-6">
        {/* Asset Selection */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-3">From Account</label>
          <div className="relative">
            <button
              onClick={() => setShowAssetDropdown(!showAssetDropdown)}
              className="w-full flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm",
                  selectedAsset.color
                )}>
                  {selectedAsset.coinIcon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">{selectedAsset.coinName}</p>
                  <p className="text-sm text-gray-400">
                    {selectedAsset.balance} {selectedAsset.coinSymbol} • ${selectedAsset.fiatValue.toLocaleString()}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>

            {showAssetDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                {availableAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      setSelectedAsset(asset);
                      setShowAssetDropdown(false);
                    }}
                    className="w-full flex items-center space-x-3 p-4 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-xs",
                      asset.color
                    )}>
                      {asset.coinIcon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-white">{asset.coinName}</p>
                      <p className="text-sm text-gray-400">
                        {asset.balance} {asset.coinSymbol}
                      </p>
                    </div>
                  </button>
                ))}
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
          {recipientAddress && (
            <div className="mt-3 flex items-center space-x-2 text-sm">
              <Info className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Address format validated</span>
            </div>
          )}
        </div>

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
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white text-xl placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {selectedAsset.coinSymbol}
              </div>
            </div>
            
            {amount && (
              <p className="text-gray-400 text-sm">
                ≈ ${(parseFloat(amount) * (selectedAsset.fiatValue / selectedAsset.balance)).toLocaleString()}
              </p>
            )}

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setAmount((selectedAsset.balance * 0.25).toString())}
              >
                25%
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setAmount((selectedAsset.balance * 0.5).toString())}
              >
                50%
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setAmount((selectedAsset.balance * 0.75).toString())}
              >
                75%
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setAmount(selectedAsset.balance.toString())}
              >
                Max
              </Button>
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
                    <p className="text-sm text-gray-400">{option.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{option.fee}</p>
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

        {/* Warning */}
        {amount && parseFloat(amount) > selectedAsset.balance * 0.9 && (
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
          disabled={!isFormValid}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400"
        >
          <SendIcon className="w-5 h-5 mr-2" />
          Review Transaction
        </Button>
      </div>
    </div>
  );
};

export default Send;

