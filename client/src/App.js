import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ethers } from "ethers";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ConnectWallet from "./components/ConnectWallet";
import BalanceCard from "./components/BalanceCard";
import TransferForm from "./components/TransferForm";
import TransactionHistory from "./components/TransactionHistory";
import CanteenPayment from "./components/CanteenPayment";
import EventTicket from "./components/EventTicket";

window.ethers = ethers;

function Dashboard() {
    const [account, setAccount] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className="dash-page">
            {/* Animated background blobs — same as auth pages */}
            <div className="auth-blob auth-blob-1" />
            <div className="auth-blob auth-blob-2" />
            <div className="auth-blob auth-blob-3" />

            {/* Top navbar */}
            <header className="dash-navbar">
                <div className="dash-navbar-brand">
                    <div className="dash-navbar-logo">
                        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="18" fill="url(#dashLogoGrad)" />
                            <text x="18" y="24" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">₵</text>
                            <defs>
                                <linearGradient id="dashLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4f46e5" /><stop offset="1" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="dash-navbar-title">CampusCoin</span>
                </div>

                <div className="dash-navbar-right">
                    {account && (
                        <span className="dash-navbar-addr">
                            {account.slice(0, 6)}…{account.slice(-4)}
                        </span>
                    )}
                    <button id="logout-btn" className="dash-logout-btn" onClick={handleLogout}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="dash-main">
                {/* Hero heading */}
                <div className="dash-hero">
                    <h1 className="dash-hero-title">Campus Wallet</h1>
                    <p className="dash-hero-sub">
                        Manage your CampusCoin tokens — pay at the canteen, buy event tickets, and send to peers.
                    </p>
                </div>

                {/* Connect wallet + Balance row */}
                <div className="dash-top-row">
                    <ConnectWallet setAccount={setAccount} />
                    <BalanceCard account={account} />
                </div>

                {account && (
                    <>
                        {/* Transfer + Features */}
                        <div className="dash-mid-row">
                            <TransferForm account={account} />
                        </div>

                        <div className="dash-features-row">
                            <CanteenPayment account={account} />
                            <EventTicket account={account} />
                        </div>

                        {/* History */}
                        <div className="dash-history-row">
                            <TransactionHistory account={account} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;