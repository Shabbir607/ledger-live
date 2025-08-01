import React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { assets } from "./../../assets/assets";
import { useNavigate } from "react-router-dom";

// Simple Button component
const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

// Device data
const devices = [
  { name: "Ledger Stax", image: assets.img1, link: "/all-devices/ledger-stax" },
  { name: "Ledger Flex", image: assets.img2, link: "/all-devices/ledger-flex" },
  {
    name: "Ledger Nano S",
    image: assets.img3,
    link: "/all-devices/ledger-nano-s",
  },
  {
    name: "Ledger Nano S Plus",
    image: assets.img4,
    link: "/all-devices/ledger-nano-s-plus",
  },
  {
    name: "Ledger Nano X",
    image: assets.img5,
    link: "/all-devices/ledger-nano-x",
  },
];

export default function AllDevices() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Button
            className="text-white flex items-center hover:bg-gray-800 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <div className="border-2 border-white px-4 py-2 text-lg font-bold tracking-wider">
            LEDGER
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="text-white flex items-center hover:bg-gray-800 bg-transparent border-none cursor-pointer">
            English
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 tracking-wide">
          WHAT'S YOUR LEDGER?
        </h1>

        {/* Device Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl w-full">
          {devices.map((device, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer hover:bg-[#191919] p-4 rounded"
            >
              <div className="mb-6 transition-transform group-hover:scale-105">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-[200px] h-[250px] object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                {device.name}
              </h3>
              <div className="group-hover:block hidden">
                <Button
                  className="bg-white text-black hover:bg-gray-200 px-8 py-2 rounded-full font-medium cursor-pointer"
                  onClick={() => navigate(device.link)}
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
