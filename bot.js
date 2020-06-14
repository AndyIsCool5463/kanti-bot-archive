console.log("OK")
// Webserver
const http = require('http');
const express = require('express');
const app = express();
const {resolve, join} = require('path')
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


// Bot
const Discord = require("discord.js");
const Util = require('discord.js')
const fs = require('fs')
const Enmap = require('enmap')
const prefix = process.env.PREFIX;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.GOOGLE_TOKEN);
const Bot = new Discord.Client();
Bot.config = require("./config.js");
Bot.points = new Enmap({name: "points"});
Bot.login(process.env.TOKEN)



// Websitem
var bodyParser = require('body-parser')
const stringifyObject = require('stringify-object');
var path = __dirname + '/views/';
var urlencodedParser = bodyParser.urlencoded({ extended: false })
Bot.APImsg = new Enmap({name: "APImsg"});
app.get('/', (req, res) => {
  res.sendFile(resolve(join(__dirname, "./views/index.html")));
});
let uuid = "44314d2-e2e0-4c62-a861-c5d6884ebe9c";
const uuidA = "385d5213-fd84-4250-8c03-405ee1b535d9";
app.post('/discord', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
  if(req.body.uuid != uuid) return res.sendStatus(403);
  console.log(req.body)
  Bot.APImsg.set(req.body.author, req.body.msg)
  res.sendStatus(200)
  if(req.body.user_generated_msg == 'true') {
    console.log(req.body.user_generated_msg)
      return  user_generated(req.body.author, req.body.msg, req.body.channels)
  } else myFunct(req.body.author, req.body.msg, req.body.channels) 
});
app.post("/userguildUpdateWebServerf9a0e14f-a96b-4763-a73d-7fe4ad2fe3ba", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if(req.body.uuid != uuidA) return res.sendStatus(403);
  console.log('success');
  console.log(req.body);
  const ui = req.body.userID;
  const xd = Bot.guilds.filter(g => g.ownerID == ui).map(c => {
    return `${c.id}`;
  })
  const xdTwo = Bot.guilds.filter(g => g.ownerID == ui).map(c => {
    return `${c.channels.size}`;
  })
  const js = {
    guildsTheBotisInWithUser: xd
  }
res.set('Content-Type', 'application/json');
  res.send({
    guildsInside: xd,
    channels: xdTwo
  })
  console.log(xd)
  console.log(xdTwo)
  
});
function user_generated(Rauthor, Rmsg, Rchannel) {
      var test = Bot.channels.find(channel => channel.name === Rchannel)          
           test.send(Rmsg);    
}
function myFunct(Rauthor, Rmsg, Rchannel) {
       var test = Bot.channels.find(channel => channel.name === Rchannel)
          
           test.send(`**${Rauthor}** has sent the message: ${Bot.APImsg.get(Rauthor)}`);       
  }
// Command Handler
console.log(prefix)
// Command Handler

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    Bot.on(eventName, event.bind(null, Bot));
  });
});


Bot.commands = new Enmap();
Bot.permission = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loaded command: ${commandName} ✓ `);
    Bot.commands.set(commandName, props);
  });
});
// Verify
const config = require('./config.json')

const completemsg = `Thank you for agreeing to the rules and code of conduct! You are now a verified member of the guild! \nFeel free to choose what roles you’d like [here](https://goo.gl/forms/ZE1b6vlcDnu5lAFD3), introduce yourself or check out a our other channels. \n\n**Your unique token is your signature that you have read and understood our rules.**\n`

const shortcode = (n) => {
    const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz0123456789'
    let text = ''
    for (var i = 0; i < n + 1; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text;
}
Bot.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    const token = shortcode(8)
    const readme = `**PLEASE READ TO GET FULL ACESS TO THE SERVER**`
    const welcomemsg = `Welcome to the Server! We hope you find a home here! Check out the \`#recruitment\` channel to make sure that we jive, and as long as our goals are similar, then there’s a place at the table waiting for you. \n\n If you accept the code of conduct, please verify your agreement by replying to **this DM** with the verification phrase: \n\n\`I agree to abide by all rules. My token is ${token}.\`\n\n **This message is case-sensitive, and please include the period at the end! ** \n\nQuestions? Get at a staff member in the server or via DM.`
    console.log(`${member.user.username}#${member.user.discriminator} joined! CODE: "${token}"`)
    member.send(readme)
    member.send(welcomemsg)
    member.user.token = token
})


const verifymsg = 'I agree to abide by all rules. My token is {token}.'

Bot.on('message', (message) => {
    if (message.author.bot || !message.author.token || message.channel.type !== `dm`) return
    if (message.content !== (verifymsg.replace('{token}', message.author.token))) return
    message.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: completemsg,
            timestamp: new Date(),
            footer: {
                text: `Verification Success`
            }
        }
    })
  let roleid = "497948891707342848";
    Bot.guilds.get(config.guild).member(message.author).addRole(roleid) // ensure this is a string in the config ("")
        .then(console.log(`TOKEN: ${message.author.token} :: Role ${config.role} added to member ${message.author.id}`))
        .catch(console.error)
})
// Points
Bot.on("message", message => {
  // As usual, ignore all bots.
  if (message.author.bot) return;
  
  // If this is not in a DM, execute the points code.
  if (message.guild) {
    // We'll use the key often enough that simplifying it is worth the trouble.
    const key = `${message.guild.id}-${message.author.id}`;

    // Triggers on new users we haven't seen before.
    Bot.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });
    
    Bot.points.inc(key, "points");
    
    // Calculate the user's current level
    const curLevel = Math.floor(0.1 * Math.sqrt(Bot.points.get(key, "points")));
    
    // Act upon level up by sending a message and updating the user's level in enmap.
    if (Bot.points.get(key, "level") < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      Bot.points.set(key, curLevel, "level");
    }
  }
  // Alias Handler
  Bot.logger = require("./modules/Logger");
  Bot.aliases = new Enmap();
  // Generate a cache of client permissions for pretty perm names in commands.
  Bot.levelCache = {};
  for (let i = 0; i < Bot.config.permLevels.length; i++) {
    const thisLevel = Bot.config.permLevels[i];
    Bot.levelCache[thisLevel.name] = thisLevel.level;
  }
});
// moozik

var queue = new Map();
Bot.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}


