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
        let customReply;
        const customReplies = qznt_1.$.rnd.chance(constants_1.WTF.chanceForCustom)
            ? constants_1.WTF.customReplies.find(c => c.userId === interaction.user.id)?.replies
            : undefined;
        if (customReplies?.length) {
            customReply = qznt_1.$.rnd.choice(customReplies);
        }
        const reply = customReply?.text ?? qznt_1.$.rnd.choice(constants_1.WTF.generalReplies);
        // Create the embed (wtf?)
        const embed_wtf = new vimcord_1.BetterEmbed({
            color: customReply
                ? "#FFCB47"
                : ["DarkRed", "Orange", "Greyple", "Aqua", "Navy", "White", "DarkButNotBlack", "LuminousVividPink"],
            author: customReply
                ? { text: `Custom Reply ${customReply.id}`, hyperlink: qznt_1.$.rnd.choice(constants_1.WTF.customReplyLinks) }
                : "WTF?",
            description: reply
        });
        // Reply to the interaction with the embed
        return embed_wtf.send(interaction);
    }
});
