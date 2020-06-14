const snek = require('snekfetch')
const axios = require('axios')
const request = require('request')
const querystring = require('querystring');
exports.run = (Bot, message, args) => {
 // console.log(`New Channel created: ${channel} `)
  const guildArrayName = Bot.guilds.map((guild) => {
 //   console.log(guild)
    return `${guild} `
    })
//  guildArrayName.join("")
  const guildArrayID = Bot.guilds.map((guild) => {
    return `${guild.id} `
    })
    const shit = Bot.channels.map((channel) => {
        if(this.type != "text") {
         //   channel.delete();
          return `${channel.id} ${channel.name}`
        }
    })
    
    const c = Bot.channels.filter(g => g.type == 'text').map(g => { return `${g.name} ${g.id}`});
    const cA = Bot.channels.filter(g => g.type == 'text').map(g => { return `${g}`});
    const cN = Bot.channels.filter(g => g.name && g.type == 'text').map(g => { return `${g.name}`});
    const cNg = Bot.channels.filter(g => g.name && g.type == 'text').map(g => { return `${g.guild}`});
    console.log(cNg.length)
    const channelArray = Bot.channels.map((channel) => {
    //   var ch = [];
    //   var nums = ["1","2","3","4","5","6","7","8","9","0"]
    
    //   ch.push(channel.name)
    //   ch.push(channel.id)
    //   if(ch.includes('Text Channels')) ch.pop(0)
    //   if(ch.includes('Voice Channels')) ch.pop()
    //   if(ch.includes('Clan Chat')) ch.pop()
    //   if(ch.includes('General')) ch.pop()
    //   return ch;
      return `${channel.id}`;
    })
    let guildsN = (Bot.guilds.map((channel) => {
        return `${channel}`
    }))
    console.log(guildsN)
    const userArray = Bot.users.map((user) => {
    return `${user.username} : ID- ${user.id} `
    })
  
  const placeholder = "PLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDER"
 // Web STUFF 
  
 // const url = "https://basicwebsite.glitch.me/guildUpdate";
  const url = "https://basicwebsite.glitch.me/guildCanary";
var form = {
    guildsID: guildArrayID.join(" "),
    guildsName: guildsN,
    ch: cA,
    channelNames: cN,
    channelNameGuild: cNg
};

var formData = querystring.stringify(form);
var contentLength = formData.length;
request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: url,
    body: formData,
    method: 'POST'
  }, function (err, res, body) {
    console.log(`Response Code: ${res.status}`)
    //it works!
  });
};
