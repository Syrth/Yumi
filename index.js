const Yumi = require("./src/Yumi")
const config = require("./config")

new Yumi(config.bot.token, config).connect() 