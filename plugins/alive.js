const { command, isPrivate, getJson } = require('../lib')

command({
  pattern: "alive",
  fromMe: true,
  desc: "Bot Alive",
  dontAddCommandList: true,
  type: "search",

},
async (message, match, m) => {
message.sendMessage(config.ALIVE) 
})
