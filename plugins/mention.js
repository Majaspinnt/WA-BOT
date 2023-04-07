const {SUDO} = require('../config');

var duration = 19998000

var audios = `https://i.imgur.com/RmP0vux.mp4,https://i.imgur.com/uMYY7jB.mp4`;
var tit = "Suhaid";
var art = "afiya";
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
			waveform: [50,150,80,0,80,150,50],
			contextInfo: {
			externalAdReply: {
					title: "Aғɪʏᴀ-Bᴏᴛ-Mᴅ ",
					body: "▶︎ •၊၊၊|။။၊|။|။|||။၊| 0:22",
					mediaType: 2,
					thumbnail: image2,
					mediaUrl: 'https://www.instagram.com/______suhaid',
					sourceUrl: 'https://www.instagram.com/______suhaid',
					
					}
				}
			}, { quoted: message })}
})}
}));
