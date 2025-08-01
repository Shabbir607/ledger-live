import { assets } from "@/assets/assets";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Connect_Nano_X = () => {
  const [mainStep, setMainStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (mainStep === 2) {
      navigate("/dashboard");
    } else {
      setMainStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (mainStep === 1) {
      navigate("/all-devices/ledger-nano-x");
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
            src={mainStep === 1 ? assets.img17 : assets.img18}
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
          {mainStep === 2 && (
            <>
              {/* Main Heading */}
              <div className="mb-16 flex flex-col items-center">
                <img
                  src={assets.img23}
                  alt=""
                  height={"300px"}
                  width={"300px"}
                  className="items-center self-center "
                />
                <div className="flex items-center justify-center mt-6">
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
            >
              {mainStep === 1 ? "Check my Nano" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect_Nano_X;
