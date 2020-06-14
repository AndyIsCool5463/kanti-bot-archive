exports.run = (Bot, message, args) => {
   if(!message.guild) return(message.author.send("You may use the kick command in guilds!"));
  const author = message.author
  let member = message.mentions.users.first() || message.guild.members.get(args[0]);
  if(!member) return(message.reply('Please @ a user!'));
  if(author.hasPermission('KICK_MEMBERS') === "false") return(message.author.send("You may use the kick command in guilds!"));
  
  if(author.hasPermission('KICK_MEMBERS') === "true"){
    member.kick()
    message.channel.send("Done");
  };
}
