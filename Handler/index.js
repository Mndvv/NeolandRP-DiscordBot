const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const commandFiles = await globPromise(`${process.cwd()}/Commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    const eventFiles = await globPromise(`${process.cwd()}/Events/*.js`);
    eventFiles.map((value) => require(value));

    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });glob

    // Button Handling
    const buttonsFolder = await globPromise(`${process.cwd()}/Buttons/**/*.js`)
    buttonsFolder.map((value) => {
        const file = require(value);
        if(!file.id) return;
        client.buttons.set(file.id, file);
    })

    const modalsFolder = await globPromise(`${process.cwd()}/Modals/*.js`)
    modalsFolder.map((value) => {
        const file = require(value);
        if(!file.id) return;
        client.modals.set(file.id, file);
    })

    client.on("ready", async () => {
        await client.guilds.cache.get(client.config.GUILD_ID).commands.set(arrayOfSlashCommands);
    });
};
