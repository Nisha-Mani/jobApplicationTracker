# Job Application Tracker

A full-stack web application to manage and track your job applications. Easily filter by status, search by company or job title, and add new roles via a modal interface. Built using the MERN stack.

---

## 🚀 Features

- 🔍 Search jobs by title or company
- 🏷️ Filter applications by status: Applied, Interview, Rejected, Offer
- ➕ Add new job entries via a clean modal form
- 🗂️ View all applications in organized cards
- ☁️ Persistent storage using MongoDB

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Other |
|----------|---------|----------|-------|
| React.js (Vite) | Express.js | MongoDB Atlas | Axios, dotenv, Node.js |

---

## 📸 Demo


---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Nisha-Mani/jobApplicationTracker.git
cd jobApplicationTracker
```

### 2. Setup the backend
```bash
cd backend
npm install
```

#### Create a .env file and add:

.env
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
```
#### Then start the server:
```bash
npm run dev
```
### 3. Setup the frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 📂 Folder Structure
```pgsql
job-tracker-mern/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── index.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
```

## 🧪 Future Improvements

- User authentication
- Resume upload
- Application timeline tracking
- Dark mode support

## 🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to chang

