# CodeStats

A competitive programming analytics platform that aggregates your stats from Codeforces, AtCoder, and LeetCode into a single unified dashboard.

## Live Demo

[code-stats-eight.vercel.app](https://code-stats-eight.vercel.app)

## Features

- Unified dashboard for Codeforces, AtCoder, and LeetCode stats
- Light / dark mode with a custom theming system
- Secure authentication via Appwrite
- Fully responsive, component-based UI

## Tech Stack

- **Frontend:** React, Tailwind CSS v4, Vite
- **Backend & Auth:** Appwrite

## Getting Started
```bash
# Clone the repo
git clone https://github.com/aman-shahi-dev/CodeStats.git
cd CodeStats/client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Appwrite credentials in .env

# Start the dev server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the `client/` directory with the following:
```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
```

## 📄 License

[MIT](LICENSE)
