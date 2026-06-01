# Task Management API

A scalable REST API built with Node.js, Express.js, PostgreSQL, and Prisma ORM. The application provides JWT-based authentication, role-based access control (RBAC), and CRUD operations for task management.

## Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Role-Based Access Control (USER / ADMIN)
* Task CRUD Operations
* Input Validation using Zod
* PostgreSQL Database
* Prisma ORM
* Swagger API Documentation

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT
* bcrypt
* Zod

### Documentation

* Swagger UI
* Swagger JSDoc

---

## Project Structure

src/

├── config/

├── controllers/

├── docs/

├── middlewares/

├── routes/

├── services/

├── utils/

├── validators/

├── app.js

└── server.js

---

## Installation

### Clone Repository

git clone <repository-url>

cd intern_backend

### Install Dependencies

npm install

### Configure Environment Variables

Create a .env file in the root directory:

PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/taskdb"

JWT_SECRET=your_secret_key

### Run Database Migration

npx prisma migrate dev

### Generate Prisma Client

npx prisma generate

### Start Server

npm run dev

---

## API Documentation

Swagger Documentation:

http://localhost:5000/api-docs

---

## Authentication Endpoints

### Register User

POST /api/v1/auth/register

### Login User

POST /api/v1/auth/login

### Get Current User

GET /api/v1/auth/me

Requires JWT Token

---

## Task Endpoints

### Create Task

POST /api/v1/tasks

### Get All Tasks

GET /api/v1/tasks

### Get Single Task

GET /api/v1/tasks/:id

### Update Task

PUT /api/v1/tasks/:id

### Delete Task

DELETE /api/v1/tasks/:id

All task routes require JWT authentication.

---

## Admin Endpoints

### Get All Users

GET /api/v1/admin/users

Requires ADMIN role.

---

## Role-Based Access Control

### USER

* Manage own tasks
* Access protected routes

### ADMIN

* Access all USER features
* View all registered users

---

## Scalability Considerations

The project follows a modular architecture where authentication, task management, and administration are separated into independent modules.

Future improvements may include:

* Redis caching
* Docker containerization
* Rate limiting
* Logging and monitoring
* Microservices architecture
* Load balancing

---

## Author

Ayush Varun
IIT Indore
