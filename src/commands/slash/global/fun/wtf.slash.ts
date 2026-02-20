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
        const customReplies = $.rnd.chance(WTF.customReplyChance)
            ? WTF.customReplies.find(c => c.userId.split(":")[1] === interaction.user.id)?.replies
            : undefined;

        const customReplyIndex = customReplies?.length ? $.rnd.index(customReplies) : undefined;
        const customReply = customReplyIndex !== undefined ? customReplies![customReplyIndex] : undefined;

        // Create the embed (wtf?)
        const embed_wtf = new BetterEmbed({
            context: { interaction },
            color: customReply ? "#FFCB47" : undefined,
            author: customReply
                ? { text: `Custom Reply ${customReplyIndex}`, hyperlink: $.rnd.choice(WTF.customReplyLinks) }
                : $.rnd.chance(WTF.titleChance)
                  ? $.rnd.choice(WTF.titles)
                  : "WTF?",
            description: customReply ?? $.rnd.choice(WTF.generalReplies),
            footer: !customReply && $.rnd.chance(WTF.footerChance) ? $.rnd.choice(WTF.footers) : undefined
        });

        // Reply to the interaction with the embed
        return embed_wtf.send(interaction);
    }
});
