const Discord = require('discord.js')
exports.run = (Bot, message, args) => {
  let max = args[0] 
  if(!max) {
    max = 6;
  }
  
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
  let int = getRandomInt(max)
  console.log(int)
  var bool; // if bool = true it means that the user rolled a dice over 6
  
  if(int > 6) {
       bool = true;
    return(message.channel.send(`I got a ${int}!`))
  } else if(int <= 6) {
        bool = false;
     } 
  
  if(bool = false && int === "1") {
      const embed = new Discord.RichEmbed()
            .setColor('#36393F')
        .setTitle("Command List")
        .setURL("https://pastebin.com/073usLW4")
        .setThumbnail('https://cdn.discordapp.com/avatars/495381072612425733/12304fa62189f03a001caea1ab7566db.png')
        .setDescription("Commands that you may execute")
            .addThumbnail("https://game-icons.net/icons/delapouite/originals/svg/dice-six-faces-one.svg")
            .addField("You rolled a", "1!");
    
      message.channel.send(embed)
  }  else if(bool = false && int === "2") {
      const embed = new Discord.RichEmbed()
      .setColor('#36393F')
        .setTitle("Command List")
        .setURL("https://pastebin.com/073usLW4")
        .setThumbnail('https://cdn.discordapp.com/avatars/495381072612425733/12304fa62189f03a001caea1ab7566db.png')
        .setDescription("Commands that you may execute")
            .addThumbnail("https://game-icons.net/icons/delapouite/originals/svg/dice-six-faces-two.svg")
            .addField("You rolled a", "2!");
    
      message.channel.send(embed)
  }  else if(bool = false && int === "3") {
      const embed = new Discord.RichEmbed()
      .setColor('#36393F')
        .setTitle("Command List")
        .setURL("https://pastebin.com/073usLW4")
        .setThumbnail('https://cdn.discordapp.com/avatars/495381072612425733/12304fa62189f03a001caea1ab7566db.png')
        .setDescription("Commands that you may execute")
            .addThumbnail("https://game-icons.net/icons/delapouite/originals/svg/dice-six-faces-three.svg")
            .addField("You rolled a", "3!");
    
      message.channel.send(embed)
  } else if(bool = false && int === "4") {
      const embed = new Discord.RichEmbed()
      .setColor('#36393F')
        .setTitle("Command List")
        .setURL("https://pastebin.com/073usLW4")
        .setThumbnail('https://cdn.discordapp.com/avatars/495381072612425733/12304fa62189f03a001caea1ab7566db.png')
        .setDescription("Commands that you may execute")
            .addThumbnail("https://game-icons.net/icons/delapouite/originals/svg/dice-six-faces-four.svg")
            .addField("You rolled a", "4!");
    
      message.channel.send(embed)
  } else if(bool = false && int === "5") {
      const embed = new Discord.RichEmbed()
      .setColor('#36393F')
        .setTitle("Command List")
        .setURL("https://pastebin.com/073usLW4")
        .setThumbnail('https://cdn.discordapp.com/avatars/495381072612425733/12304fa62189f03a001caea1ab7566db.png')
        .setDescription("Commands that you may execute")
            .addThumbnail("https://game-icons.net/icons/delapouite/originals/svg/dice-six-faces-five.svg")
            .addField("You rolled a", "5!");
    
      message.channel.send(embed)
  } else if(bool = false && int === "6") {
      const embed = new Discord.RichEmbed()
      .setColor('#36393F')
        .setTitle("Command List")
        .setURL("https://pastebin.com/073usLW4")
        .setThumbnail('https://cdn.discordapp.com/avatars/495381072612425733/12304fa62189f03a001caea1ab7566db.png')
        .setDescription("Commands that you may execute")
            .addThumbnail("https://game-icons.net/icons/delapouite/originals/svg/dice-six-faces-six.svg")
            .addField("You rolled a", "6!");
    
      message.channel.send(embed)
  } else if(bool = false && int === "0") {
      message.channel.send("CHINESEFAGGPT")
  }
}