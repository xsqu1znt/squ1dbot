"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const vimcord_1 = require("vimcord");
exports.default = new vimcord_1.ContextCommandBuilder({
    builder: builder => builder.setName("Reply").setContexts(discord_js_1.InteractionContextType.Guild).setType(discord_js_1.ApplicationCommandType.Message),
    permissions: { botStaffOnly: true },
    async execute(client, interaction) {
        const targetMessage = await interaction.channel?.messages.fetch(interaction.targetId);
        if (!targetMessage)
            return;
        const modal = await new vimcord_1.BetterModal({
            title: "Reply",
            components: [{ textInput: { label: "Message", required: true } }]
        }).showAndAwait(interaction);
        if (!modal?.values[0])
            return;
        await modal.interaction.deferReply({ flags: "Ephemeral" });
        await targetMessage.reply({ content: modal.values[0] });
        return modal.interaction.editReply({ content: "Message sent!" });
    }
});
