# Freelance Marketplace Microservices System

## Project Overview

This project implements a freelance marketplace platform using a microservices architecture. It supports three core workflows:

1. Client posts a job
2. Freelancer browses jobs and joins a waitlist
3. Client accepts a freelancer and triggers payment via Stripe

The system uses:
- Atomic microservices for core entities
- Composite/orchestrator services for workflow coordination
- Kong API Gateway for centralized routing
- RabbitMQ for asynchronous communication
- OutSystems for user management
- Stripe for payment processing
- Docker for containerization and deployment
- Supabase (PostgreSQL) for persistence
- React frontend for UI

---

## Core Scenarios

### Scenario 1: Client Posts a Job
1. Frontend sends request to Kong API Gateway
2. Kong routes request to Job Posting Orchestrator
3. Orchestrator validates client via OutSystems
4. Orchestrator calls Job Service to create job
5. Orchestrator publishes notification event to RabbitMQ
6. Notification Service consumes event and stores notification

### Scenario 2: Freelancer Browses Jobs and Joins Waitlist
1. Frontend requests available jobs through Kong
2. Kong routes request to Waitlist Manager Orchestrator
3. Orchestrator calls Job Service to retrieve open jobs
4. Freelancer selects a job and joins waitlist
5. Orchestrator calls Waitlist Service to create waitlist entry
6. Orchestrator publishes notification event to RabbitMQ
7. Notification Service consumes event and stores notification

### Scenario 3: Client Accepts Freelancer and Triggers Payment
1. Frontend requests waitlist entries through Kong
2. Kong routes request to Waitlist Manager Orchestrator
3. Client selects a freelancer to accept
4. Frontend sends acceptance request through Kong
5. Kong routes request to Accept Gig Orchestrator
6. Orchestrator retrieves bank details from OutSystems
7. Orchestrator updates Waitlist Service and Job Service
8. Orchestrator publishes payment event to RabbitMQ
9. Payment Service consumes event and processes payment via Stripe
10. Notification Service sends acceptance notification

---

## System Architecture

### Frontend
- React (Vite)

### API Gateway
- Kong

### Composite Services
- Job Posting Orchestrator
- Waitlist Manager Orchestrator
- Accept Gig Orchestrator

### Atomic Services
- Job Service
- Waitlist Service
- Notification Service
- Payment Service

### Messaging
- RabbitMQ

### External Services
- OutSystems User Service
- Stripe

### Database
- Supabase PostgreSQL

### Deployment
- Docker
- Docker Compose

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| API Gateway | Kong |
| Backend | Flask (Python) |
| Database | Supabase PostgreSQL |
| Messaging | RabbitMQ |
| Payment | Stripe |
| User Service | OutSystems |
| Containerization | Docker |
| Orchestration | Docker Compose |

---

## Service Responsibilities

### Atomic Services

#### Job Service
- `POST /jobs`
- `GET /jobs/open`
- `PUT /jobs/{eventId}`

#### Waitlist Service
- `POST /waitlist`
- `PUT /waitlist/{wl_id}`
- `GET /waitlist/event/{eventId}`

#### Notification Service
- Consumes RabbitMQ events
- Stores notifications in database

#### Payment Service
- Consumes payment events
- Creates Stripe PaymentIntent
- Stores payment records

### Composite Services

#### Job Posting Orchestrator
- `POST /post-job`

#### Waitlist Manager Orchestrator
- `GET /available-jobs`
- `POST /join-waitlist`
- `GET /waitlist-entries/{eventId}`

#### Accept Gig Orchestrator
- `POST /accept-freelancer`

---

## Kong API Gateway

Kong acts as the unified entry point between the frontend and backend services.

### Why Kong
- Centralized routing
- Simplifies frontend integration
- Reduces direct service exposure
- Makes service management cleaner
- Supports future scalability and security policies

### Example Kong Routes

| Kong Route | Target Service |
|---|---|
| `/post-job` | Job Posting Orchestrator |
| `/available-jobs` | Waitlist Manager Orchestrator |
| `/join-waitlist` | Waitlist Manager Orchestrator |
| `/waitlist-entries/:eventId` | Waitlist Manager Orchestrator |
| `/accept-freelancer` | Accept Gig Orchestrator |

---

## Docker Deployment

All services are containerized using Docker and run together using Docker Compose.

### Why Docker
- Consistent environment across machines
- Easier setup for backend services
- Simplified service networking
- Easier demo deployment

### Containerized Components
- Kong
- RabbitMQ
- Job Posting Orchestrator
- Waitlist Manager Orchestrator
- Accept Gig Orchestrator
- Job Service
- Waitlist Service
- Notification Service
- Payment Service
- Frontend

---

## Suggested Docker Compose Setup

The project uses Docker Compose to start all services together. A typical setup includes:

- Kong API Gateway
- RabbitMQ
- All Flask services
- Frontend container
- Shared environment variables for service URLs

---

## Setup Instructions

### 1. Clone the repository and add a .env file
```bash
git clone <your-repo-url>
cd <your-project-folder>
```
Add a .env in root folder containing your Stripe Api secret key and your database URL

### 2. Start up backend
```bash
docker compose up —build
```

### 3. Start up frontend
```bash
cd frontend
npm install
npm run dev
```
