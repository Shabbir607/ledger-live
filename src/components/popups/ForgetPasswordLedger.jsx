import React from "react";
import { ArrowLeft, X } from "lucide-react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordLedger() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen fixed top-0 left-0 h-[100%] w-[100%] bg-[#131214] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black text-xs font-bold">L</span>
          </div>
          <span className="text-white font-medium">Ledger Live</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-300 underline">
            Need help?
          </button>
          <button
            className="text-white hover:text-gray-300"
            onClick={() => navigate("/login")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold text-white">
              Reset your password
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter the email you use for your Ledger Recover login to receive a
              password-reset link.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-6 left-6 right-6 flex items-center justify-between">
        <button className="text-white hover:text-gray-300 hover:bg-gray-800 px-4 py-2 rounded flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button className="bg-white text-black hover:bg-gray-200 px-8 py-2 rounded font-semibold">
          Send the link
        </button>
      </div>
    </div>
  );
}
