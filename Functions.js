const { MessageEmbed } = require("discord.js")
const { createConnection } = require("mysql")

MsgSucces = async (message, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("GREEN")
    return message.reply({ embeds: [msgEmbed] })
}

MsgError = async (message, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("RED")
    return message.reply({ embeds: [msgEmbed] })
}

MsgUsage = async (message, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("YELLOW")
    return message.reply({ embeds: [msgEmbed] })
}

IntSucces = async(interaction, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("GREEN")
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

IntError = async(interaction, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("RED")
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

IntUsage = async(interaction, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("YELLOW")
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

IntAdmin = async(interaction, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription(args)
    .setColor("GREEN")
    return interaction.reply({ embeds: [msgEmbed], ephemeral: false })
}

IntPerms = async(interaction, args) => {
    const msgEmbed = new MessageEmbed()
    .setDescription("Maaf! Anda bukan bagian dari admin server Neoland Roleplay!")
    .setColor("RED")
    return interaction.reply({ embeds: [msgEmbed], ephemeral: false })
}