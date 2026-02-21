# 📄 Document Signature App 

## 🚀 Overview
This is the backend of the Document Signature App, built with Node.js, Express, and MongoDB. It handles authentication, document uploads, signature management, and PDF generation.

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File Upload)
- PDF-Lib (PDF Editing)

---

## 📂 Folder Structure
```

server/
│── controllers/
│── models/
│── routes/
│── middleware/
│── uploads/
│── server.js

````

---

## 🔐 Features
- User Registration & Login (JWT)
- Secure API Routes
- PDF Upload (Multer)
- Signature Storage
- PDF Generation with Signatures
- Audit Logs

---

## ⚙️ Installation

```bash
git clone <repo-url>
cd server
npm install
````

---

## 🔑 Environment Variables

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
```

---

## ▶️ Run Server

```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Documents

* POST `/api/docs/upload`
* GET `/api/docs`

### Signatures

* POST `/api/signatures`
* GET `/api/signatures/:docId`

### PDF

* POST `/api/pdf/:docId`

### Audit

* GET `/api/audit/:fileId`

---

## 📁 File Upload

* Only PDF files allowed
* Stored in `/uploads` folder

---

## 🚀 Deployment

* Render

---

## 👨‍💻 Author

Sonali Priyadarshini

````

