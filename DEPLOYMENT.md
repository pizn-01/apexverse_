# Deployment Guide for ApexVerse

## Prerequisites

Before deploying, you need:
1. A PostgreSQL database (recommended: [Neon](https://neon.tech) - free tier available)
2. Your database connection string

## Database Setup

### Step 1: Get a PostgreSQL Database

**Option A: Neon (Recommended - Free)**
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string (it looks like: `postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require`)

**Option B: Other Providers**
- [Supabase](https://supabase.com) - Free tier
- [Railway](https://railway.app) - Free tier
- [Render](https://render.com) - Free tier

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your database URL:
   ```env
   DATABASE_URL=postgresql://your-connection-string-here
   ```

### Step 3: Run Database Migration

Create the database tables:
```bash
npm run db:migrate
```

You should see:
```
✅ Created contact_submissions table
✅ Created testimonials table
🎉 Database migration completed successfully!
```

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up database** (see above)

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5000
   - Testimonials Admin: http://localhost:5000/testimonials-admin

## Deployment

### Vercel Deployment

1. **Push your code to GitHub**

2. **Import project to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Add `SESSION_SECRET` with a random string

4. **Deploy:**
   - Vercel will automatically deploy your application
   - The frontend will be served from Vercel
   - The backend API will run as serverless functions

### Important Notes

- **Database persistence:** With the PostgreSQL setup, all testimonials and contact submissions will persist across deployments
- **Without DATABASE_URL:** The app will fall back to in-memory storage (data lost on restart)
- **First deployment:** Make sure to run `npm run db:migrate` before deploying, or run it once in Vercel's terminal

## Troubleshooting

### "DATABASE_URL not set" warning
- This means the app is using in-memory storage
- Set the `DATABASE_URL` environment variable to use persistent storage

### Migration fails
- Check that your `DATABASE_URL` is correct
- Ensure your database is accessible from your network
- For Neon, make sure the connection string includes `?sslmode=require`

### Testimonials not persisting
- Verify `DATABASE_URL` is set in your environment
- Check server logs for "✅ Using PostgreSQL storage" message
- Run `npm run db:migrate` to ensure tables exist

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes* | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Random string for session encryption |
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | Environment (development/production) |
| `FRONTEND_URL` | No | Frontend URL for CORS |

\* Required for persistent storage. Without it, app uses in-memory storage.
