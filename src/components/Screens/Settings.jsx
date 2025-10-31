import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { useDarkMode } from '../DarkModeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'BTC', name: 'Bitcoin', symbol: '₿' }
  ];

  const SettingSection = ({ title, children }) => (
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

  const SettingItem = ({ icon: Icon, title, description, children, onClick }) => (
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

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
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

  const Button = ({ children, variant = 'default', className = '', onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
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
        <SettingSection title="General">
          <SettingItem
            icon={darkMode ? Moon : Sun}
            title="Theme"
            description={`Currently: ${darkMode ? 'Dark Mode' : 'Light Mode'}`}
          >
            <Toggle checked={darkMode} onChange={toggleDarkMode} />
          </SettingItem>

          <SettingItem
            icon={Globe}
            title="Language"
            description={`Currently: ${languages.find(l => l.code === selectedLanguage)?.name}`}
            onClick={() => console.log('Open language selector')}
          />

          <SettingItem
            icon={Database}
            title="Display Currency"
            description={`Currently: ${currencies.find(c => c.code === selectedCurrency)?.name}`}
            onClick={() => console.log('Open currency selector')}
          />

          <SettingItem
            icon={hideBalances ? EyeOff : Eye}
            title="Hide Balances"
            description="Hide balance amounts throughout the app"
          >
            <Toggle checked={hideBalances} onChange={setHideBalances} />
          </SettingItem>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection title="Security & Privacy">
          <SettingItem
            icon={Lock}
            title="Change Password"
            description="Update your app password"
            onClick={() => console.log('Open password change')}
          />

          <SettingItem
            icon={Shield}
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            onClick={() => console.log('Open 2FA setup')}
          />

          <SettingItem
            icon={Database}
            title="Analytics & Crash Reports"
            description="Help improve Ledger Live by sharing anonymous data"
          >
            <Toggle checked={analytics} onChange={setAnalytics} />
          </SettingItem>

          <SettingItem
            icon={RefreshCw}
            title="Auto-lock Timer"
            description="Automatically lock the app after inactivity"
            onClick={() => console.log('Open auto-lock settings')}
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            description="Receive notifications for transactions and updates"
          >
            <Toggle checked={notifications} onChange={setNotifications} />
          </SettingItem>

          <SettingItem
            icon={Bell}
            title="Transaction Alerts"
            description="Get notified when transactions are confirmed"
            onClick={() => console.log('Open transaction alert settings')}
          />

          <SettingItem
            icon={Bell}
            title="Price Alerts"
            description="Set up alerts for price changes"
            onClick={() => console.log('Open price alert settings')}
          />
        </SettingSection>

        {/* Updates */}
        <SettingSection title="Updates & Maintenance">
          <SettingItem
            icon={Download}
            title="Automatic Updates"
            description="Automatically download and install updates"
          >
            <Toggle checked={autoUpdate} onChange={setAutoUpdate} />
          </SettingItem>

          <SettingItem
            icon={RefreshCw}
            title="Check for Updates"
            description="Manually check for app updates"
            onClick={() => console.log('Check for updates')}
          />

          <SettingItem
            icon={Database}
            title="Clear Cache"
            description="Clear temporary files and cached data"
            onClick={() => console.log('Clear cache')}
          />
        </SettingSection>

        {/* Account Management */}
        <SettingSection title="Account Management">
          <SettingItem
            icon={Download}
            title="Export Accounts"
            description="Export your account data for backup"
            onClick={() => console.log('Export accounts')}
          />

          <SettingItem
            icon={RefreshCw}
            title="Reset Application"
            description="Reset all settings to default values"
            onClick={() => console.log('Reset application')}
          />

          <SettingItem
            icon={Trash2}
            title="Delete All Data"
            description="Permanently delete all local data"
            onClick={() => console.log('Delete all data')}
          />
        </SettingSection>

        {/* Support */}
        <SettingSection title="Support & Information">
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            description="Get help and find answers to common questions"
            onClick={() => console.log('Open help center')}
          />

          <SettingItem
            icon={User}
            title="Contact Support"
            description="Get in touch with our support team"
            onClick={() => console.log('Contact support')}
          />

          <SettingItem
            icon={Globe}
            title="Terms of Service"
            description="Read our terms and conditions"
            onClick={() => console.log('Open terms')}
          />

          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            description="Learn about how we protect your privacy"
            onClick={() => console.log('Open privacy policy')}
          />
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

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;