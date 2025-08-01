import React, { useState } from "react";
import {
  PieChart,
  Wallet,
  Send,
  Download,
  Settings,
  Package,
  Home,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "portfolio", label: "Portfolio", icon: PieChart },
  { id: "accounts", label: "Accounts", icon: Wallet },
  { id: "send", label: "Send", icon: Send },
  { id: "receive", label: "Receive", icon: Download },
  { id: "manager", label: "Manager", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ activeItem = "portfolio", onItemClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMobile}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Ledger Live</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map(({ id, label, icon: Icon }) => {
              const isActive = id === activeItem;
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      onItemClick?.(id);
                      setMobileOpen(false); // close drawer on select
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Device Connected</p>
              <p className="text-xs text-gray-400">Ledger Nano X</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
