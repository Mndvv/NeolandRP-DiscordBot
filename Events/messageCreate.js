const { Collection, MessageEmbed, WebhookClient } = require("discord.js");
const client = require("../Merpati");
const commandCooldown = new Map()

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.PREFIX_BOT)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.PREFIX_BOT.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    if(command) {
        if(!commandCooldown.has(command.name)) {
            commandCooldown.set(command.name, new Collection())
        }

        const currentTime = Date.now()
        const timeStamps = commandCooldown.get(command.name)
        const cooldownAmount = (command.cooldown) * 1000
        
        if(timeStamps.has(message.author.id)) {
            const expTime = timeStamps.get(message.author.id) + cooldownAmount

            if(currentTime < expTime) {
                const timeLeft = (expTime - currentTime) / 1000

                const cooldownEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Harap Tunggu "${timeLeft.toFixed(1)}" milidetik untuk kembali menggunakan Command \`${client.config.PREFIX_BOT}${command.name}\``)
                return message.channel.send({ embeds: [cooldownEmbed] }).then(msg => {
                    setTimeout(() => msg.delete(), timeLeft)
                    message.delete();
                })    
            }
        }

        timeStamps.set(message.author.id, currentTime)
        setTimeout(() => {
            timeStamps.delete(message.author.id)
        }, cooldownAmount)

        if(!message.guild.me.permissions.has(["SEND_MESSAGES", "EMBED_LINKS"])) return errorEmbed(message, "Bot tidak memiliki akses ke `SEND MESSAGES` Dan `EMBED LINK`");
        if(!message.member.permissions.has(command.UserPerms || [])) return errorEmbed(message, `Anda tidak memiliki akses untuk menggunakan command ini!`);
        if(!message.guild.me.permissions.has(command.BotPerms || [])) return errorEmbed(message, `Bot tidak memiliki akses permissions \`${command.BotPerms || []}!\``);
    }
    await command.run(client, message, args);
});
