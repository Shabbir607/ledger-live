import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useDarkMode } from "../DarkModeContext";

const MainLayout = ({ children, currentScreen = "portfolio" }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleItemClick = (itemId) => {
    const routes = {
      portfolio: "/dashboard",
      accounts: "/accounts",
      send: "/send",
      receive: "/receive",
      manager: "/manager",
      "admin-transactions": "/admin-transactions",
      settings: "/settings",
    };
    navigate(routes[itemId] || "/dashboard");
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      )}
    >
      <Sidebar activeItem={currentScreen} onItemClick={handleItemClick} />

      <div className="lg:ml-64 min-h-screen transition-all">
        <main className="p-4 sm:p-6 md:p-8 w-full max-w-screen-2xl mx-auto">
          <div className="animate-fade-in-up">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
