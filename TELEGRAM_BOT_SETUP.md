# 🤖 راه‌اندازی ربات تلگرام برای GitHub Profile

این ربات امکان دریافت پیام‌های ارسالی از GitHub Profile شما را به تلگرام فراهم می‌کند.

## 📋 مراحل راه‌اندازی

### 1️⃣ ایجاد ربات تلگرام

1. به تلگرام بروید و `@BotFather` را پیدا کنید
2. دستور `/newbot` را ارسال کنید
3. نام ربات خود را انتخاب کنید (مثل: `GitHub Contact Bot`)
4. یوزرنیم ربات را انتخاب کنید (باید به `bot` ختم شود، مثل: `omidshz_contact_bot`)
5. توکن ربات را کپی کنید (مثل: `6789012345:AAHdqTcvbXorG8X-SQnppBCNcB8u6mw7s0M`)

### 2️⃣ پیدا کردن Chat ID

1. به ربات خود پیام بدهید (هر پیامی)
2. در مرورگر این آدرس را باز کنید:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. در پاسخ، `chat.id` را پیدا کنید (مثل: `123456789`)

### 3️⃣ تنظیم متغیرهای محیطی

1. فایل `.env` بسازید:
   ```bash
   cp .env.example .env
   ```

2. فایل `.env` را ویرایش کنید:
   ```env
   TELEGRAM_BOT_TOKEN=6789012345:AAHdqTcvbXorG8X-SQnppBCNcB8u6mw7s0M
   TELEGRAM_CHAT_ID=123456789
   PORT=3000
   ```

### 4️⃣ نصب وابستگی‌ها

```bash
npm install
```

### 5️⃣ اجرای ربات

```bash
# حالت توسعه
npm run dev

# حالت تولید
npm start
```

### 6️⃣ تست ربات

1. سرور را اجرا کنید
2. به آدرس `http://localhost:3000` بروید
3. فرم تست را پر کنید و ارسال کنید
4. پیام باید در تلگرام شما ظاهر شود

## 🌐 استقرار آنلاین

### Heroku

1. اکانت Heroku بسازید
2. Heroku CLI نصب کنید
3. دستورات زیر را اجرا کنید:

```bash
heroku create your-app-name
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHAT_ID=your_chat_id
git add .
git commit -m "Add Telegram bot"
git push heroku main
```

### Vercel

1. اکانت Vercel بسازید
2. پروژه را به GitHub push کنید
3. در Vercel، پروژه را import کنید
4. متغیرهای محیطی را در تنظیمات Vercel اضافه کنید

### Railway

1. اکانت Railway بسازید
2. پروژه را به GitHub push کنید
3. در Railway، پروژه را deploy کنید
4. متغیرهای محیطی را اضافه کنید

## 🔧 بروزرسانی README.md

پس از استقرار آنلاین، آدرس سرور خود را در فایل `README.md` جایگزین کنید:

```html
<form action="https://your-app-url.herokuapp.com/send-message" method="POST">
```

## 🛡️ نکات امنیتی

- هرگز توکن ربات را در کد منتشر نکنید
- از متغیرهای محیطی استفاده کنید
- فایل `.env` را به `.gitignore` اضافه کنید
- CORS را برای دامنه‌های مشخص تنظیم کنید

## 📱 ویژگی‌ها

- ✅ دریافت پیام‌ها از GitHub Profile
- ✅ فرمت زیبا برای پیام‌های تلگرام
- ✅ اعتبارسنجی ورودی‌ها
- ✅ پشتیبانی از فارسی
- ✅ رابط کاربری زیبا
- ✅ پاسخ‌های مناسب خطا

## 🆘 عیب‌یابی

### پیام ارسال نمی‌شود
- توکن ربات را بررسی کنید
- Chat ID را بررسی کنید
- اتصال اینترنت را بررسی کنید

### خطای CORS
- آدرس سرور را در تنظیمات CORS اضافه کنید

### ربات پاسخ نمی‌دهد
- مطمئن شوید ربات فعال است
- دستور `/start` را به ربات بفرستید