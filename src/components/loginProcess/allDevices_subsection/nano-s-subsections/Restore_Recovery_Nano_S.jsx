import { assets } from "@/assets/assets";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import PinCodeRightPanel from "@/components/popups/PinCodeRightPanel";
import RecoveryPhrasePopup from "@/components/popups/RecoveryPhrasePopup";

const Restore_Recovery_Nano_S = () => {
  const [mainStep, setMainStep] = useState(1);
  const [switchOn, setSwitchOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (mainStep === 4) {
      setOpen(true);
    } else if (mainStep === 7) {
      setShowPopup(true);
    } else if (mainStep === 9) {
      navigate("/dashboard");
    } else {
      setMainStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (mainStep === 1) {
      navigate("/all-devices/ledger-nano-s");
    } else {
      setMainStep((prev) => prev - 1);
    }
  };

  return (
    <div className="h-screen bg-[#131214] flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-[#bbb0ff] p-6 flex flex-col justify-between">
        {/* Logo */}
        <div>
          <div className="border-2 border-black px-3 py-1 inline-block">
            <span className="font-mono text-black font-bold text-lg">
              LEDGER-LIVE
            </span>
          </div>
        </div>

        {/* Device Illustration */}
        <div className="flex-1 flex items-center justify-center">
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

        {/* Help Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-black">Need help?</span>
            <HelpCircle className="w-5 h-5 text-black" />
          </div>
          <p className="text-sm text-black leading-relaxed">
            Don't know what you have to do? Get some help to close this step.
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
                  RESTORE FROM RECOVERY PHRASE
                </h1>
              </div>

              <p className="text-sm ">
                Restore your Nano from your recovery phrase to restore, replace
                or back up your Ledger hardware wallet.
              </p>

              <p className="mt-4 text-sm">
                Your Nano will restore your private keys and you will be able to
                access and manage your crypto.
              </p>
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
                      Connect your device to your computer with the USB cable.
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
                      Select "Enter your recovery phrase"
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
                      Come back here to follow instructions on your PIN code.
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
                secures access to your private key and your Nano. Your PIN code
                must be 4 to 8 digits long.
              </p>

              <div className="flex items-center gap-6 border border-[gray] p-2 mt-12 rounded">
                <Switch
                  checked={switchOn}
                  onChange={(checked) => setSwitchOn(checked)}
                />
                <p>
                  I understand that I must choose my PIN code myself and keep it
                  private.
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
                    <span className="text-md text-white">Choose PIN code</span>
                    <p className="text-xs">
                      Press the left or right button to change digits. Press
                      both buttons to validate a digit. Select to confirm your
                      PIN code. Select to erase a digit.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                    2
                  </div>
                  <div className="">
                    <span className="text-md text-white">Confirm PIN code</span>
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
                  <span className="font-semibold text-xs">RECOVERY PHRASE</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mb-16">
                <h1 className="text-3xl font-semibold text-white tracking-wide">
                  ENTER YOUR RECOVERY PHRASE
                </h1>
              </div>

              <p className=" ">
                Your recovery phrase is the secret list of words that you backed
                up when you first set up your wallet. <br /> Ledger does not
                keep a copy of your recovery phrase.
              </p>

              <div className="flex items-center gap-6 border border-[gray] p-2 mt-12 rounded">
                <Switch
                  checked={switchOn}
                  onChange={(checked) => setSwitchOn(checked)}
                />
                <p>
                  I understand that if I lose my recovery phrase, I will not be
                  able to access my crypto in case I lose access to my Nano.
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
                  <span className="font-semibold text-xs">RECOVERY PHRASE</span>
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
                      Grab your recovery phrase
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                    2
                  </div>
                  <div className="">
                    <span className="text-md text-white">
                      Select recovery phrase length
                    </span>
                    <p className="text-xs">
                      Your recovery phrase can have 12, 18 and 24 words. you
                      must enter all words to access your crypto.
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
                  <span className="font-semibold text-xs">RECOVERY PHRASE</span>
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
                    <span className="text-md text-white">Enter Word #1...</span>
                    <p className="text-xs mt-1">
                      Enter the first letters of Word #1 by selecting them with
                      the right or left button. Press both buttons to validate
                      each letter.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                    4
                  </div>
                  <div className="">
                    <span className="text-md text-white">
                      Validate Word #1...
                    </span>
                    <p className="text-xs mt-1">
                      Choose Word #1 from the suggestions. Press both buttons to
                      validate.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center">
                    5
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
                  <span className="font-semibold text-xs">CONNECT NANO</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mb-16">
                <h1 className="text-3xl font-semibold text-white tracking-wide">
                  GENUINE CHECK
                </h1>
                <p className="mt-8 text-sm text-[gray] ">
                  We'll verify weather you Nano is genuine. This should be quick
                  and easy!
                </p>
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
                  <span className="font-semibold text-xs">CONNECT NANO</span>
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
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              className={`px-8 py-3 rounded-full bg-white text-black font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#f1f1f1f1] disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleNext}
              disabled={(mainStep === 3 || mainStep === 5) && !switchOn}
            >
              {mainStep === 1
                ? "OK I'm ready"
                : mainStep === 3
                ? "Set up PIN code"
                : mainStep === 8
                ? "Check my Nano"
                : mainStep === 9
                ? "Continue"
                : "Next step"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
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
    </div>
  );
};

export default Restore_Recovery_Nano_S;
