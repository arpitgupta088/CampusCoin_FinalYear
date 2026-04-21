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

    return (
        <div className="App">
            <h1>CampusCoin Wallet</h1>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                }}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "10px 15px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>

            <ConnectWallet setAccount={setAccount} />

            {account && (
                <div className="dashboard-container">
                    <p className="dashboard-intro">
                        Use Cases: Pay canteen bills or event tickets using CampusCoin
                        tokens between student wallets.
                    </p>

                    <div className="top-section">
                        <BalanceCard account={account} />
                        <TransferForm account={account} />
                    </div>

                    <div className="features-grid">
                        <CanteenPayment account={account} />
                        <EventTicket account={account} />
                    </div>

                    <div className="history-section">
                        <TransactionHistory account={account} />
                    </div>
                </div>
            )}
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
                {/* Login page */}
                <Route path="/" element={<Login />} />

                {/* Register page */}
                <Route path="/register" element={<Register />} />

                {/* Protected dashboard page */}
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