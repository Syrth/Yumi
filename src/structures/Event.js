module.exports = class Event {
  constructor(client) {
    this.client = client
  }
  add(name, event) {
    this.client.logger.info(`[EVENTO] ${name} - carregado!`)
    this.client.on(name, (...args) => event.run(...args))
    this.client.events.push(event)
  }
}