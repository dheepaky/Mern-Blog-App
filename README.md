# ✨ MERN Blog App: Full-Stack Content Hub

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Images-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

A modern, full-featured **Blog CMS** built with the **MERN** stack. Quickly create, manage, and publish high-quality content with secure authentication and a responsive UI.

* **🌐 Live Demo:** [Link to Deployed App (e.g., Render/Vercel)]()

***

## 🚀 Key Features

### **Content Management & Security**

* **🛡️ Secure Auth:** Robust **JWT** token-based authentication (Login/Register/Protected Routes).
* **✍️ Full CRUD:** Standard **Create, Read, Update, Delete** operations for authenticated users' posts.
* **🖼️ Cloudinary Integration:** **Offloads image storage** and delivery for high performance and scalability.
* **🎨 Rich Editor:** Integrated **Rich Text Editor** for flexible and beautiful content formatting.
* **🔎 Search & Filter:** Quick search by title/content and filtering by tags.

### **Design & Frontend**

* **📱 Mobile-First UI:** Responsive design built with **Tailwind CSS** and **Material-UI**.
* **🚀 Efficient Stack:** Decoupled **React** frontend for fast loading and dynamic feel.

***

## 💻 Tech Stack

This project is built on the most popular JavaScript stack.

### **Frontend (⚛️)**
* **React**
* **Tailwind CSS & Material-UI** (MUI)
* **Axios**

### **Backend (⚙️)**
* **Node.js & Express**
* **Security:** **JWT** and **Bcrypt**
* **Images:** **Cloudinary SDK** and **Multer**

### **Database (💾)**
* **MongoDB** (via Mongoose ODM)

***

## 🛠️ Get Started

### **1. Setup & Install**

```bash
git clone [https://github.com/dheepaky/Mern-Blog-App.git](https://github.com/dheepaky/Mern-Blog-App.git)
cd Mern-Blog-App

# Install dependencies in both folders
npm install --prefix server
npm install --prefix client

### **2. Environment Variables**

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=SUPER_SECRET_KEY
# Cloudinary credentials for image hosting
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET
PORT=5000

LOUDINARY_API_SECRET=YOUR_API_SECRET
PORT=5000

### **3. Run Locally**

Start the backend and frontend in separate terminals:

Backend API (/server): npm run dev

Frontend UI (/client): npm start

The app is live at http://localhost:3000.

🔮 Future Enhancement Roadmap

💬 Comment System: Nested replies and threaded discussions.

🔔 Notifications: Real-time alerts for new comments.

📈 Analytics: Basic view tracking for posts.

🤝 Contributing
We welcome contributions! Please fork the repo and submit a Pull Request.

🧑‍💻 Author

Dheepak Y

GitHub: dheepaky

Project Link: MERN Blog App
