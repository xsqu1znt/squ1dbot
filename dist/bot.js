"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBot = createBot;
const discord_js_1 = require("discord.js");
const vimcord_1 = require("vimcord");
function createBot() {
    return (0, vimcord_1.createClient)({
        intents: [
            discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.MessageContent,
            discord_js_1.GatewayIntentBits.GuildMembers
        ]
    }, {
        useDefaultSlashCommandHandler: true,
        useDefaultContextCommandHandler: true,
        useDefaultPrefixCommandHandler: true,
        useGlobalErrorHandlers: true,
        maxLoginAttempts: 3,
        importModules: {
            events: "./events",
            slashCommands: "./commands/slash",
            prefixCommands: "./commands/prefix",
            contextCommands: "./commands/context"
        }
    });
}
