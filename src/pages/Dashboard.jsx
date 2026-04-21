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
