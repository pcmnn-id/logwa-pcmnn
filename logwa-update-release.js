const processTime = (timestamp, now) => {return moment.duration(now - moment(timestamp * 1000)).asSeconds()}
const { create, decryptMedia, MessageTypes } = require('@open-wa/wa-automate');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.client = () => gclient;
let gclient = null;
const mime = require('mime-types');
const fs = require('fs');
//TELEGRAM PART
const TelegramBot = require('node-telegram-bot-api');
const token = 'your_telegram_token';
const bot = new TelegramBot(token, {polling: true});
const chatId = 12346789;

create({
	qrLogSkip: false,
	multiDevice: true
}).then(client => start(client));

async function start(client) {
	gclient = client;
    client.onMessage(async message => {
      if (message.mimetype && message.type === 'image') {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
          fs.writeFile(`./docs/${filename}`, mediaData, function(err) {
            if (err) {
              return console.log(err);
            }
            const fileLog = `[ChatLog-Photo] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : **PHOTO SAVED!** `
            const fileTeleLog = `[ChatLog-Photo] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname}`
            bot.sendMessage(chatId, fileTeleLog)
            bot.sendPhoto(chatId, `./docs/${filename}`)
            console.log(fileLog)
           }
          );
      }
      if (message.mimetype && message.type === 'video') {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
          fs.writeFile(`./docs/${filename}`, mediaData, function(err) {
            if (err) {
              return console.log(err);
            }
            const fileLog = `[ChatLog-Video] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : **VIDEO SAVED!** `
            const fileTeleLog = `[ChatLog-Video] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname}`
            bot.sendMessage(chatId, fileTeleLog)
            bot.sendVideo(chatId, `./docs/${filename}`)
            console.log(fileLog)
           }
          );
      }
      if (message.mimetype && message.type === 'document') {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
          fs.writeFile(`./docs/${filename}`, mediaData, function(err) {
            if (err) {
              return console.log(err);
            }
            const fileLog = `[ChatLog] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : **FILE SAVED!** `
            const fileTeleLog = `[ChatLog-File] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname}`
            bot.sendMessage(chatId, fileTeleLog)
            bot.sendDocument(chatId, `./docs/${filename}`)
            console.log(fileLog)
           }
          );
      }
      if (message.mimetype && message.type === 'ptt') {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
          fs.writeFile(`./docs/${filename}`, mediaData, function(err) {
            if (err) {
              return console.log(err);
            }
            const fileLog = `[ChatLog] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : **VN SAVED!** `
            const fileTeleLog = `[ChatLog-VN] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname}`
            bot.sendMessage(chatId, fileTeleLog)
            bot.sendDocument(chatId, `./docs/${filename}`)
            console.log(fileLog)
           }
          );
      }
    })

    client.onAnyMessage(async message => {
      if(message.type === 'chat' && message.fromMe === true){
        const chatLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> (+${message.to.replace("@c.us", "")}) ${message.chat.contact.pushname} : "${message.body}" `
        const teleLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> (+${message.to.replace("@c.us", "")}) ${message.chat.contact.pushname} : \n"${message.body}" `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
      if(message.type === 'chat' && message.fromMe === false){
        const chatLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : "${message.body}" `
        const teleLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : \n"${message.body}" `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
    });

    client.onIncomingCall(async call=>{
        if(call.isVideo === true){
        const sumber = call.peerJid
        const chatLog = `[ChatLog-VideoCall] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        const teleLog = `[ChatLog-VideoCall] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
      if(call.isVideo === false){
        const sumber = call.peerJid
        const chatLog = `[ChatLog-Call] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        const teleLog = `[ChatLog-Call] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
    });
}