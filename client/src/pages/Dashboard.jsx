import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ConnectWallet from "../components/ConnectWallet";
import BalanceCard from "../components/BalanceCard";
import TransferForm from "../components/TransferForm";
import TransactionHistory from "../components/TransactionHistory";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const { toggleTheme } = useTheme();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      {/* MetaMask Notice */}
      <div className="metamask-notice metamask-notice--dashboard">
        <span className="metamask-notice__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </span>
        <span className="metamask-notice__text">
          <strong>MetaMask required</strong> — Please install the{" "}
          <a
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            rel="noopener noreferrer"
            className="metamask-notice__link"
          >
            MetaMask Chrome extension
          </a>{" "}
          to connect your wallet and use CampusCoin features.
        </span>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="btn"
        style={{ marginBottom: 16 }}
      >
        Toggle Theme
      </button>

      <h2 style={{ marginBottom: 20 }}>Campus Coin Wallet</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <ConnectWallet setAccount={setAccount} />
        <BalanceCard account={account} />
      </div>

      <TransferForm account={account} />

      <TransactionHistory account={account} />
    </div>
  );
}

export default Dashboard;
