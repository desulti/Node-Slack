const { App, ExpressReceiver } = require('@slack/bolt');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: 'slack.env' });
// console.log('SLACK_SIGNING_SECRET:', process.env.SLACK_SIGNING_SECRET);

// const expressReceiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    // receiver: expressReceiver,
});

// // Xử lý tin nhắn từ Slack
// app.message(async ({ message, say }) => {
//     await say(`Xin chào, bạn vừa nói: ${message.text}`);
//     console.log('Nội dung tin nhắn:', message.text);
// });

// Xử lý yêu cầu GET đến root của Express
// expressReceiver.app.get('/', (req, res) => {
//     // Trả về mã HTML trực tiếp từ đoạn mã JavaScript
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Your Slack App</title>
//         </head>
//         <body>
//         <a href="https://slack.com/oauth/v2/authorize?scope=chat:write&client_id=6514122443442.6514510899139">
//         Log in to Slack
//         </a>
//         </body>
//         </html>
//     `);
// });

// Kết nối đến Slack webhook và gửi tin nhắn
const axios = require('axios');
const webhookUrl = 'https://hooks.slack.com/services/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';
const message = 'Hello, this is a test message!';

axios.post(webhookUrl, { text: message })
    .then(response => {
        console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });


(async () => {
    await app.start(process.env.PORT || 3200);
    console.log('App is running!');
})();
