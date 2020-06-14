const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch"); // This is to fetch the user avatar and convert it to a buffer.
const imageUrlRegex = /\?size=2048$/g;
Canvas.registerFont(resolve(join(__dirname, "../fonts/whiteney.ttf")), "Discord");
exports.run = async (Bot, message, args, member, level) => {
  // This will check to see if the command was ran in a guild instead of a DM.
  if (message.guild) {
    // This creates a "key" for enmaps Key/Value system.
    // We've declared it as a variable as we'll be using it in multiple places.
    const key = `${message.guild.id}-${message.author.id}`;
    // If the points database does not have the message author in the database...
    if (!Bot.points.has(key)) {
      // Create an entry for them...
      Bot.points.set(key, {
        // Using the predefined information below.
        user: message.author.id, guild: message.guild.id, points: 0, level: 1
      });
    }
    // We await both the message.channel.send, and the profile function.
    // Also remember, we wanted to pass the member object, and the points object.
    // Since we're creating a user profile, we should give it a unique file name.
    await message.channel.send(new Attachment(await profile(message.member, Bot.points.get(key)), `profile-${message.author.id}.jpg`));
  }
  async function profile(member, score) {
  // Canvas code will go here.
  // We only need the level, and points values, we don't need the user or guild id.
const { level, points } = score;
// We're grabbing the body out of snekfetch's get method, but at the same time we're assigning a variable
// to it, avatar.
// Remember when I mentioned the regex before? Now we get to use it, we want to set the size to 128 pixels,
// instead of 2048 pixels.
const { body: avatar } = await get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
// The reason for the displayName length check, is we don't want the name of the user going outside
// the box we're going to be making later, so we grab all the characters from the 0 index through
// to the 17th index and cut the rest off, then append `...`.
//const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
  return new Canvas(400, 180)
  .setColor("#7289DA")
  .addRect(84, 0, 316, 180)
  .setColor("#2C2F33")
  .addRect(0, 0, 84, 180)
  .addRect(169, 26, 231, 46)
  .addRect(224, 108, 176, 46)
  .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
  .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
  .setShadowBlur(10) // Blur the shadow by 10.
  .save() // We should save the instance again.
  .addRoundImage(avatar, 20, 26, 128, 128, 64)
  .restore()
  .createBeveledClip(20, 138, 128, 32, 5)
  .setColor("#23272A")
  .addRect(20, 138, 128, 32)
  .restore()
  .setTextAlign("center")
  .setTextFont("10pt Discord")
  .setColor("#FFFFFF")
  .addText('AndyIsCool5463', 285, 54)
  .addText(`Level: ${level.toLocaleString()}`, 84, 159)
  .setTextAlign("left")
  .addText(`Score: ${points.toLocaleString()}`, 241, 136)
  .toBuffer()
}
}