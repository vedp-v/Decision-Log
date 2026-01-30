# Decision Log - Quick Start

Get up and running in 5 minutes! 🚀

## Prerequisites

- Node.js 18+
- PostgreSQL database (see options below)

## Database Options

### Option 1: Neon (Recommended - Fastest)
1. Go to https://neon.tech
2. Sign up (free)
3. Create a project
4. Copy connection string

### Option 2: Supabase
1. Go to https://supabase.com
2. Create project
3. Get connection string from Settings → Database

### Option 3: Local PostgreSQL
```bash
createdb decision_log
```

## Setup (5 steps)

### 1. Install
```bash
npm install
```

### 2. Configure Database
Create `.env` file:
```bash
DATABASE_URL="your_postgresql_connection_string_here"
```

### 3. Migrate
```bash
npm run db:migrate
```
When prompted, enter migration name: `init`

### 4. Seed
```bash
npm run db:seed
```

### 5. Run
```bash
npm run dev
```

Open http://localhost:3000

## That's It! 🎉

You should see:
- 8 sample decisions
- A review due banner (if any reviews are coming up)
- Search and filter options

## Next Steps

Try these features:
1. Click **"New Decision"** → Use quick-add mode
2. Click a decision → View details
3. Click **"Edit"** → Update the decision
4. Add an **Outcome** → Track results
5. Add **Notes** → Document follow-ups
6. Click **"Export CSV"** → Download all decisions

## Troubleshooting

**Can't connect to database?**
- Check your DATABASE_URL in `.env`
- For cloud databases, ensure SSL is enabled

**Module errors?**
```bash
npm install
npm run db:generate
```

**Need to reset?**
```bash
npx prisma migrate reset
npm run db:seed
```

## Documentation

- **SETUP.md** - Detailed setup guide
- **PROJECT_SUMMARY.md** - Complete feature list
- **README.md** - Project overview

---

Need help? Check the troubleshooting section in SETUP.md
