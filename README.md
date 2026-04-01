# SUPKEM Frontend Portal

Welcome to the frontend application for the **Supreme Council of Kenya Muslims (SUPKEM)**. This project is a modern web application designed to serve as both a public-facing informative website and a robust administrative portal.

Built with **Next.js 15 (App Router)** and **React 19**, it interfaces with a Django REST Framework (DRF) backend to manage news, user profiles, organizations, and media.

---

## 🚀 Key Features

- **Public Website:** Access to recent news, featured articles, image galleries, and council information with a focus on SEO and fast load times.
- **Admin Dashboard:** A secure, role-based portal for administrators to manage users, organizations (county councils and institutions), and content (CMS for news and galleries).
- **Authentication system:** Secure login and session management.
- **Media Management:** Directly upload and manage gallery images (integrated with backend S3 storage).
- **Dynamic Content:** Real-time updates and interactive filtering using `SWR` and client-side components seamlessly mixed with server actions.
- **Rich Text Editing:** Integrated Markdown editor for rich content creation.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Styling:** [Tailwind CSS v4](https://tailwindcss.com/), Radix UI primitives, [Framer Motion](https://www.framer.com/motion/) for micro-animations.
- **Data Fetching:** Axios, [SWR](https://swr.vercel.app/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Emails:** [Resend](https://resend.com/)
- **Utilities:** `date-fns`, `html2canvas`, `jspdf`, `clsx`, `tailwind-merge`

## 📂 Architecture & Project Structure

The project utilizes Next.js route groups to logically separate different parts of the application:

```text
src/
├── app/
│   ├── (auth)/         # Authentication pages (login, forgotten password, etc.)
│   ├── (dashboard)/    # Authenticated portal & admin features (CMS, Users, Orgs)
│   ├── (public)/       # Public-facing views (Home, News, About)
│   ├── _components/    # Shared, reusable UI components
│   └── _hooks/         # Shared custom React hooks
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- Your package manager of choice (npm, pnpm, yarn, or bun)

### Environment Variables

Before running the application, ensure you have the required environment variables. Create a `.env.local` file at the root of the project:

```env
# Example .env.local configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
*(Contact the backend team or refer to internal documentation for the full list of required variables, such as Resend API keys or specific backend domains).*

### Installation

Clone the repository and install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will auto-reload as you make changes to the source code.

## 🤝 Development & Contribution Guidelines

- **Component Design:** Prioritize breaking down complex UIs into small, self-contained sub-components. Keep files manageable (< 200 lines generally).
- **Styling:** Adhere strictly to the established theme using TailwindCSS variables. Avoid arbitrary/hard-coded colors.
- **State Management:** Complex state and data fetching should be abstracted into custom hooks (e.g., `useNewsLogic`).
- **Data Fetching:** For public pages, prioritize Server Components for initial loads to maximize SEO. Use `SWR` on the client side for highly interactive pieces.

## 📝 License & Copyright

Copyright © Supreme Council of Kenya Muslims (SUPKEM). All rights reserved.
o