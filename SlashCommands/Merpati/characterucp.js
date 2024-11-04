const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql");

module.exports = {
    name: "charucp",
    description: "Cek karakter User Control Panel",
    type: "",
    options: [
        {
            name: "ucp-account",
            description: "Nama akun UCP yang akan diperiksa karakternya!",
            type: "USER",
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const getAccount = interaction.options.getUser("ucp-account");

        MysqlMerpati.query(`SELECT * FROM playerucp WHERE discordID = '${getAccount.id}'`, async(err, roww) => {
            if(roww[0]) {
                MysqlMerpati.query(`SELECT * FROM players WHERE userucp = '${roww[0].uUserUCP}' LIMIT 3`, async(err, row) => {
                    const msgChar = new MessageEmbed()
                    // .setAuthor({ name: "Neoland Roleplay", iconURL: client.config.ICON_URL })
                    // .setDescription(`- Data Akun User Control Panel -\n• \`Karakter 1\`: ${row[0].username || "Tidak Ditemukan"}\n• \`Karakter 2\`: ${row[1].username || "Tidak Ditemukan"}\n• \`Karakter 3\`: ${row[2].username || "Tidak Ditemukan"}`)
                    // .setColor("GOLD")
                    // .setFooter({ text: "Bot Neoland Official" })
                    // .setTimestamp()
                    // interaction.reply({embeds:[msgChar]})
                    //console.log(`1. ${row[0].username || "Tidak Ditemukan"}\n2. ${row[1].username || "Tidak Ditemukan"}\n3. ${row[2].username || }`)
                })
            } else {
                IntError(interaction, "Maaf user yang anda tag tidak memiliki akun UCP!"); 
            }
        })
    },
};
