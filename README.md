# 🌿 Plant Guide Frontend

## 📖 Project Description
The **Plant Guide Frontend** is a React web application that allows users to explore different plants, view care tips, and manage their favorite plants and watering schedules.  
It connects to the **Django REST API backend** and provides a simple, modern, and responsive user interface built with **React** and **Tailwind CSS**.

---

## 🛠 Tech Stack
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- JWT Authentication
- Docker

---

## 🎨 Main Pages
- **Landing Page** – brief introduction to the app and navigation to login/register  
- **Login / Register Pages** – for authentication  
- **Home Page** – shows featured or popular plants  
- **Indoor & Outdoor Plants Pages** – display plants by category  
- **Plant Detail Page** – shows full details (soil, watering, sunlight)  
- **Favorites Page** – lists the user’s saved plants  
- **Schedule Page** – allows users to view and manage watering schedules  
- **Profile Page** – displays user info and allows updates  

---

## 🔗 Backend Repository
👉 [Plant Guide Backend](https://github.com/asma-alkh/plant-guide-backend)

---
## 🧭 Routes Overview

| Route | Component | Description |
|--------|------------|-------------|
| `/` | `Landing.jsx` | Landing page introducing the app |
| `/login` | `Login.jsx` | User login page |
| `/register` | `Register.jsx` | New user signup page |
| `/home` | `Home.jsx` | Main dashboard showing plants overview |
| `/plants` | `PlantList.jsx` | Displays all plants |
| `/plants/:id` | `PlantDetail.jsx` | Detailed info for a selected plant |
| `/category/indoor` | `IndoorPlants.jsx` | Shows indoor plants |
| `/category/outdoor` | `OutdoorPlants.jsx` | Shows outdoor plants |
| `/favorites` | `Favorites.jsx` | Displays user’s favorite plants |
| `/schedule` | `Schedule.jsx` | User’s watering and care schedule |
| `/profile` | `Profile.jsx` | User’s personal info and settings|
---

## ❄️ IceBox Features
- Add dark mode 🌙  
- Enable user comments on plants 💬  
- Notifications for watering reminders ⏰  
- Support Arabic/English toggle 🌍  
- Allow uploading custom plant for users 🌸  

---