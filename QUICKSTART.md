# Quick Start Guide

Get Minute Cryptic running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment

Create `.env.local`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="change-this-to-a-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

💡 Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## 3. Initialize Database

```bash
npx prisma db push
```

This creates your SQLite database with all required tables.

## 4. Create Admin User

Run the admin creation script:
```bash
node scripts/create-admin.js
```

Follow the prompts to create your first admin account.

## 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 6. Add Your First Puzzle

1. Log in with your admin account at `/login`
2. Go to `/admin`
3. Click "Add New Puzzle"
4. Fill in the puzzle details
5. Set today's date (or tomorrow) for the publish date
6. Click "Create Puzzle"

## 7. Test Solving

1. Log out (or use a different browser/incognito)
2. Create a regular user account at `/register`
3. Visit `/solve` to solve today's puzzle
4. Submit your answer!

## What's Next?

- **Add more puzzles**: Batch create puzzles for the next 30-90 days
- **Customize**: Update the about page with your personal message
- **Deploy**: Follow the deployment instructions in README.md
- **Invite users**: Share the site with your 10-25 gift recipients!

## Troubleshooting

### "No puzzle for today" Error

Make sure you've added a puzzle with today's date in the admin panel.

### Can't Log In

1. Check that you created the user with the script
2. Verify the password is correct
3. Try resetting by creating a new admin user

### Database Locked Error

Close any open Prisma Studio windows:
```bash
pkill -f "prisma studio"
```

### Port Already in Use

Change the port:
```bash
PORT=3001 npm run dev
```

## Need Help?

Check the full README.md for detailed documentation!
