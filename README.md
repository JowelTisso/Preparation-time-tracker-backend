# Preparation Time Tracker Backend

The Preparation Time Tracker Backend is a RESTful API designed to support the Preparation Time Tracker application. This backend enables users to efficiently log and monitor time dedicated to various preparation tasks, such as coding projects, interview preparation, and job applications.

## Features

- **User Authentication & Authorization**: Secure user registration and login using JSON Web Tokens (JWT)
- **Time Tracking**: Log and monitor time spent on different preparation activities
- **Task Management**: Create, update, and delete tasks associated with preparation activities

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user and task data
- **Mongoose**: ODM library for MongoDB and Node.js
- **JWT**: Standard for securely transmitting information between parties as a JSON object

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Git

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/JowelTisso/Preparation-time-tracker-backend.git
cd Preparation-time-tracker-backend
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Start the Server:**

```bash
npm start
```

The server will run on `http://localhost:5000`.

## Project Structure

```
Preparation-time-tracker-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── utils/
│   └── errorHandler.js
├── .gitignore
├── index.js
└── package.json
```

- `config/`: Database configuration
- `controllers/`: Request handlers for different endpoints
- `middleware/`: Custom middleware functions
- `models/`: Mongoose schemas and models
- `routes/`: API routes
- `utils/`: Utility functions
- `index.js`: Entry point of the application

## API Endpoints

### Authentication

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`

### Tasks

- Get All Tasks: `GET /api/tasks` (Protected)
- Create Task: `POST /api/tasks` (Protected)
- Update Task: `PUT /api/tasks/:id` (Protected)
- Delete Task: `DELETE /api/tasks/:id` (Protected)

> Note: Protected routes require a valid JWT token.
