import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Fingerprint,
  Key,
  Lock,
  AlertCircle,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("password");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setAuthError("");

    // Simulate authentication
    setTimeout(() => {
      if (loginMethod === "password" && password.length < 6) {
        setAuthError("Password must be at least 6 characters");
        setIsAuthenticating(false);
        return;
      }

      // Successful login - now just navigate
      navigate("/dashboard");
    }, 2000);
  };

  const handleBiometricLogin = () => {
    setIsAuthenticating(true);
    setAuthError("");

    // Simulate biometric authentication
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleForgotPassword = () => {
    // In a real app, this would trigger password recovery
    alert("Password recovery would be initiated here");
  };

  const handleBackToOnboarding = () => {
    navigate("/onboarding/welcome");
  };

  const loginMethods = [
    {
      id: "password",
      name: "Password",
      icon: Lock,
      description: "Sign in with your password",
    },
    {
      id: "biometric",
      name: "Biometric",
      icon: Fingerprint,
      description: "Use fingerprint or face recognition",
    },
    {
      id: "hardware",
      name: "Hardware Key",
      icon: Key,
      description: "Authenticate with your Ledger device",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Ledger Live</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400">
            Sign in to access your crypto portfolio
          </p>
        </div>

        {/* Login Methods */}
        <div className="space-y-3 mb-6">
          {loginMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setLoginMethod(method.id)}
                className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                  loginMethod === method.id
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-5 h-5 ${
                      loginMethod === method.id
                        ? "text-cyan-400"
                        : "text-gray-400"
                    }`}
                  />
                  <div>
                    <span
                      className={`font-medium block ${
                        loginMethod === method.id
                          ? "text-cyan-400"
                          : "text-white"
                      }`}
                    >
                      {method.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {method.description}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {loginMethod === "password" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>

                <button
                  onClick={handleForgotPassword}
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}

          {loginMethod === "biometric" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <Fingerprint className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Biometric Authentication
              </h3>
              <p className="text-gray-400 mb-6">
                Use your fingerprint or face recognition to sign in
              </p>
            </div>
          )}

          {loginMethod === "hardware" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                <Smartphone className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Hardware Authentication
              </h3>
              <p className="text-gray-400 mb-6">
                Connect and unlock your Ledger device to authenticate
              </p>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">
                    Ledger Nano X detected
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm">{authError}</span>
              </div>
            </div>
          )}

          {/* Login Button */}
          <Button
            onClick={
              loginMethod === "biometric" ? handleBiometricLogin : handleLogin
            }
            disabled={
              isAuthenticating || (loginMethod === "password" && !password)
            }
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700"
          >
            {isAuthenticating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          {/* Alternative Actions */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>•</span>
              <button
                onClick={handleBackToOnboarding}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Back to setup
              </button>
              <span>•</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-yellow-400 text-sm font-medium">
                  Security Notice
                </p>
                <p className="text-yellow-300 text-xs mt-1">
                  Your login credentials are encrypted and stored locally for
                  maximum security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
