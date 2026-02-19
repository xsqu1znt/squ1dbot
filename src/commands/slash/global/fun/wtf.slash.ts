import { WTF } from "@/constants";
import { InteractionContextType } from "discord.js";
import { $ } from "qznt";
import { BetterEmbed, SlashCommandBuilder } from "vimcord";

export default new SlashCommandBuilder({
    builder: builder =>
        builder
            .setName("wtf")
            .setDescription("Wtf do you want?")
            .setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel),

    metadata: { category: "Global/Fun" },

    async execute(client, interaction) {
        let customReply: { id: number; text: string } | undefined;

        const customReplies = $.rnd.chance(WTF.chanceForCustom)
            ? WTF.customReplies.find(c => c.userId === interaction.user.id)?.replies
            : undefined;

        if (customReplies?.length) {
            customReply = $.rnd.choice(customReplies);
        }

        const reply = customReply?.text ?? $.rnd.choice(WTF.generalReplies);

        // Create the embed (wtf?)
        const embed_wtf = new BetterEmbed({
            color: customReply
                ? "#FFCB47"
                : ["DarkRed", "Orange", "Greyple", "Aqua", "Navy", "White", "DarkButNotBlack", "LuminousVividPink"],
            author: customReply
                ? { text: `Custom Reply ${customReply.id}`, hyperlink: $.rnd.choice(WTF.customReplyLinks) }
                : "WTF?",
            description: reply
        });

        // Reply to the interaction with the embed
        return embed_wtf.send(interaction);
    }
});
