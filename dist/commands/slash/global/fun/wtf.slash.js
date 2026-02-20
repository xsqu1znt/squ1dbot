"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../constants");
const discord_js_1 = require("discord.js");
const qznt_1 = require("qznt");
const vimcord_1 = require("vimcord");
exports.default = new vimcord_1.SlashCommandBuilder({
    builder: builder => builder
        .setName("wtf")
        .setDescription("Wtf do you want?")
        .setContexts(discord_js_1.InteractionContextType.Guild, discord_js_1.InteractionContextType.PrivateChannel),
    metadata: { category: "Global/Fun" },
    async execute(client, interaction) {
        const customReplies = qznt_1.$.rnd.chance(constants_1.WTF.customReplyChance)
            ? constants_1.WTF.customReplies.find(c => c.userId.split(":")[1] === interaction.user.id)?.replies
            : undefined;
        const customReplyIndex = customReplies?.length ? qznt_1.$.rnd.index(customReplies) : undefined;
        const customReply = customReplyIndex !== undefined ? customReplies[customReplyIndex] : undefined;
        // Create the embed (wtf?)
        const embed_wtf = new vimcord_1.BetterEmbed({
            context: { interaction },
            color: customReply ? "#FFCB47" : undefined,
            author: customReply
                ? { text: `Custom Reply ${customReplyIndex}`, hyperlink: qznt_1.$.rnd.choice(constants_1.WTF.customReplyLinks) }
                : qznt_1.$.rnd.chance(constants_1.WTF.titleChance)
                    ? qznt_1.$.rnd.choice(constants_1.WTF.titles)
                    : "WTF?",
            description: customReply ?? qznt_1.$.rnd.choice(constants_1.WTF.generalReplies),
            footer: !customReply && qznt_1.$.rnd.chance(constants_1.WTF.footerChance) ? qznt_1.$.rnd.choice(constants_1.WTF.footers) : undefined
        });
        // Reply to the interaction with the embed
        return embed_wtf.send(interaction);
    }
});
