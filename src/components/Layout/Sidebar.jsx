import React, { useEffect, useState } from "react";
import {
  PieChart,
  Wallet,
  Send,
  Download,
  Settings,
  Package,
  Home,
  Menu,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDarkMode } from "../DarkModeContext";
const Sidebar = ({ activeItem = "portfolio", onItemClick }) => {
  const { darkMode } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing userData:", e);
      }
    }
  }, []);

  // Dynamic navigation items based on user role
  const navigationItems = [
    { id: "portfolio", label: "Portfolio", icon: PieChart },
    { id: "accounts", label: "Accounts", icon: Wallet },
    { id: "send", label: "Send", icon: Send },
    { id: "receive", label: "Receive", icon: Download },
    { id: "manager", label: "Manager", icon: Package },
    ...(userData?.role === "admin"
      ? [
          {
            id: "admin-transactions",
            label: "History",
            icon: History,
          },
        ]
      : []),
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // 🔹 Load selected device from localStorage
  useEffect(() => {
    const storedDevice = localStorage.getItem("selectedDevice");
    if (storedDevice) {
      setSelectedDevice(JSON.parse(storedDevice));
    }
  }, []);

  // 🔹 Listen for changes in localStorage (in case user reselects)
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem("selectedDevice");
      setSelectedDevice(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobile}
          className={cn(
            "p-2 rounded-lg shadow-md transition",
            darkMode
              ? "bg-gray-900/80 hover:bg-gray-800"
              : "bg-white/80 hover:bg-gray-100"
          )}
        >
          <Menu
            className={cn("w-6 h-6", darkMode ? "text-white" : "text-gray-900")}
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 border-r flex flex-col z-40 transition-transform duration-300",
          darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "p-6 border-b flex items-center space-x-3",
            darkMode ? "border-gray-800" : "border-gray-200"
          )}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <h1
            className={cn(
              "text-xl font-bold",
              darkMode ? "text-white" : "text-gray-900"
            )}
          >
            Ledger Live
          </h1>
        </div>

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto p-4 scrollbar-thin",
            darkMode
              ? "scrollbar-thumb-gray-700 scrollbar-track-gray-900"
              : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          )}
        >
          <ul className="space-y-2">
            {navigationItems.map(({ id, label, icon: Icon }) => {
              const isActive = id === activeItem;
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      onItemClick?.(id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group",
                      isActive
                        ? darkMode
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-600 border border-cyan-300"
                        : darkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                    {isActive && (
                      <div
                        className={cn(
                          "ml-auto w-2 h-2 rounded-full animate-pulse",
                          darkMode ? "bg-cyan-400" : "bg-cyan-600"
                        )}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Device Section */}
        <div
          className={cn(
            "p-4 border-t",
            darkMode
              ? "border-gray-800 bg-gray-900/80"
              : "border-gray-200 bg-gray-50"
          )}
        >
          <div
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg",
              darkMode ? "bg-gray-800/50" : "bg-white border border-gray-200"
            )}
          >
            {/* Device Image or Placeholder */}
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden",
                darkMode ? "bg-gray-700" : "bg-gray-200"
              )}
            >
              {selectedDevice ? (
                <img
                  src={selectedDevice.image}
                  alt={selectedDevice.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div
                  className={cn(
                    "text-xs text-center px-1",
                    darkMode ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  No Img
                </div>
              )}
            </div>

            {/* Device Info */}
            <div className="flex-1 overflow-hidden">
              {selectedDevice ? (
                <>
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      darkMode ? "text-white" : "text-gray-900"
                    )}
                  >
                    Device Connected
                  </p>
                  <p
                    className={cn(
                      "text-xs truncate",
                      darkMode ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    {selectedDevice.name}
                  </p>
                </>
              ) : (
                <>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      darkMode ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    No Device Connected
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      darkMode ? "text-gray-500" : "text-gray-500"
                    )}
                  >
                    Select a device
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
