const {
  command,
  isPrivate,
 getJson
} = require("../lib")

command(
  {
    pattern: "insta ?(.*)",
    fromMe: isPrivate,
    desc: "downloads video from instagram",
    type: "downloader",
  },
  async (message, match) => {
   match = match || message.reply_message.text;
    if (!match) return await message.sendMessage("*_Need Instagram Reel Url_*");
    
    if (!match.includes("https://www.instagram.com"))
      return await message.reply("_Invalid URL_");
       message.reply("*Downloading...*");
    let response = await getJson(
      `https://api-viper-x0.vercel.app/api/insta?url=${match}`
    );
    try { message.sendFromUrl(response.media.url); } catch { message.sendMessage("_Error!!_"); }
  }
);
