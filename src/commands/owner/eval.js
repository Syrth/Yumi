const { Command } = require("../../structures")
const fetch = require("node-fetch")

module.exports = class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      allowdms: true,
      owner: true,
      usage: "<prefix><command> <arguments>"
    })
  }
  async run(message, args) {
    try {
      const evaluated = await eval(args.join(" "))
      const evalstring = typeof evaluated === "string" ? evaluated : require("util").inspect(evaluated).replace(this.client.config.token, "TOKEN_DO_BOT")
      const dmchannel = await message.author.getDMChannel()
      if (evalstring.length > 2000) {
        const body = await fetch("https://hastebin.com/documents", {
          referrer: "https://hastebin.com/",
          body: evalstring,
          method: "POST",
          mode: "cors",
        }).then(res => res.json().catch(() => {}));

        await dmchannel.createMessage(`https://hastebin.com/${body.key}`);
      } else {
        message.channel.createMessage(`RESULTADO:\n\`\`\`js\n${evalstring}\n\`\`\``)
      }
    } catch (err) {
      message.channel.createMessage(`OCORREU UM ERRO:\n\`\`\`js\n${err.stack}\n\`\`\``)
    }
  }
}