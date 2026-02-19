"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const vimcord_1 = require("vimcord");
exports.default = new vimcord_1.SlashCommandBuilder({
    builder: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check how fast the bot is right now. (less ms = faster)")
        .setContexts(discord_js_1.InteractionContextType.Guild),
    metadata: { category: "General/App" },
    async execute(client, interaction) {
        interaction.reply({ content: `Client: **${client.ws.ping}ms**` });
    }
});
