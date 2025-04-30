# Multi-Tenant Admin Dashboard (React + Vite + TypeScript)

This project simulates a multi-tenant admin dashboard with mocked authentication, role-based route protection, and tenant-specific rendering — all built using React, Vite, TypeScript, and localStorage. No backend or real JWT is involved.

## Features

- 🏢 Multi-tenant support
- 🔐 Simulated authentication & role-based access
- 🚦 Route protection (admin, manager and/or regular user views)
- 🧠 Context-based state management
- 💾 LocalStorage persistence
- ⚡ Built with Vite + TypeScript

## Project Structure
src=>├── public
          |–– mockJson
          |–– images
          |–– favicon.ico 
     ├── components/ // Layouts and UI blocks 
     ├── context/ // AuthContext for user/token state 
     ├── hooks/ // useAuth() custom hook 
     ├── pages/ // Routes: login, dashboard, etc. 
     ├── routes/ // Route definitions and protection 
     ├── utils/ // LocalStorage and types