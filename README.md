# Abbie Cryptic 🧩

A daily cryptic crossword puzzle platform built as a thoughtful gift for puzzle enthusiasts.

## Features

- **Daily Puzzle**: A new cryptic clue every day
- **User Authentication**: Secure login and registration
- **Admin Panel**: Easy puzzle management interface
- **Progress Tracking**: Track solved puzzles and time spent
- **Learning Resources**: Guide to understanding cryptic clues
- **Responsive Design**: Works beautifully on mobile and desktop

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd abbie-cryptic
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Initialize the database:
```bash
npx prisma db push
npx prisma generate
```

5. Create an admin user:
You'll need to manually create the first admin user in the database:
```bash
npx prisma studio
```
Then create a user with `role: "ADMIN"`

Or use this script to create an admin user:
```bash
node scripts/create-admin.js
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
minute-cryptic/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── admin/               # Admin panel
│   │   └── puzzles/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── puzzles/
│   │   └── admin/
│   ├── solve/               # Puzzle solving page
│   ├── guide/               # Learning resources
│   └── us/                  # About page
├── components/              # React components
│   ├── ui/                  # UI components
│   ├── layout/              # Layout components
│   ├── game/                # Puzzle game components
│   └── admin/               # Admin components
├── lib/                     # Utility functions
│   ├── db.ts               # Database client
│   ├── auth.ts             # Auth configuration
│   └── puzzle-validator.ts # Answer validation
├── prisma/                  # Database schema
│   └── schema.prisma
└── types/                   # TypeScript types
```

## Usage

### For Players

1. **Register**: Create an account at `/register`
2. **Solve**: Visit `/solve` to see today's puzzle
3. **Learn**: Check out the guide at `/guide` for tips

### For Admins

1. **Login**: Log in with an admin account
2. **Admin Panel**: Access at `/admin`
3. **Add Puzzles**: Click "Add New Puzzle" to create puzzles
4. **Manage**: View all puzzles and their solve statistics

## Adding Your First Puzzle

1. Navigate to `/admin`
2. Click "Add New Puzzle"
3. Fill in:
   - **Clue**: The cryptic clue text
   - **Answer**: The solution
   - **Explanation**: How the wordplay works (optional)
   - **Difficulty**: 1-5 stars
   - **Publish Date**: When the puzzle should appear

## Deployment

### Deploying to Vercel

1. Push your code to GitHub

2. Import the project in Vercel

3. Add environment variables:
   - `DATABASE_URL` - Your database connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL

4. For the database, use one of:
   - **Turso** (recommended for SQLite on Vercel)
   - **Supabase** (PostgreSQL, change prisma provider)
   - **Neon** (PostgreSQL)

5. Run migrations on production:
```bash
npx prisma db push
```

## Database Options

### Option 1: SQLite with Turso (Recommended)

1. Sign up at [turso.tech](https://turso.tech)
2. Create a database:
```bash
turso db create minute-cryptic
```
3. Get the connection URL and set as `DATABASE_URL`

### Option 2: PostgreSQL with Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get the connection string
3. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
4. Run `npx prisma db push`

## Customization

### Personalizing for Your Group

Update these files to personalize:

- `app/us/page.tsx` - Add your story about why you built this
- `app/page.tsx` - Customize the welcome message
- `app/layout.tsx` - Update the site metadata
- `components/layout/Footer.tsx` - Add custom footer text

### Styling

The color scheme can be customized in:
- `tailwind.config.ts` - Update colors
- `app/globals.css` - Adjust global styles

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database GUI
- `npx prisma db push` - Push schema changes

## Features for Future Enhancement

Consider adding these features post-MVP:

- [ ] Puzzle archive with search/filter
- [ ] User statistics dashboard
- [ ] Solving streaks and achievements
- [ ] Difficulty filters
- [ ] Email notifications for new puzzles
- [ ] Social sharing features
- [ ] Mini puzzles (shorter variants)
- [ ] Export solved puzzles

## Gift Project Notes

This platform was designed for a small group (10-25 users) as a personal gift. Some optimizations for larger scale usage were intentionally omitted:

- Simple SQLite database (sufficient for small scale)
- No rate limiting (trusted user group)
- Basic analytics only
- No email verification (optional to add)

## Troubleshooting

### Database Issues

If you see database errors:
```bash
rm prisma/dev.db
npx prisma db push
npx prisma generate
```

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

### TypeScript Errors

Regenerate types:
```bash
npx prisma generate
```

## Support

This is a gift project, but if you encounter issues:

1. Check the troubleshooting section
2. Review the Next.js and Prisma documentation
3. Ensure all environment variables are set correctly

## License

This is a personal gift project. Use and modify as you wish for your own gift projects!

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

Created with ❤️ as a thoughtful gift for puzzle lovers.
