# Supabase Database Configuration & Deployment Guide

## ✅ Migration Complete

Your ApexVerse project has been successfully migrated from Neon to Supabase PostgreSQL database.

## 🔧 Changes Made

### 1. Database Driver Update
- **Removed**: `@neondatabase/serverless` (Neon-specific HTTP driver)
- **Added**: `pg` and `@types/pg` (Standard PostgreSQL driver compatible with Supabase)

### 2. Code Updates
- **`server/storage.ts`**: Updated to use `pg.Pool` instead of Neon's HTTP client
- **`db-migrate.ts`**: Updated migration script to use standard PostgreSQL connection
- **Database connection**: Now uses connection pooling for better performance

### 3. Environment Configuration
Your `.env` file is configured with:
```env
DATABASE_URL=postgresql://postgres.dmhcvvfmaegczwymrwms:ZJ#r+cB4C#Rge9g@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
SESSION_SECRET=dev_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=https://apexverse.site
```

## 📊 Database Tables

The following tables have been created in your Supabase database:

### 1. `contact_submissions`
Stores contact form submissions from your website.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR (UUID) | Primary key |
| name | TEXT | Submitter's name |
| email | TEXT | Submitter's email |
| subject | TEXT | Optional subject |
| message | TEXT | Message content |
| created_at | TIMESTAMP | Submission timestamp |

### 2. `testimonials`
Stores testimonials from Instagram and X (Twitter).

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR (UUID) | Primary key |
| platform | TEXT | 'instagram' or 'x' |
| post_url | TEXT | URL to original post |
| author_name | TEXT | Author's name |
| author_handle | TEXT | Social media handle |
| content | TEXT | Testimonial content |
| image_url | TEXT | Optional image URL |
| created_at | TIMESTAMP | Creation timestamp |

## 🚀 Deployment to Vercel (apexverse.site)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Migrate to Supabase database"
git push origin main
```

### Step 2: Configure Vercel Environment Variables

Go to your Vercel project dashboard:
1. Navigate to **Settings** → **Environment Variables**
2. Add/Update the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres.dmhcvvfmaegczwymrwms:ZJ#r+cB4C#Rge9g@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres` | Production, Preview, Development |
| `SESSION_SECRET` | Generate a secure random string | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `FRONTEND_URL` | `https://apexverse.site` | Production |

**Important**: For `SESSION_SECRET`, generate a secure random string:
```bash
# On Windows PowerShell:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Or use an online generator:
# https://randomkeygen.com/
```

### Step 3: Deploy

Vercel will automatically deploy when you push to GitHub. If you need to manually deploy:

1. Go to your Vercel dashboard
2. Click **Deployments**
3. Click **Redeploy** on the latest deployment

### Step 4: Verify Deployment

After deployment completes:

1. **Check Homepage**: Visit `https://apexverse.site`
2. **Test Contact Form**: Submit a test contact form
3. **Check Testimonials**: Visit `https://apexverse.site/testimonials-admin`
4. **Add a Testimonial**: Test adding a new testimonial

## 🎯 Testimonials Feature

### Admin Interface
Access the testimonials admin panel at:
- **Local**: `http://localhost:5000/testimonials-admin`
- **Production**: `https://apexverse.site/testimonials-admin`

### Adding Testimonials

#### Method 1: Auto-Extract from URL (X/Twitter)
1. Copy the URL of a tweet mentioning your service
2. Paste it in the admin interface
3. Click "Extract" - the system will automatically fetch:
   - Author name
   - Author handle
   - Tweet content
4. Review and click "Add Testimonial"

#### Method 2: Manual Entry (Instagram or X)
1. Select platform (Instagram or X)
2. Enter the post URL
3. Fill in:
   - Author name
   - Author handle (optional)
   - Content/quote
   - Image URL (optional)
4. Click "Add Testimonial"

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/testimonials` | GET | Fetch all testimonials |
| `/api/testimonials` | POST | Create new testimonial |
| `/api/testimonials/:id` | DELETE | Delete a testimonial |
| `/api/testimonials/extract-x` | POST | Extract content from X post |
| `/api/testimonials/extract-instagram` | POST | Extract content from Instagram post |

## 🔍 Verifying Database Connection

### In Supabase Dashboard
1. Go to your Supabase project
2. Navigate to **Table Editor**
3. You should see:
   - `contact_submissions` table
   - `testimonials` table

### Check Logs
In Vercel:
1. Go to **Deployments** → Select your deployment
2. Click **Functions** → Select a function
3. Check logs for: `✅ Using PostgreSQL storage`

## 🛠️ Troubleshooting

### Issue: "DATABASE_URL not set" error
**Solution**: Verify environment variables are set in Vercel dashboard

### Issue: Connection timeout
**Solution**: 
- Ensure you're using the **Connection Pooler** URL (port 6543)
- Check that Supabase project is active
- Verify the password is correct (special characters must be URL-encoded)

### Issue: Testimonials not appearing
**Solution**:
1. Check Supabase Table Editor to verify data is being saved
2. Check browser console for API errors
3. Verify `/api/testimonials` endpoint returns data

### Issue: IPv6 connection errors
**Solution**: Use the Connection Pooler URL (aws-1-ap-southeast-1.pooler.supabase.com) instead of direct connection (db.dmhcvvfmaegczwymrwms.supabase.co)

## 📝 Local Development

### Start Development Server
```bash
npm install
npm run dev
```

### Run Database Migration (if needed)
```bash
npm run db:migrate
```

### Access Application
- Frontend: `http://localhost:5000`
- Testimonials Admin: `http://localhost:5000/testimonials-admin`
- API: `http://localhost:5000/api/*`

## 🔐 Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong SESSION_SECRET** in production
3. **Rotate database password** periodically
4. **Enable Row Level Security (RLS)** in Supabase for additional protection:
   - Go to Supabase → Authentication → Policies
   - Create policies for `testimonials` and `contact_submissions` tables

## 📊 Monitoring

### Supabase Dashboard
- Monitor database usage
- View query performance
- Check connection pooler stats

### Vercel Analytics
- Monitor API response times
- Track error rates
- View deployment logs

## 🎉 Success Checklist

- [x] Database migrated from Neon to Supabase
- [x] Tables created (`contact_submissions`, `testimonials`)
- [x] Environment variables configured
- [x] Code updated to use `pg` driver
- [ ] Pushed to GitHub
- [ ] Vercel environment variables updated
- [ ] Deployed to production
- [ ] Tested contact form
- [ ] Tested testimonials feature
- [ ] Verified database connection in production

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check Supabase logs in the dashboard
3. Verify environment variables are correctly set
4. Ensure database tables exist

---

**Last Updated**: December 1, 2025
**Database**: Supabase PostgreSQL
**Deployment**: Vercel (apexverse.site)
