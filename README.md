# Backend Wizards — Stage 0: Dynamic Profile Endpoint (/me)

A Node.js/Express REST API that returns your profile information along with a dynamic cat fact fetched from an external API.

**Live API:** [Add your deployed URL here]  
**Submission form:** https://forms.gle/cqXmjZwzRr4rchYBA  
**Deadline:** Sunday, 19 Oct 2025 (GMT+1 / WAT)

**Important:** Vercel and Render are forbidden. Use Railway, Heroku, AWS, PXXL App, etc.

## What you must build
- A `GET /me` endpoint that returns JSON with `Content-Type: application/json`.
- It must fetch a fresh cat fact from `https://catfact.ninja/fact` on every request.
- Include a dynamic UTC timestamp in ISO 8601.
- Handle external API timeouts/failures gracefully and return proper status codes.

## Response format (strict)
On success (`200 OK`), return exactly this shape:
```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>"
}
```
Notes:
- `status` must be the string `"success"`.
- `timestamp` must update on every request (UTC, ISO 8601 e.g., `2025-10-17T14:30:12.345Z`).
- A new cat fact must be fetched each time (no caching).

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Installation & Setup

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd BackendWizards-Stage0-ProfileAPI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your profile (IMPORTANT):**
   Edit `index.js` and update the following lines with your actual information:
   ```javascript
   user: {
     email: "your.email@example.com", // Replace with your actual email
     name: "Your Full Name", // Replace with your actual name
     stack: "Node.js/Express" // You can customize this
   }
   ```

4. **Create environment file (optional):**
   ```bash
   cp .env.example .env
   ```

5. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Test the API:**
   ```bash
   curl http://localhost:3000/me
   ```

## 📁 Project Structure
```
BackendWizards-Stage0-ProfileAPI/
├── index.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── .env                  # Your environment variables (create this)
└── README.md             # This file
```

## Environment variables (optional)
```
PORT=3000
CATFACTS_URL=https://catfact.ninja/fact
REQUEST_TIMEOUT_MS=5000
USER_EMAIL=your_email@example.com
USER_NAME=Your Full Name
USER_STACK=Your Backend Stack
CORS_ORIGIN=*
LOG_LEVEL=info
```

## Quick setup options (pick one)

### A) Node.js + Express
Prereqs: Node 18+
- Install: `npm i express axios cors helmet morgan dotenv express-rate-limit`
- Dev: `npm i -D nodemon`
- Run: `node src/index.js` or `npm run dev`

### B) Python + FastAPI
Prereqs: Python 3.10+
- Install: `pip install fastapi "uvicorn[standard]" httpx python-dotenv loguru slowapi`
- Run: `uvicorn app.main:app --reload --port 3000`

(You will add your own `src/` or `app/` code files to implement `GET /me`).

## Local testing
- cURL: `curl -s -H "Accept: application/json" http://localhost:3000/me`
- Verify:
  - HTTP 200
  - `Content-Type: application/json`
  - JSON keys: `status`, `user.email`, `user.name`, `user.stack`, `timestamp` (UTC ISO 8601), `fact` (non-empty)

## Error handling & best practices
- Use `REQUEST_TIMEOUT_MS` for outbound call to Cat Facts.
- If the external API fails or times out, either:
  - Return `200` with a fallback `fact` (e.g., "Cat fact temporarily unavailable"), OR
  - Return `502` with an error payload. Document your choice below.
- Add basic logging, CORS, and simple rate limiting for public deploys.

**Failure strategy implemented:**
```
Returns 200 OK with fallback cat facts when the external Cat Facts API is unavailable.
Includes comprehensive error logging and graceful degradation to ensure API reliability.
```

## 🔗 API Endpoints

### `GET /me` - Profile Endpoint
Returns your profile information with a dynamic cat fact.

**Response:** `200 OK`
```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name", 
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-17T15:30:45.123Z",
  "fact": "Cats have five toes on their front paws, but only four toes on their back paws."
}
```

### `GET /health` - Health Check
Returns server health status.

### `GET /` - Root Endpoint  
Returns API information and available endpoints.

## Deployment (examples)
- Railway: Connect repo, set env vars, expose `PORT`, deploy, test `/me`.
- Heroku: Set Config Vars, add Procfile (e.g., `web: node src/index.js` or `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`).
- AWS / PXXL App: Provision service, set env vars, open inbound port, deploy.

## Suggested project structure
```
BackendWizards-Stage0-ProfileAPI/
├─ src/ or app/        # your implementation
├─ tests/              # optional tests
├─ .env                # not committed
├─ README.md           # this file
└─ package.json / requirements.txt / Procfile (as needed)
```

## Submission checklist
- [ ] `GET /me` returns 200 with correct JSON shape and headers
- [ ] `timestamp` is dynamic UTC ISO 8601 per request
- [ ] `fact` comes from Cat Facts on every request (no caching)
- [ ] Handles upstream errors/timeouts as documented
- [ ] Hosted (not on Vercel/Render); share live URL
- [ ] GitHub repo includes README with setup and env instructions
- [ ] Optional tests/docs included
- [ ] Publish a rich post (LinkedIn, Dev.to, Hashnode, Medium, or X) detailing your process with snapshots/videos

Good luck, Backend Wizard! 🪄
