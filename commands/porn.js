// https://www.reddit.com/r/FoodPorn/
const Discord = require("discord.js");
const snekfetch = require('snekfetch');
exports.run = async (Bot, message, args) => {
  if(!args[0]) return(message.reply("Please Specify the type of **porn** i.e: >porn food or >porn hentai . For the full list do **>ls porn**"));
  if(args[0] === "food"){
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/FoodPorn.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
        .setColor('#36393F')
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter("Memes provided by r/dankmemes")
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
  } else if(args[0] === "earth") {
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/EarthPorn.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
        .setColor('#36393F')
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter("Memes provided by r/EarthPorn")
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
  }
}