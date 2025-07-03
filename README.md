##  Local Setup

### 1. Backend
```bash
cd backend
npm install
```
-Specify your MongoDB URI in `server.js` or create a `.env` file containing the same.
Either set up a MongoDB cluster or configure a replica set if you're running MongoDB locally, as Change Streams only work with replicated deployments.

- Start the backend:
```bash
node server.js
```

### 2. Frontend 
```bash
cd frontend
npm install
npm run dev
```
- Access frontend at `http://localhost:5173`

---

