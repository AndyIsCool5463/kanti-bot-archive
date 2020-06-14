module.exports = (Bot, message) => {
  console.log(`Ready to serve in ${Bot.channels.size} channels on ${Bot.guilds.size} servers, for a total of ${Bot.users.size} users.`);
  Bot.user.setActivity(">ls for help", { type: "STREAMING", url: "https://www.twitch.tv/monstercat" })
  console.log("Kanti Bot is ready to recive commands!");
  Bot.generateInvite(["ADMINISTRATOR"]).then(link => console.log(link))
}
