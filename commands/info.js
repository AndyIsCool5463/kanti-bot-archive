const Enmap = require('enmap');
const Discord = require('discord.js')
exports.run = async (Bot, message, args) => {
  if(message.author.id != "201825529333153792") return;
  let userMentioned = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
  console.log(`Arg1 ${args[1]} + Arg0 ${args[0]}`)
    const key = `${message.guild.id}-${message.author.id}`;
    let avatar = userMentioned.displayAvatarURL
    var game = userMentioned.presence.game;
    if(!userMentioned.presence.game) {
        game = "Not playing a game."
    }
    let awaitmsg = await message.channel.send("Please wait...")
    const embed = new Discord.RichEmbed()
        .setColor('#36393F')
        .setTitle(`User Data`)
        .setDescription(`User: ${userMentioned}`)
        .setThumbnail(avatar)
        .addField("User Info", "👇")
        .addField("Username", `${userMentioned}#${userMentioned.discriminator}`)
        .addField("ID", userMentioned.id)
        .setThumbnail(userMentioned.avatarURL)
        .addField("Is Bot", userMentioned.bot)
        .addField("Joined Server On", message.guild.joinedAt)
        .addField("Joined Discord on", userMentioned.createdAt)
        .addField("Points & Level & Rank", "👇")
        .addField("Points", `Points: ${Bot.points.get(key, "points")}`, true)
        .addField("Level", `Level: ${Bot.points.get(key, "level")}`, true)
        .addField("Misc", "👇")
        .addField("Last Message:", userMentioned.lastMessage)
        .addField("Last Message ID:", userMentioned.lastMessageID)
        .addField("Playing:", game)
        .setFooter("For Debugging Purposes...");
    await message.author.send(embed)
    awaitmsg.delete()
    
}
