const Discord = require("discord.js");
const snekfetch = require('snekfetch');
exports.run = async (Bot, message, args) => {
  const url = "https://basicwebsite.glitch.me/discord";
 const uuid = "144314d2-e2e0-4c62-a861-c5d6884ebe9c";
  //const uuid = "14314d2-e2e0-4c62-a861-c5d6884ebe9c";
  snekfetch.post(url, {
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	},
	data: {
		foo: 'bar',
		lorem: 'ipsum',
    uuid: uuid
	}
}).then(response => {
	console.log(response.body) //application/json
})
} 