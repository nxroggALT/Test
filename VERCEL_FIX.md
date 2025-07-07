# Fix Your Vercel Deployment

Your Rain Esports website is deployed at `rain-lemon.vercel.app` but showing source code instead of the website.

## Quick Fix Steps:

### 1. Update Vercel Project Settings
Go to your Vercel dashboard for the `rain-lemon` project:

**Build & Development Settings:**
- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm install`

### 2. Add Environment Variables
In Vercel dashboard, go to Settings > Environment Variables:
- Add: `NODE_ENV` = `production`
- Add: `DATABASE_URL` = `your-database-url` (if you have one)

### 3. Trigger New Deployment
- Go to Deployments tab
- Click "Redeploy" on latest deployment
- Or push a new commit to trigger rebuild

## Alternative: Frontend-Only Deployment

If the full-stack setup is complex, you can deploy just the frontend:

1. **Create a frontend-only build** by temporarily disabling API calls
2. **Use static data** for demonstration
3. **Deploy successfully** to show the website design

## Files I Created:
- `vercel.json` - Vercel configuration
- `build-vercel.js` - Custom build script
- This troubleshooting guide

## Expected Result:
After fixing the build settings, your website should show:
- Professional Rain Esports homepage
- Team sections and tournament info
- Contact form and Discord integration
- Beautiful responsive design

The admin panel won't work without a database, but the main website will display properly.