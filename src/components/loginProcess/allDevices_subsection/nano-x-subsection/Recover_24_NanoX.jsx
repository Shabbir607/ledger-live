import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/assets";
import {
  Clock,
  Edit3,
  Coffee,
  ArrowLeft,
  ArrowRight,
  X,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import PinCodeRightPanel from "@/components/popups/PinCodeRightPanel";
import RecoveryPhrasePopup from "@/components/popups/RecoveryPhrasePopup";
import { IoEyeOff } from "react-icons/io5";
import { FaStapler } from "react-icons/fa6";
import RecoveryPhraseModal from "@/components/popups/HideRecoveryPopup";
import LedgerRecover from "@/components/popups/LedgerRecover";

const Recover_24_Nano_X = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mainStep, setMainStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [openRecoveryPopup, setOpenRecoveryPopup] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    if (mainStep === 3) {
      setOpen(true);
    } else if (mainStep === 7) {
      setShowPopup(true);
    } else if (mainStep === 8) {
      setOpenRecoveryPopup(true);
    } else {
      setMainStep((prev) => prev + 1);
    }
  };

  const handleClickBack = () => {
    if (mainStep === 1) {
      navigate("/all-devices/ledger-nano-s-plus");
    } else {
      setMainStep((prev) => prev - 1);
    }
  };

  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      setIsOpen(false);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const getStepImage = () => {
    switch (step) {
      case 1:
        return assets.img91;
      case 2:
        return assets.img10;
      case 3:
        return assets.img11;
      case 4:
        return assets.img12;
      case 5:
        return assets.img13;
      default:
        return assets.img91;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="h-screen bg-[#131214] flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-[#bbb0ff] p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-4">
              <div className="border-2 border-black px-3 py-1 inline-block">
                <span className="font-mono text-black font-bold text-lg">
                  LEDGER-LIVE
                </span>
              </div>
            </div>

            {/* Device Illustration */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <img
                  src={
                    mainStep === 1
                      ? assets.img19
                      : mainStep === 2 || mainStep === 4
                      ? assets.img20
                      : mainStep === 3
                      ? assets.img21
                      : mainStep === 5 || mainStep === 6 || mainStep === 7
                      ? assets.img22
                      : mainStep === 8
                      ? assets.img17
                      : mainStep === 9
                      ? assets.img18
                      : assets.img18
                  }
                  alt="Ledger device illustration"
                  width={200}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Help Section */}
            <div className="">
              <div className="flex items-center gap-2 ">
                <span className="font-semibold text-black">Need help?</span>
                <HelpCircle className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black leading-relaxed">
                Don't know what you have to do? Get some help to close this
                step.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col items-center  w-full">
            <div className="flex-1 bg-[#131214] w-full max-w-[60%] text-white p-6 flex flex-col">
              {mainStep === 1 && (
                <>
                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      SELECT 'RESTORE USING LEDGER RECOVER'
                    </h1>
                  </div>

                  {/* Instructions List */}
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        1
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Select 'Restore'
                        </span>
                        <p className="text-xs">
                          Press both buttons simultaneously to select.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        2
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Select 'Restore using Ledger Recover'
                        </span>
                        <p className="text-xs">
                          Press both buttons simultaneously to select.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mainStep === 2 && (
                <>
                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      PIN CODE
                    </h1>
                  </div>

                  <p className=" ">
                    Your PIN code is the first layer of security. It physically
                    secures access to your private key and your Nano. Your PIN
                    code must be 4 to 8 digits long.
                  </p>

                  <div className="flex items-center gap-6 border border-[gray] p-2 mt-12 rounded">
                    <Switch
                      checked={switchOn}
                      onChange={(checked) => setSwitchOn(checked)}
                    />
                    <p>
                      I understand that I must choose my PIN code myself and
                      keep it private.
                    </p>
                  </div>
                </>
              )}

              {mainStep === 3 && (
                <>
                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      PIN CODE
                    </h1>
                  </div>

                  {/* Instructions List */}
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        1
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Choose PIN code
                        </span>
                        <p className="text-xs">
                          Press the left or right button to change digits. Press
                          both buttons to validate a digit. Select to confirm
                          your PIN code. Select to erase a digit.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        2
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Confirm PIN code
                        </span>
                        <p className="text-xs">
                          Enter your PIN code again to confirm it.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mainStep === 4 && <LedgerRecover />}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-auto">
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-600 text-white hover:bg-gray-800 px-8 py-3 rounded-full cursor-pointer"
                  onClick={handleClickBack}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  className={`px-8 py-3 rounded-full font-semibold flex items-center gap-2 cursor-pointer
                    ${
                      mainStep === 3
                        ? switchOn
                          ? "bg-white text-black hover:bg-gray-100"
                          : "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-100"
                    }
                `}
                  onClick={handleOk}
                  disabled={
                    ((mainStep === 2 || mainStep === 5) && !switchOn) ||
                    mainStep === 11
                  }
                >
                  {mainStep === 1 || mainStep === 8
                    ? "OK, I'm ready!"
                    : mainStep === 2
                    ? "Set up PIN code"
                    : mainStep === 5
                    ? "Recovery phrase"
                    : mainStep === 10
                    ? "Check my Nano"
                    : mainStep === 11
                    ? "Continue"
                    : "Next Step"}

                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PinCodeRightPanel
        open={open}
        onClose={() => setOpen(false)}
        onStart={() => {
          setOpen(false);
          setMainStep(4);
        }}
      />

      <RecoveryPhrasePopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onStart={() => {
          setShowPopup(false);
          setMainStep(8);
        }}
      />

      <RecoveryPhraseModal
        open={openRecoveryPopup}
        onClose={() => {
          setOpenRecoveryPopup(false);
          setMainStep(9);
        }}
      />
    </div>
  );
};

export default Recover_24_Nano_X;
