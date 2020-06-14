const enmap = require('enmap')
exports.run = async (Bot, message, args, author, msg) => {
  // console.log(args[0] + args[1])
  // let infer = Bot.APImsg.get(args[0]);
  // if(args[0] === "debug") return message.channel.send(Bot.APImsg.fetchEverything());
  // if(!args[0]) return message.reply("INPUT USER")
  // console.log(infer)
  // message.channel.send(`**${args[0]}** has send the message: ${infer}`)
  // console.log(Bot.APImsg.fetchEverything())
  // message.channel.send(Bot.channels.array())
  
  let uu = message.author
  let gID = message.member.guild.id
  message.channel.send(message.author.guild.id)
} 