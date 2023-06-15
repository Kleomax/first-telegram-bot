const telegramApi = require('node-telegram-bot-api');

const {gameOptions, againOptions} = require('./options')

const token = '6006319307:AAG95HDFyoh2MdOGxK9RQoRq57ZT9pEKulg';

const bot = new telegramApi(token, {polling: true});

const chats = {};

const startGame = async (chatId) => {
        await bot.sendMessage(chatId, `Сейчас мы узнаем стоит тебе идти в казино или нет`)
        const randomNumber = Math.floor(Math.random() * 15)
        chats[chatId] = randomNumber;
        console.log(randomNumber)
        await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
};


bot.setMyCommands([
    {command: '/start', description: 'Приветствие'},
    {command: '/info', description: 'Долг'},
    {command: 'game', description: 'Игра'},
])

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg);
        if (text === "/start") {
            await bot.sendSticker(chatId, "https://chpic.su/_data/stickers/g/Gachi_StickersPack/Gachi_StickersPack_007.webp")
            return bot.sendMessage(chatId, `Здарова, Сейчас я тебя ознакомлю с моими командами. Имеются команды /game и /info. /game отвечает за старт игры на удачу, а /info она даёт возможность узнать количество сыгранных игр и кол-во отгаданых чисел. `)
        }
        if (text === "/info") {
            await bot.sendMessage(chatId, `Кол-во отгаданных чисел: кол-во попыток:`)
            return bot.sendSticker(chatId, "https://chpic.su/_data/stickers/b/butylokvodkii/butylokvodkii_013.webp?v=1686306302")
        }
        if (msg.from.id === 5773470793) {
            await bot.sendMessage(chatId, "Номер, CVC и Срок годности карты скинь или у тебя хуй размером с атом станет и улетит в стратосферу ")
            return bot.sendSticker(chatId, "https://chpic.su/_data/stickers/b/butylokvodkii/butylokvodkii_017.webp?v=1686306302")
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, "Что за черкаши? Используй комманды!")
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(msg)
        console.log(data)
        console.log(chats)
        
        if (data === '/play again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            await bot.sendMessage(chatId,  `Твоя удача готова для казино`, againOptions)
            return bot.sendSticker(chatId, "https://chpic.su/_data/stickers/d/Davaibuhnem/Davaibuhnem_006.webp?v=1686489301")
        }
        else if (data !== chats[chatId]) {
            await bot.sendMessage(chatId, `Твоя удача продырявлена, бот загадал цифру ${chats[chatId]}`, againOptions)
            return bot.sendSticker(chatId, "https://chpic.su/_data/stickers/d/Dialogback_by_fStikBot/Dialogback_by_fStikBot_001.webp?v=1686111302")
        }
    })

};
start();