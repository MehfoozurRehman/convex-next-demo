# Next.js & Convex Real-Time Starter

A modern full-stack real-time web application template built with Next.js 15 App Router (Turbopack), Convex reactive backend, React 19, and Tailwind CSS v4.

## Overview

`convex-next-demo` demonstrates zero-latency live state synchronization between client and server using Convex queries, mutations, actions, and modern React 19 Server/Client components.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15 App Router, Turbopack)
- **Backend & Database**: [Convex](https://convex.dev/) (`convex`)
- **Frontend Core**: React 19, TypeScript
- **UI & Components**: Radix UI Primitives, Lucide Icons, `next-themes`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)

## Prerequisites

- Node.js (v20 or higher recommended)
- Package manager (`pnpm` recommended)
- Convex backend account

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CONVEX_URL="your-convex-deployment-url"
   ```

3. **Start the Convex Backend**:
   ```bash
   npx convex dev
   ```

4. **Run the Development Server**:
   ```bash
   pnpm dev
   ```

5. **Access the Application**:
   Open `http://localhost:3000` in your web browser.

## Available Scripts

- `pnpm dev` - Starts the Next.js dev server with Turbopack.
- `pnpm build` - Creates an optimized production build.
- `pnpm start` - Runs the production server.
- `pnpm lint` - Runs ESLint code quality checks.

## Author

Created by [Mehfooz-ur-Rehman](https://github.com/MehfoozurRehman).
