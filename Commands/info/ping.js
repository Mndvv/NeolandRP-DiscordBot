const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    UserPerms: [""],
    BotPerms: [""],
    cooldown: 10000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply(`Pong!! :ping_pong:`)
    },
};