const prefix = process.env.PREFIX;
const Enmap = require("enmap")
const time = require("time")
const config = require("../config.json")
const verifymsg = 'I agree to abide by all rules. My token is {token}.'
const completemsg = `Thank you for agreeing to the rules and code of conduct! You are now a verified member of the guild! \nFeel free to choose what roles you’d like, introduce yourself or check out a our other channels. \n\n**Your unique token is your signature that you have read and understood our rules.**\n`
module.exports = (Bot, message, member) => {
  
  // Ignore all bots
  if (message.author.bot) return;
  if (message.channel === "dm") return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the Bot.commands Enmap
  const cmd = Bot.commands.get(command);
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  // Run the command
  cmd.run(Bot, message, args);
};
