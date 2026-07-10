# Task Manager

A simple Task Manager application built using **Django REST Framework** (Backend) and **React** (Frontend). The application allows users to create, view, update, delete, and filter tasks by their status.

---

## Features

- Create a task
- View all tasks
- Update a task
- Delete a task
- Filter tasks by status (Pending, In Progress, Done)

---

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite

### Frontend
- React
- Axios
- HTML
- CSS

---

# Project Structure

```
TASK-MANAGER/

├── backend/
│   ├── backend/
│   ├── tasks/
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# Backend Setup

### 1. Open terminal

```bash
cd backend
```

### 2. Install dependencies

```bash
pip install django djangorestframework django-cors-headers
```

### 3. Apply migrations

```bash
python manage.py migrate
```

### 4. Start the Django server

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000/
```

---

# Frontend Setup

### 1. Open another terminal

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the React application

```bash
npm start
```

Frontend URL:

```
http://localhost:3000/
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks/` | Get all tasks |
| GET | `/api/tasks/?status=pending` | Filter tasks |
| POST | `/api/tasks/` | Create a task |
| GET | `/api/tasks/<id>/` | Get a single task |
| PUT | `/api/tasks/<id>/` | Update a task |
| DELETE | `/api/tasks/<id>/` | Delete a task |

---

# Assumptions and Design Decisions

- SQLite is used as the database because it meets the assignment requirements.
- Django REST Framework generic views are used for implementing CRUD APIs.
- The frontend is implemented as a single-page React application.
- Axios is used for communication between React and Django.
- A modal is used for creating and editing tasks to keep the interface clean.
- Task filtering is implemented using the `status` query parameter.
- Click on a task row to expand and view its complete details (Title, Description, and Status)
- The UI is intentionally simple and functional, following the assignment requirement using normal CSS framework.

---

# Notes

- Make sure the Django server is running before starting the React application.
- The frontend expects the backend API to be available at:

```
http://127.0.0.1:8000/api/
```

---

# Author

**Dhruvil Patel**