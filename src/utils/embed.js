const { colors } = require("../../config");

module.exports = (message, options = {}) => {
  const construct = { embed: {}, }

  if (options.title) construct.embed.title = options.title
  if (options.description) construct.embed.description = options.description

  if (colors[options.colortype]) construct.embed.color = parseInt(colors[options.colortype].replace(/#/g, "0x"))
  else construct.embed.color = parseInt(colors.default.replace(/#/g, "0x"))

  if (options.imageurl) construct.embed.image = { url: options.imageurl }

  return message.channel.createMessage(construct).catch(() => {})
}