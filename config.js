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
  SESSION_ID:process.env.SESSION_ID || "inrl~7pL1J8UGHftwhE/P63aHSiUKkLAKaF+/ZJYnAg",
  LANG: process.env.LANG || "EN",
  HANDLERS: process.env.PREFIX || '[.]',
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "master",
  PACKNAME: process.env.PACKNAME || "𝑨𝑭𝑰𝒀𝑨-𝑴𝑫",
  AUTHOR: process.env.AUTHOR || "© 𝑺𝑼𝑯𝑨𝑰𝑫",
  OWNER_NAME: process.env.OWNER_NAME || "𝑺𝑼𝑯𝑨𝑰𝑫",
  BOT_NAME: process.env.BOT_NAME || "𝑨𝑭𝑰𝒀𝑨-𝑴𝑫",
  FOOTER: process.env.FOOTER || "𝑨𝑭𝑰𝒀𝑨",
  ALIVE: process.env.ALIVE || "Hey I'm Alive",
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
  SUDO: process.env.SUDO || "917902655741",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  WORK_TYPE: process.env.WORK_TYPE || "private",
};
