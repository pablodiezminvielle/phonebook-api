# 📞 Phonebook API

A simple REST API for managing a phonebook, built with **Node.js**, **Express** and **MongoDB**.

This project is part of the [Fullstack Open](https://fullstackopen.com/en/) course – Part 3 exercises (3.1–3.20).

---

## 🌐 Deployed Backend

The backend is live at:

👉 [https://phonebook-api-ofuy.onrender.com/info](https://phonebook-api-ofuy.onrender.com/info)

---

## 🧩 Tech Stack

- Node.js
- Express.js
- MongoDB (via MongoDB Atlas)
- Mongoose
- Render (for deployment)
- ESLint (Flat config) for code style

---

## 💾 MongoDB Integration

Starting from exercise **3.13**, the app uses a **MongoDB Atlas** database to store all contact entries.  
Each phonebook entry includes:

- A `name` (min. 3 characters, required, unique)
- A `number` (min. 8 characters, format: `XX-XXXXXXX`)

All data is persisted in MongoDB and validated using **Mongoose** schema validators.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/pablodiezminvielle/phonebook-api.git
   cd phonebook-api
