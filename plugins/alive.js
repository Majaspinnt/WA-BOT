const { command, isPrivate, getJson } = require('../lib')

command({
  pattern: "alive",
  fromMe: IsPrivate,
  desc: "mention reply",
  type: "search",
},
async (message, match, m) => {
message.sendMessage(config.ALIVE) 
})
