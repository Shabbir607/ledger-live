import React from "react";
import { X, ArrowRight } from "lucide-react";

const RecoveryPhrasePopup = ({ open, onClose, onStart }) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Right Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-[#141414] text-white z-50 transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content - scrollable */}
        <div
          className="p-8 space-y-8 mt-12 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {/* Heading */}
          <h2 className="text-2xl font-bold tracking-widest leading-tight font-mono whitespace-pre-line">
            {`HOW DOES A\nRECOVERY PHRASE\nWORK?`}
          </h2>

          {/* Description */}
          <div className="text-sm leading-relaxed text-gray-300 space-y-4">
            <p>
              Your recovery phrase works like a unique master key. Your Ledger
              device uses it to calculate private keys for every crypto asset
              you own.
            </p>
            <p>
              To restore access to your crypto, any wallet can calculate the
              same private keys from your recovery phrase.
            </p>
            <p className="text-white font-medium cursor-pointer underline">
              More about the recovery phrase
            </p>
          </div>

          {/* Description 2 */}
          <div className="text-sm leading-relaxed text-gray-300 space-y-4">
            <h2 className="text-2xl font-bold tracking-widest leading-tight font-mono whitespace-pre-line">
              WHAT HAPPENS IF I LOSE ACCESS TO MY NANO?
            </h2>
            <p>Don't worry and follow these steps:</p>
            <p>
              To restore access to your crypto, any wallet can calculate the
              same private keys from your recovery phrase.
            </p>
            <p>Get a new hardware wallet.</p>
            <p>
              Select "Restore recovery phrase on a new device" in the Ledger app
            </p>
            <p>
              Enter your recovery phrase on your new device to restore access to
              your crypto.
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-6 w-full px-6">
          <button
            onClick={onStart}
            className="w-full bg-white text-black font-medium py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoveryPhrasePopup;
