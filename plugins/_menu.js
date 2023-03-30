const events = require("../lib/event");
const { FancyRandom, jslbuffer } = require ("abu-bot");
const { command, isPrivate, tiny, serif_B, clockString } = require("../lib");
const { OWNER_NAME, BOT_NAME,FOOTER,THEME, HANDLERS } = require("../config");
const config = require("../config.js");
const prefix = config.PREFIX
const { hostname, uptime } = require("os");
const thumb = "https://i.imgur.com/E4JrhtY.png";
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (match) {
      for (let i of events.commands) {
        if (i.pattern.test(message.prefix + match))
          message.reply(
            `\`\`\`Command : ${mssage.prefix}${match.trim()}
Description : ${i.desc}\`\`\``
          );
      }
    } else {
    let logo = await jslbuffer(thumb)
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `┏━━━━━⟪ ${BOT_NAME} ⟫━━━⦿
┃ ✗ *OWNER* :  ${OWNER_NAME}
┃ ✗ *PREFIX* : ${HANDLERS}
┃ ✗ *USER* : ${message.pushName}
┃ ✗ *HOST NAME* : ${hostname().split("-")[0]}
┃ ✗ *DATE* : ${date}
┃ ✗ *TIME* : ${time}
┗━━━━━━━━━━━━━━━⦿
┏━━━『 *UPDATED* 』━━━❖\n╽`;
      let cmnd = [];
      let cmd;
      let category = [];
      events.commands.map((command, num) => {
        if (command.pattern) {
          cmd = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type;
          if (!command.type) {
            type = "misc";
          } else {
            type = command.type.toLowerCase();
          }

          cmnd.push({ cmd, type: type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
       menu += ` 
┃┏━━━━━━━━━━━━━◆
┣┃ *❃- ${cmmd} -✯*
┃┗━━━━━━━━━━━━━◆
┃\n┃┏━━━━━━━━━━━ᐧᐧᐧᐧ⦿`;    
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }, num) => {
          menu += `\n┃┃❀ ${(num += 1)} ${cmd.trim()}`;
        });
        menu += `\n┃┗━━━━━━━━━━━━ᐧᐧᐧᐧ⦿\n┃`;
      });             


      menu += `\n┗━━━━━━━━━━━╾ᐧᐧᐧᐧ⦿`;
      return await message.client.sendMessage(message.jid, {
      image: { url: 'https://i.imgur.com/cJnn1gU.png', },
      caption: tiny(menu),
      footer: tiny(
             `${config.FOOTER}`),
    
    contextInfo: {
				externalAdReply: {
					title:  "${config.THEME}",
					body: "ᴄʀᴇᴀᴛᴇᴅ ʙy ꜱᴜʜᴀɪᴅ 🎈",
					mediaType: 2,
					thumbnail: logo,
					mediaUrl: 'https://www.instagram.com/______suhaid',
					sourceUrl: 'https://www.instagram.com/______suhaid',
					showAdAttribution: true
					}
				}
			}, {quoted: message})
			}
})


command(
  {
    pattern: "list",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    let menu = `┏━━━━━━━━━━━━━━━━━━━┓
                  ${BOT_NAME}
┗━━━━━━━━━━━━━━━━━━━┛\n`;

    let cmnd = [];
    let cmd, desc;
    events.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern
          .toString()
          .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
      } 
      if (command.desc) {
        desc = command.desc;
      } else {
        desc = false;
      }
      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `┃× ${(num += 1)} *${cmd.trim()}*\n`;
    });
    menu += `┗━━━━━━━━━━━━━━━━━━━`;
    return await message.reply(menu);
  }
);
