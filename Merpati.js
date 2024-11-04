const { Client, Collection, WebhookClient } = require("discord.js");
const discordModals = require("discord-modals");
require("dotenv").config()
require("./Mysql")

const client = new Client({
  intents: 32767,
});
module.exports = client;
require("./Handler")(client);
discordModals(client);

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.slashCommands = new Collection();
client.config = process.env

const hook = new WebhookClient({ id: '995892675259678732', token: 'MTEwMDQ1NjUyNDg4NDc0MjIxNA.GOuBZi.dSMwWuxvP6IBl4sbUHe9_5g3EIhcvqPV4_WQnw' })

process.on('unhandledRejection', (error) => {
  hook.send(`\`\`\`js\n${error.stack}\`\`\``)
})

process.on('uncaughtException', (err, origin) => {
  hook.send(`\`\`\`js\n${err.stack}\`\`\``)
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
  hook.send(`\`\`\`js\n${err.stack}\`\`\``)
})

process.on('beforeExit', (code) => {
  hook.send(`\`\`\`js\n${code}\`\`\``)
})

process.on('exit', (code) => {
  hook.send(`\`\`\`js\n${code}\`\`\``)
})

process.on('multipleResolves', (type, promise, reason) => {
})


client.login(client.config.TOKEN_BOT);