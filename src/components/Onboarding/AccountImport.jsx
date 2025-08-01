import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Download, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Key,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccountImport = () => {
  const navigate = useNavigate();
  const [importMethod, setImportMethod] = useState('recovery-phrase');
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [showPhrase, setShowPhrase] = useState(false);
  const [isValidPhrase, setIsValidPhrase] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState(new Set());

  const handleBack = () => {
    navigate('/onboarding/device-connection');
  };

  const handleContinue = () => {
    navigate('/onboarding/app-setup');
  };

  const handleCreateNew = () => {
    // Skip to app setup for new users
    navigate('/onboarding/app-setup');
  };

  const validateRecoveryPhrase = (phrase) => {
    const words = phrase.trim().split(/\s+/);
    const isValid = words.length >= 12 && words.length <= 24 && words.length % 3 === 0;
    setIsValidPhrase(isValid);
    return isValid;
  };

  const handlePhraseChange = (e) => {
    const phrase = e.target.value;
    setRecoveryPhrase(phrase);
    if (phrase.trim()) {
      validateRecoveryPhrase(phrase);
    } else {
      setIsValidPhrase(null);
    }
  };

  const importMethods = [
    {
      id: 'recovery-phrase',
      name: 'Recovery Phrase',
      icon: Key,
      description: 'Import accounts using your 12, 18, or 24-word recovery phrase',
      recommended: true
    },
    {
      id: 'backup-file',
      name: 'Backup File',
      icon: FileText,
      description: 'Import from a Ledger Live backup file',
      recommended: false
    }
  ];

  // Mock discovered accounts
  const discoveredAccounts = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: '0.5432',
      fiatValue: '$23,456',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      icon: '₿',
      color: 'from-orange-400 to-yellow-500'
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      balance: '12.34',
      fiatValue: '$18,765',
      address: '0x742d35Cc6634C0532925a3b8D4C9db5C9b8D4C9d',
      icon: 'Ξ',
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 3,
      name: 'Cardano',
      symbol: 'ADA',
      balance: '1,250',
      fiatValue: '$625',
      address: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a6gtmvnsc74s5s',
      icon: '₳',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const toggleAccountSelection = (accountId) => {
    const newSelection = new Set(selectedAccounts);
    if (newSelection.has(accountId)) {
      newSelection.delete(accountId);
    } else {
      newSelection.add(accountId);
    }
    setSelectedAccounts(newSelection);
  };

  const selectAllAccounts = () => {
    setSelectedAccounts(new Set(discoveredAccounts.map(acc => acc.id)));
  };

  const deselectAllAccounts = () => {
    setSelectedAccounts(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
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
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Import your accounts</h1>
          <p className="text-xl text-gray-300">
            Restore your existing crypto accounts or create new ones
          </p>
        </div>

        {/* Import Method Selection */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              onClick={handleCreateNew}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Accounts
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-3 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Import Existing
            </Button>
          </div>

          {/* Import Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {importMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setImportMethod(method.id)}
                  className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                    importMethod === method.id
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <Icon className={`w-6 h-6 mt-1 ${
                      importMethod === method.id ? 'text-cyan-400' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`font-semibold ${
                          importMethod === method.id ? 'text-cyan-400' : 'text-white'
                        }`}>
                          {method.name}
                        </span>
                        {method.recommended && (
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{method.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recovery Phrase Input */}
        {importMethod === 'recovery-phrase' && (
          <div className="space-y-6 mb-8">
            <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-semibold text-white">Recovery Phrase</label>
                  <button
                    onClick={() => setShowPhrase(!showPhrase)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="text-sm">{showPhrase ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                
                <textarea
                  value={recoveryPhrase}
                  onChange={handlePhraseChange}
                  placeholder="Enter your 12, 18, or 24-word recovery phrase..."
                  className={`w-full h-32 p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                    showPhrase ? 'font-mono' : 'font-mono tracking-widest'
                  } ${
                    isValidPhrase === false ? 'border-red-500' : 'border-gray-700'
                  }`}
                  style={{ 
                    WebkitTextSecurity: showPhrase ? 'none' : 'disc',
                    textSecurity: showPhrase ? 'none' : 'disc'
                  }}
                />

                {isValidPhrase === true && (
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Valid recovery phrase detected</span>
                  </div>
                )}

                {isValidPhrase === false && (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Invalid recovery phrase. Please check your input.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Security Warning */}
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-medium">Security Notice</p>
                  <p className="text-yellow-300 text-sm mt-1">
                    Never share your recovery phrase with anyone. Ledger will never ask for your recovery phrase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discovered Accounts */}
        {isValidPhrase && discoveredAccounts.length > 0 && (
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Discovered Accounts</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={selectAllAccounts}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Select All
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={deselectAllAccounts}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Deselect All
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {discoveredAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    selectedAccounts.has(account.id)
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                  onClick={() => toggleAccountSelection(account.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${account.color} flex items-center justify-center text-white font-bold`}>
                      {account.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{account.name}</h4>
                          <p className="text-sm text-gray-400 font-mono truncate max-w-64">
                            {account.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">{account.balance} {account.symbol}</p>
                          <p className="text-sm text-gray-400">{account.fiatValue}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAccounts.has(account.id)
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-gray-600'
                    }`}>
                      {selectedAccounts.has(account.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-400">
              {selectedAccounts.size} of {discoveredAccounts.length} accounts selected
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            disabled={importMethod === 'recovery-phrase' && (!isValidPhrase || selectedAccounts.size === 0)}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700"
          >
            Continue with {selectedAccounts.size} account{selectedAccounts.size !== 1 ? 's' : ''}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountImport;

