const processTime = (timestamp, now) => {return moment.duration(now - moment(timestamp * 1000)).asSeconds()}
const { create, decryptMedia, MessageTypes } = require('@open-wa/wa-automate');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.client = () => gclient;
let gclient = null;
const mime = require('mime-types');
const fs = require('fs');
const chalk = require('chalk')
const cliBoxes = require('cli-boxes')
//TELEGRAM PART
const TelegramBot = require('node-telegram-bot-api');
const conf = require('./config');
const { Console } = require('console');
const token = conf.token
const bot = new TelegramBot(token, {polling: true});
const chatId = conf.chatId
create({
    sessionId: 'log-wa',
    multiDevice: true,
    headless: true,
    qrTimeout: 60,
    authTimeout: 0,
    restartOnCrash: start,
    cacheEnabled: false,
    useChrome: true,
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: false,
    chromiumArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0'
  ]
}).then(client => start(client));

async function start(client) {
	gclient = client;
  console.log('')
  console.log(chalk.green.bold('Whatsapp to Telegram Logger'))
  console.log(chalk.bold.blue('Build 120422'))
  console.log(chalk.green('Made with' + chalk.red(' ❤  ') +'by PCMNN'))
  console.log('')
  const hostNumber = await client.getHostNumber()
  bot.sendMessage(chatId, `Whatsapp Session Connected to +${hostNumber}\n------\nWhatsapp to Telegram Logger\nBuild 120422\nMade with ❤ by PCMNN`)
    client.onMessage(async message => {
      if (message.mimetype && message.type === 'image') {
        const filename = `${message.sender.pushname} - ${message.t}.${mime.extension(message.mimetype)}`;
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
        const filename = `${message.sender.pushname} - ${message.t}.${mime.extension(message.mimetype)}`;
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
        const filename = `${message.sender.pushname} - ${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
          fs.writeFile(`./docs/${filename}`, mediaData, function(err) {
            if (err) {
              return console.log(err);
            }
            const fileLog = `[ChatLog-File] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : **FILE SAVED!** `
            const fileTeleLog = `[ChatLog-File] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname}`
            bot.sendMessage(chatId, fileTeleLog)
            bot.sendDocument(chatId, `./docs/${filename}`)
            console.log(fileLog)
           }
          );
      }
      if (message.mimetype && message.type === 'ptt') {
        const filename = `${message.sender.pushname} - ${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
          fs.writeFile(`./docs/${filename}`, mediaData, function(err) {
            if (err) {
              return console.log(err);
            }
            const fileLog = `[ChatLog-VN] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : **VN SAVED!** `
            const fileTeleLog = `[ChatLog-VN] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname}`
            bot.sendMessage(chatId, fileTeleLog)
            bot.sendDocument(chatId, `./docs/${filename}`)
            console.log(fileLog)
           }
          );
      }
    })

    client.onAnyMessage(async message => {
      if(message.type === 'chat' && message.fromMe === true && message.isGroupMsg === false){
        const chatLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> (+${message.to.replace("@c.us", "")}) ${message.chat.contact.pushname} : "${message.body}" `
        const teleLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> (+${message.to.replace("@c.us", "")}) ${message.chat.contact.pushname} : \n"${message.body}" `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
      if(message.type === 'chat' && message.fromMe === false && message.isGroupMsg === false){
        const chatLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : "${message.body}" `
        const teleLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : \n"${message.body}" `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
      if(message.type === 'chat' && message.fromMe === false && message.isGroupMsg === true){
        const chatLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : "${message.body}" `
        const teleLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : \n"${message.body}" `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
      if(message.type === 'chat' && message.fromMe === true && message.isGroupMsg === true){
        const chatLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : "${message.body}" `
        const teleLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : \n"${message.body}" `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
      if(message.type === 'sticker' && message.fromMe === true && message.isGroupMsg === false){
        const chatLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> (+${message.to.replace("@c.us", "")}) ${message.chat.contact.pushname} : Sticker! `
        const teleLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> (+${message.to.replace("@c.us", "")}) ${message.chat.contact.pushname} : \nSticker! `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
      if(message.type === 'sticker' && message.fromMe === false && message.isGroupMsg === false){
        const chatLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : Sticker! `
        const teleLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} : \nSticker! `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
      if(message.type === 'sticker' && message.fromMe === false && message.isGroupMsg === true){
        const chatLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : Sticker! `
        const teleLog = `[ChatLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : \nSticker! `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
      if(message.type === 'sticker' && message.fromMe === true && message.isGroupMsg === true){
        const chatLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : Sticker! `
        const teleLog = `[ChatLog-Out] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> ${message.chat.formattedTitle} : \nSticker! `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
      if(message.type === 'call_log' && message.subtype === 'miss' || message.subtype === 'miss_video'){
        const chatLog = `[CallLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> MISSED CALL! `
        const teleLog = `[CallLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} (+${message.sender.id.replace("@c.us", "")}) ${message.sender.pushname} -> MISSED CALL! `
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog)
      }
    });
    
    client.onIncomingCall(async call=>{
        if(call.isVideo === true){
        const sumber = call.peerJid
        const chatLog = `[VideoCall-In] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        const teleLog = `[VideoCall-In] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
      if(call.isVideo === false){
        const sumber = call.peerJid
        const chatLog = `[CallLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        const teleLog = `[CallLog-In] ${moment().format("DD/MM/YY hh:mm:ss")} from (+${sumber.replace("@c.us", "")})`
        console.log(chatLog);
        bot.sendMessage(chatId, teleLog);
      }
    });
}