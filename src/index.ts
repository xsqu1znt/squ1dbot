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
            activity: { name: "Check out our server!", type: ActivityType.Streaming, status: StatusType.Online }
        },
        development: {
            activity: { name: "Testing new features...", type: ActivityType.Custom, status: StatusType.DND }
        }
    });

    await client.start();
}

main().catch(console.error);
