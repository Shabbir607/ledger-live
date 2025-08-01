import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Usb, 
  Bluetooth, 
  Smartphone, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DeviceConnection = () => {
  const navigate = useNavigate();
  const [connectionMethod, setConnectionMethod] = useState('usb');
  const [connectionStatus, setConnectionStatus] = useState('searching'); // searching, connected, failed
  const [deviceInfo, setDeviceInfo] = useState(null);

  // Simulate device detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
      setDeviceInfo({
        name: 'Ledger Nano X',
        firmware: '2.2.1',
        battery: 85
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [connectionMethod]);

  const handleBack = () => {
    navigate('/onboarding/welcome');
  };

  const handleContinue = () => {
    navigate('/onboarding/account-import');
  };

  const handleRetry = () => {
    setConnectionStatus('searching');
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  const connectionMethods = [
    {
      id: 'usb',
      name: 'USB Connection',
      icon: Usb,
      description: 'Connect your Ledger device using the USB cable',
      recommended: true
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth',
      icon: Bluetooth,
      description: 'Connect wirelessly via Bluetooth (Nano X only)',
      recommended: false
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Connect your device',
      description: connectionMethod === 'usb' 
        ? 'Plug your Ledger device into your computer using the USB cable'
        : 'Make sure Bluetooth is enabled on your Ledger Nano X'
    },
    {
      number: 2,
      title: 'Unlock your device',
      description: 'Enter your PIN code on your Ledger device'
    },
    {
      number: 3,
      title: 'Open the dashboard',
      description: 'Navigate to the main menu on your device screen'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
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
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Connect your Ledger device</h1>
          <p className="text-xl text-gray-300">
            Let's establish a secure connection with your hardware wallet
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Connection Methods and Steps */}
          <div className="space-y-8">
            {/* Connection Method Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Choose connection method</h3>
              <div className="space-y-3">
                {connectionMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setConnectionMethod(method.id)}
                      className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                        connectionMethod === method.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${
                          connectionMethod === method.id ? 'text-cyan-400' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${
                              connectionMethod === method.id ? 'text-cyan-400' : 'text-white'
                            }`}>
                              {method.name}
                            </span>
                            {method.recommended && (
                              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connection Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Follow these steps</h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-cyan-400">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{step.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Link */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-blue-400 font-medium">Need help?</p>
                  <p className="text-blue-300 text-sm">Check our connection troubleshooting guide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Connection Status */}
          <div className="space-y-6">
            <div className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-center">
              {connectionStatus === 'searching' && (
                <div className="space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-cyan-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Searching for device...</h3>
                    <p className="text-gray-400">Make sure your Ledger device is connected and unlocked</p>
                  </div>
                  <div className="flex justify-center">
                    <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                  </div>
                </div>
              )}

              {connectionStatus === 'connected' && deviceInfo && (
                <div className="space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Device connected!</h3>
                    <p className="text-gray-400">Your Ledger device is ready to use</p>
                  </div>
                  
                  {/* Device Info */}
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Device</span>
                      <span className="text-white font-medium">{deviceInfo.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Firmware</span>
                      <span className="text-white font-medium">v{deviceInfo.firmware}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Battery</span>
                      <span className="text-white font-medium">{deviceInfo.battery}%</span>
                    </div>
                  </div>
                </div>
              )}

              {connectionStatus === 'failed' && (
                <div className="space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Connection failed</h3>
                    <p className="text-gray-400">Unable to detect your Ledger device</p>
                  </div>
                  <Button 
                    onClick={handleRetry}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </div>

            {/* Continue Button */}
            {connectionStatus === 'connected' && (
              <Button 
                onClick={handleContinue}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceConnection;

