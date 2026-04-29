# 🪙 CampusCoin Wallet

CampusCoin is a blockchain-based campus payment system built using React, ASP.NET Core Web API, SQL Server, and Ethereum Sepolia blockchain.

The project allows students to connect their MetaMask wallet, use CampusCoin ERC-20 tokens, make canteen payments, buy event tickets, transfer tokens to other students, and securely login using a backend authentication system.

---

# 📋 Project Overview

CampusCoin is designed as a decentralized campus payment ecosystem.

Students can:

* Connect MetaMask wallet
* View CampusCoin token balance
* Transfer tokens to other students
* Pay for canteen items
* Buy event tickets
* View transaction history and download PDF receipts
* Login securely using JWT authentication
* Register new accounts linked with wallet addresses

The backend stores users and transaction history in SQL Server.

---

# 🚀 Features

## Blockchain Features

* MetaMask wallet integration
* ERC-20 CampusCoin token support
* Wallet balance viewer
* Token transfer functionality
* Canteen payment system
* Event ticket purchase system
* Transaction history tracking
* PDF receipt download via jsPDF
* Sepolia testnet integration

## Backend Features

* User registration
* User login
* Password hashing using BCrypt
* JWT token authentication
* Protected APIs
* SQL Server database integration
* Transaction storage in database
* User profile API

---

# 🛠️ Tech Stack

| Layer              | Technology            | Version        |
| ------------------ | --------------------- | -------------- |
| Frontend           | React.js              | ^19.2.0        |
| Backend            | ASP.NET Core Web API  | .NET 8         |
| Database           | SQL Server            | 2019 / 2022    |
| ORM                | Entity Framework Core | 8.0.8          |
| Authentication     | JWT + BCrypt          | —              |
| Blockchain         | Ethereum Sepolia      | —              |
| Wallet             | MetaMask              | Browser Ext.   |
| Blockchain Library | ethers.js             | ^6.15.0        |
| HTTP Client        | Axios                 | ^1.15.1        |
| PDF Generation     | jsPDF                 | ^4.2.1         |
| API Testing        | Swagger / Postman     | —              |
| Styling            | CSS                   | —              |

---

# 💻 System Requirements

## Operating System

* Windows 10 / 11 (recommended)
* macOS 12+ or Ubuntu 20.04+ also supported

## Hardware (Minimum)

| Component | Minimum         |
| --------- | --------------- |
| RAM       | 8 GB            |
| Storage   | 5 GB free space |
| CPU       | Dual-core 2 GHz |

## Required Software

| Software                                   | Version         | Download Link |
| ------------------------------------------ | --------------- | ------------- |
| Node.js                                    | v18+ (LTS)      | https://nodejs.org |
| npm                                        | v9+ (bundled)   | https://nodejs.org |
| .NET SDK                                   | 8.0             | https://dotnet.microsoft.com/download/dotnet/8.0 |
| SQL Server                                 | 2019 / 2022     | https://www.microsoft.com/en-us/sql-server/sql-server-downloads |
| SQL Server Management Studio (SSMS)        | 19+             | https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms |
| Visual Studio 2022 **or** VS Code          | Latest          | https://visualstudio.microsoft.com |
| MetaMask Browser Extension                 | Latest          | https://metamask.io |
| Git                                        | Latest          | https://git-scm.com |

---

# 📁 Project Structure

```text
CampusCoin_FinalYear/
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BalanceCard.js
│   │   │   ├── CanteenPayment.js
│   │   │   ├── ConnectWallet.js
│   │   │   ├── EventTicket.js
│   │   │   ├── TransactionHistory.js
│   │   │   └── TransferForm.js
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   └── CampusCoinBackend/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Models/
│       ├── Migrations/
│       ├── .env              ← your local secrets (NOT pushed to GitHub)
│       ├── appsettings.json  ← template with placeholders (safe to share)
│       ├── Program.cs
│       └── CampusCoinBackend.csproj
│
├── .gitignore
└── README.md
```

---

# ⚙️ Prerequisites Checklist

Before running the project, make sure the following are installed and working:

- [ ] Node.js v18+ and npm v9+
- [ ] .NET 8 SDK (`dotnet --version` should show `8.x.x`)
- [ ] SQL Server (Express or Developer edition)
- [ ] SQL Server Management Studio (SSMS)
- [ ] MetaMask extension installed in your browser (Chrome / Edge / Firefox)
- [ ] Visual Studio 2022 or VS Code

---

# 🔑 MetaMask Setup

