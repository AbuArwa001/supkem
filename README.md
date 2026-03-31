# SUPKEM Frontend

The official web portal for the **Supreme Council of Kenya Muslims (SUPKEM)**, the umbrella body of all Muslim organizations, societies, mosque committees, and groups in Kenya.

This is a modern, high-performance web application built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

## 🚀 Key Features

### Public Portal
- **Homepage**: Beautifully designed landing page with hero sections and mission statements.
- **About Us**: Detailed history, strategic focus, and a dedicated **Leadership & Governance** section.
- **News & Media**: Integrated blog/news system and video briefings.
- **Services**: Information about SUPKEM services and community impact.

### Admin CMS (Digital Administration Portal)
- **News Management**: Create and manage news articles with Markdown support and image galleries.
- **Leadership Management**: Profile management for key officials (Chairman, Secretary General, etc.).
- **Organization & User Management**: Administration of member organizations and portal users.
- **Applications & Certificates**: Workflow management for official SUPKEM applications.
- **Settings & Parameters**: System-wide configuration management.

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State/Data**: [SWR](https://swr.vercel.app/) & [Axios](https://axios-http.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Editor**: [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor)
- **Notifications**: [Sonner](https://sonner.stevenly.me/)

## 🏁 Getting Started

### 1. Prerequisites
- Node.js 20.x or higher
- npm / yarn / pnpm

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Shared UI components (Sidebar, Navbar, etc.).
- `src/services`: API service layers for various modules.
- `src/hooks`: Custom React hooks (Auth, Logic).
- `src/lib`: Utility functions and configuration (API, utils).

## 📄 License
Internal use only for SUPKEM.
