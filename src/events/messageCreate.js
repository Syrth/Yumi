module.exports = class messageCreate {
  constructor(client) {
    this.client = client
    this.name = "messageCreate"
  }
  run(message) {
    if (!message || !message.author || message.author.bot) return

    const prefix = this.client.config.prefix

    if (message.content.startsWith(this.client.user.mention)) return message.channel.createMessage(`Meu prefixo é \`${prefix}\``)

    if (!message.content.startsWith(prefix)) return

    const [name, ...args] = message.content.slice(prefix.length).trim().split(/ +/)

    const command = this.client.commands.find(cmd => cmd.config.name == name.toLowerCase() || cmd.aliases.includes(name.toLowerCase()))

    if (command) {
      if (command.config.owner && !this.client.config.owners.includes(message.author.id)) return message.channel.createMessage("Comando exclusivo do meu desenvolvedor!")

      if (!command.config.allowdms && message.channel.type == 1) return message.channel.createMessage("Você não pode executar esse comando aqui!")

      if (command.config.nsfw && !message.channel.nsfw) return message.channel.createMessage("Você não pode enviar nsfw nesse canal!")

      if (command.config.args && !args.length) return message.channel.createMessage("Você não passou os argumentos")

      if (command.config.cooldown && !this.client.config.owners.includes(message.author.id)) {
        if (this.client.cooldowns.includes(`${command.config.name}:${message.author.id}`)) {
          return message.addReaction("⏳")
        } else {
          this.client.cooldowns.push(`${command.config.name}:${message.author.id}`)
          setTimeout(() => {
            this.client.cooldowns.splice(this.client.cooldowns.indexOf(`${command.config.name}:${message.author.id}`), 1)
          }, command.config.cooldown * 1000)
        }
      }

      return command.run(message, args)
    }
  }
}