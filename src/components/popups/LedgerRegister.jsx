import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const LedgerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const base_url = "https://ledger.arqehayat.com/api";

  const handleRegister = async () => {
    // Validation
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      message.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${base_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: "user", // Always send role as "user"
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data in localStorage
        localStorage.setItem("authToken", data.data.token);
        localStorage.setItem("userData", JSON.stringify(data.data.user));

        message.success("Registration successful!");

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        message.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen fixed top-0 left-0 h-[100%] w-[100%] bg-[#131214] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start p-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">LEDGER</span>
            <span className="text-xs bg-gray-700 px-1 rounded">RECOVER</span>
          </div>
          <span className="text-xs text-gray-400 mt-1">
            provided by coincover
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-300 hover:text-white underline">
            Need help?
          </button>
          <button
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-medium">Create your account</h1>
            <p className="text-gray-400 text-base">
              Register to get access to your wallet and manage your
              subscription.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0"
                />
              </div>

              {/* Email Field */}
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onPressEnter={handleRegister}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-400 text-sm">
                Already have an account?{" "}
              </span>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm"
                onClick={() => navigate("/login")}
              >
                Login here
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-6">
        <Button
          variant="ghost"
          className="text-white hover:bg-gray-800 flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-lg"
          // disabled={!name || !email || !password || !confirmPassword || loading}
          loading={loading}
          onClick={handleRegister}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LedgerRegister;
