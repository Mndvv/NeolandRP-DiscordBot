const { CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql")
const client = require("../../Merpati");

module.exports = {
    id: "button-resendcode",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;
        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (error, row) => {
            if (row[0]) {
                const msgEmbed = new MessageEmbed()
                    .setAuthor({ name: "Neoland Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Akun User Control Panel -\n• \`Pemilik Akun\`: ${userid} (\`${interaction.user.tag}\`)\n• \`Nama Akun\`: ${row[0].ucp}\n• \`Pin Akun\`: ${row[0].verifycode}`)
                    .setColor("GOLD")
                    .setFooter({ text: "Bot Neoland Official" })
                    .setTimestamp()
                await interaction.user.send({ embeds: [msgEmbed] }).catch(error => {
                    interaction.reply({ content: "```\nTidak dapat mengirimkan kode/pin Verifikasi akun ucp anda, Silahkan gunakan command /resendcode jika sudah melakukan intruksi di bawah ini:\n- INTRUKSI OPEN DIRECT MESSAGE -\n• Tips Pertama, Kamu Pergi Ke Pengaturan Discord\n• Tips Ke Dua, Pilih Privacy & Safety\n• Tips Ke Tiga, Pilih Do Not Scan\n```", ephemeral: true });
                })

                IntSucces(interaction, "Berhasil mengirim data akun UCP anda di Direct Message/DM Discord anda");
            }
            else return IntError(interaction, "Anda tidak memiliki akun User Control Panel yang terdaftar di Kota Neoland!")
        })
    },
}