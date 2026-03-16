# Project Setup Guide

This guide will help you **clone the repository**, **create your own branch**, and **run the Vue project locally**.

---

## 1. Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## 2. Clone the Repository

Open your terminal and run:

```bash
# Replace <repo-url> with the URL of this repository
git clone <repo-url>
```

## 3. Navigate into the project folder:

```bash
cd zesty-frontend
cd zesty
```

## 4. Create a New Branch

Before you start working, create a new branch for your changes:

```bash
git checkout -b <your-branch-name>
```

Check your current branch:

```bash
git branch
```

## 5. Install Dependencies

Install all required packages:

```bash
npm install
npm run format
```

## 6. Start the Development Server

Run the project locally:

```bash
npm run dev
```

You should see a message in the terminal with a local development URL, e.g.:

```bash
http://localhost:5173
```

## 6. Workflow Summary

Clone the repository

Navigate into the folder

Create and switch to a new branch

Install dependencies

Start the development server

## 7. Notes

Always work on your own branch to avoid conflicts.

Commit and push your changes regularly:

```bash
git add .
git commit -m "Describe your changes"
git push origin <your-branch-name>
```

## 8. Pull the latest updates from the main branch before creating a pull request:

```bash
git checkout main
git pull origin main
git checkout <your-branch-name>
git merge main
```
