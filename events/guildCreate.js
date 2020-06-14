const snek = require('snekfetch')
const axios = require('axios')
const request = require('request')
const querystring = require('querystring');
const fs = require('fs');
module.exports = (Bot, message) => {
 const guildArrayName = Bot.guilds.map((guild) => {
   
  init(guild);
   function init(guild) {
     const owner = guild.ownerID;
     var obj = {
       owner: owner,
       guild: guild.id,
       guildName: guild.name,
     };
    fs.writeFile(`../dbu/${owner}.json`, obj, (err) => {
      console.log(err);
    })
   };   

   
   guild.forEach((g) => {
      g.join("_")
   })
    console.log(guild.name)
    return `${guild.name} `
    })
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
      return `${channel.name}` + `${channel.id}`;
    })
    const userArray = Bot.users.map((user) => {
    return `${user.username} : ID- ${user.id} `
    })
  
  
 // Web STUFF 
  
  const url = "https://basicwebsite.glitch.me/guildUpdate";
var form = {
    guildsID: guildArrayID.join(" "),
    guildsName: guildArrayName.join(" "),
    ch: c.join(" "),
    ch2: channelArray.join()
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
    //it works!
  });
};
