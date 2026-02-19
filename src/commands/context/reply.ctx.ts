import { ApplicationCommandType, InteractionContextType, MessageContextMenuCommandInteraction } from "discord.js";
import { BetterModal, ContextCommandBuilder } from "vimcord";

export default new ContextCommandBuilder({
    builder: builder =>
        builder.setName("Reply").setContexts(InteractionContextType.Guild).setType(ApplicationCommandType.Message),

    permissions: { botStaffOnly: true },

    async execute(client, interaction) {
        const targetMessage = await interaction.channel?.messages.fetch(interaction.targetId);
        if (!targetMessage) return;

        const modal = await new BetterModal({
            title: "Reply",
            components: [{ textInput: { label: "Message", required: true } }]
        }).showAndAwait(interaction as MessageContextMenuCommandInteraction);

        if (!modal?.values[0]) return;
        await modal.interaction.deferReply({ flags: "Ephemeral" });

        await targetMessage.reply({ content: modal.values[0] });

        return modal.interaction.editReply({ content: "Message sent!" });
    }
});
