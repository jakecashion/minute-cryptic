# Deployment Guide

Complete guide to deploying Minute Cryptic to production.

## Prerequisites

- GitHub account
- Vercel account (free tier is perfect)
- Database provider account (Turso or Supabase)

## Part 1: Push to GitHub

### 1. Create GitHub Repository

Go to [github.com/new](https://github.com/new) and create a new repository:
- Name: `minute-cryptic` (or your preferred name)
- Description: "Daily cryptic crossword puzzle platform"
- Visibility: Private (recommended for gift projects)
- **DO NOT** initialize with README (we already have one)

### 2. Connect and Push

After creating the repo, run these commands:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/minute-cryptic.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Part 2: Set Up Database

Choose one of these options:

### Option A: Turso (Recommended - SQLite)

**Why Turso?**
- Free tier perfect for 10-25 users
- Zero maintenance
- SQLite-compatible (no schema changes needed)
- Works great with Vercel

**Setup:**

1. Install Turso CLI:
```bash
brew install tursodatabase/tap/turso
# or
curl -sSfL https://get.tur.so/install.sh | bash
```

2. Sign up and authenticate:
```bash
turso auth signup
```

3. Create database:
```bash
turso db create minute-cryptic
```

4. Get database URL:
```bash
turso db show minute-cryptic --url
```

5. Create auth token:
```bash
turso db tokens create minute-cryptic
```

6. Save both values - you'll need them for Vercel!

### Option B: Supabase (PostgreSQL)

**Why Supabase?**
- More features if you want to expand later
- Free tier includes auth (optional)
- GUI for database management

**Setup:**

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string (transaction pooler)
6. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Part 3: Deploy to Vercel

### 1. Sign Up for Vercel

Go to [vercel.com](https://vercel.com) and sign up with GitHub.

### 2. Import Project

1. Click "Add New Project"
2. Import your `minute-cryptic` repository
3. Vercel will auto-detect it's a Next.js project

### 3. Configure Environment Variables

Click "Environment Variables" and add:

**Required Variables:**

```env
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://your-app.vercel.app
```

**For Turso, use:**
```env
DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your_token_here
```

**For Supabase, use:**
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Deploy

Click "Deploy" and wait 2-3 minutes!

## Part 4: Initialize Production Database

### Using Turso:

```bash
# Push schema to production database
DATABASE_URL="$(turso db show minute-cryptic --url)" \
TURSO_AUTH_TOKEN="$(turso db tokens create minute-cryptic)" \
npx prisma db push
```

### Using Supabase:

```bash
# Use your Supabase connection string
DATABASE_URL="your_supabase_connection_string" npx prisma db push
```

## Part 5: Create First Admin User

### Option A: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link project:
```bash
vercel link
```

3. Create admin remotely:
```bash
vercel env pull .env.production
node scripts/create-admin.js
```

### Option B: Database GUI

**Turso:**
```bash
turso db shell minute-cryptic
```

Then run:
```sql
INSERT INTO User (id, email, passwordHash, role, createdAt)
VALUES (
  'admin001',
  'your-email@example.com',
  'hash_your_password_first',
  'ADMIN',
  datetime('now')
);
```

**Supabase:**
- Use the Table Editor in Supabase dashboard
- Add a user with `role: ADMIN`
- Hash password with bcrypt first

### Option C: Temporary Local Setup

1. Connect to production database locally:
```bash
# Add to .env.local temporarily
DATABASE_URL="your_production_database_url"
```

2. Run create-admin script:
```bash
node scripts/create-admin.js
```

3. Remove production URL from `.env.local`!

## Part 6: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Register a test account at `/register`
3. Log in at `/login`
4. Log in as admin and add puzzles at `/admin`
5. Test solving at `/solve`

## Part 7: Custom Domain (Optional)

### Add Your Domain

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel project settings, go to "Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. Update `NEXTAUTH_URL` environment variable

## Part 8: Ongoing Maintenance

### Adding Puzzles

**Batch Method** (Recommended):
1. Create a spreadsheet with 30-90 days of puzzles
2. Log into `/admin`
3. Add puzzles for future dates
4. Set and forget!

**Regular Method:**
- Add 1-2 puzzles per week
- Set publish dates for future

### Monitoring

**Vercel Dashboard:**
- View deployment logs
- Monitor errors
- Check usage stats

**Database:**
- Turso: `turso db show minute-cryptic --url-only`
- Supabase: Use their dashboard

### Backups

**Export Database:**
```bash
# Turso
turso db shell minute-cryptic .dump > backup.sql

# Supabase
# Use Supabase dashboard backup feature
```

## Troubleshooting

### "Internal Server Error" on Vercel

1. Check Vercel logs: Project > Deployments > Click deployment > Runtime Logs
2. Verify environment variables are set
3. Check database connection

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. For Turso, check auth token is valid
3. Test connection locally first

### Can't Create Admin User

1. Ensure database schema is pushed
2. Check you're connecting to the right database
3. Try using Prisma Studio: `npx prisma studio`

### Build Failures

1. Check Node version (should be 18+)
2. Clear cache: Vercel Project Settings > "Clear Build Cache"
3. Check for TypeScript errors locally first

## Cost Breakdown

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited requests
- Way more than enough for 25 users

**Turso Free Tier:**
- 500 MB storage
- 1 billion row reads/month
- Perfect for this use case

**Supabase Free Tier:**
- 500 MB database
- 50,000 monthly active users
- More than enough

**Total Cost: $0/month** 🎉

## Security Checklist

- [ ] Used strong `NEXTAUTH_SECRET`
- [ ] Set correct `NEXTAUTH_URL`
- [ ] GitHub repo is private (if desired)
- [ ] Database credentials are in environment variables only
- [ ] `.env.local` is in `.gitignore`
- [ ] First admin user created securely
- [ ] Test user registration flow
- [ ] Test admin-only access

## Next Steps

1. Customize the "About" page with your personal story
2. Add your first 30 days of puzzles
3. Test everything works
4. Invite your users!
5. Share the URL and registration link

## Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Turso Docs:** [docs.turso.tech](https://docs.turso.tech)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

**Questions?** Check the main README.md or the troubleshooting section above!

Happy deploying! 🚀
