const { command ,isPrivate} = require("../lib/");

/* Created by SUHAID-BRO ©2023
Created for AFIYA-MD */

command({
  pattern: "ping",
  fromMe: isPrivate,
  desc: "Bot Speed",
  type: "misc",

},
async (conn, match) => {
	var start = new Date().getTime();
	await conn.sendMessage(conn.chatId, {text:'```Ping!```'});
	var end = new Date().getTime();
	await conn.reply('*Pong!*\n```' + (end - start) + 'ms```');
	});

command({
  pattern: "alive",
  fromMe: isPrivate,
  desc: "Alive Msg",
  type: "misc",

},
async (message, match, m) => {
message.sendMessage(config.ALIVE) 
})
