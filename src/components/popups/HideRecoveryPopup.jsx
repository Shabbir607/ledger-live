import React, { useState } from "react";
import { X, ArrowRight, AlertTriangle, Trophy } from "lucide-react";
import { assets } from "@/assets/assets";

const RecoveryPhraseModal = ({ open, onClose, setMainStep }) => {
  const [popup, setPopup] = useState(false);
  const [task, setTask] = useState(0);

  // Track selections per task
  const [answers, setAnswers] = useState({
    task1: "",
    task2: "",
    task3: "",
  });

  const handleAnswer = (taskKey, value) => {
    setAnswers((prev) => ({ ...prev, [taskKey]: value }));
  };

  const handleNext = () => setTask((prev) => prev + 1);

  if (!open && !popup) return null;

  return (
    <>
      {/* Recovery Phrase Info Panel */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
          <div className="fixed top-0 right-0 h-full w-[420px] bg-[#131214] text-white z-50 shadow-lg overflow-y-auto">
            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-8">
                <h1 className="text-2xl font-bold tracking-wide">
                  WHERE SHOULD I <br /> KEEP MY <br /> RECOVERY <br /> PHRASE?
                </h1>

                <div className="space-y-6">
                  {[
                    {
                      icon: <X className="w-3 h-3 text-white" />,
                      color: "bg-red-500",
                      text: (
                        <>
                          <strong>NEVER</strong> enter it on a device or take a
                          picture.
                        </>
                      ),
                    },
                    {
                      icon: <X className="w-3 h-3 text-white" />,
                      color: "bg-red-500",
                      text: (
                        <>
                          <strong>NEVER</strong> share your 24 words with
                          anyone.
                        </>
                      ),
                    },
                    {
                      icon: (
                        <div className="w-2 h-3 border-r-2 border-b-2 border-white rotate-45 -translate-y-0.5" />
                      ),
                      color: "bg-green-500",
                      text: (
                        <>
                          <strong>ALWAYS</strong> store it in a secure place.
                        </>
                      ),
                    },
                    {
                      icon: (
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                      ),
                      color: "bg-transparent",
                      text: (
                        <>Ledger will never ask for your recovery phrase.</>
                      ),
                    },
                  ].map(({ icon, color, text }, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div
                        className={`w-5 h-5 flex items-center justify-center ${color} rounded-full`}
                      >
                        {icon}
                      </div>
                      <p className="text-gray-200 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3 rounded-full flex items-center justify-center"
                  onClick={() => {
                    onClose();
                    setPopup(true);
                  }}
                >
                  Get started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quiz Panel */}
      {popup && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div
            className={`relative w-full max-w-3xl rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
              task === 0 ? "bg-[#bbb0ff]" : "bg-[#131315]"
            }`}
          >
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 z-30 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              {task === 0 && (
                <div className="px-8 py-12">
                  <div className="mx-auto mb-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <Trophy className="w-8 h-8 text-gray-800" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                    NOW GAME ON!
                  </h2>
                  <p className="text-gray-700 mb-8 max-w-sm mx-auto">
                    Answer 3 simple questions to avoid common misconceptions
                    about your hardware wallet.
                  </p>
                  <button
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium flex items-center"
                    onClick={handleNext}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Let's take the quiz
                  </button>
                </div>
              )}

              {task > 0 &&
                task <= 3 &&
                (() => {
                  const questions = [
                    {
                      id: 1,
                      label: "AS A LEDGER USER, MY CRYPTO IS STORED:",
                      options: [
                        { value: "ledger", label: "On my Ledger Nano" },
                        { value: "blockchain", label: "On the blockchain" },
                      ],
                      key: "task1",
                    },
                    {
                      id: 2,
                      label:
                        "IF SOMEONE ELSE GET ACCESS TO MY SECRET RECOVERY PHRASE...",
                      options: [
                        {
                          value: "problem",
                          label: "No problem, I still know it",
                        },
                        {
                          value: "assets",
                          label:
                            "My assets become vulnerable and that person could have access to them",
                        },
                      ],
                      key: "task2",
                    },
                    {
                      id: 3,
                      label:
                        "WHEN I CONNECT MY LEDGER NANO TO THE LEDGER LIVE APP, MY PRIVATE KEY IS...",
                      options: [
                        { value: "offline", label: "Still offline" },
                        {
                          value: "connected",
                          label: "Briefly connected to the Internet",
                        },
                      ],
                      key: "task3",
                    },
                  ];

                  const current = questions[task - 1];
                  return (
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-[#131315] w-full md:w-1/2 text-left px-6 py-8 space-y-4 text-white">
                        <p className="text-sm text-gray-400">
                          Quiz {current.id}/3
                        </p>
                        <h1 className="text-xl font-semibold">
                          {current.label}
                        </h1>

                        <div className="flex flex-col gap-4 mt-4 px-2">
                          {current.options.map((opt) => (
                            <label
                              key={opt.value}
                              className="flex items-center gap-3 border border-gray-700 rounded-lg py-4 px-6 hover:bg-gray-800 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={answers[current.key] === opt.value}
                                onChange={() =>
                                  handleAnswer(current.key, opt.value)
                                }
                                className="form-checkbox w-5 h-5 text-purple-500 accent-purple-600"
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>

                        {answers[current.key] && (
                          <button
                            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium flex items-center mt-12"
                            onClick={
                              task === 3
                                ? () => {
                                    setPopup(false);
                                    setMainStep?.(); // safe call
                                  }
                                : handleNext
                            }
                          >
                            {task === 3 ? "Finish Quiz" : "Next question"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        )}
                      </div>

                      <div className="bg-[#bbb0ff] w-full md:w-1/2 flex items-center justify-center">
                        <img
                          src={assets.img15}
                          alt="Quiz Visual"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecoveryPhraseModal;
