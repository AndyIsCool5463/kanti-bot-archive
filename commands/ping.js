exports.run = (Bot, message, args) => {
    message.channel.send("pong!").catch(console.error);
}
