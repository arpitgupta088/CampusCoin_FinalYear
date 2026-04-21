import React, { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../utils/contractConfig";

function TransferForm({ account }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  const transferHandler = async (e) => {
    e.preventDefault();
    if (!window.ethereum || !account)
      return alert("Please connect wallet first");

    try {
      setSending(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

      if (!/^0x[a-fA-F0-9]{40}$/.test(to))
        return alert("Invalid recipient address");
      if (!amount || Number(amount) <= 0)
        return alert("Enter valid amount");

      const decimals = await contract.decimals();
      const parsedAmount = parseUnits(amount, decimals);

      const tx = await contract.transfer(to, parsedAmount);
      await tx.wait();

      alert("✅ Tokens sent successfully!");
      setTo("");
      setAmount("");
    } catch (err) {
      console.error("Transfer error:", err);
      alert("❌ Transaction failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: 16 }}>Send Tokens</h3>

      <form onSubmit={transferHandler}>
        <div className="transfer-form-group">
          <label>Recipient Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div className="transfer-form-group">
          <label>Amount</label>
          <input
            type="number"
            step="any"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={sending}
          style={{ width: "100%", padding: "12px", marginTop: "8px" }}
        >
          {sending ? "Sending..." : "Send Tokens"}
        </button>
      </form>
    </div>
  );
}

export default TransferForm;
