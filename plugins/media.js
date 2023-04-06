const {
  Function,
  command,
  qrcode,
  webp2mp4,
  isUrl,
  isPrivate,
  getJson,
  getUrl,
  isIgUrl,
  findMusic,
} = require("../lib/");
const { yta, ytIdRegex, ytv } = require("../lib/yotube");
const { search } = require("yt-search");
const { toAudio } = require("../lib/media");
let gis = require("g-i-s");
const { AddMp3Meta } = require("../lib");

const jimp = require("jimp");
const QRReader = require("qrcode-reader");
const { RMBG_KEY } = require("../config");
let { unlink } = require("fs/promises");
const got = require("got");
const FormData = require("form-data");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const fs = require("fs");
/* Copyright (C) 2022 SUHAID-BRO.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Afiya-md
*/



Function(
  {
    pattern: "img",
    fromMe: isPrivate,
    desc: "Google Image search",
    type: "downloader",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("Enter Search Term,number");
    let [query, amount] = match.split(",");
    let result = await gimage(query, amount);
    await message.sendMessage(
      `_Downloading ${amount || 5} images for ${query}_`
    );
    for (let i of result) {
      await message.sendFromUrl(i);
    }
  }
);

async function gimage(query, amount = 5) {
  let list = [];
  return new Promise((resolve, reject) => {
    gis(query, async (error, result) => {
      for (
        var i = 0;
        i < (result.length < amount ? result.length : amount);
        i++
      ) {
        list.push(result[i].url);
        resolve(list);
      }
    });
  });
}


/* Copyright (C) 2022 SUHAID-BRO.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Afiya-md
*/

command(
  {
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(buff, {}, "image");
  }
);

command(
  {
    pattern: "mp4",
    fromMe: isPrivate,
    desc: "Changes sticker to Video",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    let buffer = await webp2mp4(buff);
    return await message.sendMessage(buffer, {}, "video");
  }
);

command(
  {
    pattern: "song",
    fromMe: isPrivate,
    desc: "Downloads Song",
    type: "downloader",
  },
  async (message, match) => {
    if (!(match || message.reply_message.text))
      return await message.reply("_Enter Song Name_");
    match = match || message.reply_message.text;
    if (ytIdRegex.test(match)) {
      yta(match.trim()).then(async ({ dl_link, title, thumb }) => {
        message.reply("1 " + dl_link)
      let buff = await AddMp3Meta(dl_link, thumb, {
          title,
        });
        message.sendMessage(
          buff,
          { mimetype: "audio/mpeg", quoted: message.data },
          "audio"
        );
      });
    }
    search(match + "song").then(async ({ videos }) => {
      await message.reply(`_Downloading ${videos[0].title}_`);
      let a = videos[0].url
    //  let b = a.url
      await message.reply(`${a}`)
      yta(videos[0].url).then(async ({ dl_link, title, thumb }) => {
   //     message.reply()
        let buff = await AddMp3Meta(dl_link, thumb, {
          title,
          artist: [videos[0].author],
        });
        message.sendMessage(
          buff,
          { mimetype: "audio/mpeg", quoted: message.data },
          "audio"
        );
      });
    });
  }
);


command(
  {
    pattern: "video ?(.*)",
    fromMe: isPrivate,
    desc: "Downloads video",
    type: "downloader",
  },
  async (message, match) => {
  //  if (!match || !message.reply_message.text)
   //   return await message.reply("_Enter Video Name_");
    match = match || message.reply_message.text;
    if (ytIdRegex.test(match)) {
      ytv(match.trim()).then(({ dl_link, title }) => {
        message.sendFromUrl(dl_link, { filename: title });
      });
    }
    search(match).then(async ({ videos }) => {
      await message.reply(`_Downloading ${videos[0].title}_`);
      ytv(videos[0].url).then(({ dl_link, title }) => {
        message.sendFromUrl(dl_link, { filename: title, quoted: message });
      });
    });
  }
);


command(
  {
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/voice to mp3",
    type: "downloader",
  },
  async (message, match, m) => {
    //if(message.reply_message.text) return await message.reply('_Enter Video Name_')
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
    return await message.sendMessage(buff, { mimetype: "audio/mpeg" }, "audio");
  }
);


//message.reply_message.text
command(
  {
    pattern: "insta ?(.*)",
    fromMe: isPrivate,
    desc: "downloads video from instagram",
    type: "downloader",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("ᴇɴᴛᴇʀ ʟɪɴᴋ");
   // match = match || message.reply_message.text;
    
    if (!match.includes("instagram.com"))
      return await message.reply("_Invalid URL_");
    let response = await getJson(
      `https://api-viper-x0.vercel.app/api/insta?url=${match}`
    );
    try { message.sendFromUrl(response.result[1].url); } catch { message.sendMessage("ᴏᴏᴘs !! sᴏᴍᴛʜɪɴɢ ᴡᴇɴᴛ ᴡʀᴏɴɢ 🥴"); }
  }
);

command(
  {
    pattern: "yts",
    fromMe: isPrivate,
    desc: "Search Youtube",
    type: "Search",
  },
  async (message, match) => {
    if (!match) return await message.reply("_Enter a search term_");
    let rows = [];
    search(match).then(async ({ videos }) => {
      videos.forEach((result) => {
        rows.push({
          title: result.title,
          description: `\nDuration : ${result.duration.toString()}\nAuthor : ${
            result.author
          }\nPublished : ${result.ago}\nDescription : ${
            result.description
          }\nURL : ${result.url}`,
          rowId: ` `,
        });
      });
      await message.client.sendMessage(message.jid, {
        text: "Youtube Search for " + match,
        buttonText: "View Results",
        sections: [
          {
            title: "Youtube Search",
            rows: rows,
          },
        ],
      });
    });
  }
);

command(
  {
    pattern: "ytv",
    fromMe: isPrivate,
    dontAddCommandList: true,
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("_Enter a URL_");

    if (!ytIdRegex.test(match)) return await message.reply("_Invalid Url_");
    ytv(match).then(async ({ dl_link, title }) => {
      await message.reply(`_Downloading ${title}_`);
      return await message.sendFromUrl(dl_link, {
        filename: title,
        quoted: message,
      });
    });
  }
);

command(
  {
    pattern: "yta",
    fromMe: isPrivate,
    dontAddCommandList: true,
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("_Enter a URL_");
    if (!ytIdRegex.test(match)) return await message.reply("_Invalid Url_");
    yta(match).then(async ({ dl_link, title, thumb }) => {
      await message.reply(`_Downloading ${title}_`);
      let buff = await AddMp3Meta(dl_link, thumb, {
        title,
      });
      return await message.sendMessage(
        buff,
        { mimetype: "audio/mpeg", quoted: message.data },
        "audio"
      );
    });
  }
);
