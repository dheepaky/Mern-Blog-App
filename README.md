# 🚀 MERN Blog App: The Full-Stack Content Hub

## Build Your Digital Publication on a Robust Stack

| Backend | Frontend | Database | Images | License | 
| :---: | :---: | :---: | :---: | :---: |
| [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/) | [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/) | [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) | [![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/) | [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) |

A powerful, production-ready **Blog CMS** built with the **MERN** stack. This application demonstrates best practices for **secure authentication**, scalable **media handling**, and a fully responsive user experience.Perfect for learning MERN or using as a production-level blogging platform

* **🌐 Check out the Live Demo:** [https://blogwebapp.koyeb.app/](https://blogwebapp.koyeb.app/)

---

## ✨ Core Features & Highlights

### Security & User Experience

* **🔒 Secure Auth:** Implements JSON Web Tokens (JWT) and **Bcrypt** for robust and protected user registration and login.

* **✏️ Rich Text Editing:** Integrated editor allows for expressive, formatted content creation.

* **🖼️ Scalable Media:** Uses **Cloudinary** to offload and efficiently serve all uploaded post images.

* **📱 Fully Responsive:** Crafted with **Tailwind CSS** and **Material-UI (MUI)** for a clean, mobile-first design.

* **🌍 SEO-friendly blogging structure:**  search engine optimization features
  
**⚡ React Helmet:** dynamic page titles, meta descriptions, keywords, OG previews, Twitter Cards, etc.

**🤖 robots.txt:** properly configured to manage crawler access, indexing rules, and bot behavior.

**🗺️ Auto-Generated sitemap.xml:** – dynamically generated from backend routes/posts, ensuring faster indexing by Google, Bing, and other search engines.


* **🏷️ Intelligent Filtering:** Quickly search posts

---

## ⚙️ Tech Stack Deep Dive

This project leverages a modern, decoupled architecture across the MERN stack.

### Frontend (Client) - `React` ⚛️

| Tool | Purpose | 
| :--- | :--- | 
| **React** | Core library for dynamic UI development. | 
| **Tailwind CSS** | Utility-first CSS framework for rapid, responsive styling. | 
| **Material-UI (MUI)** | High-quality, pre-built components for complex UI elements. | 
| **Axios** | Promise-based HTTP client for API interaction. | 

### Backend (Server) - `Node.js & Express` ⚙️

| Tool | Purpose | 
| :--- | :--- | 
| **Express.js** | Minimalist framework for building the RESTful API endpoints. | 
| **Mongoose** | MongoDB Object Data Modeling (ODM) for robust data schemas. | 
| **Cloudinary SDK** | API integration for remote image uploading and storage. | 
| **JWT & Bcrypt** | Security layer for token-based authorization and password hashing. | 

---

## 🛠️ Getting Started (Run Locally)

### **1. Clone & Install**

Clone the repo and install dependencies for both the server and client:

```bash
git clone [https://github.com/dheepaky/Mern-Blog-App.git](https://github.com/dheepaky/Mern-Blog-App.git)
cd Mern-Blog-App

# Install server dependencies
npm install --prefix server

# Install client dependencies
npm install --prefix client


MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=SUPER_SECRET_KEY

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

PORT=5000
```

### Running the Application

1.  **Start the Backend Server:**
    Navigate back to the **`server`** directory and run the development script:
    ```bash
    npm run dev  # Requires nodemon
    # OR
    npm start 
    ```
    The server will typically run on `http://localhost:5000`.

2.  **Start the Frontend Client:**
    Navigate to the **`client`** directory and run:
    ```bash
    npm start
    ```
    The React application will open in your browser, typically at `http://localhost:3000`.

You're all set! Now you can test the upload functionality and see your assets appear instantly on Cloudinary.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See the `LICENSE` file for more information.

---

## 👤 Author

**Dheepak Y**
* **GitHub:** [dheepaky](https://github.com/dheepaky)
* **Project Link:** [https://github.com/dheepaky/mern-blog-app](https://github.com/dheepaky/mern-blog-app)
