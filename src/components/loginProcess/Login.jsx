import React, { useState } from "react";
import { ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-12 max-w-full lg:max-w-lg">
        {/* Header */}
        <div className="text-white font-mono text-lg tracking-wider mb-2">
          [LEDGER-LIVE]
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center ">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug mb-4">
              THE MOST SECURE
              <br />
              CRYPTOCURRENCY
              <br />& NFT WALLET
            </h1>
            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Securely manage, buy and grow your crypto
              <br />
              and NFTs on Ledger Live.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Button
              className="w-full bg-white text-black hover:bg-gray-100 rounded-full py-3 text-md font-medium cursor-pointer"
              onClick={() => setOpenPopup(true)}
            >
              Get started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-800 rounded-full py-3 text-md font-medium cursor-pointer"
              onClick={() => setOpenPopup(true)}
            >
              No device? Buy a Ledger
            </Button>
          </div>

          <div
            className="text-center text-white text-sm py-3 hover:border cursor-pointer mt-2 rounded-full"
            onClick={() => setOpenPopup(true)}
          >
            Sync with another Ledger Live app
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-center text-white mt-6 leading-relaxed">
          By tapping "Get Started" you consent and agree to our
          <br />
          <a href="#" className="text-blue-400 underline hover:text-blue-300">
            Terms and conditions
          </a>{" "}
          and
          <br />
          <a href="#" className="text-blue-400 underline hover:text-blue-300">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative overflow-hidden min-h-[50vh] lg:min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center h-full w-full">
          <div className="relative h-full w-full">
            <div className="w-full h-full bg-black/20 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <video
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="vid.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      {openPopup && (
        <div className="absolute right-0 top-0 h-full max-h-screen p-4 flex items-start justify-end">
          <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[96vh] overflow-y-auto relative">
            <button
              onClick={() => setOpenPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Help us improve and personalize your experience
              </h2>
              <p className="text-gray-300">
                Sharing your Ledger Live data helps us understand your
                preferences and show content that's relevant to you.
              </p>
              <p className="text-gray-300">
                With your consent, Ledger will collect data on how you use
                Ledger Live:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-300">
                    To measure the performance of Ledger Live and improve your
                    experience (Analytics).
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-300">
                    To provide personalized recommendations and measure our
                    campaigns (Personalization).
                  </p>
                </div>
              </div>

              <div>
                <p className="text-white font-medium mb-3">
                  Ledger will never collect:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-300">Your assets.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-300">Your portfolio.</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Manage your preferences
                </button>
                <div className="flex gap-3 ml-auto">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/all-devices")}
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent px-6"
                  >
                    Refuse all
                  </Button>
                  <Button
                    onClick={() => navigate("/all-devices")}
                    className="bg-white text-black hover:bg-gray-100 px-6"
                  >
                    Accept all
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
