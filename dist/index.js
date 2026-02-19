"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const vimcord_1 = require("vimcord");
const bot_1 = require("./bot");
(0, vimcord_1.defineGlobalToolsConfig)({
    embedColor: ["#0D5D56", "#0D5D56", "#0D5D56"],
    embedColorDev: ["#CF2626", "#D62828", "#DC4141"]
});
async function main() {
    const client = (0, bot_1.createBot)();
    client.configure("app", {
        name: "squ1dbot",
        verbose: process.argv.includes("--verbose"),
        enableCLI: true
    });
    client.useEnv();
    await client.useDatabase(new vimcord_1.MongoDatabase(client));
    client.status.set({
        production: {
            interval: 60, // 1 minute
            randomize: true,
            activity: [
                { name: "I'm watching you...", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.Idle },
                { name: "Sometimes I wonder what I'm doing here...", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.Idle },
                { name: "Do I know you?", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.Idle },
                { name: "Sweet home Alabama 🎤", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.Idle },
                { name: "Can I interest you in some cheese?", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.Idle },
                { name: "drugs.", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.Idle }
            ]
        },
        development: {
            activity: { name: "🧨 playing with unstable substances...", type: discord_js_1.ActivityType.Custom, status: vimcord_1.StatusType.DND }
        }
    });
    await client.start();
}
main().catch(console.error);
