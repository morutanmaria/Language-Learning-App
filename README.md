This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A full-stack language learning web application built with Next.js App Router, featuring interactive lessons, progress tracking, gamification (hearts & percentage), and an admin dashboard powered by React Admin.

## Tech Stack

Framework: Next.js 16 (App Router, Turbopack)

Frontend: React, TypeScript, Tailwind CSS

Authentication: Clerk

Database ORM: Drizzle ORM

Database: PostgreSQL

Admin Dashboard: React Admin

State Management: React hooks + Zustand

UI Components: Radix UI

## Features
👨‍🎓 Student Features

Interactive quiz-based lessons

Multiple challenge types (e.g. assist, select meaning)

Progress tracking per lesson

Hearts (lives) system

Completion percentage tracking

Automatic redirect after lesson completion

Responsive design

🛠 Admin Features

Admin-only access (server-side protected)

Course management

REST-based API integration

React Admin dashboard

Pagination support via Content-Range headers

## Authentication & Authorization

Authentication is handled via Clerk.

All users must be authenticated to access lessons.

The /admin route is protected via server-side admin validation.

Admin access is determined by Clerk userId.

## API & React Admin Integration

React Admin requires list endpoints to include:

Content-Range: <resource> <start>-<end>/<total>
Access-Control-Expose-Headers: Content-Range

Example API route:

export const GET = async () => {
  const data = await db.query.coursesTable.findMany();
  const total = data.length;

  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Content-Range": `courses 0-${total - 1}/${total}`,
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
};

This enables pagination support in the admin dashboard.

## Architecture Overview

The application follows a hybrid architecture:

Server Components handle authentication and secure routing.

Client Components handle interactive UI.

React Admin runs as a client-only island to avoid SSR conflicts.

REST endpoints follow standardized pagination headers.

This ensures:

Strong security boundaries

Clean separation of concerns

Optimal performance with SSR where applicable

Proper compatibility with third-party browser-based libraries

## Installation
git clone https://github.com/morutanmaria/Language-Learning-App.git
cd project
npm install
Create a .env file:

DATABASE_URL=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
ADMIN_USER_ID=

Run development server:

npm run dev

## Design Patterns Used

Factory Pattern – Used for challenge creation logic.

Facade Pattern – Used to simplify API interactions and database access.

Client-Server Separation – Clear boundary between server auth logic and client UI.

## Future Improvements

Role-based admin system (instead of hardcoded ID)

Stripe integration for heart purchases

Leaderboards

Achievements system

Improved analytics dashboard

Unit testing with Jest / Playwright

## Screenshots

<img width="1907" height="897" alt="ss1" src="https://github.com/user-attachments/assets/3406b6db-e1ce-4972-be25-a6d0b2c6024a" />
<img width="1908" height="895" alt="ss2" src="https://github.com/user-attachments/assets/81cfe9c7-e54d-4601-9c3b-c373e036389f" />
<img width="1512" height="597" alt="ss3" src="https://github.com/user-attachments/assets/d1fa6a5b-9960-4073-9ed5-8f1620feef42" />
<img width="1903" height="902" alt="ss4" src="https://github.com/user-attachments/assets/5e118c15-aa5d-4fe9-b8b7-b0ed336e3e7e" />
<img width="1907" height="905" alt="ss5" src="https://github.com/user-attachments/assets/5c38081b-5757-4b1d-acb0-7a241aa67db5" />
<img width="1896" height="902" alt="ss6" src="https://github.com/user-attachments/assets/0ceebfca-ca1b-4554-8bf3-ba764baec0fa" />
<img width="1915" height="495" alt="ss7" src="https://github.com/user-attachments/assets/89c912f3-b62c-4ce6-a371-92aaa2b5a6ae" />
<img width="497" height="591" alt="ss8" src="https://github.com/user-attachments/assets/96d1ddfb-f8cc-4a75-8cce-4c3b6e2c92d4" />


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


