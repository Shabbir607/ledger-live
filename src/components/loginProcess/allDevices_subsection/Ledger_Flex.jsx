import { assets } from "@/assets/assets";
import { ArrowLeft, ChevronDown } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Ledger_Flex = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6">
        {/* Left - Back Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            className="text-white flex items-center hover:bg-gray-800 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => navigate("/all-devices")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm sm:text-base">Previous</span>
          </Button>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center sm:justify-center">
          <div className="px-4 py-2 text-base sm:text-lg font-bold tracking-wider text-center">
            [ LEDGER ]
          </div>
        </div>

        {/* Right - Language Selector */}
        <div className="flex items-center gap-2">
          <Button className="text-white flex items-center hover:bg-gray-800 bg-transparent border-none cursor-pointer">
            <span className="text-sm sm:text-base">English</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center my-12">
        <img src={assets.vid1} alt="" className="h-[200px] w-[300px] " />
        <h1 className="text-2xl font-semibold mt-4">
          Connect Ledger Flex to your <br /> computer with the USB cable
        </h1>
        <p
          className="text-[gray] text-sm cursor-pointer hover:underline mt-14 "
          onClick={() => navigate("/login")}
        >
          Having trouble connecting your ledger?
        </p>
      </div>
    </div>
  );
};

export default Ledger_Flex;
