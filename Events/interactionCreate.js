const { Modal } = require("discord-modals");
const client = require("../Merpati");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return;

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Buttons Handle
    if(interaction.isButton()) {
        const Buttons = client.buttons.get(interaction.customId);
        if(Buttons) Buttons.run(interaction, client);
    }

    // Modals Handle
    if(interaction.isModalSubmit()) {
        const Modals = client.modals.get(interaction.customId);
        Modals.run(interaction, client);
    }    
});
