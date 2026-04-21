import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../utils/contractConfig";
import jsPDF from "jspdf";

function shortAddr(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
}

function TransactionHistory({ account }) {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);

  const downloadReceipt = (tx) => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setTextColor(29, 53, 87);
    doc.text("Transaction Receipt", 105, 20, null, null, "center");
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let yPos = 40;
    const lineHeight = 10;
    
    doc.text(`Type: ${tx.direction}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Amount: ${tx.amount} CCN`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Date: ${tx.time}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Transaction Hash:`, 20, yPos);
    yPos += 6;
    doc.setFontSize(10);
    doc.text(`${tx.hash}`, 20, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    if (tx.direction === "Sent") {
      doc.text(`To:`, 20, yPos);
      yPos += 6;
      doc.setFontSize(10);
      doc.text(`${tx.to}`, 20, yPos);
    } else {
      doc.text(`From:`, 20, yPos);
      yPos += 6;
      doc.setFontSize(10);
      doc.text(`${tx.from}`, 20, yPos);
    }
    
    doc.save(`Receipt_${tx.hash.substring(0, 8)}.pdf`);
  };

  useEffect(() => {
    if (!account || !window.ethereum) return;

    const loadHistory = async () => {
      try {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);

        const sent = await contract.queryFilter(
          contract.filters.Transfer(account, null)
        );
        const received = await contract.queryFilter(
          contract.filters.Transfer(null, account)
        );

        const all = [...sent, ...received].sort(
          (a, b) => Number(b.blockNumber) - Number(a.blockNumber)
        );

        const decimals = await contract.decimals();

        const mapped = await Promise.all(
          all.map(async (ev) => {
            const { from, to, value } = ev.args;
            const amount = formatUnits(value, decimals);
            const direction =
              from.toLowerCase() === account.toLowerCase()
                ? "Sent"
                : "Received";

            const block = await provider.getBlock(ev.blockNumber);
            const time = block
              ? new Date(block.timestamp * 1000).toLocaleString()
              : "";

            return {
              hash: ev.transactionHash,
              from,
              to,
              amount,
              direction,
              time,
            };
          })
        );

        setTxs(mapped);
      } catch (err) {
        console.error("History error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [account]);

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 16 }}>Transaction History</h3>

      {loading && <p style={{ color: "var(--text-muted)" }}>Loading transactions...</p>}

      {!loading && txs.length === 0 && (
        <p style={{ color: "var(--text-muted)" }}>No transactions found for this account.</p>
      )}

      {!loading &&
        txs.map((tx) => (
          <div
            key={tx.hash}
            style={{
              background: "var(--background)",
              borderRadius: "var(--radius-md)",
              padding: 16,
              marginBottom: 16,
              border: "1px solid var(--border)",
              transition: "var(--transition)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  color: tx.direction === "Sent" ? "#ef4444" : "var(--secondary)",
                }}
              >
                {tx.direction}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {tx.time}
              </span>
            </div>

            <div style={{ fontSize: "1rem", marginBottom: 8, fontWeight: 500 }}>
              Amount: {tx.amount} CCN
            </div>

            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 12 }}>
              <strong>{tx.direction === "Sent" ? "To:" : "From:"}</strong>{" "}
              {shortAddr(tx.direction === "Sent" ? tx.to : tx.from)}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="tx-link"
                style={{ fontSize: "0.85rem" }}
              >
                View on Etherscan ↗
              </a>
              <button
                className="btn btn-primary"
                onClick={() => downloadReceipt(tx)}
                style={{ padding: "6px 12px", fontSize: "0.8rem" }}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TransactionHistory;
