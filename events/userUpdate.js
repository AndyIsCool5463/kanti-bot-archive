module.exports = (Bot, message, oldUser, newUser) => {
  message.defaultChannel.send(`User: ${oldUser} has changed their username: Old ${oldUser} ; New ${newUser} `)
}
