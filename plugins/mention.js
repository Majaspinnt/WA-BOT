const {SUDO} = require('../config');

var duration = 19998000

var audios = `https://i.imgur.com/2nEwQLy.mp4,https://i.imgur.com/lDZOEHl.mp4,https://i.imgur.com/WxQbgOU.mp4,https://i.imgur.com/BVypaUc.mp4,https://i.imgur.com/L9Jnpt5.mp4,https://i.imgur.com/3Te73pm.mp4,https://i.imgur.com/gkzBe1X.mp4,https://i.imgur.com/aEpNAtl.mp4,https://i.imgur.com/JiuFyXy.mp4,https://i.imgur.com/jEVzyWS.mp4,https://i.imgur.com/1npmJY6.mp4`;
var tit = "Diego";
var art = "Hy";
var logo = "https://i.imgur.com/bk3EKWZ.jpeg";
const image = "https://i.imgur.com/bLNO98n.jpeg";
const image_1 = "https://i.imgur.com/bk3EKWZ.jpeg";
const {getAudioBufferFromLink,addInfo,jslbuffer} = require('abu-bot')
const {readFileSync} = require('fs')
const {command} = require('../lib/');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
command({pattern: 'mention ?(.*)', fromMe: true,dontAddCommandList: true}, (async (message, match) => {return;}));
command({on: 'text' ,fromMe: false}, (async (message, match) => {
const image1 = await jslbuffer(image)
			const image2 = await jslbuffer(image_1)
			const audio = await jslbuffer(audios)
var jids = audios.split(',').filter(link => link.includes('mp4'));
try {var men = message.mention[0].split('@')[0]} catch {return;}
if (message.mention && message.mention[0] && SUDO.includes(men)) {
getAudioBufferFromLink(jids[Math.floor(Math.random()*jids.length)],async function(audio) {
if (audio) {
try { var res = await addInfo('mention_msg.mp3',tit,art,'diego audio metadata',await jslbuffer(logo)) } catch(e) { return await message.sendMessage('Error on parsing audio \n'+e); }
return message.client.sendMessage(message.jid, { audio: res,mimetype: 'audio/mp4',
			ptt: true,
			waveform: [00,99,00,99,00,99,00],
			contextInfo: {
			externalAdReply: {
					title: "toxic cyber ",
					body: "sᴏᴜɴᴅ : ▮▮▮▮▮▮▯▯▯",
					mediaType: 2,
					thumbnail: image2,
					mediaUrl: 'https://www.instagram.com/diego',
					sourceUrl: 'https://www.instagram.com/diego',
					
					}
				}
			}, { quoted: message })}
})}
}));
