const got = require("got");
const Heroku = require("heroku-client");
const { command, isPrivate, tiny } = require("../lib/");
const Config = require("../config");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
const simpleGit = require("simple-git");
const { secondsToDHMS } = require("../lib");
const git = simpleGit();
const exec = require("child_process").exec;

/* Copyright (C) 2022 SUHAID-BRO.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Afiya-md
*/

command(
  {
    pattern: "restart",
    fromMe: true,
    type: "heroku",
    desc: "Restart Dyno",
    type: "heroku",
  },
  async (message) => {
    await message.sendMessage(`_Restarting_`);
    await heroku.delete(baseURI + "/dynos").catch(async (error) => {
      await message.sendMessage(`HEROKU : ${error.body.message}`);
    });
  }
);

command(
  {
    pattern: "shutdown",
    fromMe: true,
    type: "heroku",
    desc: "Dyno off",
    type: "heroku",
  },
  async (message) => {
    await heroku
      .get(baseURI + "/formation")
      .then(async (formation) => {
        await message.sendMessage(`_Shutting down._`);
        await heroku.patch(baseURI + "/formation/" + formation[0].id, {
          body: {
            quantity: 0,
          },
        });
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);

command(
  {
    pattern: "dyno",
    fromMe: true,
    desc: "Show Quota info",
    type: "heroku",
  },
  async (message) => {
    try {
      heroku
        .get("/account")
        .then(async (account) => {
          const url = `https://api.heroku.com/accounts/${account.id}/actions/get-quota`;
          headers = {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
            Authorization: "Bearer " + Config.HEROKU_API_KEY,
            Accept: "application/vnd.heroku+json; version=3.account-quotas",
          };
          const res = await got(url, { headers });
          const resp = JSON.parse(res.body);
          const total_quota = Math.floor(resp.account_quota);
          const quota_used = Math.floor(resp.quota_used);
          const remaining = total_quota - quota_used;
          const quota = `Total Quota : ${secondsToDHMS(total_quota)}
Used  Quota : ${secondsToDHMS(quota_used)}
Remaning    : ${secondsToDHMS(remaining)}`;
          await message.sendMessage("```" + quota + "```");
        })
        .catch(async (error) => {
          return await message.sendMessage(`HEROKU : ${error.body.message}`);
        });
    } catch (error) {
      await message.sendMessage(error);
    }
  }
);

command(
  {
    pattern: "setvar ",
    fromMe: true,
    type: "heroku",
    desc: "Set heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match)
      return await message.sendMessage(`_Example: Setvar SUDO:917560842435_`);
    const [key, value] = match.split(":");
    if (!key || !value)
      return await message.sendMessage(`_Example: Setvar SUDO:917560842435_`);
    heroku
      .patch(baseURI + "/config-vars", {
        body: {
          [key.toUpperCase()]: value,
        },
      })
      .then(async () => {
        await message.sendMessage(`_${key.toUpperCase()}: ${value}_`);
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);

command(
  {
    pattern: "delvar ",
    fromMe: true,
    type: "heroku",
    desc: "Delete Heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(`_Example: delvar sudo_`);
    heroku
      .get(baseURI + "/config-vars")
      .then(async (vars) => {
        const key = match.trim().toUpperCase();
        if (vars[key]) {
          await heroku.patch(baseURI + "/config-vars", {
            body: {
              [key]: null,
            },
          });
          return await message.sendMessage(`_Deleted ${key}_`);
        }
        await message.sendMessage(`_${key} not found_`);
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);

command(
  {
    pattern: "getvar ",
    fromMe: true,
    type: "heroku",
    desc: "Show heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(`_Example: getvar sudo_`);
    const key = match.trim().toUpperCase();
    heroku
      .get(baseURI + "/config-vars")
      .then(async (vars) => {
        if (vars[key]) {
          return await message.sendMessage(
            "_{} : {}_".replace("{}", key).replace("{}", vars[key])
          );
        }
        await message.sendMessage(`${key} not found`);
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);

command(
  {
    pattern: "allvar",
    fromMe: true,
    type: "heroku",
    desc: "Heroku all env",
    type: "heroku",
  },
  async (message) => {
    let msg = "```Here your all Heroku vars\n\n\n";
    heroku
      .get(baseURI + "/config-vars")
      .then(async (keys) => {
        for (const key in keys) {
          msg += `${key} : ${keys[key]}\n\n`;
        }
        return await message.sendMessage(msg + "```");
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);

command(
  {
    pattern: "update",
    fromMe: true,
    type: "heroku",
    desc: "Checks for update.",
  },
  async (message, match,) => {
    let {prefix} = message
    if (match === "now") {
      await git.fetch();
      var commits = await git.log([
        Config.BRANCH + "..origin/" + Config.BRANCH,
      ]);
      if (commits.total === 0) {
        return await message.sendMessage("_Already on latest version_");
      } else {
        await message.reply("*Update Started*");

        try {
          var app = await heroku.get("/apps/" + Config.HEROKU_APP_NAME);
        } catch {
          await message.sendMessage("_Invalid Heroku Details_");
          await new Promise((r) => setTimeout(r, 1000));
        }

        git.fetch("upstream", Config.BRANCH);
        git.reset("hard", ["FETCH_HEAD"]);

        var git_url = app.git_url.replace(
          "https://",
          "https://api:" + Config.HEROKU_API_KEY + "@"
        );

        try {  
          await git.addRemote("heroku", git_url);
        } catch {
          console.log("heroku remote error");
        }
        await git.push("heroku", Config.BRANCH);

        await message.sendMessage("*Successfully updated*");
      }
    }
    await git.fetch();
    var commits = await git.log([Config.BRANCH + "..origin/" + Config.BRANCH]);
    if (commits.total === 0) {
      await message.sendMessage("*Already Updated* ");
    } else {
      var availupdate = "*ᴜᴘᴅᴀᴛᴇs ᴀᴠᴀɪʟᴀʙʟᴇ* \n\n";
      commits["all"].map((commit, num) => {
        availupdate += num + 1 + " ●  " + tiny(commit.message) + "\n";
      });
      return await message.client.sendMessage(message.jid, {
        text: availupdate,
        footer: tiny("click here to update"),
      });
    }
  }
);

command(
  {
    pattern: "update now",
    fromMe: true,
    type: "heroku",
    desc: "Updates the Bot",
  },
  async (message) => {}
);

//Credits Mask-ser
//created by mask ser for HERMIT_MD
const { SUDO } = require("../config");
const { Function } = require("../lib/");
Function(
  { pattern: "setsudo ?(.*)", fromMe: true, desc: "set sudo", type: "user" },
  async (m, mm) => {
    var newSudo = (m.reply_message ? m.reply_message.jid : "" || mm).split(
      "@"
    )[0];
    if (!newSudo)
      return await m.sendMessage("*reply to a number*", { quoted: m });
    var setSudo = (SUDO + "," + newSudo).replace(/,,/g, ",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",", "") : setSudo;
    await m.sendMessage("```new sudo numbers are: ```" + setSudo, {
      quoted: m,
    });
    await m.sendMessage("_It takes 30 seconds to make effect_", { quoted: m });
    await heroku
      .patch(baseURI + "/config-vars", { body: { SUDO: setSudo } })
      .then(async (app) => {});
  }
);
Function(
  {
    pattern: "delsudo ?(.*)",
    fromMe: true,
    desc: "delete sudo sudo",
    type: "user",
  },
  async (m, mm) => {
    var newSudo = (m.reply_message ? m.reply_message.jid : "" || mm).split(
      "@"
    )[0];
    if (!newSudo) return await m.sendMessage("*Need reply/mention/number*");
    var setSudo = SUDO.replace(newSudo, "").replace(/,,/g, ",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",", "") : setSudo;
    await m.sendMessage("```NEW SUDO NUMBERS ARE: ```" + setSudo, {
      quoted: m,
    });
    await m.sendMessage("_IT TAKES 30 SECONDS TO MAKE EFFECT_", { quoted: m });
    await heroku
      .patch(baseURI + "/config-vars", { body: { SUDO: setSudo } })
      .then(async (app) => {});
  }
);
Function(
  { pattern: "getsudo ?(.*)", fromMe: true, desc: "shows sudo", type: "user" },
  async (m) => {
    const vars = await heroku
      .get(baseURI + "/config-vars")
      .catch(async (error) => {
        return await m.send("HEROKU : " + error.body.message);
      });
    await m.send("```" + `SUDO Numbers are : ${vars.SUDO}` + "```");
  }
);
