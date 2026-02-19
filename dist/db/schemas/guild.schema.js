"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildSchema = void 0;
const vimcord_1 = require("vimcord");
exports.GuildSchema = (0, vimcord_1.createMongoSchema)("Guilds", {
    guildId: { type: String, unique: true, required: true },
    prefix: { type: String, default: null },
    createdAt: { type: Number, default: Date.now }
});
exports.GuildSchema.schema.index({ guildId: 1, prefix: 1 }, { unique: true });
