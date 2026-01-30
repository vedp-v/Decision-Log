# Decision Log - Setup Guide

Welcome to Decision Log! This guide will help you get the application up and running.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **PostgreSQL** database (local or cloud)

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, Prisma, React, and Tailwind CSS.

## Step 2: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create a new database
createdb postgres

# Or using psql
psql -U postgres
CREATE DATABASE postgres;
\q
```

### Option B: Cloud PostgreSQL (Recommended for Quick Start)

Use one of these cloud providers (all have free tiers):

- **Neon**: https://neon.tech (Serverless Postgres, great for Next.js)
- **Supabase**: https://supabase.com (Free tier available)
- **Railway**: https://railway.app (Free tier available)
- **Vercel Postgres**: https://vercel.com/storage/postgres

Sign up, create a database, and copy the connection string.

## Step 3: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Open `.env` and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/decision_log?schema=public"
```

**For Neon/Supabase/Railway**: Replace with the connection string from your dashboard.

**Example Neon connection string**:
```env
DATABASE_URL="postgresql://user:password@ep-cool-forest-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

## Step 4: Run Database Migrations

Generate the Prisma Client and create the database tables:

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate
```

When prompted for a migration name, you can use: `init`

## Step 5: Seed the Database

Populate the database with 8 sample decisions:

```bash
npm run db:seed
```

This will create realistic example decisions across various categories (Career, Productivity, Health, Finances, etc.).

## Step 6: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Features You Can Try

✅ **Home Page**
- View all decisions in a table (desktop) or cards (mobile)
- Search by title or context
- Filter by status, tag, or review date
- See decisions due for review in the next 14 days

✅ **Create Decision**
- Quick-add mode (Title + Decision + Confidence)
- Full form with all fields (context, options, links, tags, etc.)

✅ **Decision Detail**
- View all decision details
- Edit outcome section (success/partial/fail)
- Add timestamped notes
- Edit or delete decision

✅ **Export**
- Export all decisions to CSV

## Troubleshooting

### "Cannot connect to database"

- Verify your `DATABASE_URL` in `.env` is correct
- For cloud databases, ensure you're using the correct connection string with SSL enabled
- Test the connection: `npx prisma db pull`

### "Module not found" errors

Run:
```bash
npm install
npm run db:generate
```

### Database schema issues

Reset the database (⚠️ this will delete all data):
```bash
npx prisma migrate reset
npm run db:seed
```

## Database Management

### View/Edit Data

Open Prisma Studio (a visual database browser):
```bash
npm run db:studio
```

This opens at [http://localhost:5555](http://localhost:5555)

### Create New Migration

After changing `prisma/schema.prisma`:
```bash
npm run db:migrate
```

## Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket

2. Import project in Vercel: https://vercel.com/new

3. Add environment variable in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Select all environments (Production, Preview, Development)

4. Deploy!

**Note**: The `postinstall` script will automatically run `prisma generate` during build.

For production migrations:
```bash
npx prisma migrate deploy
```

## Project Structure

```
/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page (decisions list)
│   ├── decisions/           # Decision routes
│   └── api/                 # API routes
├── components/
│   ├── decisions/           # Decision-specific components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── db.ts               # Prisma client singleton
│   ├── actions.ts          # Server actions (CRUD)
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
└── types/
    └── decision.ts         # TypeScript types
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your environment variables
3. Ensure your database is accessible
4. Try resetting the database with `npx prisma migrate reset`

## Next Steps

- Customize the seed data in `prisma/seed.ts`
- Add more fields to the decision schema
- Customize the UI styling in component files
- Set up analytics or monitoring

Enjoy tracking your decisions! 🎯
