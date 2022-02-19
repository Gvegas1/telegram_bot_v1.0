const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '5195577814:AAEAWE187uEUsA5RdsGR6U3DKPFxRIvD3T4';

const bot = new TelegramApi(token, { polling: true });

const startGame = (chatId) => {
  const randomNum = Math.floor(Math.random() * 10);
  chats[chatId] = randomNum;
  console.log(randomNum);
};

const chats = {};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Who are me? ' },
    { command: '/game', description: 'Поиграем?)' },
    { command: '/hoooliesheat', description: 'Чееее??' },
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/11.webp',
      );
      return bot.sendMessage(chatId, 'Мой создатель @gvegasss. Посмотри список команд');
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут "${msg.from.first_name}"`);
    }
    if (text === '/game') {
      await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!');
      startGame(chatId);
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/19.webp',
      );
      return bot.sendMessage(chatId, 'Отгадывай :)', gameOptions);
    }
    return bot.sendMessage(chatId, 'Я тебя не понимаю попробуй еще раз!)');
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      startGame(chatId);
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/6.webp',
      );
      return bot.sendMessage(chatId, 'Отгадывай :)', gameOptions);
    }

    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Поздравляю, ты отгадал цифру ${chats[chatId]}!`,
        againOptions,
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Ты не угадал, с тебя косарь. Правильная цифра: ${chats[chatId]}`,
        againOptions,
      );
    }

    /* console.log(msg); */
  });
};

start();
