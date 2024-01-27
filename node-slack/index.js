const { App } = require('@slack/bolt');
const express = require('express');
const bodyParser = require('body-parser');

const SLACK_BOT_TOKEN = "xoxb-6537107037488-6514224563171-lIwJdxhkK3fosH0Pbrt2VZXG";
const SLACK_SIGNING_SECRET = "52272410b380a5b24aebde64ab9948cb";
const SLACK_APP_TOKEN = "xapp-1-A06EPP2EYP9-6537562262944-bbee3af1b582955687773ead9e77f98ed2599d727a436bd99afe9b066538d777";
const SLACK_CHANNEL = "C06FGUAP741";
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

const expressApp = express();

// Sử dụng body-parser để lấy dữ liệu từ biểu mẫu HTML
expressApp.use(bodyParser.urlencoded({ extended: true }));

// Đường dẫn cho trang web
expressApp.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form action="/send-message" method="post">
          <label for="message">Nhập tin nhắn:</label>
          <input type="text" id="message" name="message">
          <button type="submit">Gửi</button>
        </form>
      </body>
    </html>
  `);
});

// Xử lý dữ liệu từ biểu mẫu và gửi tin nhắn đến Slack
expressApp.post('/send-message', async (req, res) => {
  const { message } = req.body;

  try {
    const result = await app.client.chat.postMessage({
      token: SLACK_BOT_TOKEN,
      channel: SLACK_CHANNEL,
      text: message,
    });
    console.log('Message sent successfully:', result);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

// Start máy chủ Express và Bolt app
expressApp.listen(3010, () => {
  console.log('⚡️ Express app is running on http://localhost:3010');
});

app.message(async ({ message, say }) => {
  console.log(message);
});

(async () => {
  try {
    await app.start();
    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    console.error('Error starting the app:', error);
  }
})();
