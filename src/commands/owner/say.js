const { Command } = require("../../structures")

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "Faz o bot dizer algo.",
      owner: true,
      usage: "<prefix><command> <arguments>"
    })
  }
  run(message, args) {
    message.channel.createMessage(args.join(" "))
    message.delete().catch(() => {})
  }
}