# 🚀 Deployment Checklist for ApexVerse

## ✅ Pre-Deployment Verification

### Database Connection
- [x] Supabase database configured
- [x] Connection pooler URL set (port 6543)
- [x] Tables created (`contact_submissions`, `testimonials`)
- [x] Database operations tested (INSERT, DELETE, SELECT)
- [x] Connection verified with `npm run db:verify`

### Code Changes
- [x] Migrated from Neon to Supabase
- [x] Updated `server/storage.ts` to use `pg` driver
- [x] Updated `db-migrate.ts` for Supabase compatibility
- [x] Environment variables configured in `.env`

## 📋 Deployment Steps

### 1. Commit and Push to GitHub

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Migrate to Supabase database for testimonials feature"

# Push to main branch
git push origin main
```

### 2. Configure Vercel Environment Variables

Go to: https://vercel.com/your-project/settings/environment-variables

Add these variables for **Production**, **Preview**, and **Development**:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `postgresql://postgres.dmhcvvfmaegczwymrwms:ZJ#r+cB4C#Rge9g@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres` | Supabase connection string |
| `SESSION_SECRET` | `[GENERATE_NEW_SECURE_KEY]` | Use a strong random string |
| `NODE_ENV` | `production` | Production only |
| `FRONTEND_URL` | `https://apexverse.site` | Your domain |

**Generate SESSION_SECRET:**
```powershell
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### 3. Deploy to Vercel

Option A: **Automatic Deployment**
- Vercel will auto-deploy when you push to GitHub
- Wait for deployment to complete (~2-3 minutes)

Option B: **Manual Deployment**
1. Go to Vercel Dashboard
2. Click **Deployments**
3. Click **Redeploy** on latest deployment

### 4. Post-Deployment Verification

#### Test Homepage
- [ ] Visit `https://apexverse.site`
- [ ] Verify page loads correctly
- [ ] Check that all sections render properly

#### Test Contact Form
- [ ] Navigate to contact section
- [ ] Submit a test contact form
- [ ] Verify submission is saved in Supabase
  - Go to Supabase → Table Editor → `contact_submissions`

#### Test Testimonials Feature
- [ ] Visit `https://apexverse.site/testimonials-admin`
- [ ] Add a test testimonial:
  - Platform: X (Twitter)
  - URL: `https://x.com/example/status/123`
  - Author: Test User
  - Content: "Great service!"
- [ ] Verify testimonial appears on homepage
- [ ] Delete the test testimonial
- [ ] Verify it's removed from homepage

#### Check Database
- [ ] Go to Supabase Dashboard
- [ ] Navigate to Table Editor
- [ ] Verify `testimonials` table has data
- [ ] Verify `contact_submissions` table has data

#### Check Logs
- [ ] Go to Vercel → Deployments → Latest
- [ ] Click **Functions** → Select any function
- [ ] Look for: `✅ Using PostgreSQL storage`
- [ ] Verify no connection errors

## 🔧 Troubleshooting

### Issue: Environment Variables Not Loading
**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Verify all variables are set for Production
3. Click **Redeploy** to apply changes

### Issue: Database Connection Timeout
**Solution:**
1. Verify you're using the Connection Pooler URL (port 6543)
2. Check Supabase project is active
3. Test connection locally: `npm run db:verify`

### Issue: Testimonials Not Saving
**Solution:**
1. Check Vercel function logs for errors
2. Verify `DATABASE_URL` is set correctly
3. Test API endpoint: `curl https://apexverse.site/api/testimonials`
4. Check Supabase logs for connection issues

### Issue: "Failed to fetch testimonials"
**Solution:**
1. Open browser console (F12)
2. Check Network tab for failed requests
3. Verify API endpoint is accessible
4. Check CORS settings if needed

## 📊 Monitoring

### Daily Checks
- [ ] Check Vercel deployment status
- [ ] Monitor Supabase database usage
- [ ] Review error logs in Vercel

### Weekly Checks
- [ ] Review testimonials for spam
- [ ] Check contact form submissions
- [ ] Monitor database size and performance

### Monthly Checks
- [ ] Rotate `SESSION_SECRET` if needed
- [ ] Review and optimize database queries
- [ ] Check for security updates

## 🔐 Security Best Practices

### Immediate Actions
- [ ] Never commit `.env` file (already in `.gitignore`)
- [ ] Use strong `SESSION_SECRET` in production
- [ ] Keep database credentials secure

### Optional (Recommended)
- [ ] Enable Row Level Security (RLS) in Supabase
- [ ] Set up database backups in Supabase
- [ ] Configure rate limiting for API endpoints
- [ ] Add authentication for `/testimonials-admin` route

### Enable RLS in Supabase
```sql
-- Enable RLS on testimonials table
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON testimonials
  FOR SELECT USING (true);

-- Restrict write access (you can add authentication later)
CREATE POLICY "Allow authenticated insert" ON testimonials
  FOR INSERT WITH CHECK (false); -- Change to true when auth is ready
```

## 📝 Final Checklist

Before marking deployment as complete:

- [ ] Code pushed to GitHub
- [ ] Vercel environment variables configured
- [ ] Deployment completed successfully
- [ ] Homepage loads correctly
- [ ] Contact form works
- [ ] Testimonials can be added
- [ ] Testimonials appear on homepage
- [ ] Testimonials can be deleted
- [ ] Database connection verified
- [ ] No errors in Vercel logs
- [ ] Supabase tables populated correctly
- [ ] `SESSION_SECRET` is strong and unique
- [ ] Documentation updated

## 🎉 Success!

Once all items are checked, your deployment is complete!

### Next Steps
1. Monitor the application for 24-48 hours
2. Collect real testimonials from users
3. Consider adding authentication for admin panel
4. Set up automated backups in Supabase
5. Configure monitoring and alerts

### Useful Commands

```bash
# Verify database connection
npm run db:verify

# Run database migration
npm run db:migrate

# Start local development
npm run dev

# Build for production
npm run build

# Check TypeScript
npm run check
```

### Useful Links
- **Production Site**: https://apexverse.site
- **Testimonials Admin**: https://apexverse.site/testimonials-admin
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **GitHub Repo**: https://github.com/pizn-01/apexverse_

---

**Deployment Date**: December 1, 2025
**Database**: Supabase PostgreSQL
**Hosting**: Vercel
**Domain**: apexverse.site
