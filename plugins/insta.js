const { command, isPrivate, isUrl, getJson, getBuffer } = require("../lib")
command(
  {
    pattern: "insta",
    fromMe: isPrivate,
    type: "downloader",
  },
  async (message, match) => {
    if (!match.includes("www.instagram.com")) await message.sendMessage("I need a valid Instagram Link");
    let response = await getJson(`https://api.botcahx.biz.id/api/dowloader/igdowloader?url=${match}&apikey=Admin`);

    let media = await getJson(response.result.url)
    media = await getBuffer(media)
    await message.client.sendMessage(message.jid, { video: media, caption: response.result.decs, mimetype: "video/mp4" }, { quoted: message })
  });
