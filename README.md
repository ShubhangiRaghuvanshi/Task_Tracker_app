# Task Tracker App

A simple task management application where users can create, edit, and manage tasks within projects. Built using **React (Vite)** for the frontend and **Node.js + Express** for the backend.

---

## Live Demo

- Frontend: [https://task-tracker-app-rose.vercel.app/dashboard](https://task-tracker-app-rose.vercel.app/dashboard)  
- Backend: [Render Deployment Logs](https://dashboard.render.com/web/srv-d09t3h3e5dus73c7i5ug/deploys/dep-d09tevadbo4c73e177f0)

---

## Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Hosting: Vercel (frontend), Render (backend)
- Authentication: JWT

---

## Features

- User registration and login (JWT-based)
- Project creation and listing
- Task creation, update, and deletion
- Status tracking for tasks: Not Started, In Progress, Completed
- Task timestamps: creation and completion dates

---

## Folder Structure

vite-project/ → React frontend (Vite)
Backend/ → Node.js backend


## Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-tracker-app.git
cd task-tracker-app



2. Install Dependencies
For Frontend:

cd vite-project
npm install
For Backend:

cd ../Backend
npm install



Environment Variables
Frontend (vite-project/.env)
ini
Copy
Edit
VITE_API_URL=https://task-tracker-app-l8ah.onrender.com


Backend (Backend/.env)

MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_jwt_secret


Running the App Locally
Start Backend Server
bash
Copy
Edit
cd Backend
node app.js
Start Frontend Dev Server
Open another terminal:

bash
Copy
Edit
cd vite-project
npm run dev

API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get JWT token
POST	/api/projects	Create a new project
GET	/api/projects	Fetch all projects
POST	/api/tasks	Create a task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task

All routes (except authentication) require an Authorization: Bearer <token> header.
License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you want to include deployment steps for Vercel and Render too.
