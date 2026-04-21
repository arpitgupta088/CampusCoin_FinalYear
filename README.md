# 🪙 CampusCoin Wallet

A blockchain-based campus payment system built with **React** and **Ethereum (ethers.js)**. CampusCoin enables students to connect their MetaMask wallets and use **CampusCoin tokens** for everyday campus transactions — paying canteen bills, purchasing event tickets, and transferring tokens between student wallets.

---

## 📋 Project Summary

CampusCoin is a decentralized wallet application designed for university campuses. It leverages the Ethereum blockchain to facilitate fast, transparent, and secure token-based payments among students.

### Key Features

- 🔗 **MetaMask Wallet Integration** — Connect your Ethereum wallet with a single click
- 💰 **Balance Viewer** — Check your CampusCoin token balance in real time
- 🍽️ **Canteen Payment** — Pay for meals at campus canteens using CampusCoin tokens
- 🎟️ **Event Tickets** — Purchase tickets for campus events directly from your wallet
- 💸 **Token Transfer** — Send CampusCoin tokens to other student wallet addresses
- 📜 **Transaction History** — View a complete log of your past transactions
- 🧾 **PDF Export** — Generate and download transaction receipts as PDFs

### Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 19, JavaScript (JSX)          |
| Blockchain  | Ethereum, ethers.js v6              |
| Wallet      | MetaMask (`@metamask/detect-provider`) |
| PDF Export  | jsPDF                               |
| Styling     | CSS3                                |
| Toolchain   | Create React App (react-scripts)    |

---

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MetaMask](https://metamask.io/) browser extension installed and set up

### Installation & Running

**1. Clone the repository** (if you haven't already):
```bash
git clone <your-repo-url>
cd CampusCoin_FinalYear
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the development server:**
```bash
npm start
```

The app will automatically open in your browser at:
```
http://localhost:3000
```

---

## 🧪 Other Available Scripts

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm start`     | Runs the app in development mode         |
| `npm run build` | Builds the app for production            |
| `npm test`      | Launches the test runner                 |
| `npm run eject` | Ejects from Create React App (one-way)   |

---

## 🦊 MetaMask Setup

1. Install the [MetaMask](https://metamask.io/) browser extension.
2. Create or import a wallet.
3. Connect to the appropriate Ethereum network - make sure that the test network slider is on ( We have deployed or coins using remix ide and tested using sepolia test network)
4. Open the app at `http://localhost:3000` and click **"Connect Wallet"**.
 
---

## 📁 Project Structure

```
CampusCoin_FinalYear/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/
│   │   ├── BalanceCard.js        # Displays token balance
│   │   ├── CanteenPayment.js     # Canteen payment UI
│   │   ├── ConnectWallet.js      # MetaMask wallet connection
│   │   ├── EventTicket.js        # Event ticket purchase UI
│   │   ├── TransactionHistory.js # Transaction log viewer
│   │   └── TransferForm.js       # Token transfer form
│   ├── pages/
│   │   └── Dashboard.jsx         # Main dashboard page
│   ├── context/                  # React context providers
│   ├── utils/                    # Utility/helper functions
│   ├── App.js                    # Root application component
│   └── index.js                  # React DOM entry point
├── package.json
└── README.md
```

---

## 📄 License

This project was developed as a Final Year project. All rights reserved.
