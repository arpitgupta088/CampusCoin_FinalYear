import React, { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../utils/contractConfig";
import { EVENT_WALLET } from "../utils/eventConfig";
import { EVENT_TICKETS } from "../utils/eventList";

function EventTicket({ account }) {
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [lastTx, setLastTx] = useState(null);

  const buyTicket = async (eventItem) => {
    if (!window.ethereum || !account) {
      alert("Please connect your wallet first");
      return;
    }

    const confirmBuy = window.confirm(
      `Confirm ticket purchase?\n\nEvent: ${eventItem.name}\nPrice: ${eventItem.price} CCN`
    );
    if (!confirmBuy) return;

    try {
      setLoadingItemId(eventItem.id);
      setLastTx(null);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

      const decimals = await contract.decimals();
      const amount = parseUnits(String(eventItem.price), decimals);

      const tx = await contract.transfer(EVENT_WALLET, amount);
      await tx.wait();

      setLastTx(tx.hash);
      alert(`✅ Ticket Purchased Successfully!\n${eventItem.name} – ${eventItem.price} CCN`);
    } catch (err) {
      console.error("❌ Event ticket purchase error:", err);
      alert("Purchase failed or cancelled");
    } finally {
      setLoadingItemId(null);
    }
  };

  return (
    <div className="card feature-card event-card">
      <h3>🎟️ Event Tickets</h3>
      <p className="subtitle">
        Purchase tickets for upcoming campus events
      </p>

      <div className="items-list">
        {EVENT_TICKETS.map((event) => (
          <div key={event.id} className="item-row">
            <div className="item-details">
              <div className="item-name">{event.name}</div>
              <div className="item-price">Price: {event.price} CCN</div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => buyTicket(event)}
              disabled={loadingItemId === event.id}
            >
              {loadingItemId === event.id ? "Buying..." : "Buy Ticket"}
            </button>
          </div>
        ))}
      </div>

      {lastTx && (
        <div className="success-alert">
          ✅ Last purchase successful  
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

export default EventTicket;
