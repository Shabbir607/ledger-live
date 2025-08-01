import React from "react";
import { X, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PinCodeRightPanel = ({ open, onClose, onStart }) => {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 h-screen w-[400px] bg-[#131214] text-white shadow-2xl z-50 flex flex-col p-6">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 mt-10">
        SECURE YOUR PIN CODE
      </h2>

      <p className="text-sm text-gray-300 mb-6">
        During the setup process you choose a PIN code.
      </p>

      {/* Checklist */}
      <ul className="space-y-4 text-sm">
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
          Always choose a PIN code yourself.
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
          Always enter your PIN code out of sight.
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
          You can change your PIN code if needed.
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
          Three wrong PIN code entries in a row will reset the device.
        </li>
        <li className="flex items-start gap-3">
          <XCircle className="text-red-500 w-5 h-5 mt-1" />
          Never use an easy PIN code like 0000, 123456, or 555555.
        </li>
      </ul>

      {/* CTA Button */}
      <Button
        onClick={onStart}
        className="mt-auto bg-white text-black hover:bg-gray-200 rounded-full w-full py-4 font-semibold text-lg flex items-center justify-center gap-2"
      >
        Get started
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default PinCodeRightPanel;
