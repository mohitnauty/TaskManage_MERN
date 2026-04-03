# TaskManage

A task management project with:

- `frontend` for the React client
- `backend` for the Node Express and MongoDB API

## Requirements

- Node.js
- npm
- MongoDB Atlas account or local MongoDB server

## Project Structure

```text
TaskManage_MERN/
  backend/
  frontend/
  scripts/
  package.json
```

## Installation

Clone or open the project, then install dependencies for both apps.

```bash
cd backend
npm install

cd ../frontend
npm install

cd ..
```

## Backend Environment Setup

Create [backend/.env]:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Example for MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/taskmanage?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=replace_with_your_secret
```

Example for local MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskmanage
JWT_SECRET=replace_with_your_secret
```

## MongoDB Atlas Note

If you use MongoDB Atlas and the backend shows an IP whitelist or network error, add your current IP in Atlas:

`Security` -> `Network Access` -> `Add IP Address`

For quick development testing, you can temporarily allow:

```text
0.0.0.0/0
```

## Run Both Frontend and Backend

From the project root, run:

```bash
npm start
```

This starts:

- frontend on `http://localhost:3000`
- backend on `http://localhost:5000`

## Open http://localhost:3000/dashboard ##

## If you want to test login functionality ##

**Open http://localhost:3000/register**

**Register and then login with same credentials**

## Run Separately

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm start
```

## API Base URL

The frontend is configured to call:

```text
http://localhost:5000/api
```

## API URL's

```text]
Get all tasks: GET http://localhost:5000/api/tasks
To Update Status: Body JSON {"status":"DONE"} PATCH http://localhost:5000/api/tasks/69cf405059ab301a0b0d7f8d/status
```

## Available Scripts

Root:

```bash
npm start
```

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm start
npm run build
```
