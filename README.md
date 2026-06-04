# College Discovery Platform

## Overview

College Discovery Platform is a full-stack web application that helps students discover, compare, and evaluate colleges through search, filtering, comparison tools, and rank-based recommendations.

## Live Demo

[Add your Vercel URL here]

## GitHub Repository

[Add your GitHub repository URL here]

## Features

### College Listing & Search

* Browse colleges
* Search by college name
* Fast and responsive UI

### Advanced Filtering

* Filter by location
* Filter by rating

### College Detail Page

* Dynamic routing using Next.js App Router
* Detailed college information
* Placements, fees, and overview

### Compare Colleges

* Side-by-side comparison table
* Compare ratings, fees, locations, and placements

### College Predictor Tool

* Enter rank
* Get recommended colleges
* Dynamic recommendation logic

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM

### Database

* PostgreSQL (Neon)

### Deployment

* Vercel

## Architecture

Frontend

* App Router
* Server Components
* Client Components

Backend

* REST APIs
* Prisma ORM

Database

* PostgreSQL
* Relational schema for colleges, courses, reviews, and users

## Local Setup

```bash
git clone <repo-url>

npm install

npx prisma generate

npm run dev
```

## Deployment

* Frontend: Vercel
* Database: Neon PostgreSQL

## Future Improvements

* Authentication
* Saved Colleges
* Discussion Forum
* Real-world College Dataset
* Pagination
* Recommendation Engine
