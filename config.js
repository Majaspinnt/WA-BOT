const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION_ID:process.env.SESSION_ID || "RE03Mnp_AFIYA_hR1g=",
  LANG: process.env.LANG || "EN",
  HANDLERS:
    process.env.HANDLER === "false" || process.env.PREFIX === "null"
      ? "^"
      : "^",
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "master",
  PACKNAME: process.env.PACKNAME || "𝙰𝙵𝙸𝚈𝙰-𝙼𝙳",
  AUTHOR: process.env.AUTHOR || "© 𝚂𝚄𝙷𝙰𝙸𝙳",
  OWNER_NAME: process.env.OWNER_NAME || "𝚂𝚄𝙷𝙰𝙸𝙳",
  BOT_NAME: process.env.BOT_NAME || "𝙰𝙵𝙸𝚈𝙰-𝙼𝙳",
  FOOTER:   process.env.FOOTER || "𝑨𝒇𝒊𝒚𝒂",
  BOT_INFO : "AFIYE,SUHAID,https://i.imgur.com/bk3EKWO.jpeg,https://i.imgur.com/bk3EKWP.jpeg",
  ALIVE: process.env.ALIVE || "```I am Alive```",
  WORK_TYPE: process.env.WORK_TYPE || "private",
  DATABASE_URL: DATABASE_URL,
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  SUDO: process.env.SUDO || "917902655741",
};
