import { ArrowLeft, ChevronDown, MoveRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Ledger_Nano_S_Plus = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white mb-12">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            className="text-white flex items-center hover:bg-gray-800 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => navigate("/all-devices")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm sm:text-base">Previous</span>
          </Button>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="px-4 py-2 text-base sm:text-lg font-bold tracking-wider text-center">
            [ LEDGER ]
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="text-white flex items-center hover:bg-gray-800 bg-transparent border-none cursor-pointer">
            <span className="text-sm sm:text-base">English</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* First Section */}
      <div className="flex flex-col lg:flex-row justify-around mt-12 px-4 gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            FIRST TIME USING <br /> YOUR NANO S PLUS?
          </h1>
        </div>

        {/* Card 1 */}
        <div
          className="max-w-[320px] w-full  border border-gray-800 rounded overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredCard("card1")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() =>
            navigate("/all-devices/ledger-nano-s-plus/first-time-nano-s-plus")
          }
        >
          <img
            src={assets.img6}
            className="w-[200px] h-auto object-contain mx-auto"
            alt="Nano Setup"
          />
          <div className="p-4 flex flex-col gap-4">
            <h1
              className={`text-lg font-semibold ${
                hoveredCard === "card1" ? "underline" : ""
              }`}
            >
              SETUP A NEW NANO S PLUS
            </h1>
            <p className="font-medium text-sm">
              Let's start and set up your device
            </p>
            <button className="bg-white text-black rounded-full flex items-center justify-center w-10 h-10 text-sm self-end">
              <MoveRight />
            </button>
          </div>
        </div>
      </div>

      <div className="my-12 border-t border-gray-800 mx-4" />

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row justify-around items-start gap-8 px-4 mt-12">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            ALREADY HAVE A <br /> RECOVERY PHRASE?
          </h1>
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-8 items-center">
          {/* Card 2 */}
          <div
            className="max-w-[320px] w-full  border border-gray-800 rounded overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredCard("card2")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() =>
              navigate("/all-devices/ledger-nano-s-plus/connect-nano-s-plus")
            }
          >
            <img
              src={assets.img7}
              className="w-[200px] h-auto object-contain mx-auto"
              alt="Connect Device"
            />
            <div className="p-4 flex flex-col gap-4">
              <h1
                className={`text-lg font-semibold ${
                  hoveredCard === "card2" ? "underline" : ""
                }`}
              >
                CONNECT YOUR NANO S PLUS
              </h1>
              <p className="font-medium text-sm">
                Is your device already set up? Connect it to the app!
              </p>
              <button className="bg-white text-black rounded-full flex items-center justify-center w-10 h-10 text-sm self-end">
                <MoveRight />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="max-w-[320px] w-full  border border-gray-800 rounded overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredCard("card3")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() =>
              navigate(
                "/all-devices/ledger-nano-s-plus/restore-recovery-nano-s-plus"
              )
            }
          >
            <img
              src={assets.img8}
              className="w-[200px] h-auto object-contain mx-auto"
              alt="Restore Device"
            />
            <div className="p-4 flex flex-col gap-4">
              <h1
                className={`text-lg font-semibold ${
                  hoveredCard === "card3" ? "underline" : ""
                }`}
              >
                RESTORE YOUR RECOVERY PHRASE ON A NEW DEVICE
              </h1>
              <p className="font-medium text-sm">
                Use an existing recovery phrase to restore your private keys on
                a new Nano!
              </p>
              <button className="bg-white text-black rounded-full flex items-center justify-center w-10 h-10 text-sm self-end">
                <MoveRight />
              </button>
            </div>
          </div>

          {/* card 4 */}
          <div
            className="max-w-[320px] w-full  border border-gray-800 rounded overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredCard("card3")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() =>
              navigate("/all-devices/ledger-nano-s-plus/restore-24-nano-s-plus")
            }
          >
            <img
              src={assets.img9}
              className="w-[200px] h-auto object-contain mx-auto"
              alt="Restore Device"
            />
            <div className="p-4 flex flex-col gap-4">
              <h1
                className={`text-lg font-semibold ${
                  hoveredCard === "card3" ? "underline" : ""
                }`}
              >
                RESTORE USING LEDGER RECOVER
              </h1>
              <p className="font-medium text-sm">
                You need to have a Ledger Recover subscription.
              </p>
              <button className="bg-white text-black rounded-full flex items-center justify-center w-10 h-10 text-sm self-end">
                <MoveRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger_Nano_S_Plus;