1. Install the MetaMask browser extension from https://metamask.io
2. Create a new wallet or import an existing one
3. Open MetaMask settings → **Advanced** → Enable **"Show test networks"**
4. Switch the active network to **Ethereum Sepolia Testnet**
5. Get free Sepolia ETH from a faucet (e.g. https://sepoliafaucet.com) for gas fees
6. Import the CampusCoin ERC-20 token contract address if provided

> **Note:** MetaMask must be installed and connected to Sepolia before using the wallet features of this app.

---

# 🗄️ Database Setup

### Step 1 — Create the Database

Open SSMS and connect to your local SQL Server instance.  
Run the following query to create the database:

```sql
CREATE DATABASE CampusCoinDB;
```

### Step 2 — Configure `appsettings.json`

The `appsettings.json` file committed to GitHub contains **placeholder values only** (no real secrets). Before running the backend, you must fill in your actual server details.

Open `server/CampusCoinBackend/appsettings.json` and replace the placeholders:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=CampusCoinDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "YOUR_SECRET_KEY",
    "Issuer": "CampusCoinAPI",
    "Audience": "CampusCoinUsers"
  },
  "AllowedHosts": "*"
}
```

#### How to fill in the values:

| Placeholder        | What to replace it with |
| ------------------ | ----------------------- |
| `YOUR_SERVER_NAME` | Your SQL Server instance name (e.g. `localhost\SQLEXPRESS` or just `localhost`) |
| `YOUR_SECRET_KEY`  | A strong random string (minimum 32 characters), e.g. `MySecretCampusCoinKey@2024!` |

**Example filled-in `appsettings.json`:**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=CampusCoinDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "MySecretCampusCoinKey@2024!AbcXyz",
    "Issuer": "CampusCoinAPI",
    "Audience": "CampusCoinUsers"
  },
  "AllowedHosts": "*"
}
```

> **Important:** Do NOT commit your real secrets back to GitHub. Keep real credentials only in your local copy.

### Step 3 — Run Entity Framework Migrations

Open a terminal inside `server/CampusCoinBackend/` and run:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

This will create all necessary tables in `CampusCoinDB` automatically.

---

# ⚙️ Backend Setup

### Step 1 — Navigate to the backend folder

```bash
cd server/CampusCoinBackend
```

### Step 2 — Restore NuGet packages

```bash
dotnet restore
```

This installs all required backend packages, including:

| Package                                          | Version  | Purpose                      |
| ------------------------------------------------ | -------- | ----------------------------- |
| `Microsoft.EntityFrameworkCore.SqlServer`        | 8.0.8    | SQL Server ORM                |
| `Microsoft.EntityFrameworkCore.Tools`            | 8.0.8    | EF Core migrations            |
| `Microsoft.AspNetCore.Authentication.JwtBearer`  | 8.0.8    | JWT authentication            |
| `BCrypt.Net-Next`                                | 4.1.0    | Password hashing              |
| `Swashbuckle.AspNetCore`                         | 6.5.0    | Swagger API docs              |
| `DotNetEnv`                                      | 3.1.1    | .env file support             |

### Step 3 — Run the backend

```bash
dotnet run
```

Backend server will start at:

```
http://localhost:5134
```

Swagger API documentation will be available at:

```
http://localhost:5134/swagger
```

---

# 🖥️ Frontend Setup

### Step 1 — Navigate to the client folder

```bash
cd client
```

### Step 2 — Install dependencies

```bash
npm install
```

This installs all required packages including:

| Package                    | Version   | Purpose                    |
| -------------------------- | --------- | -------------------------- |
| `react`                    | ^19.2.0   | UI framework               |
| `react-dom`                | ^19.2.0   | DOM rendering              |
| `react-router-dom`         | ^7.14.1   | Client-side routing        |
| `axios`                    | ^1.15.1   | HTTP requests to backend   |
| `ethers`                   | ^6.15.0   | Ethereum / MetaMask        |
| `jspdf`                    | ^4.2.1    | PDF receipt generation     |
| `@metamask/detect-provider`| ^2.0.0    | MetaMask detection         |

### Step 3 — Start the frontend

```bash
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

# ▶️ Running the Full Project

Open **two separate terminals** simultaneously:

**Terminal 1 — Backend:**

```bash
cd server/CampusCoinBackend
dotnet run
```

**Terminal 2 — Frontend:**

```bash
cd client
npm start
```

Then open your browser and go to:

| Service   | URL                           |
| --------- | ----------------------------- |
| Frontend  | http://localhost:3000         |
| Backend   | http://localhost:5134         |
| Swagger   | http://localhost:5134/swagger |

---

# 📡 Available Backend APIs

## Authentication APIs

| Method | Endpoint              | Description           | Auth Required |
| ------ | --------------------- | --------------------- | ------------- |
| POST   | `/api/Auth/register`  | Register new user     | No            |
| POST   | `/api/Auth/login`     | Login and get token   | No            |
| GET    | `/api/Auth/profile`   | Get current user info | Yes (JWT)     |

## Transaction APIs

| Method | Endpoint                  | Description            | Auth Required |
| ------ | ------------------------- | ---------------------- | ------------- |
| POST   | `/api/Transaction/add`    | Add new transaction    | Yes (JWT)     |
| GET    | `/api/Transaction/all`    | Get all transactions   | Yes (JWT)     |

Protected routes require JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

---

# 🧪 API Testing

You can test APIs using:

* **Swagger UI** — http://localhost:5134/swagger (built-in, no setup needed)
* **Postman** — Import the base URL `http://localhost:5134` and add the endpoints above

---

# 🔒 Security Notes

The `appsettings.json` on GitHub contains only placeholder values (no real secrets).  
When setting up locally, fill in your real server name and JWT key **only in your local copy**.

Never commit real secrets to GitHub. The following files are excluded via `.gitignore`:

```
.env
appsettings.Development.json
node_modules/
bin/
obj/
.vs/
.vscode/
```

---

# 📌 Future Improvements

* Admin dashboard
* Role-based login
* Forgot password
* Email verification
* Hostel fee payment
* Library fine payment
* QR code payments
* Analytics dashboard
* Profile photo upload
* Excel export

---

# 📄 License

This project was developed as a Final Year Major Project for educational purposes.
