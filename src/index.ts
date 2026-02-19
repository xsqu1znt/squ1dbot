import { ActivityType } from "discord.js";
import { defineGlobalToolsConfig, MongoDatabase, StatusType } from "vimcord";
import { createBot } from "./bot";

defineGlobalToolsConfig({
    embedColor: ["#0D5D56", "#0D5D56", "#0D5D56"],
    embedColorDev: ["#CF2626", "#D62828", "#DC4141"]
});

async function main() {
    const client = createBot();

    client.configure("app", {
        name: "squ1dbot",
        verbose: process.argv.includes("--verbose"),
        enableCLI: true
    });

    client.useEnv();
    await client.useDatabase(new MongoDatabase(client));

    client.status.set({
        production: {
            interval: 60, // 1 minute
            randomize: true,
            activity: [
                { name: "I'm watching you...", type: ActivityType.Custom, status: StatusType.Idle },
                { name: "Sometimes I wonder what I'm doing here...", type: ActivityType.Custom, status: StatusType.Idle },
                { name: "Do I know you?", type: ActivityType.Custom, status: StatusType.Idle },
                { name: "Sweet home Alabama 🎤", type: ActivityType.Custom, status: StatusType.Idle },
                { name: "Can I interest you in some cheese?", type: ActivityType.Custom, status: StatusType.Idle },
                { name: "drugs.", type: ActivityType.Custom, status: StatusType.Idle }
            ]
        },
        development: {
            activity: { name: "🧨 playing with unstable substances...", type: ActivityType.Custom, status: StatusType.DND }
        }
    });

    await client.start();
}

main().catch(console.error);
