import React, { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../utils/contractConfig";
import { CANTEEN_WALLET } from "../utils/canteenConfig";
import { CANTEEN_MENU } from "../utils/canteenMenu";

function CanteenPayment({ account }) {
  console.log("✅ CanteenPayment component loaded");

  const [loadingItemId, setLoadingItemId] = useState(null);
  const [lastTx, setLastTx] = useState(null);

  const payNow = async (item) => {
    if (!window.ethereum || !account) {
      alert("Please connect your wallet first");
      return;
    }

    const confirmPay = window.confirm(
      `Confirm payment?\n\nItem: ${item.name}\nPrice: ${item.price} CCN`
    );
    if (!confirmPay) return;

    try {
      setLoadingItemId(item.id);
      setLastTx(null);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

      const decimals = await contract.decimals();
      const amount = parseUnits(String(item.price), decimals);

      console.log("🍽 Canteen payment:", {
        from: account,
        to: CANTEEN_WALLET,
        item: item.name,
        amount: amount.toString(),
      });

      const tx = await contract.transfer(CANTEEN_WALLET, amount);
      console.log("⏳ Tx sent:", tx.hash);

      await tx.wait();

      setLastTx(tx.hash);
      alert(`✅ Payment successful!\n${item.name} – ${item.price} CCN`);
    } catch (err) {
      console.error("❌ Canteen payment error:", err);
      alert("Payment failed or cancelled by the customer");
    } finally {
      setLoadingItemId(null);
    }
  };

  return (
    <div className="card feature-card">
      <h3>🍽 Canteen Payment</h3>
      <p className="subtitle">
        Select an item and pay using CampusCoin (CCN)
      </p>

      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
        <strong>Canteen Wallet:</strong><br />
        {CANTEEN_WALLET}
      </p>

      <div className="items-list">
        {CANTEEN_MENU.map((item) => (
          <div key={item.id} className="item-row">
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-price">
                Price: {item.price} CCN
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => payNow(item)}
              disabled={loadingItemId === item.id}
            >
              {loadingItemId === item.id ? "Paying..." : "Pay"}
            </button>
          </div>
        ))}
      </div>

      {lastTx && (
        <div className="success-alert">
          ✅ Last payment successful  
          <br />
          <strong>Tx Hash:</strong>{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${lastTx}`}
            target="_blank"
            rel="noreferrer"
            className="tx-link"
          >
            {lastTx.slice(0, 10)}...{lastTx.slice(-8)}
          </a>
        </div>
      )}
    </div>
  );
}

export default CanteenPayment;
