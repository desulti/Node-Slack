const { App } = require('@slack/bolt');
const dotenv = require('dotenv');

// dotenv.config({ path: 'slack.env' });

const SLACK_BOT_TOKEN = "xoxb-6537107037488-6514224563171-lIwJdxhkK3fosH0Pbrt2VZXG";
const SLACK_SIGNING_SECRET = "52272410b380a5b24aebde64ab9948cb";
const SLACK_APP_TOKEN = "xapp-1-A06EPP2EYP9-6537562262944-bbee3af1b582955687773ead9e77f98ed2599d727a436bd99afe9b066538d777";
const SLACK_CHANNEL = "C06FGUAP741";
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000
});

// Listens to incoming messages that contain "hello"
// app.message('hello', async ({ message, say }) => {
//   console.log(message);
//   // say() sends a message to the channel where the event was triggered
//   try {
//     await say(`Hey there <@${message.user}>!`);
//   } catch (error) {
//     console.error('Error responding to message:', error);
//   }
// });

// app.message(async ({ message, say }) => {
//   try {
//     // Lấy lịch sử tin nhắn từ kênh
//     const history = await app.client.conversations.history({
//       token: SLACK_BOT_TOKEN,
//       channel: SLACK_CHANNEL,
//     });
    
//     // Xử lý và hiển thị tin nhắn theo cách bạn muốn
//     const messages = history.messages;
//     messages.forEach((msg) => {
//       say(`${msg.user}: ${msg.text}`);
//       console.log(history.messages);
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

app.message(async ({ message, say }) => {
  console.log(message);
  
  // Send a message to a channel
  try {
      const result = await app.client.chat.postMessage({

          token: SLACK_BOT_TOKEN,
          channel: SLACK_CHANNEL, // Replace with your channel ID
          text: 'Toi la An!',
      });
      console.log('Message sent successfully:', result);
  } catch (error) {
      console.error('Error sending message:', error);
  }
});


// app.message(async ({ message, say }) => {
//   await say(`Xin chào, bạn vừa nói: ${message.text}`);
//   console.log('Nội dung tin nhắn:', message.text);
// });

// Handle errors
app.error((error) => {
  console.error('Error:', error);
});

(async () => {
  // Start your app
  try {
    await app.start();
    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    console.error('Error starting the app:', error);
  }
})();