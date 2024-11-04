const { CommandInteraction, Client } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require("discord-modals");
const ms = require("ms");
const MysqlMerpati = require("../../Mysql")
const client = require("../../Merpati");
const timeAccount = ms("7 days")
require("../../Functions")

module.exports = {
    id: "button-register",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction, client) => {
        const userid = interaction.user.id;
        const createdAt = new Date(interaction.user.createdAt).getTime()
        const detectDays = Date.now() - createdAt;

        if(detectDays < timeAccount) return IntError(interaction, "Umur akun anda tidak mencukupi untuk mendaftar Akun UCP di server Neoland!");
        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (err, row) => {
            if (row.length < 1) {
                const modalRegister = new Modal()
                    .setCustomId("modal-register")
                    .setTitle("Pendaftaran User Control Panel")
                    .addComponents(
                        new TextInputComponent()
                            .setCustomId("reg-name")
                            .setLabel("Isi Nama UCP Anda Di Bawah Ini")
                            .setMinLength(4)
                            .setMaxLength(15)
                            .setStyle("SHORT")
                            .setPlaceholder("Nama User Control Panel Anda")
                            .setRequired(true)
                    )

                showModal(modalRegister, {
                    client: client,
                    interaction: interaction
                });
            }
            else return IntError(interaction, `Anda telah memiliki akun UCP dengan nama "${row[0].ucp}"`);
        })
    },
}