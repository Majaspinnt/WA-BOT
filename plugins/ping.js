const { command ,isPrivate} = require("../lib/");

/* Copyright (C) 2022 SUHAID-BRO.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Afiya-md
*/

command(
	{
		pattern: 'ping',
		isOwner: true,
		desc: "Measures your ping.", 
		type: 'misc'
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
