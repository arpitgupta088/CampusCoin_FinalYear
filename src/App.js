import React, { useState } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import BalanceCard from "./components/BalanceCard";
import TransferForm from "./components/TransferForm";
import TransactionHistory from "./components/TransactionHistory";
import { ethers } from "ethers";
import CanteenPayment from "./components/CanteenPayment";
import EventTicket from "./components/EventTicket";


window.ethers = ethers;

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <h1>CampusCoin Wallet</h1>
      <ConnectWallet setAccount={setAccount} />
      {account && (
        <div className="dashboard-container">
          <p className="dashboard-intro">
            Use Cases: Pay canteen bills or event tickets using CampusCoin tokens between student wallets.
          </p>

          <div className="top-section">
            <BalanceCard account={account} />
            <TransferForm account={account} />
          </div>

          <div className="features-grid">
            <CanteenPayment account={account}/>
            <EventTicket account={account}/>
          </div>
          
          <div className="history-section">
            <TransactionHistory account={account} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
