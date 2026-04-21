import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/contractConfig";

function BalanceCard({ account, onBalance }) {
  const [balance, setBalance] = useState("—");
  const [symbol, setSymbol] = useState("CCN");
  const [loading, setLoading] = useState(false);

  const fetchBalance = async (acct) => {
    if (!acct || !window.ethereum) {
      setBalance("0");
      onBalance && onBalance("0");
      return;
    }

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const token = new Contract(
        CONTRACT_ADDRESS,
        [
          "function balanceOf(address) view returns (uint256)",
          "function decimals() view returns (uint8)",
          "function symbol() view returns (string)",
        ],
        provider
      );

      const [raw, decimals, sym] = await Promise.all([
        token.balanceOf(acct),
        token.decimals(),
        token.symbol().catch(() => "CCN"),
      ]);

      const human = formatUnits(raw, decimals);
      setBalance(human);
      setSymbol(sym);
      onBalance && onBalance(human);
    } catch (err) {
      console.error("Balance error:", err);
      setBalance("err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance(account);
  }, [account]);

  return (
    <div className="card balance-card">
      <div style={{ fontSize: "1rem", opacity: 0.85, fontWeight: 500 }}>
        Wallet Balance
      </div>

      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          margin: "12px 0",
          letterSpacing: "0.5px",
        }}
      >
        {loading ? "Loading..." : balance}{" "}
        <span style={{ fontSize: "1.2rem", opacity: 0.9 }}>
          {symbol}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          className="btn"
          onClick={() => fetchBalance(account)}
          disabled={!account || loading}
        >
          Refresh Balance
        </button>

        {!account && (
          <span style={{ fontSize: "0.85rem", opacity: 0.85, alignSelf: "center" }}>
            Connect wallet to view balance
          </span>
        )}
      </div>
    </div>
  );
}

export default BalanceCard;
