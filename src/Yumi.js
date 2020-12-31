const { Client } = require("eris")
const { Command, Event } = require("./structures")
const { readdirSync, statSync } = require("fs")

module.exports = class Yumi extends Client {
  constructor(token, config) {
    super(token, config.options)
    this.config = config.bot
    this.colors = config.colors

    this.logger = require("consola")
    this.version = require("../package").version;

    this.cooldowns = []
    this.commands = []
    this.events = []

    this.loadEvents(__dirname + "/events")
    this.loadCommnads(__dirname + "/commands")
  }
  loadCommnads(dir) {
    readdirSync(dir).forEach(file => {
      if (statSync(dir + "/" + file).isDirectory()) return this.loadCommnads(dir + "/" + file)
      const command = new(require(dir + "/" + file))(this)
      return new Command(this).add(command.config.name, command)
    })
  }
  loadEvents(dir) {
    readdirSync(dir).forEach(file => {
      if (statSync(dir + "/" + file).isDirectory()) return this.loadEvents(dir + "/" + file)
      const event = new(require(dir + "/" + file))(this)
      return new Event(this).add(event.name, event)
    })
  }
}