# 📢 User Feedback System

A full-stack MERN (MongoDB, Express, React, Node.js) application for collecting, managing, and analyzing user feedback.

## 🚀 Features

* Submit feedback via a responsive form
* Admin dashboard with filtering, sorting, pagination
* Search functionality
* Chart.js-based feedback analytics
* Feedback status management (admin view)
* Toast notifications for success/error messages
* TailwindCSS styling with a dark, modern theme

---

## 📁 Project Structure

```
client/       # React frontend
server/       # Node/Express backend
```

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS, Chart.js, Axios, React Hot Toast
**Backend:** Node.js, Express, Mongoose
**Database:** MongoDB Atlas

---

## ⚙️ Installation Instructions

### 📦 1. Clone the repository

```bash
git clone https://github.com/rHarsh-11/user-feedback-system.git
cd user-feedback-system
```

### 🖥 2. Setup Backend

```bash
cd server
npm install

# Create .env file
touch .env

# Add your MongoDB Atlas URI to .env
MONGO_URI=your_mongodb_atlas_connection_string

npm run dev
```

### 🌐 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

> Frontend will run on `http://localhost:5173` and backend on `http://localhost:5000`

---

## 📌 Environment Variables (server/.env)

```
MONGO_URI=your_mongo_atlas_connection_string
PORT=5000
```

---

## 📊 Analytics & Admin

* Feedbacks are visualized via a bar chart (`/feedback/stats`)
* Search by name, email, or message text
* Filter by category, sort by date/name, and paginate

---

## 🧪 API Endpoints

### POST /feedback

> Submit a new feedback

### GET /feedback

> Fetch paginated feedbacks with optional search/filter

### PATCH /feedback/\:id

> Admin: Update status of a feedback

### GET /feedback/stats

> Returns category-wise counts for chart visualization


