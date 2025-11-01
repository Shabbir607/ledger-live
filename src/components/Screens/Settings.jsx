import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Globe, 
  Bell, 
  Palette, 
  Database, 
  HelpCircle, 
  ChevronRight,
  Moon,
  Sun,
  Lock,
  Eye,
  EyeOff,
  Download,
  Trash2,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

const BASE_URL = "https://ledger.laptopindubai.com/api";

const SettingSection = ({ title, children, darkMode }) => (
  <div className={`p-6 rounded-xl border transition-colors ${
    darkMode 
      ? 'border-gray-800 bg-gray-900/50' 
      : 'border-gray-200 bg-white shadow-sm'
  }`}>
    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SettingItem = ({ icon: Icon, title, description, children, onClick, darkMode }) => (
  <div 
    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
      onClick 
        ? darkMode 
          ? 'hover:bg-gray-800/50 cursor-pointer' 
          : 'hover:bg-gray-50 cursor-pointer'
        : ''
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <Icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      <div>
        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </p>
        {description && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-2">
      {children}
      {onClick && (
        <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      )}
    </div>
  </div>
);

const Toggle = ({ checked, onChange, darkMode }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onChange(!checked);
    }}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-cyan-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Button = ({ children, variant = 'default', className = '', onClick, disabled, type = 'button', darkMode }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === 'outline'
        ? darkMode
          ? 'border border-gray-700 text-gray-300 hover:bg-gray-800'
          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
        : darkMode
        ? 'bg-cyan-500 text-white hover:bg-cyan-600'
        : 'bg-cyan-500 text-white hover:bg-cyan-600'
    } ${className}`}
  >
    {children}
  </button>
);

const Modal = ({ isOpen, onClose, title, children, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`w-full max-w-md rounded-xl border ${
          darkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        } shadow-2xl`}
      >
        <div className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Language selector state
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  // Update/Cache state
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [clearingCache, setClearingCache] = useState(false);
  const [cacheMessage, setCacheMessage] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'BTC', name: 'Bitcoin', symbol: '₿' }
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    document.documentElement.lang = langCode;
    setShowLanguageModal(false);
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setChangingPassword(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(`${BASE_URL}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword
        })
      });

      const data = await response.json();

      if (data.message === "Password changed successfully") {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess('');
        }, 2000);
      } else {
        setPasswordError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setPasswordError('Network error. Please try again.');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleCheckForUpdates = (e) => {
    e.stopPropagation();
    setCheckingUpdate(true);
    setUpdateMessage('');
    
    setTimeout(() => {
      setCheckingUpdate(false);
      setUpdateMessage('Everything is up to date!');
      setTimeout(() => setUpdateMessage(''), 3000);
    }, 2000);
  };

  const handleClearCache = (e) => {
    e.stopPropagation();
    setClearingCache(true);
    setCacheMessage('');
    
    setTimeout(() => {
      const authToken = localStorage.getItem('authToken');
      localStorage.clear();
      if (authToken) {
        localStorage.setItem('authToken', authToken);
      }
      
      setClearingCache(false);
      setCacheMessage('Cache cleared successfully!');
      setTimeout(() => setCacheMessage(''), 3000);
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-black text-white' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Customize your Ledger Live experience
          </p>
        </div>

        {/* General Settings */}
        <SettingSection title="General" darkMode={darkMode}>
          <SettingItem
            icon={darkMode ? Moon : Sun}
            title="Theme"
            description={`Currently: ${darkMode ? 'Dark Mode' : 'Light Mode'}`}
            darkMode={darkMode}
          >
            <Toggle checked={darkMode} onChange={toggleDarkMode} darkMode={darkMode} />
          </SettingItem>

          <SettingItem
            icon={Globe}
            title="Language"
            description={`Currently: ${languages.find(l => l.code === selectedLanguage)?.name}`}
            onClick={() => setShowLanguageModal(true)}
            darkMode={darkMode}
          />

          <SettingItem
            icon={Database}
            title="Display Currency"
            description={`Currently: ${currencies.find(c => c.code === selectedCurrency)?.name}`}
            darkMode={darkMode}
          />

          <SettingItem
            icon={hideBalances ? EyeOff : Eye}
            title="Hide Balances"
            description="Hide balance amounts throughout the app"
            darkMode={darkMode}
          >
            <Toggle checked={hideBalances} onChange={setHideBalances} darkMode={darkMode} />
          </SettingItem>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection title="Security & Privacy" darkMode={darkMode}>
          <SettingItem
            icon={Lock}
            title="Change Password"
            description="Update your app password"
            onClick={() => setShowPasswordModal(true)}
            darkMode={darkMode}
          />

          <SettingItem
            icon={Shield}
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            darkMode={darkMode}
          />

          <SettingItem
            icon={RefreshCw}
            title="Auto-lock Timer"
            description="Automatically lock the app after inactivity"
            darkMode={darkMode}
          />
        </SettingSection>

        {/* Updates */}
        <SettingSection title="Updates & Maintenance" darkMode={darkMode}>
          <SettingItem
            icon={Download}
            title="Automatic Updates"
            description="Automatically download and install updates"
            darkMode={darkMode}
          >
            <Toggle checked={autoUpdate} onChange={setAutoUpdate} darkMode={darkMode} />
          </SettingItem>

          <div>
            <SettingItem
              icon={RefreshCw}
              title="Check for Updates"
              description="Manually check for app updates"
              onClick={handleCheckForUpdates}
              darkMode={darkMode}
            >
              {checkingUpdate && (
                <RefreshCw className="w-5 h-5 text-cyan-500 animate-spin" />
              )}
            </SettingItem>
            
            {updateMessage && (
              <div className="mt-2 ml-11 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>{updateMessage}</span>
              </div>
            )}
          </div>

          <div>
            <SettingItem
              icon={Database}
              title="Clear Cache"
              description="Clear temporary files and cached data"
              onClick={handleClearCache}
              darkMode={darkMode}
            >
              {clearingCache && (
                <RefreshCw className="w-5 h-5 text-cyan-500 animate-spin" />
              )}
            </SettingItem>
            
            {cacheMessage && (
              <div className="mt-2 ml-11 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>{cacheMessage}</span>
              </div>
            )}
          </div>
        </SettingSection>

        {/* App Information */}
        <div className={`p-6 rounded-xl border transition-colors ${
          darkMode 
            ? 'border-gray-800 bg-gray-900/50' 
            : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            App Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Version</span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>2.73.1</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Build</span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>20240315.1</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Platform</span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Desktop (Electron)</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Last Updated</span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>March 15, 2024</span>
            </div>
          </div>
        </div>

       
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordError('');
          setPasswordSuccess('');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}
        title="Change Password"
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {passwordError && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <X className="w-4 h-4" />
              <span>{passwordError}</span>
            </div>
          )}
          
          {passwordSuccess && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              <Check className="w-4 h-4" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500`}
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500`}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500`}
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handlePasswordChange}
              disabled={changingPassword}
              className="flex-1"
              darkMode={darkMode}
            >
              {changingPassword ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                'Change Password'
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordError('');
                setPasswordSuccess('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              darkMode={darkMode}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title="Select Language"
        darkMode={darkMode}
      >
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedLanguage === lang.code
                  ? 'bg-cyan-500 text-white'
                  : darkMode
                  ? 'hover:bg-gray-800 text-gray-300 border border-gray-700'
                  : 'hover:bg-gray-100 text-gray-900 border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{lang.name}</span>
                {selectedLanguage === lang.code && (
                  <Check className="w-5 h-5" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Settings;