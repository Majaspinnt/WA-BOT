const { command, isPrivate, getJson } = require('../lib')

command({
  pattern: "alive",
  fromMe: isPrivate,
  desc: "Alive reply",
  type: "search",
},
async (message, match, m) => {
message.sendMessage(config.ALIVE) 
})
