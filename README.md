# Decision Log

A personal web application for tracking important decisions with context, confidence, and outcomes.

## Features

- 📝 Capture decisions with full context and metadata
- 🎯 Track confidence levels and reversibility
- 📊 Review outcomes and learnings
- 🏷️ Organize with tags
- 🔍 Search and filter decisions
- 📱 Responsive design (mobile cards, desktop table)
- ⚡ Quick-add mode for fast entry
- 📤 Export to CSV

## Getting Started

**📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)**

### Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your PostgreSQL DATABASE_URL
```

3. Set up the database:
```bash
npm run db:migrate   # Create tables
npm run db:seed      # Add sample data
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb decision_log

# Update .env with connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/decision_log"
```

### Cloud Providers

For cloud PostgreSQL (Neon, Supabase, Railway, etc.):

1. Create a database in your provider's dashboard
2. Copy the connection string
3. Paste it into your `.env` file as `DATABASE_URL`

## Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket

2. Import the project in Vercel

3. Add environment variable in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Environments: Production, Preview, Development

4. Update `package.json` to add postinstall script:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

5. Add Vercel build command (if needed):
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Deploy!

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma Client
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS
- **Language:** TypeScript
