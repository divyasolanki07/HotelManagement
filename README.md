# 🏨 HotelMS — Simple Hotel Management (React + JSON Server)

![Build Status](https://img.shields.io/badge/status-ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)

A lightweight hotel reservation demo built with React, Bootstrap and JSON Server. Designed to be simple, clear, and easy to customize — perfect for learning or a practical exam.

Features
--------
- 🛏️ Room listing with blog-style cards
- 🧾 Create / Edit / Cancel reservations (CRUD)
- 🔐 Simple login (mocked via `db.json` + `localStorage`)
- ⚡ Fast UI using Bootstrap 5 (responsive)
- 🧭 Search rooms by type, features, or room number

Quick Start
-----------
1. Install dependencies

```bash
npm install
```

2. Start the React app and JSON Server together

```bash
npm run dev
```

By default the app runs at `http://localhost:3000` and JSON Server at `http://localhost:5000` (proxy is configured).

Useful Scripts
--------------
- `npm run start` — start React dev server
- `npm run server` — start JSON Server only
- `npm run dev` — run both (recommended for development)

API Endpoints (JSON Server)
---------------------------
- `GET /rooms` — list rooms
- `GET /rooms/:id` — room details
- `GET /reservations` — list reservations
- `POST /reservations` — create reservation
- `PUT /reservations/:id` — update reservation
- `DELETE /reservations/:id` — cancel reservation

Data
----
Edit `db.json` to change initial rooms, users, or reservations. Example collections:
- `rooms` — objects with `id`, `number`, `type`, `price`, `features`, `available`
- `users` — demo users with `username` and `password` (used for mock login)

Design & UI
-----------
- Uses Bootstrap 5 for layout, cards, badges, and responsive behavior.
- Icons and badges in the UI use simple emoji and Bootstrap badges for fast, attractive visuals.

Notes & Tips
-----------
- This project uses a mocked authentication stored in `db.json`; do not use this for production authentication.
- To customize look: edit `src/App.css` and the Bootstrap classes in components under `src/components/`.

Contributing
------------
PRs welcome — if you improve UI, add unit tests, or replace JSON Server with a real backend, open a PR.

License
-------
MIT

---
Made with ❤️ personalize the demo.
