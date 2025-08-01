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

const First_Time_Nano_S = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mainStep, setMainStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [openRecoveryPopup, setOpenRecoveryPopup] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    if (mainStep === 4) {
      setOpen(true);
    } else if (mainStep === 7) {
      setShowPopup(true);
    } else if (mainStep === 8) {
      setOpenRecoveryPopup(true);
    } else if (mainStep === 11) {
      navigate("/dashboard");
    } else {
      setMainStep((prev) => prev + 1);
    }
  };

  const handleClickBack = () => {
    if (mainStep === 1) {
      navigate("/all-devices/ledger-nano-s");
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
                  src={assets.img14}
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
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <span className="font-semibold text-xs">GET STARTED</span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      THE BEST WAY TO GET YOU STARTED:
                    </h1>
                  </div>

                  {/* Instructions List */}
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-md text-white">
                        Plan 30 minutes and take your time.
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        <Edit3 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-md text-white">
                        Grab a pen to write with.
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        <Coffee className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-md text-white">
                        Stay alone, and choose a safe and quiet environment.
                      </span>
                    </div>
                  </div>
                </>
              )}

              {mainStep === 2 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <span className="font-semibold text-xs">GET STARTED</span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      THE BEST WAY TO GET YOU STARTED:
                    </h1>
                  </div>

                  {/* Instructions List */}
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        1
                      </div>
                      <div className="">
                        <span className="text-md text-white">Turn on Nano</span>
                        <p className="text-xs">
                          Connect your device to your computer with the USB
                          cable.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        2
                      </div>
                      <div className="">
                        <span className="text-md text-white">Browse</span>
                        <p className="text-xs">
                          Learn how to interact with your device by reading the
                          on-screen instructions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        3
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Select "Set up as new device"
                        </span>
                        <p className="text-xs">
                          Press both buttons simultaneously to validate the
                          selection.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        4
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Follow instructions
                        </span>
                        <p className="text-xs">
                          Come back here to follow instructions on your PIN
                          code.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mainStep === 3 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <span className="font-semibold text-xs">PIN CODE</span>
                    </div>
                  </div>

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

              {mainStep === 4 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <span className="font-semibold text-xs">PIN CODE</span>
                    </div>
                  </div>

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

              {mainStep === 5 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <span className="font-semibold text-xs">
                        RECOVERY PHRASE
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      YOUR SECRET RECOVERY PHRASE
                    </h1>
                  </div>

                  <p className=" ">
                    Your Secret Recovery Phrase is a list of 24 words that backs
                    up your private keys. Your Ledger Nano generates a unique
                    Secret Recovery Phrase. Ledger does not know what it is.
                  </p>

                  <div className="flex items-center gap-6 border border-[gray] p-2 mt-12 rounded">
                    <Switch
                      checked={switchOn}
                      onChange={(checked) => setSwitchOn(checked)}
                    />
                    <p>
                      I understand that if someone gets my Secret Recovery
                      Phrase, my assets become vulnerable.
                    </p>
                  </div>
                </>
              )}

              {mainStep === 6 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <span className="font-semibold text-xs">
                        RECOVERY PHRASE
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      RECOVERY PHRASE
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
                          Take your recovery sheet
                        </span>
                        <p className="text-xs">
                          Grab a blank Recovery sheet, included with your Nano.
                          Please reach out to Ledger Support if the Recovery
                          Sheet did not come blank.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        2
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Write down 24 words
                        </span>
                        <p className="text-xs">
                          Enter your PIN code again to confirm it.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mainStep === 7 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <span className="font-semibold text-xs">
                        RECOVERY PHRASE
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      RECOVERY PHRASE
                    </h1>
                  </div>

                  {/* Instructions List */}
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        3
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Confirm your recovery phrase
                        </span>
                        <p className="text-xs">
                          Scroll through the words until you find Word #1 by
                          pressing the right button. Validate by pressing both
                          buttons.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        4
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Repeat for all words!
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mainStep === 8 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <span className="font-semibold text-xs">
                        HIDE RECOVERY PHRASE
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      HIDE YOUR RECOVERY PHRASE
                    </h1>
                    <p>
                      Your recovery phrase is your last chance to access your
                      crypto if you cannot use your Nano. You must keep it in a
                      safe place.
                    </p>
                  </div>

                  {/* Instructions List */}
                  <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        <FaStapler />
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Enter these words on a hardware wallet only, not on
                          computers or smartphones.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                        <IoEyeOff />
                      </div>
                      <div className="">
                        <span className="text-md text-white">
                          Never share your 24 words with anyone, not even with
                          Ledger.
                        </span>
                      </div>
                    </div>

                    <button
                      className="cursor-pointer hover:border border-[#bbb0ff] hover:decoration-underline transtition-all p-2 rounded-full px-4 "
                      onClick={() => setOpenRecoveryPopup(true)}
                    >
                      Learn how to hide it
                    </button>
                  </div>
                </>
              )}

              {mainStep === 9 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <span className="font-semibold text-xs">
                        HIDE RECOVERY PHRASE
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      YOU WILL SOON BECOME A PRO
                    </h1>
                    <p className="mt-8 text-sm text-[gray] ">
                      Don't worry, Ledger is here to guide you through your
                      journey. You will soon extra comfortable about your crypto
                      safety. Only one quick step left!
                    </p>
                  </div>
                </>
              )}

              {mainStep === 10 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        5
                      </div>
                      <span className="font-semibold text-xs">
                        CONNECT NANO
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <h1 className="text-3xl font-semibold text-white tracking-wide">
                      GENUINE CHECK
                    </h1>
                    <p className="mt-8 text-sm text-[gray] ">
                      We'll verify weather you Nano is genuine. This should be
                      quick and easy!
                    </p>
                  </div>
                </>
              )}

              {mainStep === 11 && (
                <>
                  {/* Get Started Badge */}
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md">
                      <div className="w-3 h-3 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                        5
                      </div>
                      <span className="font-semibold text-xs">
                        CONNECT NANO
                      </span>
                    </div>
                  </div>

                  {/* Main Heading */}
                  <div className="mb-16">
                    <img src={assets.img16} alt="" />
                    <div className="flex items-center justify-center">
                      <p className="text-center bg-[#4c4c4c] px-3 py-3 w-[max-content] flex items-center justify-center gap-6 rounded ">
                        Having trouble connecting your device?{" "}
                        <button
                          className="cursor-pointer text-[gray] font-bold hover:bg-[#f1f1f1f1] p-2 rounded "
                          onClick={() => navigate("/login")}
                        >
                          Fix it
                        </button>
                      </p>
                    </div>
                  </div>
                </>
              )}

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
                    (mainStep === 3 || mainStep === 5 || mainStep === 11) &&
                    !switchOn
                  }
                >
                  {mainStep === 1 || mainStep === 8
                    ? "OK, I'm ready!"
                    : mainStep === 3
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

      <div className="flex items-center justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full min-w-[800px] p-0 border-none shadow-2xl">
            <div className="flex rounded-2xl overflow-hidden bg-gray-800 max-h-[500px] w-full">
              {/* Left Side */}
              <div className="flex-1 p-8 flex flex-col justify-between bg-[#131214] text-white relative">
                <div className="text-sm text-gray-400 mb-8">
                  Basics • {step}/5
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {step === 1 && (
                    <>
                      <h1 className="text-3xl font-semibold mb-2 leading-tight">
                        ACCESS YOUR CRYPTO
                      </h1>
                      <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-32 max-w-md">
                        Your crypto assets are stored on the blockchain. You
                        need a private key to access and manage them.
                      </p>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h1 className="text-3xl font-semibold mb-2 leading-tight">
                        OWN YOUR PRIVATE KEY
                      </h1>
                      <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-32 max-w-md">
                        Your private key is stored within your Nano. You must be
                        the only one to own it to be in control of your money.
                      </p>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h1 className="text-3xl font-semibold mb-2 leading-tight">
                        STAY OFFLINE
                      </h1>
                      <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-32 max-w-md">
                        Your Nano works as a "cold storage" wallet. This means
                        that it never exposes your private key online, even when
                        using the app.
                      </p>
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <h1 className="text-3xl font-semibold mb-2 leading-tight">
                        VALIDATE TRANSACTIONS
                      </h1>
                      <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-32 max-w-md">
                        Ledger Live allows you to buy, sell, manage, exchange
                        and earn crypto while remaining protected. You will
                        validate every crypto transaction with your Nano.
                      </p>
                    </>
                  )}
                  {step === 5 && (
                    <>
                      <h1 className="text-3xl font-semibold mb-2 leading-tight">
                        LET'S SET UP YOUR NANO !
                      </h1>
                      <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-32 max-w-md">
                        We'll start by setting up your Nano security.
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-white text-black hover:bg-gray-100 rounded-full py-6 text-lg font-medium flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => {
                      if (step === 5) {
                        setIsOpen(false);
                      } else {
                        handleContinue();
                      }
                    }}
                  >
                    {step === 5 ? "Let's do it" : "Continue"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <button
                    className="w-full text-gray-400 hover:text-white transition-colors py-2"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1 bg-[#bbb0ff] relative flex items-center justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-gray-700 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative w-80 h-80 flex items-center justify-center">
                  <img src={getStepImage()} alt="illustration" />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <PinCodeRightPanel
        open={open}
        onClose={() => setOpen(false)}
        onStart={() => {
          setOpen(false);
          setMainStep(5);
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

export default First_Time_Nano_S;
