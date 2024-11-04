const { Interaction, CommandInteraction, MessageEmbed } = require("discord.js");
const client = require("../../Merpati");
const MysqlMerpati = require("../../Mysql");
require("../../Functions")

module.exports = {
    id: "button-gencode",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id
        var randCode = Math.floor(Math.random() * 99999) + 1;

        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (error, row) => {
            if (row[0]) {
                if(row[0].uUserVerif != 0) return IntError(interaction, "Akun User Control Panel anda telah terverifikasi, tidak dapat mengubah pin akun User Control Panel anda!")
                MysqlMerpati.query(`UPDATE playerucp SET verifycode = '${randCode}' WHERE DiscordID = ${userid}`);

                const msgEmbed = new MessageEmbed()
                    .setAuthor({ name: "Neoland Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Akun User Control Panel -\n• \`Pemilik Akun\`: ${userid} (\`${interaction.user.tag}\`)\n• \`Nama Akun\`: ${row[0].ucp}\n• \`Pin Akun\`: ${randCode} (New)\n\nNote: Pin akun User Control Panel anda telah diubah!, Silahkan gunakan untuk verifikasi di ingame!`)
                    .setColor("GOLD")
                    .setFooter({ text: "Bot Neoland Official" })
                    .setTimestamp()
                await interaction.user.send({ embeds: [msgEmbed] }).catch(error => {
                    interaction.reply({ content: "```\nTidak dapat mengirimkan kode/pin baru Verifikasi akun ucp anda, Silahkan gunakan command /resendcode jika sudah melakukan intruksi di bawah ini:\n- INTRUKSI OPEN DIRECT MESSAGE -\n• Tips Pertama, Kamu Pergi Ke Pengaturan Discord\n• Tips Ke Dua, Pilih Privacy & Safety\n• Tips Ke Tiga, Pilih Do Not Scan\n```", ephemeral: true });
                })

                IntSucces(interaction, `Kode verifikasi baru anda telah berhasil di kirim oleh bot (<@${client.user.id}>)`)
            }
            else return IntError(interaction, "Anda tidak memiliki akun terdaftar di dalam server Neoland Roleplay!");
        })
    }
}