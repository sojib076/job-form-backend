
---
# 🚀 Job Application Backend API

This is the backend for a job application platform built using **Node.js**, **Express.js**, and **MongoDB** (via Mongoose). It supports user signup/login, job postings by admins, and job applications by users.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for secure authentication
- **Custom Middleware** (`auth(role)`) for protected routes
- **Bcrypt** for password hashing

---

## 📌 Base API URL
 `http://localhost:5000/api/v1/`

## 🔐 Auth Routes (`/auth`)

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | `/auth/signup`   | Register a new user   |
| POST   | `/auth/login`    | Log in and get token  |

---

## 👤 User Application Routes (`/user`)

| Method | Endpoint                      | Description                         |
|--------|-------------------------------|-------------------------------------|
| POST   | `/user/apply`                 | Apply for a job                     |
| GET    | `/user/applications`          | Get all job applications (admin)    |
| GET    | `/user/applied-jobs/:userId` | Get jobs applied by a specific user |

---

## 👨‍💼 Admin Job Routes (`/jobs`)

| Method | Endpoint           | Middleware      | Description            |
|--------|--------------------|------------------|------------------------|
| POST   | `/jobs/admin-post` | `auth('admin')`  | Post a new job         |
| PATCH  | `/jobs/:id`        | `auth('admin')`  | Update a job by ID     |
| DELETE | `/jobs/:id`        | `auth('admin')`  | Delete a job by ID     |
| GET    | `/jobs/`           | *Public*         | Get all job listings   |

---

## 🔐 Auth Middleware

Protected routes use a custom middleware:

```js
auth('admin') // only allows admin users
auth()        // allows any authenticated user

NODE_ENV=development                # Set to "production" in deployment
PORT=5000                           # The port your server will run on

DATABASE_URL=your_mongodb_uri       # MongoDB connection string (from MongoDB Atlas or local)

JWT_ACCESS_SECRET=your_access_secret      # Used to sign short-lived access tokens
JWT_ACCESS_EXPIRES_IN=30d                # Access token expiry time (example: 30 days)

JWT_REFRESH_SECRET=your_refresh_secret   # Used to sign refresh tokens
JWT_REFRESH_EXPIRES_IN=7d                # Refresh token expiry (example: 7 days)

BCRYPT_SALT_ROUND=                     # Salt rounds for hashing passwords using bcrypt
