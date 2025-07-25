# 🏛️ Jail Management System (Full Stack)

This is a full-stack **Jail Management System** built using **React.js**, **Express.js**, and **MongoDB**.  
It helps manage Prisoners, Staff, and Visitors with smooth UI and secure login system using JWT.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT stored in `localStorage`

---

## ✅ Features

### 🔐 Authentication
- Login required to access the dashboard
- JWT Token is generated on login and stored in **localStorage**
- **Default login password:** `admin`
- Password check is done on the backend and can be changed in the code logic

---

### 👥 Prisoner Management
- Add, update, and delete prisoner records
- Filter prisoners by name, cell, crime type, etc.

### 👨‍💼 Staff Management
- Hire, update, or remove staff
- Filter staff by role, department, etc.

### 🧍 Visitor Management
- Add visitor details with Entry Time and Total Meet Duration
- Automatically calculates **Exit Time**
- Filter visitors by prisoner name or visit date

---

## 📦 Folder Structure

jail-management-system-full-stack/
├── jail-management-frontend/ # React frontend
├── jail-management-backend/ # Express backend

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/DhruvAnand227/jail-management-system-full-stack.git
   cd jail-management-system-full-stack

2. Backend setup
   i. cd jail-management-backend
   ii. npm install cors, express, jsonwebtoken, moment-timezone, mongoose
   iii. start the server

3. Frontend setup
   i. cd jail-management-frontend
   ii. npm install react, react-dom, react-hook-form, react-router-dom, tailwindcss, @tailwindcss/vite

4. Open your browser at http://localhost:5173
