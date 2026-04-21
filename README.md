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
* View transaction history
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

| Layer              | Technology            |
| ------------------ | --------------------- |
| Frontend           | React.js              |
| Backend            | ASP.NET Core Web API  |
| Database           | SQL Server            |
| ORM                | Entity Framework Core |
| Authentication     | JWT + BCrypt          |
| Blockchain         | Ethereum Sepolia      |
| Wallet             | MetaMask              |
| Blockchain Library | ethers.js             |
| API Testing        | Swagger / Postman     |
| Styling            | CSS                   |

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
│       ├── .env
│       ├── appsettings.json
│       ├── Program.cs
│       └── CampusCoinBackend.csproj
│
├── .gitignore
└── README.md
```

---

# ⚙️ Prerequisites

Before running the project, install the following:

* Node.js
* npm
* Visual Studio 2022 or Visual Studio Code
* .NET 8 SDK
* SQL Server
* SQL Server Management Studio (SSMS)
* MetaMask browser extension

---

# 🔑 MetaMask Setup

1. Install MetaMask browser extension
2. Create or import wallet
3. Enable test networks in MetaMask
4. Switch to Ethereum Sepolia Testnet
5. Import CampusCoin token contract if needed
6. Ensure you have Sepolia ETH for gas fees

---

# 🖥️ Frontend Setup

Open terminal inside:

```text
client/
```

Install dependencies:

```bash
npm install
```

Install required packages:

```bash
npm install axios
npm install react-router-dom
npm install ethers
```

Run frontend:

```bash
npm start
```

Frontend will run at:

```text
http://localhost:3000
```

---

# ⚙️ Backend Setup

Open terminal inside:

```text
server/CampusCoinBackend
```

Install backend packages:

```bash
dotnet restore
```

Required backend packages:

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package Swashbuckle.AspNetCore
dotnet add package DotNetEnv
```

---

# 🗄️ Database Setup

Create SQL Server database:

```text
CampusCoinDB
```

Create `.env` file inside:

```text
server/CampusCoinBackend/.env
```

Add:

```text
ConnectionStrings__DefaultConnection=Server=localhost\SQLEXPRESS;Database=CampusCoinDB;Trusted_Connection=True;TrustServerCertificate=True;
Jwt__Key=ThisIsMyCampusCoinSecretKey12345
Jwt__Issuer=CampusCoinAPI
Jwt__Audience=CampusCoinUsers
```

Run migrations:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

# ▶️ Run Backend

Inside backend folder run:

```bash
dotnet run
```

Backend will run at:

```text
http://localhost:5134
```

Swagger API documentation:

```text
http://localhost:5134/swagger
```

---

# 🔐 Default Test Login

Example registered user:

```text
Email: acer@gmail.com
Password: 123456
```

---

# 🔄 Running Both Frontend and Backend

Open two separate terminals.

Terminal 1:

```bash
cd server/CampusCoinBackend
dotnet run
```

Terminal 2:

```bash
cd client
npm start
```

Then open:

```text
Frontend: http://localhost:3000
Backend: http://localhost:5134
Swagger: http://localhost:5134/swagger
```

---

# 📡 Available Backend APIs

## Authentication APIs

```text
POST /api/Auth/register
POST /api/Auth/login
GET /api/Auth/profile
```

## Transaction APIs

```text
POST /api/Transaction/add
GET /api/Transaction/all
```

---

# 🧪 API Testing

You can test APIs using:

* Swagger
* Postman

Protected routes require JWT token in header:

```text
Authorization: Bearer your_token_here
```

---

# 🔒 Important Security Notes

Do not push the following files to GitHub:

```text
.env
appsettings.Development.json
node_modules/
bin/
obj/
.vs/
```

Keep real secrets only inside `.env` file.

---

# 📄 Git Ignore Example

```text
node_modules/
client/node_modules/
bin/
obj/
.env
.vs/
.vscode/
appsettings.Development.json
```

---

# 📌 Future Improvements

* Admin dashboard
* Role-based login
* Forgot password
* Email verification
* Hostel fee payment
* Library fine payment
* QR code transaction history
* PDF export
* Excel export
* Analytics dashboard
* Profile photo upload

---

# 📄 License

This project was developed as a Final Year project for educational purposes.
