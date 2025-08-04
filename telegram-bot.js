const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram Bot Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';

// Route to handle messages from GitHub profile
app.post('/send-message', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'نام و پیام الزامی است' 
            });
        }

        // Format message for Telegram
        const telegramMessage = `
🔔 پیام جدید از GitHub Profile

👤 نام: ${name}
📧 ایمیل: ${email || 'ارائه نشده'}
💬 پیام:
${message}

⏰ زمان: ${new Date().toLocaleString('fa-IR')}
        `;

        // Send message to Telegram
        const telegramResponse = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: telegramMessage,
                parse_mode: 'HTML'
            }
        );

        if (telegramResponse.data.ok) {
            res.json({ 
                success: true, 
                message: 'پیام با موفقیت ارسال شد!' 
            });
        } else {
            throw new Error('خطا در ارسال پیام به تلگرام');
        }

    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ 
            success: false, 
            error: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.' 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Telegram Bot Server is running' });
});

// Serve static HTML form for testing
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ارسال پیام به تلگرام</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 20px;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    max-width: 500px;
                    width: 100%;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                input, textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 14px;
                    box-sizing: border-box;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #667eea;
                }
                button {
                    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    width: 100%;
                    transition: transform 0.3s ease;
                }
                button:hover {
                    transform: scale(1.05);
                }
                .success {
                    color: green;
                    margin-top: 10px;
                }
                .error {
                    color: red;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>📱 ارسال پیام به تلگرام</h2>
                <form id="messageForm">
                    <div class="form-group">
                        <label for="name">نام *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">ایمیل (اختیاری)</label>
                        <input type="email" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="message">پیام *</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit">📤 ارسال پیام</button>
                    <div id="result"></div>
                </form>
            </div>

            <script>
                document.getElementById('messageForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const formData = new FormData(e.target);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message')
                    };

                    try {
                        const response = await fetch('/send-message', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        });

                        const result = await response.json();
                        const resultDiv = document.getElementById('result');

                        if (result.success) {
                            resultDiv.innerHTML = '<p class="success">✅ ' + result.message + '</p>';
                            e.target.reset();
                        } else {
                            resultDiv.innerHTML = '<p class="error">❌ ' + result.error + '</p>';
                        }
                    } catch (error) {
                        document.getElementById('result').innerHTML = '<p class="error">❌ خطا در ارسال پیام</p>';
                    }
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Telegram Bot Server running on port ${PORT}`);
    console.log(`📱 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Test form: http://localhost:${PORT}`);
});