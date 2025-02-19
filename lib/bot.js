const TelegramBot = require('node-telegram-bot-api');
const ExplorerController = require('./controllers/ExplorerController');

require('dotenv').config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const numberToApplyFb = parseInt(msg.text, 10);

  if (!Number.isNaN(numberToApplyFb)) {
    const fizzbuzzTrick = ExplorerController.applyFizzbuzz(numberToApplyFb);
    const responseBot = `Tu número es: ${numberToApplyFb}. Validación: ${fizzbuzzTrick}`;
    bot.sendMessage(chatId, responseBot);
  } else {
    bot.sendMessage(chatId, 'Envía un número válido');
  }
});
