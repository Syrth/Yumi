module.exports = class Ready {
  constructor(client) {
    this.client = client
    this.name = "ready"
  }
  run() {
    this.client.logger.ready(`Iniciado como "${this.client.user.username}#${this.client.user.discriminator}"`)
  }
}