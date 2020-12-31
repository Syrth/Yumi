 module.exports = class Command {
  constructor(client, params = {}) {
    this.client = client

    this.config = {
      name: params.name || null,
      alias: params.alias || null,
      allowdms: params.allowdms || false,
      args: params.args || false,
      category: params.category || null,
      cooldown: params.cooldown || 1000,
      description: params.description || "Sem descrição",
      nsfw: params.nsfw || false,
      owner: params.owner || false,
      permissions: params.permissions || ["SEND_MESSAGES", "VIEW_CHANNEL"],
      usage: params.usage || null
    }
  }
  add(name, command){
    this.client.logger.info(`[COMANDO] ${name} - carregado!`)
    this.client.commands.push(command)
  }
}