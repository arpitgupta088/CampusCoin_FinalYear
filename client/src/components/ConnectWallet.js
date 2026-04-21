import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/contractConfig";

function shortAddr(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
}

function ConnectWallet({ setAccount }) {
  const [connected, setConnected] = useState(false);
  const [accountLocal, setAccountLocal] = useState(null);
  const [tokenBalance, setTokenBalance] = useState("—");
  const [networkName, setNetworkName] = useState("");

  const fetchTokenBalance = async (address) => {
    try {
      if (!window.ethereum || !address) return setTokenBalance("0");

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

      const [raw, decimals, symbol] = await Promise.all([
        token.balanceOf(address),
        token.decimals(),
        token.symbol().catch(() => "CCN"),
      ]);

      const human = formatUnits(raw, decimals);
      setTokenBalance(`${human} ${symbol}`);
    } catch (err) {
      console.error("Balance fetch error:", err);
      setTokenBalance("err");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const acct = accounts[0];
      setAccount(acct);
      setAccountLocal(acct);
      setConnected(true);

      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setNetworkName(network.name ?? network.chainId);

      fetchTokenBalance(acct);
    } catch (err) {
      console.error("Connect error:", err);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (!accounts.length) {
        setConnected(false);
        setAccountLocal(null);
        setTokenBalance("—");
        setAccount(null);
      } else {
        setAccount(accounts[0]);
        setAccountLocal(accounts[0]);
        fetchTokenBalance(accounts[0]);
      }
    };

    const handleChainChanged = async () => {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setNetworkName(network.name ?? network.chainId);
      if (accountLocal) fetchTokenBalance(accountLocal);
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [accountLocal, setAccount]);

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0 }}>Wallet Settings</h3>

        <button
          onClick={connectWallet}
          className={`btn ${connected ? 'btn-secondary' : 'btn-primary'}`}
          style={{ background: connected ? "var(--secondary)" : "var(--primary)" }}
        >
          {connected ? "Connected" : "Connect Wallet"}
        </button>
      </div>

      <div style={{ fontSize: "0.95rem", color: "var(--text-main)" }}>
        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
          <strong style={{ color: "var(--text-muted)" }}>Account:</strong>{" "}
          <span>{accountLocal ? shortAddr(accountLocal) : "Not connected"}</span>
        </div>

        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
          <strong style={{ color: "var(--text-muted)" }}>Network:</strong>{" "}
          <span>{networkName || "—"}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong style={{ color: "var(--text-muted)" }}>Token Balance:</strong>{" "}
          <span>{tokenBalance}</span>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
