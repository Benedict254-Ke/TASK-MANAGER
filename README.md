# 🚀 TaskFlow – Advanced Task Manager App

A modern, feature-rich task management application built with **React** and **Tailwind CSS**, designed to help users stay organized, track progress, and manage tasks efficiently.

---

## 🌐 Live Demo

👉 https://task-manager-fawn-omega.vercel.app/

## 🧠 Overview

TaskFlow goes beyond a simple to-do list. It implements real-world productivity features such as **subtasks, drag-and-drop, smart completion logic, and calendar integration**, making it closer to tools like Notion, Trello, or Asana.

## ✨ Features

### 📝 Task Management

* Create, edit, and delete tasks
* Mark tasks as completed
* Clear all completed tasks

### 📊 Subtasks (Checklist System)

* Add subtasks to any task
* Track progress (e.g., 2/5 completed)
* Auto-complete parent task when all subtasks are done

### 🎯 Priority & Deadlines

* Set priority levels (Low, Medium, High)
* Assign due dates
* Highlight overdue tasks visually

### 🔍 Search & Filtering

* Filter tasks (All / Active / Completed)
* Real-time search functionality

### 📌 Drag & Drop

* Reorder tasks using drag-and-drop
* Order persists across sessions

### 🔔 Notifications

* Browser notifications for tasks due within 24 hours

### 📅 Google Calendar Integration

* Add tasks directly to Google Calendar
* Pre-filled event details for quick scheduling

### 📈 Dashboard (Toggle View)

* Total tasks
* Active tasks
* Completed tasks
* Overdue tasks

### 🎨 UI/UX Enhancements

* Smooth animations (Framer Motion)
* Clean, responsive design with Tailwind CSS
* Interactive task cards

### 💾 Data Persistence

* Uses **LocalStorage** to save tasks
* Data remains after page refresh

## 🛠 Tech Stack

* **Frontend:** React (Hooks)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Drag & Drop:** @hello-pangea/dnd
* **Icons:** React Icons
* **Storage:** Browser LocalStorage

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🧩 Project Structure

```
src/
 ├── components/
 │    ├── TaskInput.jsx
 │    ├── TaskList.jsx
 │    ├── TaskItem.jsx
 │    ├── FilterTabs.jsx
 │    ├── Dashboard.jsx
 │
 ├── App.jsx
 ├── main.jsx
 ├── index.css
```

---

## 🚀 Future Improvements

* Backend integration (Node.js + database)
* User authentication (login/signup)
* Email reminders for due tasks
* Cloud data sync (instead of LocalStorage)
* Mobile app version

---

## 💡 Key Learnings

* Managing complex state in React
* Handling nested data structures (tasks + subtasks)
* Implementing drag-and-drop interactions
* Building real-world UI/UX features
* Working with browser APIs (Notifications, LocalStorage)

---

## 👨‍💻 Author

**Benedict Wambua (Lulu B)**
Frontend Developer | Software Developer

* GitHub: https://github.com/Benedict-Ke
* LinkedIn: https://www.linkedin.com/in/benedict-musyoka-0a8904339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

## 📌 License

This project is open-source and available under the MIT License.
