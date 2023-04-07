const {SUDO} = require('../config');

var duration = 19998000

var audios = `https://i.imgur.com/bs54FTz.mp4,https://i.imgur.com/pStrWEm.mp4,https://i.imgur.com/u4YfWNA.mp4,https://i.imgur.com/xNU6Geg.mp4`;
var tit = "Suhaid";
var art = "Adiya";
var logo = "https://i.imgur.com/svdEe54.jpeg";
const image = "https://i.imgur.com/ti5C4TO.jpeg";
const image_1 = "https://i.imgur.com/svdEe54.jpeg";
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
			waveform: [10,99,00,100,00,99,10],
			contextInfo: {
			externalAdReply: {
					title: "Aғɪʏᴀ-Bᴏᴛ-Mᴅ ",
					body: "▶︎ •၊၊၊|။။၊|။|။|||။၊| 0:21",
					mediaType: 2,
					thumbnail: image2,
					mediaUrl: 'https://www.instagram.com/______suhaid',
					sourceUrl: 'https://www.instagram.com/______suhaid',
					
					}
				}
			}, { quoted: message })}
})}
}));
