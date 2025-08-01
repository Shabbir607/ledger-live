import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Smartphone, Coins, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding/device-connection');
  };

  const handleImportExisting = () => {
    navigate('/onboarding/account-import');
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Your private keys never leave your Ledger device, ensuring maximum security for your crypto assets.'
    },
    {
      icon: Smartphone,
      title: 'Hardware Integration',
      description: 'Seamlessly connect and manage your Ledger Nano X or Nano S Plus devices.'
    },
    {
      icon: Coins,
      title: 'Multi-Currency Support',
      description: 'Manage Bitcoin, Ethereum, and 5,500+ other cryptocurrencies in one place.'
    },
    {
      icon: Lock,
      title: 'Complete Control',
      description: 'You own your keys, you own your crypto. Full custody and control over your digital assets.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8">
            {/* Logo and Title */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Ledger Live</h1>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-gradient leading-tight">
                  Welcome to the future of crypto security
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Ledger Live is your gateway to securely buy, exchange, grow and manage over 5,500 coins and tokens.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleGetStarted}
                className="w-full py-4 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 btn-glow"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              
              <Button 
                onClick={handleImportExisting}
                variant="outline"
                className="w-full py-4 text-lg border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Import Existing Account
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Trusted by 5M+ users worldwide</span>
                <span>•</span>
                <span>Industry-leading security</span>
                <span>•</span>
                <span>Open source</span>
              </div>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-8">Why choose Ledger Live?</h3>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 card-hover"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Security Badge */}
            <div className="mt-8 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 font-medium">Bank-grade security</p>
                  <p className="text-green-300 text-sm">Your crypto is protected by industry-leading hardware security</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Hint */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            New to crypto? Don't worry, we'll guide you through every step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

