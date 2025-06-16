
# 🚀 Pulumi AWS Todo CRUD Example

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![Pulumi](https://img.shields.io/badge/IaC-Pulumi-purple)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange)

---

A simple **Todo CRUD** application deployed on AWS using [Pulumi](https://www.pulumi.com/). This project is a learning exercise to demonstrate connecting a frontend, backend, and database on AWS with Infrastructure as Code. **Note:** The update operation for titles is intentionally omitted. Not for production use.

---

## ✨ Features

- 🚀 Deploys AWS resources for a basic Todo app
- 📝 Create, read, and delete Todo items
- ⚡️ Infrastructure as Code with Pulumi

---

## 📁 Folder Structure

```text
.
├── aws-todo-back/
│   ├── .dockerignore
│   ├── .env           # ← You should create this file
│   ├── .env.example
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
├── aws-todo-front/
│   ├── .dockerignore
│   ├── .env           # ← You should create this file
│   ├── .env.example
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── services/
│           └── index.js
├── docker-compose.yaml
├── index.ts
├── jumpfile.sh
├── package.json
├── Pulumi.dev.yaml    # ← Pulumi stack configuration
├── Pulumi.yaml
├── README.md
├── tsconfig.json
└── .gitignore
```

---

## 🔗 API Endpoints

| Method | Endpoint              | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/todos/`            | List all todos                     |
| POST   | `/todos/`            | Create a new todo                  |
| PATCH  | `/todos/{todo_id}`   | Toggle completed status            |
| DELETE | `/todos/{todo_id}`   | Delete a todo                      |

**POST /todos/**  
Example body:
```json
{
    "title": "Todo text",
    "completed": false
}
```

**Interactive Docs:**  
- [Swagger UI] `/docs`
- [ReDoc] `/redoc`

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v20)
- [Python](https://www.python.org/downloads/) (v3.10)
- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
- AWS account & credentials

---

## 🚦 Getting Started

### 1️⃣ Setup Environment Variables

Copy `.env.example` to `.env` in both frontend and backend folders:

```bash
cp aws-todo-front/.env.example aws-todo-front/.env
cp aws-todo-back/.env.example aws-todo-back/.env
```

#### Frontend (`aws-todo-front/.env`)

| Variable      | Description                                    |
|---------------|------------------------------------------------|
| VITE_API_URL  | Backend API URL (default: `http://localhost:8000`) |

#### Backend (`aws-todo-back/.env`)

| Variable      | Description                                    |
|---------------|------------------------------------------------|
| DATABASE_URL  | PostgreSQL connection string                   |

---

### 2️⃣ Run Locally

**Frontend:**

```bash
cd aws-todo-front/
npm install
npm run dev
```

**Backend:**

```bash
cd aws-todo-back/
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

---

### 3️⃣ Run with Docker

Uncomment the `env_file` line in `docker-compose.yaml` for API container.

**Basic:**

```bash
docker compose up
```

**With Local Profile (includes DB):**

```bash
docker compose --profile local up
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

---

### 4️⃣ Deploy to AWS (EC2 + RDS)

Install Pulumi dependencies:

```bash
npm install
```

Configure AWS CLI and Pulumi stack:

```bash
pulumi stack init dev
pulumi config set aws:region us-east-1
```

Use `jumpfile.sh` for deployment commands:

```bash
./jumpfile.sh
```

- Deploys EC2 (frontend + backend) and RDS (PostgreSQL)
- Public IPs will be shown after deployment

---

## 📝 Notes

- For testing and demonstration only
- No update for Todo titles
- Not production-ready (no security, scaling, etc.)

---

## 🛠️ How To Continue

The main focus is the infrastructure setup, so no further development is planned for the frontend or backend. For the next steps, I would:

- Divide the project into separate repositories for frontend, backend, and infrastructure.
- Put the frontend into a S3 bucket, since it is a static site and does not make heavy calculations.
- Create a CI/CD pipeline for automated deployments.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

